const { Schema, model} = require('mongoose')

const FavSchema = new Schema({
    idUser:{
        type: String
    },
    favorites:[]
})

const FavModel = model('fav', FavSchema)

module.exports = FavModel