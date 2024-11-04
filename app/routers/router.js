const express = require("express");
const router = express.Router();
const huespedController = require("../controllers/huesped.controller.js");

// Crear un nuevo huésped
router.post("/api/huespedes/create", huespedController.create);

// Obtener un huésped por ID
router.get("/api/huespedes/onebyid/:id", huespedController.getHuespedById);

// Actualizar un huésped por ID
router.put("/api/huespedes/update/:id", huespedController.updateById);

// Eliminar un huésped por ID
router.delete("/api/huespedes/delete/:id", huespedController.deleteById);

module.exports = router;

