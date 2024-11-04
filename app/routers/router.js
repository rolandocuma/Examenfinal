
let express = require('express');
let router = express.Router();

 //constasntes de rutas 
const huespedes = require('../controllers/huesped.controller.js');


router.post('/api/huespedes/create', huespedes.create);
router.get('/api/huespedes/all', huespedes.retrieveAllHuespedes);
router.get('/api/huespedes/onebyid/:id', huespedes.getHuespedById);
router.put('/api/huespedes/update/:id', huespedes.updateById);
router.delete('/api/huespedes/delete/:id', huespedes.deleteById);




module.exports = router;
