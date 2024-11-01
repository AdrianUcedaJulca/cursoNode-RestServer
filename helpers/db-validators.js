const mongoose = require('mongoose');
const { Usuario, Categoria, Producto } = require('../models');
const Role = require('../models/rol');

const IsValidRol = async( rol = '' ) => {

    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

//Validacion del correo
const IsValidEmail = async( correo = '' ) => {

    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error("Ese correo ya está registrado");
    }
}

//Validar id de usuario
const ExistsIdUsuario = async( id ) => {

    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error("No existe un usuario registrado con ese id");
    }
}

//Validar id de usuario
const existsCategoria = async( id ) => {

    if( !mongoose.Types.ObjectId.isValid(id) ) return;

    const existeCategoria = await Categoria.findById( id );
    if( !existeCategoria ){
        throw new Error("No existe una categoria registrada con ese id");
    }
}

//Validar id de usuario
const existsProducto = async( id ) => {

    if( !mongoose.Types.ObjectId.isValid(id) ) return;

    const existeProducto = await Producto.findById( id );
    if( !existeProducto ){
        throw new Error("No existe un producto registrado con ese id");
    }
}

module.exports = {
    IsValidRol,
    IsValidEmail,
    ExistsIdUsuario,
    existsCategoria,
    existsProducto
}