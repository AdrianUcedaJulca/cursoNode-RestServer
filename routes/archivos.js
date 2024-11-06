const { Router } = require("express");
const { subirArchivo, actualizarArchivo, obtenerImagen, actualizarArchivoCloudinary } = require("../controllers/archivos");
const { check } = require("express-validator");
const { validarCampos, validarArchivo } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'Debe ser un mongoId').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], obtenerImagen);

router.post('/', validarArchivo, subirArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'Debe ser un mongoId').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarArchivoCloudinary);

module.exports = router;