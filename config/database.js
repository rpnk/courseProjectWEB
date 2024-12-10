const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'CourseProject'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database!');
    
    let query = "INSERT INTO Roles (role_name) VALUES ?";
    let values = [
        ['Administrator'],
        ['User']
    ];
    connection.query(query, [values], (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

    query = "INSERT INTO Users (username, password, role_id) VALUES ?";
    values = [
        ['admin', 'adminpassword', 1],
        ['user', 'userpassword', 2]
    ];
    connection.query(query, [values], (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        connection.end();
    });
});