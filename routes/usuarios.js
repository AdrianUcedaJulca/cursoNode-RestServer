const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRol
} = require('../middlewares');


const { IsValidRol, IsValidEmail, ExistsIdUsuario } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( (res, correo) => IsValidEmail(res, correo) ),
    check('rol').custom( IsValidRol ),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( ExistsIdUsuario ),
    check('rol').custom( IsValidRol ),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( ExistsIdUsuario ),
    validarCampos
], usuariosDelete);

module.exports = router;