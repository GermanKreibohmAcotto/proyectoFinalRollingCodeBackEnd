const express = require('express')
const route = express.Router()
const {  createUser, getUsers, updateUser, deleteUser  } = require('../controllers/users.controllers')

 /*crear*/
 route.post('/', createUser)
/*obtener*/
route.get('/', getUsers)
/*Actualizar*/
route.put('/',updateUser)
/*Borrar*/
route.delete('/', deleteUser)

module.exports = route