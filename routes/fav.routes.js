const express = require("express")
const { getAllProductsFav, deleteProductFav } = require("../controllers/fav.controllers")
const router = express.Router()

router.get('/:id' , getAllProductsFav)
router.delete('/:idFav/:idProd', deleteProductFav)

module.exports = router