const express = require('express')
const route = express.Router()
const { createUser, getUsers, getUser, updateUser, deleteUser, loginUser } = require('../controllers/users.controllers')


route.post('/', createUser)
route.post('/login', loginUser)
route.get('/', getUsers)
route.get('/:id', getUser)
route.put('/:id', updateUser)
route.delete('/:id', deleteUser)

module.exports = route