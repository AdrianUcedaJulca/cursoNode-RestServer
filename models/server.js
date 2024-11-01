const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor () {

        this.app = express();
        this.port = process.env.PORT || 3000;

        this.UrlPath = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios'
        }

        // this.UrlUsuarios = '/api/usuarios';
        // this.UrlAuth = '/api/auth';

        this.conectarDB();

        this.middlewares();

        this.routes(); 

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use(this.UrlPath.auth, require('../routes/auth'));
        this.app.use(this.UrlPath.categorias, require('../routes/categorias'));
        this.app.use(this.UrlPath.usuarios, require('../routes/usuarios'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;