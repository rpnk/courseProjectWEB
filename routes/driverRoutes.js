const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const checkAuth = require('../middlewares/checkAuth'); 

router.get('/', checkAuth, driverController.getAllDrivers);
router.get('/new', checkAuth, driverController.newDriverForm);
router.post('/new', checkAuth, driverController.createDriver);
router.get('/edit/:id', checkAuth, driverController.getDriverById);
router.post('/edit/:id', checkAuth, driverController.updateDriver);
router.post('/delete/:id', checkAuth, driverController.deleteDriver);

module.exports = router;
