const {Usuario, Categoria, Producto } = require('../models');
const Rol = require('../models/role');

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

const existeId = async(id = '') => {
    const existeUsuario= await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id} no existe`);
    }
}

const existeCategoria = async(id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`el id: ${id} no existe`)
    }
}

const existeProducto = async(id = '') => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`el id: ${id} no existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es una coleccion valida - ${colecciones}`)
    }

    return true;
}

module.exports = {
    coleccionesPermitidas,
    esRolValido,
    emailExiste,
    existeId,
    existeCategoria,
    existeProducto
}