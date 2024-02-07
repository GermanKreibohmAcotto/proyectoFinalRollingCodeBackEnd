const  {Schema, model } = require('mongoose')

const UsersSchema = new Schema({
    correo: {
        type: String,
        require: true,
        unique: true
    },
    correo: {
        type: String,
        require: true,
        unique: true
    },
    contrasenia: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    idCart:{
        type: String
    },
    idFav:{
        type: String
    }
})

UsersSchema.methods.toJSON = function(){
    const { __v, contrasenia , ...usuario} = this.toObject()
    return usuario
}

const UsersModel = model('users', UsersSchema)
module.exports = UsersModel 
