const db = require('./db');

const getAllDrivers = (callback) => {
    const query = 'SELECT * FROM Drivers';
    db.query(query, callback);
};

const getDriverById = (driverId, callback) => {
    const query = 'SELECT * FROM Drivers WHERE driver_id = ?';
    db.query(query, [driverId], callback);
};

const createDriver = (driver_name, license_number, callback) => {
    const query = 'INSERT INTO Drivers (driver_name, license_number) VALUES (?, ?)';
    db.query(query, [driver_name, license_number], callback);
};

const updateDriver = (driverId, driver_name, license_number, callback) => {
    const query = 'UPDATE Drivers SET driver_name = ?, license_number = ? WHERE driver_id = ?';
    db.query(query, [driver_name, license_number, driverId], callback);
};

const deleteDriver = (driverId, callback) => {
    const deleteTripsQuery = 'DELETE FROM Trips WHERE driver_id = ?';
    db.query(deleteTripsQuery, [driverId], (err, results) => {
        if (err) {
            callback(err);
            return;
        }

        const deleteDriverQuery = 'DELETE FROM Drivers WHERE driver_id = ?';
        db.query(deleteDriverQuery, [driverId], callback);
    });
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};
