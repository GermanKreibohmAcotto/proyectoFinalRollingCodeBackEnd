const express = require('express')
const route = express.Router()
const { createProduct, getProducts, getOneProduct , updateProduct, deleteProduct, addProdCart, addProdFav } = require('../controllers/product.controllers')
const auth = require('../middlewars/auth')
const { check } = require('express-validator')
const upload = require('../middlewars/multer')

route.post('/', [
    upload.single('imagen'),
    check('id', 'Formato incorrecto de ID').isMongoId(),
    check('titulo', 'El campo titulo esta vacio').notEmpty(),
    check('codigo', 'El campo codigo esta vacio').notEmpty(),
    check('precio', 'El campo precio esta vacio').notEmpty(),
    check('descripcion', 'El campo descripcion esta vacio').notEmpty(),
    check('imagen', 'El campo imagen esta vacio').notEmpty(),
    check('titulo',  'Min: 5 Max: 50').isLength({min:5, max:50}),
    check('codigo',  'Min: 5 Max: 50').isLength({min:5, max:50}),
    check('precio',  'Min: 2 Max: 50').isLength({min:2, max:50}),
    check('descripcion',  'Min: 10 Max: 50').isLength({min:10, max:50}),
    check('imagen',  'Min: 5').isLength({min:5}),
],auth('admin'), createProduct)

route.post('/cart/:idProd/', auth('user'), addProdCart)
route.post('/fav/:idProd/', auth('user'), addProdFav)

route.get('/', getProducts) 

route.get('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId(),
], getOneProduct) 

route.put('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId(),
    check('titulo', 'El campo titulo esta vacio').notEmpty(),
    check('codigo', 'El campo codigo esta vacio').notEmpty(),
    check('precio', 'El campo precio esta vacio').notEmpty(),
    check('descripcion', 'El campo descripcion esta vacio').notEmpty(),
    check('titulo',  'Min: 5 Max: 50').isLength({min:5, max:50}),
    check('codigo',  'Min: 5 Max: 50').isLength({min:5, max:50}),
    check('precio',  'Min: 2 Max: 50').isLength({min:2, max:50}),
    check('descripcion',  'Min: 10 Max: 50').isLength({min:10, max:50}),
    check('imagen',  'Min: 5 Max: 80').isLength({min:5, max:80}),
],auth('admin'), updateProduct)

route.delete('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId(),
],auth('admin'), deleteProduct)

module.exports = route