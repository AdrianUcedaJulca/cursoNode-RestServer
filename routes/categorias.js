const { Router } = require("express");
const {
    crearCategorias,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require("../controllers/categorias");
const { validarJWT, validarCampos, tieneRol } = require("../middlewares");
const { check } = require("express-validator");
const { existsCategoria } = require("../helpers/db-validators");

const router = Router();

//Obtener todas las categorias
router.get('/', obtenerCategorias);

//Obtener una categoria especifica 
router.get('/:id', [
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existsCategoria ),
    validarCampos
], obtenerCategoria);

//Crear una categoria -- solo usuarios que tengan token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategorias);

//Actualizar una categoria
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existsCategoria ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);

//Eliminar una categoria solo los admin
router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existsCategoria ),
    validarCampos
], borrarCategoria);


module.exports = router;