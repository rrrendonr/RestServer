const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        obtenerCAtegorias,
        obtenerCAtegoria,
        actualizarCategoria,
        borrarCAtegoria
} = require('../controllers/categorias.controller');
const { existeCategoria } = require('../helpers/db-validators');

const { validatorField,
        validarJWT,
        validatorRoles,
        tieneRol,
        esAdminRole
} = require('../middlewares');

const router = Router();

//obtener todas las categorias
router.get('/', obtenerCAtegorias);

//obtener una categoria por id - cualquier persona
router.get('/:id',[
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validatorField
],obtenerCAtegoria);

//Crear categoria - privado con cualquier token valido
router.post('/', [
    validarJWT,
    check('id', 'No es in ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validatorField
], crearCategoria);

// Actualizar - privado - cualquier token
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validatorField
], actualizarCategoria);

//solo si es un admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validatorField
], borrarCAtegoria);

module.exports = router