const { response } = require("express");
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

const { cargarArchivo } = require('../helpers');
const { Usuario, Producto } = require("../models");

const subirArchivo = async(req, res = response) => {

    try {
        // Txt
        //const nameArchivo = await cargarArchivo(req.files, [ 'txt', 'md' ], 'textos');
        // Imagenes
        const nameArchivo = await cargarArchivo(req.files, undefined, 'imgs');
        res.json({ nameArchivo });

    } catch (msg) {
        
        res.status(400).json({ msg });
    }
};

const actualizarArchivo = async(req, res) => {

    const { id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if(!modelo){
            return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':

            modelo = await Producto.findById(id);
            if(!modelo){
            return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
            break;
    }

    // Limpiar imagenes
    if( modelo.img ) {
        //Crear path
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

        if( fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        };
    }

    const nameArchivo = await cargarArchivo(req.files, undefined, coleccion);

    modelo.img = nameArchivo;

    await modelo.save();


    res.json(modelo);
};

const actualizarArchivoCloudinary = async(req, res) => {

    const { id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if(!modelo){
            return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':

            modelo = await Producto.findById(id);
            if(!modelo){
            return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
            break;
    }

    // Limpiar imagenes
    if( modelo.img ) {
        //Crear path
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[ nombreArr.length - 1];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();


    res.json(modelo);
};

const obtenerImagen = async(req, res = response) => {

    const { id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if(!modelo){
            return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':

            modelo = await Producto.findById(id);
            if(!modelo){
            return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
            break;
    }

    // Limpiar imagenes
    if( modelo.img ) {
        //Crear path
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

        if( fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        };
    }

    const pathImagen = path.join(__dirname, '../assets/Captura de pantalla 2024-11-01 150111.png');

    res.sendFile(pathImagen);
};

module.exports = {
    subirArchivo,
    actualizarArchivo,
    obtenerImagen,
    actualizarArchivoCloudinary
};

