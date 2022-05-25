const { Router } = require('express');
const { check } = require('express-validator');
const Rol = require('../models/role'),

const { validatorField } = require('../middlewares/field-validators');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/user.controller');

const router = Router();

router.get('/', usuariosGet)

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y de mas de 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
        check('rol').custom(async (rol = '') => {
                const existeRol = await Rol.fidOne({rol});
                if (!existeRol) {
                        throw new Error(`El rol ${rol} no está en la DB`)
                }
        })
        validatorField
], usuariosPost)

router.put('/:id', usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete)

module.exports = router