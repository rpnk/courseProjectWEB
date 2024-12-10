const Driver = require('../models/driverModel');

exports.getAllDrivers = async (req, res) => {
    try {
        Driver.getAllDrivers((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.render('drivers', { drivers: results });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.newDriverForm = (req, res) => {
    res.render('create-driver');
};

exports.createDriver = async (req, res) => {
    try {
        const { driver_name, license_number } = req.body;
        Driver.createDriver(driver_name, license_number, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/drivers');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.getDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        Driver.getDriverById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Driver not found' });
            }
            res.render('edit-driver', { driver: results[0] });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const { driver_name, license_number } = req.body;
        Driver.updateDriver(id, driver_name, license_number, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/drivers');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        Driver.deleteDriver(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/drivers');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};
