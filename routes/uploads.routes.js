const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const {validatorField} = require('../middlewares/field-validators')

const router = Router();

router.post('/', cargarArchivos);
router.put('/:coleccion/:id', [
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validatorField
], actualizarImagen);

module.exports = router