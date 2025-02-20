const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
class Server {
    constructor() {
        this.app = express()
        this.middlewars()
        this.routes()
    }

middlewars(){
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(cors({
        origin: true, // Origen de tu frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization', 'auth'], // Encabezados permitidos
        credentials: true

    }));
}

    routes() {
       this.app.use('/api/products', require('../routes/products.routes'))
       this.app.use('/api/users', require('../routes/user.routes'))
       this.app.use('/api', require('../routes'))
    }

    listen(){
        this.app.listen(3002, () => { 
            console.log('servido ejecutandose', 3002)
        })
    }
}

module.exports = Server