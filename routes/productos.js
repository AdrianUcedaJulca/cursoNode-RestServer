const { Router } = require("express");
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require("../controllers/productos");
const { validarJWT, validarCampos, tieneRol } = require("../middlewares");
const { check } = require("express-validator");
const { existsCategoria, existsProducto } = require("../helpers/db-validators");

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existsProducto ),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom( existsCategoria ),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existsProducto ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom( existsCategoria ),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existsProducto ),
    validarCampos
], borrarProducto);

module.exports = router;