const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {status: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        usuarios
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
    res.json(usuario);
}
const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: "patch api - Controller"
    });
}
const usuariosDelete = async(req = request, res = response) => {

    const {id} = req.params;

    //borrado disicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {status: false});

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}