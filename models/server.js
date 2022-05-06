const express = require('express');
const cors = require('cors');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //middleware
        this.middlewares();
        //Rutas de mi app
        this.routes();
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'))
    }

    middlewares() {
        //Cors
        this.app.use(cors());

        //Lectura y Parseo del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port);
        });
    }
}

module.exports = Server;