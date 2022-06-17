const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos } = require('../controllers/uploads.controller');

const {validatorField} = require('../middlewares/field-validators')

const router = Router();

router.post('/', cargarArchivos);

module.exports = router