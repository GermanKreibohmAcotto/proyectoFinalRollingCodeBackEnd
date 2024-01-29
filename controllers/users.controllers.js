const createUser = (req, res) => {
    res.json('Hola user')
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