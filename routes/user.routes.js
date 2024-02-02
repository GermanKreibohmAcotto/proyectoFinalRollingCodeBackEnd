const express = require('express')
const { check } = require('express-validator')
const route = express.Router()
const { createUser, getUsers, getUser, updateUser, deleteUser, loginUser } = require('../controllers/users.controllers')


route.post('/',[
    check('correo', 'El campo correo esta vacio').notEmpty(),
    check('correo', 'El campo correo esta vacio').notEmpty(),
    check('correo', 'Formato incorrecto').isEmail(),
    check('correo', 'Min: 8 Max: 50').isLength({min:8, max:50}),
    check('contrasenia', 'El campo contrasenia esta vacio').notEmpty(),
    check('contrasenia', 'Min: 8').isLength({min:8}),
], createUser)
route.post('/login', loginUser)
route.get('/', getUsers)
route.get('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId(),
], getUser)
route.put('/:id', updateUser)
route.delete('/:id', deleteUser)

module.exports = route