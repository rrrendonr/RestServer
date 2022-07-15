const {request, response} = require('express');

const validarArchivoSubir = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'No hay archivos en la petición.-validar archivo subir'});
        return;
    };

    next();

}

module.exports = {
    validarArchivoSubir,
}