const express = require('express')
const { check } = require('express-validator')
const route = express.Router()
const { createUser, getUsers, getUser, updateUser, deleteUser, loginUser } = require('../controllers/users.controllers')


route.post('/',[
    check('correo', 'El campo correo esta vacio').notEmpty(),
    check('correo', 'Formato incorrecto').isEmail(),
    check('correo', 'Min: 8 Max: 50').isLength({min:8, max:50}),
    check('contrasenia', 'El campo contraseñaa esta vacio').notEmpty(),
    check('contrasenia', 'Min: 8 Max: 30').isLength({min:8, max:30}),
], createUser)
route.post('/login',[
    check('correo', 'El campo correo esta vacio').notEmpty(),
    check('correo', 'Formato incorrecto').isEmail(),
    check('correo', 'Min: 8 Max: 50').isLength({min:8, max:50}),
    check('contrasenia', 'El campo contraseña esta vacio').notEmpty(),
    check('contrasenia', 'Min: 8 Max: 30').isLength({min:8, max:30}),
], loginUser)
route.get('/', getUsers)
route.get('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId(),
], getUser)
route.put('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId(),
], updateUser)
route.delete('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId(),
], deleteUser)

module.exports = route