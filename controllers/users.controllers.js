const UsersModel = require("../models/users.schema")

const createUser = async (req, res) => {
    try {
        const { nombreUsuario } = req.body
        const userExist = await UsersModel.findOne({ nombreUsuario })

        if (userExist) {
            res.status(400).json({ msg: 'Usuario ya existe en la BD' })
            return
        }
        const newUser = new UsersModel(req.body)
        await newUser.save()
        res.status(201).json({ msg: 'Usuario creado con exito', newUser })

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}
const getUsers = (req, res) => {
    res.json('Hola user2')
}

const updateUser = (req, res) => {
    res.json('Hola user3')
}

const deleteUser = (req, res) => {
    res.json('Hola user4')
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}