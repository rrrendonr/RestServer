const { response, request } = require('express');

const Usuario = require('../models/usuario');

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
    const body = req.body;
    const usuario = new Usuario( body );

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