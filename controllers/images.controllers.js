const ImagesModel = require("../models/images.schema")
const cloudinary = require("../helpers/cloudinary")

const createImage = async (req, res) => {
    try {

        const { titulo } = req.body

        if (!titulo) {
            res.status(400).json({ msg: 'Algun campo esta vacio' })
            return
        }

        const results = await cloudinary.uploader.upload(req.file.path);

        const newImage = new ImagesModel({ ...req.body, imagen: results.secure_url })

        await newImage.save()

        res.status(201).json({ msg: 'Imagen agregada con exito', newImage })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const getImages = async (req, res) => {
    try {
        
        const getAllImages = await ImagesModel.find()
        res.status(200).json({ msg: 'Imagenes encontrados', getAllImages })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const deleteImage = async (req, res) => {
    try {
    
        const ImageExist = await ImagesModel.findOne({ _id: req.params.id })

        if (!ImageExist) {
            return res.status(400 ).json({ msg: 'La imagen que intentas borrar no existe en la DB' })
        }
        await ImagesModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ msg: 'Imagen eliminado' })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

module.exports = {
    createImage,
    getImages,
    deleteImage,
}