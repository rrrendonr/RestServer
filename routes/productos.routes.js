const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto,
        borrarProducto
} = require('../controllers/productos.controller');
const { existeProducto } = require('../helpers/db-validators');
const { validarJWT, 
        validatorField, 
        esAdminRole 
} = require('../middlewares');

const router = Router();

//obtener todas las categorias
router.get('/', obtenerProductos);

//obtener producto
router.get('/:id',[
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validatorField
],obtenerProducto);

//crear producto
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es in ID válido').isMongoId(),
    validatorField
], crearProducto)

//actualizar producto
router.put('/:id',[
    validarJWT,
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeProducto),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validatorField
], actualizarProducto);

//solo si es un admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validatorField
], borrarProducto);

module.exports = router