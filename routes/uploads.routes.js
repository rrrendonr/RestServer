const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const {validatorField, validarArchivoSubir} = require('../middlewares');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivos);
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validatorField
], actualizarImagen);

module.exports = router