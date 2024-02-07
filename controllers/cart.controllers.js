const CartModel = require("../models/cart.schema")
const ProductsModel = require("../models/products.schema")

const getAllProductsCart = async(req, res) => {
    try {
        const getProducts = await CartModel.findOne({_id: req.params.id})
        res.status(200).json({msg: "carrito", products: getProducts.products})
    } catch (error) {
        console.log(error)
    }
}

const deleteProductCart = async(req, res) => {
    try {
        const objCart = await CartModel.findOne({_id: req.idCarrito})
        const product = await ProductsModel.findOne({_id: req.params.idProd})
        const filterProd = objCart.products.filter((prod)=> prod._id.toString() !== product._id.toString())
        const prodExistFilter = objCart.products.filter((prod) => prod._id.toString() === product._id.toString())

        if(prodExistFilter.length > 0){
            objCart.products = filterProd
        await objCart.save()
        res.status(200).json({msg: 'Producto eliminado del carrito'})
        }else {
            res.status(400).json({msg: 'ID carrito incorrecto'})
        }

        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllProductsCart,
    deleteProductCart
}