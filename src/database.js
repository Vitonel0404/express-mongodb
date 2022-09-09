const mongoose = require ('mongoose');

//const MONGODB_URI=process.env.MONGODB_URI; // cadena de conexion

//const NOTES_APP_MONGODB_HOST=process.env.NOTES_APP_MONGODB_HOST; //HOST: (localhost)
//const NOTES_APP_MONGODB_DATABASE=process.env.NOTES_APP_MONGODB_DATABASE; //nombre de la BD

//usando otra técnica

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env
const MONGODB_URI= `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

//CONEXION A LA BD 
mongoose.connect(MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,

})
    .then(db=>console.log('Database is connected'))
    .catch(err=>console.log(err));