const { response, request } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");

const cargarArchivos = async(req = request, res = response) => {

    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });

    } catch (err) {
        res.status(400).json({err})
    }
}

const actualizarImagen = async(req = request, res = response) => {
    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: 'No existe usuario con el id'})
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: 'No existe producto con el id'})
            }
        break;
    
        default:
            return res.status(500).json({msg: 'no se valido'})
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo)
}

module.exports = {
    actualizarImagen,
    cargarArchivos,
}