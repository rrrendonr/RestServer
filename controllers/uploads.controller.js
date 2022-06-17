const { response, request } = require("express");
const { v4: uuidv4 } = require('uuid');

const path = require('path');


const cargarArchivos = (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'No hay archivos en la petición.'});
        return;
    }

    const {archivo} = req.files;
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length -1]

   //validar Extensiones
    const extendionesValidas = ['jpg', 'png', 'jpeg', 'gif']

    if (!extendionesValidas.includes(extension)) {
        return res.status(400).json({
            msg: 'La extensión no es válida'
        })
    }

    const nombreArchivoFinal = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', nombreArchivoFinal);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({err});
        }

        res.json({msg: 'Archivo subido con éxito ' + uploadPath});
    });
}

module.exports = {
    cargarArchivos,
}