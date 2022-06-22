const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const {archivo} = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length -1]
    
       //validar Extensiones    
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es válida - ${extensionesValidas}`)
        }
    
        const nombreArchivoFinal = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta ,nombreArchivoFinal);
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
    
            resolve(nombreArchivoFinal);
        });
    });
}

module.exports = {
    subirArchivo
}