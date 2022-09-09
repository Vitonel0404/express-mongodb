const express = require('express');

const exphbs = require('express-handlebars');

const path = require('path');

//para peticiones delete, put desde un form
const methodOverride = require('method-override');
// para mensajes con connect-flash
const flash = require('connect-flash');

const session = require('express-session');
//para conservar la sesion
const passport = require('passport');

//inicialiazr el servidor
const app = express();

require('./config/passport'); //importar la conf de passport para sesiones


//settings
app.set('port',process.env.PORT || 4000) //establecer el puerto, si asigna el SO o toma el 4000
app.set('views',path.join(__dirname,'views')); //reestablecer la direccion de la carpeta views
app.engine('.hbs',exphbs({ //configurar las plantillas con handlebars
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));

app.set('view engine','.hbs'); //el motor de plantillas es la conf de arriba

//middlewares


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); 

//global variables
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error'); //guardar error para el error al no entrar a la sesion
    res.locals.user=req.user || null; //guardar el usuario para la sesion
    next();
});

//routes
const {noteRouters} = require('./routers/notes.routes');
const userRouter =require('./routers/users.routes');
app.use(require('./routers/index.routes'));

//notes

app.use('/notes',noteRouters);
app.use('/users',userRouter);

//staticfiles

app.use(express.static(path.join(__dirname,'public')));

module.exports = app;