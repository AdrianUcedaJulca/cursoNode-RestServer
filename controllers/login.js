const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJwt } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const usuario = require("../models/usuario");


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

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        //Crar usuario si es que no existe en la base de datos ya que se esta logeando con google
        if( !usuario ){

            const data = {
                nombre,
                correo,
                img,
                google: true,
                password: ':P',
                rol: 'USER_ROL'
            };

            usuario = new Usuario(data);
            await usuario.save();
            console.log(usuario);
        }

        //Verificar que el usuario este activo
        if( !usuario.estado ){

            return res.status(401).json({
                msg: 'Hable con el adminitrador - usuario inactivo'
            });
        }

        //Generear jwt
        const token = await generarJwt( usuario.id );

        res.json({
            usuario,
            token
        });
    } catch (error) {
        
        
    }
}

module.exports = {
    login,
    googleSignIn
}