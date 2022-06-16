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
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    })
}

const buscarCategorias = async(termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino);

    if (esMongoID) {
        const Categoria = await Categoria.findById(termino);
        return res.json({
            results: (Categoria) ? [Categoria] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({nombre: regex, estado: true});

    res.json({
        results: categorias
    })
}

const buscarProductos = async(termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino);

    if (esMongoID) {
        const productos = await Producto.findById(termino);
        return res.json({
            results: (productos) ? [productos] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({nombre: regex, estado: true});

    res.json({
        results: productos
    })
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
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
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