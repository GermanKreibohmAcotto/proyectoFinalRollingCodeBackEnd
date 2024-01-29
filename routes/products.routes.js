const express = require('express')
const route = express.Router()
const { createProduct, getProducts, getOneProduct , updateProduct, deleteProduct } = require('../controllers/product.controllers')

/*crear*/
route.post('/', createProduct)
/*obtener*/
route.get('/', getProducts) 
route.get('/one', getOneProduct) 
/*Actualizar*/
route.put('/', updateProduct)
/*Borrar*/
route.delete('/', deleteProduct)

module.exports = route