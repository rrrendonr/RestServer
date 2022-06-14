const { response, request } = require('express');
const { isValidObjectId } = require('mongoose');
const {Usuario, Categoria, Producto} = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'roles',
    'productos'
]

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        res.json(usuario);
    }
}

const buscar = async(req = request, res = response) => {
    
    const { coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
        
        break;
        case 'productos':
        
        break;
    
        default:
            res.status(500).json({
                msg: 'Problema server buscando'
            })
            break;
    }
}

module.exports = {
    buscar
}