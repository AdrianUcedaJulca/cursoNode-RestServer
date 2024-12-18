const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: { type: String},
    disponible: { type: Boolean, default: true},
    img: { type: String},
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

ProductoSchema.methods.toJSON = function() {

    const { __v, estado, ...data} = this.toObject();
    return data;
};

module.exports = model( 'Producto', ProductoSchema );