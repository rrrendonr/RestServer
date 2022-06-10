const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            users: '/api/users',
        }

        //Conectar base de datos
        this.conectarDB();

        //middleware
        this.middlewares();
        //Rutas de mi app
        this.routes();
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));

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