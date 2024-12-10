const db = require('./db');

const getAllTrips = (callback) => {
    const query = 'SELECT * FROM Trips';
    db.query(query, callback);
};

const getTripById = (tripId, callback) => {
    const query = 'SELECT * FROM Trips WHERE trip_id = ?';
    db.query(query, [tripId], callback);
};

const createTrip = (vehicle_id, driver_id, trip_date, departure, destination, callback) => {
    const query = 'INSERT INTO Trips (vehicle_id, driver_id, trip_date, departure, destination) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [vehicle_id, driver_id, trip_date, departure, destination], callback);
};

const updateTrip = (tripId, vehicle_id, driver_id, trip_date, departure, destination, callback) => {
    const query = 'UPDATE Trips SET vehicle_id = ?, driver_id = ?, trip_date = ?, departure = ?, destination = ? WHERE trip_id = ?';
    db.query(query, [vehicle_id, driver_id, trip_date, departure, destination, tripId], callback);
};

const deleteTrip = (tripId, callback) => {
    const query = 'DELETE FROM Trips WHERE trip_id = ?';
    db.query(query, [tripId], callback);
};

module.exports = {
    getAllTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip
};
