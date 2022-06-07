const validatorField = require('../middlewares/field-validators');
const validatorJWT = require('../middlewares/validar-jwt');
const validatorRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validatorField,
    ...validatorJWT,
    ...validatorRoles
}