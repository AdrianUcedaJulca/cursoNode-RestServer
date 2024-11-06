const path = require('path');

const { v4: uuidv4 } = require('uuid');

const cargarArchivo = ( files, extensiones = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');

        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validar la extension
        if( !extensiones.includes(extension) ){

            return reject(`La extension ${extension} no es permitida - ${extensiones}` );
        };

        const uuidNombre = uuidv4() + '.' + extension;

        const uploadPath = path.join( __dirname, '../uploads/', carpeta, uuidNombre );

        archivo.mv(uploadPath, function(err) {
            if (err) {
                return reject(err);
            }

            resolve(uuidNombre);
        });
    });
};

module.exports = {
    cargarArchivo
}