const { Router } =require('express');

const userRouter= Router();

const  {
    renderSignUpForm,
    signUp,
    renderSignInForm,
    signIn,
    logout,
    // renderListUsers,
    // renderCreateUsers,
    // createUsers,
    // renderEditUser,
    // updateUser,
    // deleteUser
} =require('../controllers/users.controller');


userRouter.get('/signup',renderSignUpForm);
userRouter.post('/signup',signUp);

userRouter.get('/signin',renderSignInForm);
userRouter.post('/signin',signIn);

userRouter.get('/logout',logout);


// userRouter.get('/',renderListUsers);
// userRouter.get('/add',renderCreateUsers);
// userRouter.post('/create_user',createUsers);
// userRouter.get('/edit/:id',renderEditUser);
// userRouter.put('/edit/:id',updateUser);
// userRouter.delete('/delete/:id',deleteUser);
module.exports= userRouter;