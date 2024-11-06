const dbvalidators = require('./db-validators');
const generarJwt = require('./generar-jwt');
const googleVerify = require('./google-verify');
const cargarArchivo = require('./cargar-archivo');

module.exports = {
    ...dbvalidators,
    ...generarJwt,
    ...googleVerify,
    ...cargarArchivo
};