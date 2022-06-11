const { Schema, model} = require('mongoose');
const Usuario = require('./usuario');

const categoriaSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        require: true
    }
})

categoriaSchema.methods.toJSON = function() {
    const {__v, ...categoria} = this.toObject();
    return categoria
}

module.exports = model('Categoria', categoriaSchema);