const helpers ={};

helpers.isAuthenticated = (req,res,next)=>{
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}

module.exports=helpers;