const Rol = require('../models/role');
const Usuario = require('../models/usuario');

//Verificar rol
const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está en la DB`)
    }
}
//Verificar email
const emailExiste = async(correo = '') => {
    const existeMail = await Usuario.findOne({correo});
    if (existeMail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioPorId = async(id = '') => {
    const existeUsuario= await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario con id: ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}