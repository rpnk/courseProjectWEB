const db = require('./db');

const getAllVehicles = (callback) => {
    const query = 'SELECT * FROM Vehicles';
    db.query(query, callback);
};

const getVehicleById = (vehicleId, callback) => {
    const query = 'SELECT * FROM Vehicles WHERE vehicle_id = ?';
    db.query(query, [vehicleId], callback);
};

const createVehicle = (vehicle_number, vehicle_type, callback) => {
    const query = 'INSERT INTO Vehicles (vehicle_number, vehicle_type) VALUES (?, ?)';
    db.query(query, [vehicle_number, vehicle_type], callback);
};

const updateVehicle = (vehicleId, vehicle_number, vehicle_type, callback) => {
    const query = 'UPDATE Vehicles SET vehicle_number = ?, vehicle_type = ? WHERE vehicle_id = ?';
    db.query(query, [vehicle_number, vehicle_type, vehicleId], callback);
};

const deleteVehicle = (vehicleId, callback) => {
    const query = 'DELETE FROM Vehicles WHERE vehicle_id = ?';
    db.query(query, [vehicleId], callback);
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};
