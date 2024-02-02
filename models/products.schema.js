const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        require: true,
    },
    precio: {
        type: Number,
        require: true,
    },
    codigo: { 
        type: String,
        require: true,
    },
    imagen:{
        type: String,
    }
})

const ProductsModel = mongoose.model('products', ProductSchema)
module.exports = ProductsModel