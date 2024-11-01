const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true }

    // const usuarios = await Usuario.find( query )
    //     .skip( Number(desde) )
    //     .limit( Number(limite) );

    // const total = await Usuario.count( query );

    //Este codigo es muy util para mejorar el tiempo que se tardan dos await, ya que lo anterior hace que se ejecute uno y luego otro
    //pero poner los dos await dentro de una promesa ejecuta los dos al mismo tiempo y cuando terminan se ejecuta lo siguiente
    const [ total, usuarios ] = await Promise.all([
        Usuario.count( query ),
        Usuario.find( query )
        .skip( Number(desde) )
        .limit( Number(limite) )
    ]);

    res.json({
        total,
        totalGet: usuarios.length, 
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol} = req.body;
    const usuario = Usuario({ nombre, correo, password, rol});

    //Encriptacion de la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    await usuario.save();

    res.json({
        msg: 'POST - API Controller',
        usuario
    });
};

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //Encriptar contraseña actualizada
    if( password ) {

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT - API Controller',
        usuario
    });
};

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params

    //Eliminar de la base de datos realmente
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Elimnar usuario solo actualizando el estado
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} );

    res.json(usuario);
};

module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}