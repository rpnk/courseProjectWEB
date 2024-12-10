const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const checkAuth = require('../middlewares/checkAuth'); 

router.get('/', checkAuth, vehicleController.getAllVehicles);
router.get('/new', checkAuth, (req, res) => res.render('create-vehicle'));
router.post('/new', checkAuth, vehicleController.createVehicle);
router.get('/edit/:id', checkAuth, vehicleController.getVehicleById);
router.post('/edit/:id', checkAuth, vehicleController.updateVehicle);
router.post('/delete/:id', checkAuth, vehicleController.deleteVehicle);

module.exports = router;
