const { request, response } = require("express")
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario");


const validarJWT = async(req = request, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ){

        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        const usuario = await Usuario.findById( uid );

        if( !usuario ){

            return res.status(401).json({
                msg: 'Token inválido - usuario no existe BD'
            });
        }


        //Verificar que el usuario este activo
        if( !usuario.estado ){
             
            return res.status(401).json({
                msg: 'Token no válido - usuario estado: false'
            });
        }

        req.usuario = usuario;

        next();
        
    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}


module.exports = {
    validarJWT
}