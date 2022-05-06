const { response, request } = require('express');

const usuariosGet = ('/', (req = request, res = response) => {
    const {q, name = 'No name', apikey} = req.query;

    res.json({
        msg: "get api - Controller",
        q,
        name,
        apikey
    });
})
const usuariosPost = ('/', (req = request, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: "post api - Controller",
        nombre,
        edad
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