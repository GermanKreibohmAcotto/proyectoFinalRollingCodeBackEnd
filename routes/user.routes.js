const express = require('express')
const { check } = require('express-validator')
const route = express.Router()
const { createUser, getUsers, getUser, updateUser, deleteUser, loginUser } = require('../controllers/users.controllers')


route.post('/',[
    check('nombreUsuario', 'El campo nombreUsuario esta vacio').notEmpty(),
    check('emailUsuario', 'El campo emailUsuario esta vacio').notEmpty(),
    check('emailUsuario', 'Formato incorrecto').isEmail(),
    check('emailUsuario', 'Min: 8 Max: 50').isLength({min:8, max:50}),
    check('contrasenia', 'El campo contrasenia esta vacio').notEmpty(),
    check('contrasenia', 'Min: 10').isLength({min:10}),
], createUser)
route.post('/login', loginUser)
route.get('/', getUsers)
route.get('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId(),
], getUser)
route.put('/:id', updateUser)
route.delete('/:id', deleteUser)

module.exports = route