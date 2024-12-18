const { response } = require("express");

const tieneRol = ( ...roles ) => {
    return (req, res = response, next) => {

        if( !req.usuario ){
            return res.status(500).json({
                msg: 'No se valido correctamente el token'
            });
        }

        if( !roles.includes( req.usuario.rol ) ){

            return res.status(401).json({
                msg: 'El servicio requiere uno de estos roles: ' + roles
            });
        }

        next();
    }
}

module.exports = {
    tieneRol
}