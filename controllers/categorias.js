const { response, request } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    //const categorias = await Categoria.find();

    const [ total, categorias] = await Promise.all([
        Categoria.count(),
        Categoria.find(query).skip( Number(desde) ).limit( Number(limite) ).populate('usuario')
    ]);

    res.json({
        total,
        totalGet: categorias.length,
        categorias
    });
};

const obtenerCategoria = async( req = request, res = response) => {

    const id = req.params.id;

    const categoria = await Categoria.findById(id).populate('usuario');

    res.json(categoria);
};

const crearCategorias = async( req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    //Buscando que la categoria exista
    const categoriaDB = await Categoria.findOne({ nombre });
    
    //Validando si existe una categoria con el mismo nombre
    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    };

    //Agregando el usuario que creo esta categroai
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    //Crear modlo de categoria
    const categoria = new Categoria(data);

    //Enviar y registrar en la base de datos
    await categoria.save();

    res.status(201).json(categoria);
};

const actualizarCategoria = async( req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true });

    res.json( categoria );
};

const borrarCategoria = async(req, res) => {
    
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json( categoriaBorrada );
};

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategorias,
    actualizarCategoria,
    borrarCategoria
};