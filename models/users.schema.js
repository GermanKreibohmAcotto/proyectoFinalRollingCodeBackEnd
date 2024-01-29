const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        require: true,
        unique: true
    },
    contrasenia: { 
        type: String,
        require: false,
    },
})

const UsersModel = mongoose.model('users', UsersSchema)
module.exports = UsersModel 
