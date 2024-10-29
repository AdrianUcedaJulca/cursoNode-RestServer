const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/valid-jwt');
const tieneRol  = require('../middlewares/valid-rol');

module.exports = {

    ...validarCampos,
    ...validarJWT,
    ...tieneRol
}