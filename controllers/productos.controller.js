const { response, request } = require('express');
const { Producto } = require('../models');

//obtener productos - paginado - total - populate
const obtenerProductos = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {status: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .skip(desde)
            .limit(limite)
    ])


    res.json({
        total,
        productos
    });
}

//obtener Producto
const obtenerProducto = async (req = request, res = response) => {
    const {id} = req.params
    const producto = await Producto.findById(id).populate('usuario', 'nombre');

    res.json({
        producto
    })
}

//crear producto
const crearProducto = async(req = request, res = response) => {

    const {usuario, estado, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya Existe`
        });
    }

    //generar data
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }

    const producto = await new Producto(data);

    await producto.save();

    res.json(producto)
}

//actualizar producto
const actualizarProducto = async(req = request, res = response) => {

    const {id} = req.params

    const {status, usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const productoNuevo = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(productoNuevo)
}

//Borrar Producto
const borrarProducto = async(req = request, res = response) => {

    const {id} = req.params

    const productoBorrado = await Producto.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json(productoBorrado);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}