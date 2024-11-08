const db = require('../config/db.config.js');
const Juego = db.Juego;

// Crear un nuevo juego
exports.create = (req, res) => {
    let juego = {};
    try {
        juego.nombre_juego = req.body.nombre_juego;
        juego.genero = req.body.genero;
        juego.plataforma = req.body.plataforma;
        juego.fecha_lanzamiento = req.body.fecha_lanzamiento;
        juego.precio_alquiler = req.body.precio_alquiler;
        juego.disponibilidad = req.body.disponibilidad;
        juego.fecha_alquiler = req.body.fecha_alquiler;
        juego.nombre_cliente = req.body.nombre_cliente;
        juego.comentarios = req.body.comentarios;

        Juego.create(juego).then(result => {    
            res.status(200).json({
                message: "Juego creado exitosamente con id = " + result.id_juego,
                juego: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error al crear el juego!",
            error: error.message
        });
    }
}

// Obtener todos los juegos
exports.retrieveAllJuegos = (req, res) => {
    Juego.findAll()
        .then(juegos => {
            res.status(200).json({
                message: "Juegos obtenidos exitosamente",
                juegos: juegos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los juegos",
                error: error
            });
        });
}

// Obtener un juego por ID
exports.getJuegoById = (req, res) => {
    let juegoId = req.params.id;
    Juego.findByPk(juegoId)
        .then(juego => {
            res.status(200).json({
                message: "Juego obtenido exitosamente con id = " + juegoId,
                juego: juego
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el juego",
                error: error
            });
        });
}

// Actualizar un juego por ID
exports.updateById = (req, res) => {
    let juegoId = req.params.id;
    let updatedObject = {
        nombre_juego: req.body.nombre_juego,
        genero: req.body.genero,
        plataforma: req.body.plataforma,
        fecha_lanzamiento: req.body.fecha_lanzamiento,
        precio_alquiler: req.body.precio_alquiler,
        disponibilidad: req.body.disponibilidad,
        fecha_alquiler: req.body.fecha_alquiler,
        nombre_cliente: req.body.nombre_cliente,
        comentarios: req.body.comentarios
    };

    Juego.update(updatedObject, { where: { id_juego: juegoId } })
        .then(result => {
            res.status(200).json({
                message: "Juego actualizado exitosamente con id = " + juegoId,
                juego: updatedObject,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al actualizar el juego con id = " + req.params.id,
                error: error.message
            });
        });
}

// Eliminar un juego por ID
exports.deleteById = (req, res) => {
    let juegoId = req.params.id;

    Juego.destroy({ where: { id_juego: juegoId } })
        .then(() => {
            res.status(200).json({
                message: "Juego eliminado exitosamente con id = " + juegoId
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al eliminar el juego con id = " + req.params.id,
                error: error.message,
            });
        });
}
