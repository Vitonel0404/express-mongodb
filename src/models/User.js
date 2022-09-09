const { Schema,model } =require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema=new Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },
},{
    timestamps:true
});

UserSchema.methods.encryptPassword = async password =>{ //encryptPassword es el método que creamos para encriptar las contraseñas (puede llamarse como se guste)
    const salt = await bcrypt.genSalt(10) // se necesita esto para generar cifrado

    return await bcrypt.hash(password,salt); // retornar la contraseña cifrada y guardarla en la BD
};

UserSchema.methods.matchPassword = async function (password){

    return await bcrypt.compare(password,this.password) // devuelve true o false en comparacion de contraseñas

};  

module.exports=model('User',UserSchema);