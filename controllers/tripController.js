const Trip = require('../models/tripModel');
const Vehicle = require('../models/vehicleModel');
const Driver = require('../models/driverModel');
const moment = require('moment');

exports.getAllTrips = async (req, res) => {
    try {
        Trip.getAllTrips((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            // Форматування дати
            results.forEach(trip => {
                trip.trip_date = moment(trip.trip_date).format('YYYY-MM-DD');
            });
            res.render('trips', { trips: results });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.newTripForm = async (req, res) => {
    try {
        Vehicle.getAllVehicles((err, vehicles) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            Driver.getAllDrivers((err, drivers) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error', details: err.message });
                }
                res.render('create-trip', { vehicles: vehicles, drivers: drivers });
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.createTrip = async (req, res) => {
    try {
        const { vehicle_id, driver_id, trip_date, departure, destination } = req.body;
        Trip.createTrip(vehicle_id, driver_id, trip_date, departure, destination, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/trips');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.getTripById = async (req, res) => {
    try {
        const { id } = req.params;
        Trip.getTripById(id, (err, tripResults) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            if (tripResults.length === 0) {
                return res.status(404).json({ error: 'Trip not found' });
            }
            Vehicle.getAllVehicles((err, vehicles) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error', details: err.message });
                }
                Driver.getAllDrivers((err, drivers) => {
                    if (err) {
                        return res.status(500).json({ error: 'Internal server error', details: err.message });
                    }
                    const trip = tripResults[0];
                    trip.trip_date = moment(trip.trip_date).format('YYYY-MM-DD');
                    res.render('edit-trip', { trip: trip, vehicles: vehicles, drivers: drivers });
                });
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.updateTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const { vehicle_id, driver_id, trip_date, departure, destination } = req.body;
        Trip.updateTrip(id, vehicle_id, driver_id, trip_date, departure, destination, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/trips');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;
        Trip.deleteTrip(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/trips');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};
