const cors      = require('cors');
const express   = require('express');
const conexion  = require('../database/connection');
const app       = express();

class Server {

    constructor() {
        this.app  = express();
        this.port = 8080;

        // Conectamos con la base de datos
        this.conectarBD();
   
        // Middlewares
        this.middlewares();

    }

    async conectarBD() {
        try {
            await conexion.authenticate();
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.log('Unable to connect to the database.', error);
        }
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );
    }

    listen() {
        this.app.listen( this.port );
    }

}

module.exports = Server;