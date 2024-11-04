const db = require('../config/db.config.js');
const Huesped = db.Huesped;

exports.create = (req, res) => {
    let huesped = {};

    try {
        huesped.nombre = req.body.nombre;
        huesped.apellido = req.body.apellido;
        huesped.dpi = req.body.dpi;
        huesped.telefono = req.body.telefono;
        huesped.correo = req.body.correo;
        huesped.habitacion = req.body.habitacion;

        Huesped.create(huesped).then(result => {
            res.status(200).json({
                message: "Huésped creado exitosamente con id = " + result.id_huesped,
                huesped: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el huésped!",
            error: error.message
        });
    }
};

exports.retrieveAllHuespedes = (req, res) => {
    Huesped.findAll()
        .then(huespedInfos => {
            res.status(200).json({
                message: "¡Huéspedes obtenidos exitosamente!",
                huespedes: huespedInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los huéspedes!",
                error: error
            });
        });
};

exports.getHuespedById = (req, res) => {
    let huespedId = req.params.id;
    Huesped.findByPk(huespedId)
        .then(huesped => {
            res.status(200).json({
                message: "Huésped obtenido exitosamente con id = " + huespedId,
                huesped: huesped
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener huésped con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let huespedId = req.params.id;
        let huesped = await Huesped.findByPk(huespedId);
    
        if (!huesped) {
            res.status(404).json({
                message: "No se encontró el huésped para actualizar con id = " + huespedId,
                huesped: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dpi: req.body.dpi,
                telefono: req.body.telefono,
                correo: req.body.correo,
                habitacion: req.body.habitacion
            }
            let result = await Huesped.update(updatedObject, { returning: true, where: { id_huesped: huespedId } });
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un huésped con id = " + req.params.id,
                    error: "No se pudo actualizar el huésped",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa de un huésped con id = " + huespedId,
                huesped: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un huésped con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let huespedId = req.params.id;
        let huesped = await Huesped.findByPk(huespedId);

        if (!huesped) {
            res.status(404).json({
                message: "No existe el huésped con id = " + huespedId,
                error: "404",
            });
        } else {
            await huesped.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del huésped con id = " + huespedId,
                huesped: huesped,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un huésped con id = " + req.params.id,
            error: error.message,
        });
    }
};
