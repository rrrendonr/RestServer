const path = require('path');
const fs   = require('fs')
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

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

    //Limpiar imagenes previas
    if(modelo.img){
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo)
}

const mostrarImagen = async(req = request, res = response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe usuario con el id'
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe producto con el id'
                })
            }
        break;
    
        default:
            return res.status(500).json({msg: 'no se valido'})
    }

    //Limpiar imagenes previas
    if(modelo.img){
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImg)){
            return res.sendFile(pathImg);
        }
    }
    const pathImg = path.join(__dirname,'../assets/not-img.png')
    res.sendFile(pathImg);
}

const actualizarImagenCloudinary = async(req = request, res = response) => {
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

    //Limpiar imagenes previas
    if(modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [piblic_id] = nombre.split('.');
        cloudinary.uploader.destroy(piblic_id);
    }

    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}

module.exports = {
    actualizarImagen,
    cargarArchivos,
    mostrarImagen,
    actualizarImagenCloudinary
}