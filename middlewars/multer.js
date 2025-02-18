const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../helpers/cloudinary')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        format: async (req, file) => 'png', // Puedes cambiar el formato si es necesario
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(file.originalname.toLowerCase())

        if (mimetype && extname) {
            return cb(null, true)
        } else {
            cb(new Error('Formato de archivo no soportado'))
        }
    },
})

module.exports = upload