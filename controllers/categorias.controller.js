const { response, request } = require('express');

const {Categoria} = require('../models');

//obtener Categorias - paginado - total - populate
const obtenerCAtegorias = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {status: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(desde)
            .limit(limite)
            .populate('usuario'),
    ])


    res.json({
        total,
        categorias
    });
}

//Crear Categoria
const crearCategoria = async(req = request, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase();

    //verificar nombre de categoria no existe
    const categoriaDB = await Categoria.findOne({nombre});
    
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya Existe`
        });
    }

    // //Generar data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data);

    // //Guardar DB
    await categoria.save();

    // response.status(201).json(categoria);

    res.json(categoria)
}

module.exports = {
    obtenerCAtegorias,
    crearCategoria
}