const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJwt } = require("../helpers/generar-jwt");


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar que exista un usuario con el correo
        const usuario = await Usuario.findOne({ correo }); 
        
        if(!usuario){

            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //Verificar que el usuario este activo
        if( !usuario.estado ){

            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //Verificar que la contraseña sea correcta
        const validPassword = bcryptjs.compareSync( password, usuario.password);

        if( !validPassword ){

            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //Generear jwt
        const token = await generarJwt( usuario.id );

        res.json({
            token
        });
    } catch (error) {
        
    }
}

module.exports = {
    login
}