const express = require('express')
const route = express.Router()
const {  createUser, getUsers,getUser, updateUser, deleteUser  } = require('../controllers/users.controllers')

 /*crear*/
 route.post('/', createUser)
/*obtener*/
route.get('/', getUsers)
route.get('/:id', getUser)
/*Actualizar*/
route.put('/:id',updateUser)
/*Borrar*/
route.delete('/:id', deleteUser)

module.exports = route