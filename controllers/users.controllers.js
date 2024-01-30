const UsersModel = require("../models/users.schema")
const bcryptjs = require('bcryptjs')
const createUser = async (req, res) => {
	try {

		const { nombreUsuario, contrasenia } = req.body

		if (!nombreUsuario || !contrasenia) {
			res.status(400).json({ msg: 'Algun campo esta vacio' })
			return
		}

		const userExist = await UsersModel.findOne({ nombreUsuario })

		if (userExist) {
			res.status(400).json({ msg: 'Usuario ya existe en la BD' })
			return
		}
		const newUser = new UsersModel(req.body)
		
		const salt = bcryptjs.genSaltSync()
		newUser.contrasenia = bcryptjs.hashSync(contrasenia, salt)

		await newUser.save()
		res.status(201).json({ msg: 'Usuario creado con exito', newUser })

	} catch (error) {
		res.status(500).json({ msg: 'Falla en el server', error })
	}
}

const getUsers = async (req, res) => {
	try {
		const getAllUsers = await UsersModel.find()
		res.status(200).json({ msg: 'Usuarios encontrados', getAllUsers })


	} catch (error) {
		res.status(500).json({ msg: 'Falla en el server', error })
	}
}

const getUser = async (req, res) => {
	try {
		const getAOneUser = await UsersModel.findOne({ _id: req.params.id })
		res.status(200).json({ msg: 'Usuario encontrado', getAOneUser })

	} catch (error) {
		res.status(500).json({ msg: 'Falla en el server', error })
	}
}

const updateUser = async (req, res) => {
	try {
		const updateOneUser = await UsersModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
		res.status(200).json({ msg: 'Usuario Actualizado', updateOneUser })
	} catch (error) {
		res.status(500).json({ msg: 'Falla en el server', error })
	}
}

const deleteUser = async (req, res) => {
	try {
		const usersExist = await UsersModel.findOne({ _id: req.params.id })

        if (!usersExist) {
            return res.status(400).json({ msg: 'El usuario que intentas borrar no existe en la DB' })
		}

		await UsersModel.findByIdAndDelete({ _id: req.params.id })
		res.status(200).json({ msg: 'Usuario eliminado :)' })

	} catch (error) {
		res.status(500).json({ msg: 'Falla en el server', error })
	}
}

module.exports = {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser
}