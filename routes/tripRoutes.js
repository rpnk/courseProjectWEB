const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const checkAuth = require('../middlewares/checkAuth'); 

router.get('/', checkAuth, tripController.getAllTrips);
router.get('/new', checkAuth, tripController.newTripForm);
router.post('/new', checkAuth, tripController.createTrip);
router.get('/edit/:id', checkAuth, tripController.getTripById);
router.post('/edit/:id', checkAuth, tripController.updateTrip);
router.post('/delete/:id', checkAuth, tripController.deleteTrip);

module.exports = router;
