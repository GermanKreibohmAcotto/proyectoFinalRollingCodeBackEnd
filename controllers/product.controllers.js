const  createProduct = (req, res) => {
    res.json('Hola producto')
} 

const getProducts = (req, res) => {
    res.json('Hola producto2')
}

const getOneProduct = (req, res) => {
   // console.log( req.params) parametro
   // console.log( req.body)     dato, array
   // console.log( req.query) info

    res.json('Hola un producto2')
}

const updateProduct = (req, res) => {
    res.json('Hola producto3')
}
  
const deleteProduct = (req, res) => {
    res.json('Hola producto4')
} 
module.exports = {
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}