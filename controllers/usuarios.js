const { response, request } = require('express');
const { param } = require('../routes/usuarios');

const usuariosGet = (req = request, res = response) => {

    const query = req.query

    res.json({
        msg: 'GET - API Controller',
        query
    });
}

const usuariosPost = (req, res = response) => {

    const { usuario } = req.body;

    res.json({
        msg: 'POST - API Controller',
        usuario
    });
};

const usuariosPut = (req, res = response) => {

    const params = req.params

    res.json({
        msg: 'PUT - API Controller',
        id: params.id
    });
};

const usuariosDelete = (req, res = response) => {

    const params = req.params

    res.json({
        msg: 'DELETE - API Controller',
        id: params.id
    });
};

module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}