const { Producto } = require("../models");

const obtenerProductos = async(req, res) => {

    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    //const categorias = await Categoria.find();

    const [ total, productos] = await Promise.all([
        Producto.count(),
        Producto.find(query).skip( Number(desde) ).limit( Number(limite) ).populate('usuario').populate('categoria')
    ]);

    res.json({
        total,
        totalGet: productos.length,
        productos
    });
};

const obtenerProducto = async(req, res) => {

    const id = req.params.id;

    const producto = await Producto.findById(id).populate('usuario').populate('categoria');

    res.json(producto);
};

const crearProducto = async(req, res) => {

    const { nombre, descripcion, disponible, precio, categoria } = req.body;

    nombre = nombre.toUpperCase();

    //Buscando que la Producto exista
    const productoBD = await Producto.findOne({ nombre});
    
    //Validando si existe una categoria con el mismo nombre
    if( productoBD ){
        return res.status(400).json({
            msg: `El producto ${ productoBD.nombre }, ya existe`
        });
    };

    //Agregando el usuario que creo este producto
    const data = {
        nombre,
        descripcion,
        disponible,
        precio,
        categoria,
        usuario: req.usuario._id
    }

    //Crear modlo de categoria
    const producto = new Producto(data);

    //Enviar y registrar en la base de datos
    await producto.save();

    res.status(201).json(producto);
};

const actualizarProducto = async( req, res = response) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true });

    res.json( producto );
};

const borrarProducto = async(req, res) => {
    
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json( productoBorrado );
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}