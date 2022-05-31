const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        //Conectar base de datos
        this.conectarDB();

        //middleware
        this.middlewares();
        //Rutas de mi app
        this.routes();
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/user.routes'));

    }

async conectarDB(){
    await dbConnection();
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