const ProductsModel = require("../models/products.schema")
const UsersModel = require("../models/users.schema")
const CartModel = require("../models/cart.schema")
const FavModel = require("../models/fav.schema")
const cloudinary = require("cloudinary").v2

const createProduct = async (req, res) => {
    try {
        const { titulo, precio, codigo, descripcion, imagen, imagenPublicId } = req.body

        if (!titulo || !precio || !codigo || !descripcion) {
            res.status(400).json({ msg: 'Algun campo esta vacio' })
            return
        }

        const newObject = {
            titulo,
            precio: Number(precio),
            codigo,
            descripcion,
            imagen,
            imagenPublicId: imagenPublicId
        }

        const newProduct = new ProductsModel(newObject)
        await newProduct.save()
        res.status(201).json({ msg: 'Producto creado con exito', newProduct })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
        console.log(error)
    }
}

const getProducts = async (req, res) => {
    try {
        const getAllProducts = await ProductsModel.find()
        res.status(200).json({ msg: 'Productos encontrados', getAllProducts })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const getOneProduct = async (req, res) => {
    try {
        const getProduct = await ProductsModel.findOne({ _id: req.params.id })
        res.status(200).json({ msg: 'Producto encontrado', getProduct })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productExist = await ProductsModel.findOne({ _id: req.params.id })

        if (!productExist) {
            return res.status(400).json({ msg: 'El producto que intentas actualizar no existe en la DB' })
        }

        
        if (req.body.imagenPublicId !== productExist.imagenPublicId) {
            await cloudinary.uploader.destroy(productExist.imagenPublicId)
            
        }
        console.log(req.body.imagenPublicId)
        console.log(productExist.imagenPublicId)
        const updateProduct = await ProductsModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json({ msg: 'Producto actualizado', updateProduct })


    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const deleteProduct = async (req, res) => {
    try {

        const productExist = await ProductsModel.findOne({ _id: req.params.id })

        if (!productExist) {
            return res.status(400).json({ msg: 'El producto que intentas borrar no existe en la DB' })
        }

        // Eliminar la imagen de Cloudinary
        if (productExist.imagenPublicId) {
            try {
                await cloudinary.uploader.destroy(productExist.imagenPublicId, (error, res) => {
                    if (error) {
                        console.error('Error al eliminar la imagen de Cloudinary:', error)
                        return res.status(500).json({ msg: 'Error al eliminar la imagen de Cloudinary', error })
                    }
                })
            } catch (error) {
                console.error('Error al eliminar la imagen de Cloudinary:', error)
                return res.status(500).json({ msg: 'Error al eliminar la imagen de Cloudinary', error })
            }
        }

        await ProductsModel.findByIdAndDelete({ _id: req.params.id })

        

        res.status(200).json({ msg: 'Producto eliminado' })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const addProdCart = async (req, res) => {
    try {
        const cartExist = await CartModel.findOne({ _id: req.idCarrito })
        const userCart = await UsersModel.findOne({ _id: req.idUsuario })

        if (!cartExist) {
            return res.status(400).json({ msg: 'Carrito no existe' })
        }

        if (cartExist._id.toString() === userCart.idCart.toString()) {
            const prodFind = await ProductsModel.findOne({ _id: req.params.idProd })
            const prodFilter = cartExist.products.filter((prod) => prod._id.toString() === prodFind._id.toString())

            if (prodFilter.length > 0) {
                return res.status(400).json({ msg: 'El producto ya existe en el carrito' })
            }
            cartExist.products.push(prodFind)
            await cartExist.save()
            res.status(200).json({ msg: 'Producto cargado correctamente al carrito' })
        } else {
            return res.status(400).json({ msg: 'ID carrito y/o usuario incorrecto' })
        }



    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const addProdFav = async (req, res) => {
    try {
        const favProd = await FavModel.findOne({_id: req.idFavoritos})
        const userFav = await UsersModel.findOne({_id: req.idUsuario})
        if(!favProd){
            return res.status(400).json({msg: 'ID favorito incorrecto'})
        }
        if(favProd._id.toString() === userFav.idFav.toString()){
            const prodFav = await ProductsModel.findOne({_id: req.params.idProd})
            const favProdFilter = favProd.favorites.filter((fav) => fav._id.toString() === prodFav._id.toString())

            if (favProdFilter.length > 0) {
                return res.status(400).json({ msg: 'Producto ya existe en favoritos' })
            }

            favProd.favorites.push(prodFav)
            await favProd.save()
            res.status(200).json({ msg: "El producto se cargo a favoritos" })

        } else {
            return res.status(400).json({ msg: 'ID favoritos y/o usuario incorrecto' })
        }
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    addProdCart,
    addProdFav
}