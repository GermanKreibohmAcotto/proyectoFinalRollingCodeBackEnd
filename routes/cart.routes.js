const express = require("express")
const { getAllProductsCart, deleteProductCart } = require("../controllers/cart.controllers")
const router = express.Router()

router.get('/:id', getAllProductsCart)
router.delete('/:idCart/idProd', deleteProductCart)

module.exports = router