const { Router } = require('express');
const { check } = require('express-validator');

const { 
        validatorField,
        validarJWT,
        tieneRol
} = require('../middlewares/index');

const { esRolValido, emailExiste, existeId } = require('../helpers/db-validators');

const { 
        usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', usuariosGet)

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y de mas de 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExiste),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
        check('rol').custom(esRolValido),
        validatorField
], usuariosPost)

router.put('/:id', [
        check('id', 'No es in ID válido').isMongoId(),
        check('id').custom(existeId),
        check('rol').custom(esRolValido),
        validatorField
],usuariosPut)

router.delete('/:id',[
        validarJWT,
        // esAdminRole,
        tieneRol('ADMIN_ROL', 'USER_ROL'),
        check('id', 'No es in ID válido').isMongoId(),
        check('id').custom(existeId),
        validatorField
],usuariosDelete)

module.exports = router