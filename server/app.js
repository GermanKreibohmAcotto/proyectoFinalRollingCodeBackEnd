const express = require('express')

class Server {
    constructor() {
        this.app = express()
        this.routes()
    }

    routes() {
       this.app.use('/api/products', require('../routes/products.routes'))
       this.app.use('/api/users', require('../routes/user.routes'))
    }

    listen(){
        this.app.listen(3001, () => { 
            console.log('servido ejecutandose', 3001)
        })
    }
}

module.exports = Server