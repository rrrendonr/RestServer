const validatorField = require('../middlewares/field-validators');
const validatorJWT   = require('../middlewares/validar-jwt');
const validatorRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');
module.exports = {
    ...validatorField,
    ...validatorJWT,
    ...validatorRoles,
    ...validarArchivo
}