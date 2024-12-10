const Vehicle = require('../models/vehicleModel');

exports.getAllVehicles = (req, res) => {
    Vehicle.getAllVehicles((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }
        res.render('vehicles', { vehicles: results });
    });
};

exports.getVehicleById = (req, res) => {
    const { id } = req.params;
    Vehicle.getVehicleById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.render('edit-vehicle', { vehicle: results[0] });
    });
};

exports.createVehicle = (req, res) => {
    const { vehicle_number, vehicle_type } = req.body;
    Vehicle.createVehicle(vehicle_number, vehicle_type, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }
        res.redirect('/vehicles');
    });
};

exports.updateVehicle = (req, res) => {
    const { id } = req.params;
    const { vehicle_number, vehicle_type } = req.body;
    Vehicle.updateVehicle(id, vehicle_number, vehicle_type, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }
        res.redirect('/vehicles');
    });
};

exports.deleteVehicle = (req, res) => {
    const { id } = req.params;
    Vehicle.deleteVehicle(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }
        res.redirect('/vehicles');
    });
};
