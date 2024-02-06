const express = require('express')
const route = express.Router()
const { createImage, getImages, deleteImage } = require('../controllers/images.controllers')
const multer = require ("../middlewars/multer")
const { check } = require('express-validator')

route.post('/', [
    multer.single('image'),
], createImage)

route.get('/', getImages) 

route.delete('/:id',[
    check('id', 'Formato incorrecto de ID').isMongoId(),
], deleteImage)

module.exports = route