const { response, request } = require('express');

const {Categoria} = require('../models');

//obtener Categorias - paginado - total - populate
const obtenerCAtegorias = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {status: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(desde)
            .limit(limite)
    ])


    res.json({
        total,
        categorias
    });
}

//obtener Categoria
const obtenerCAtegoria = async (req = request, res = response) => {
    const {id} = req.params
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    })
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

//actualizar categoria
const actualizarCategoria = async(req = request, res = response) => {

    const {id} = req.params

    const {status, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoriaNueva = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json(categoriaNueva)
}

//Borrar categoria
const borrarCAtegoria = async(req = request, res = response) => {

    const {id} = req.params

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json(categoriaBorrada);
}
module.exports = {
    obtenerCAtegorias,
    obtenerCAtegoria,
    crearCategoria,
    actualizarCategoria,
    borrarCAtegoria
}