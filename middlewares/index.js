const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/valid-jwt');
const tieneRol  = require('../middlewares/valid-rol');
const validarArchivo  = require('../middlewares/validar-archivo');

module.exports = {

    ...validarCampos,
    ...validarJWT,
    ...tieneRol,
    ...validarArchivo
}