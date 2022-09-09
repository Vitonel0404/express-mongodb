const User = require('../models/User');

const passport = require('passport'); //para la sesiones

const renderSignUpForm=(req,res)=>{
    return res.render('users/signup');
};


const signUp=async(req,res)=>{
    const errors=[];
    const {name,email,password,confirm_password} = req.body;
    if(password!=confirm_password){
        errors.push({text:'Password do not match'});
    }
    if(password.length<4){
        errors.push({text:'Password must be at least 4 characters'})
    }
    if(errors.length>0){
        return res.render('users/signup',{errors,name,email});
    }else{
        const emailExists=await User.findOne({email:email});
        if (emailExists) {
            req.flash('error_msg','The email is already in use');
            return res.redirect('/users/signup');
        }else{
            
            const newUser = new User({name,email,password});
            newUser.password= await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','You are registered');
            return res.redirect('/users/signin');
        }
    }
    
};

const renderSignInForm=(req,res)=>{
    return res.render('users/signin');
};


const signIn=passport.authenticate('local',{
    failureRedirect:'/users/signin',
    successRedirect:'/notes',
    failureFlash:true
});

const logout=(req,res)=>{
    req.logout((err) => {
        if (err){ 
            return next(err); 
        }
        req.flash( "success_msg" , "You are logged out now'" );
        return res.redirect( "/users/signin" );
    });
};

// const renderListUsers=(req,res)=>{

// };

// const renderCreateUsers=(req,res)=>{

// };

// const createUsers=(req,res)=>{

// };

// const renderEditUser=(req,res)=>{

// }

// const updateUser=(req,res)=>{

// }

// const deleteUser=(req,res)=>{

// }
module.exports={
    renderSignUpForm:renderSignUpForm,
    signUp:signUp,
    renderSignInForm:renderSignInForm,
    signIn:signIn,
    logout:logout

    // renderListUsers:renderListUsers,
    // renderCreateUsers:renderCreateUsers,
    // createUsers:createUsers,
    // renderEditUser:renderEditUser,
    // updateUser:updateUser,
    // deleteUser:deleteUser,
}
