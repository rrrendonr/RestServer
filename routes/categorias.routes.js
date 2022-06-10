const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        obtenerCAtegorias
} = require('../controllers/categorias.controller');

const { validatorField,
        validarJWT,
        validatorRoles
} = require('../middlewares');

const router = Router();

//obtener todas las categorias
router.get('/', [

], obtenerCAtegorias);

//obtener una categoria por id - cualquier persona
router.get('/:id', (req, res) => {
    res.status(200).json({
        msg: 'det -id'
    })
});

//Crear categoria - privado con cualquier token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validatorField
], crearCategoria);

// Actualizar - privado - cualquier token
router.put('/:id', (req, res) => {
    res.status(200).json({
        msg: 'put'
    })
});

//solo si es un admin
router.delete('/:id', (req, res) => {
    res.status(200).json({
        msg: 'delete'
    })
});

module.exports = router