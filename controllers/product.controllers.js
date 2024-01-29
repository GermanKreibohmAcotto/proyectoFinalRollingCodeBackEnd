const ProductsModel = require("../models/products.schema")

const createProduct = async (req, res) => {
    try {

        const { titulo, precio, codigo } = req.body

        if (!titulo || !precio || !codigo) {
            res.status(400).json({ msg: 'Algun campo esta vacio' })
            return
        }

        const newProduct = new ProductsModel(req.body)
        await newProduct.save()
        res.status(201).json({ msg: 'Producto creado con exito', newProduct })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
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
            return res.status(400 ).json({ msg: 'El producto que intentas borrar no existe en la DB' })
        }
        await ProductsModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ msg: 'Producto eliminado' })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}
module.exports = {
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}