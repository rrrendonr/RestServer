const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth.controller');
const { validatorField } = require('../middlewares/field-validators');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validatorField
],login);

router.post('/google', [
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validatorField
],googleSingIn);


module.exports = router;