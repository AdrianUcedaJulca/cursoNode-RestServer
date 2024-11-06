const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
    constructor () {

        this.app = express();
        this.port = process.env.PORT || 3000;

        this.UrlPath = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            archivos: '/api/archivos'
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

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

        // Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        
        this.app.use(this.UrlPath.auth, require('../routes/auth'));
        this.app.use(this.UrlPath.buscar, require('../routes/buscar'));
        this.app.use(this.UrlPath.categorias, require('../routes/categorias'));
        this.app.use(this.UrlPath.productos, require('../routes/productos'));
        this.app.use(this.UrlPath.usuarios, require('../routes/usuarios'));
        this.app.use(this.UrlPath.archivos, require('../routes/archivos'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;