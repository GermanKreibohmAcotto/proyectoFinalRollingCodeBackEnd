const express = require('express')
const route = express.Router()
const { createProduct, getProducts, getOneProduct , updateProduct, deleteProduct } = require('../controllers/product.controllers')
const auth = require('../middlewars/auth')
const multer = require ("../middlewars/multer")

/*crear*/
route.post('/', multer.single('imagen'), createProduct)
/*obtener*/
route.get('/', getProducts) 
route.get('/:id', getOneProduct) 
/*Actualizar*/
route.put('/:id', updateProduct)
/*Borrar*/
route.delete('/:id', deleteProduct)

module.exports = route