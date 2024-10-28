const Role = require('../models/rol');
const Usuario = require('../models/usuario');

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

module.exports = {
    IsValidRol,
    IsValidEmail,
    ExistsIdUsuario
}