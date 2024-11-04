const db = require('../config/db.config.js');
const Huesped = db.Huesped;

exports.create = (req, res) => {
    let huesped = {};

    try {
        huesped.nombre = req.body.nombre;
        huesped.apellido = req.body.apellido;
        huesped.documento_identidad = req.body.documento_identidad;
        huesped.telefono = req.body.telefono;
        huesped.correo_electronico = req.body.correo_electronico;
        huesped.habitacion = req.body.habitacion;

        Huesped.create(huesped).then(result => {    
            res.status(200).json({
                message: "Upload Successfully a Huesped with id = " + result.id_huesped,
                huesped: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllHuespedes = (req, res) => {
    Huesped.findAll()
        .then(huespedes => {
            res.status(200).json({
                message: "Get all Huespedes' Infos Successfully!",
                huespedes: huespedes
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getHuespedById = (req, res) => {
    let huespedId = req.params.id;
    Huesped.findByPk(huespedId)
        .then(huesped => {
            res.status(200).json({
                message: "Successfully Get a Huesped with id = " + huespedId,
                huesped: huesped
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}




exports.updateById = async (req, res) => {
    try {
        let huespedId = req.params.id;
        let huesped = await Huesped.findByPk(huespedId);

        if (!huesped) {
            res.status(404).json({
                message: "Not Found for updating a Huesped with id = " + huespedId,
                huesped: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                documento_identidad: req.body.documento_identidad,
                telefono: req.body.telefono,
                correo_electronico: req.body.correo_electronico,
                habitacion: req.body.habitacion
            };
            let result = await Huesped.update(updatedObject, { returning: true, where: { id_huesped: huespedId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Huesped with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Huesped with id = " + huespedId,
                huesped: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a Huesped with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let huespedId = req.params.id;
        let huesped = await Huesped.findByPk(huespedId);

        if (!huesped) {
            res.status(404).json({
                message: "Does Not exist a Huesped with id = " + huespedId,
                error: "404",
            });
        } else {
            await huesped.destroy();
            res.status(200).json({
                message: "Delete Successfully a Huesped with id = " + huespedId,
                huesped: huesped,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Huesped with id = " + req.params.id,
            error: error.message,
        });
    }
}
