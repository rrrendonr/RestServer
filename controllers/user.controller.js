const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    const {q, name = 'No name', apikey} = req.query;

    res.json({
        msg: "get api - Controller",
        q,
        name,
        apikey
    });
}
const usuariosPost = async (req = request, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    // encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar DB
    await usuario.save();
    res.json({
        usuario
    });
}
const usuariosPut = async(req = request, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body

    //validar contra base de datos
    if (password) {
        // encriptar pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: "put api - Controller",
        usuario
    });
}
const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: "patch api - Controller"
    });
}
const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: "delete api - Controller"
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}