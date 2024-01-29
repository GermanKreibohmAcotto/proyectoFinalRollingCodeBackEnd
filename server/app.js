const express = require('express')

class Server {
    constructor() {
        this.app = express()
        this.middlewars()
        this.routes()
    }

middlewars(){
    this.app.use(express.json())
}

    routes() {
       this.app.use('/api/products', require('../routes/products.routes'))
       this.app.use('/api/users', require('../routes/user.routes'))
    }

    listen(){
        this.app.listen(3002, () => { 
            console.log('servido ejecutandose', 3002)
        })
    }
}

module.exports = Server