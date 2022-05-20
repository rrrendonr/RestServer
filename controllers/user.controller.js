const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = ('/', (req = request, res = response) => {
    const {q, name = 'No name', apikey} = req.query;

    res.json({
        msg: "get api - Controller",
        q,
        name,
        apikey
    });
})
const usuariosPost = ('/', async (req = request, res = response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //Verificar correo
    const existeEmail = await Usuario.findOne({ correo});
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Ya existe una cuenta con ese correo electrónico'
        })
    }
    // encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar DB
    await usuario.save();
    res.json({
        usuario
    });
})
const usuariosPut = ('/', (req = request, res = response) => {

    const id = req.params.id;

    res.json({
        msg: "put api - Controller",
        id
    });
})
const usuariosPatch = ('/', (req = request, res = response) => {
    res.json({
        msg: "patch api - Controller"
    });
})
const usuariosDelete = ('/', (req = request, res = response) => {
    res.json({
        msg: "delete api - Controller"
    });
})

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}