const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    titulo: {
        type: String,
    },
    imagen:{
        type: String,
    }
})

const ImageModel = mongoose.model('images', ImageSchema)
module.exports = ImageModel