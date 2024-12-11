const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql-1ae538c1-rpnk-4dc1.l.aivencloud.com',
    port: process.env.DB_PORT || 11402,
    user: process.env.DB_USER || 'avnadmin',
    password: process.env.DB_PASSWORD || 'AVNS_PMkTR92HdUD_gGsAQ1A',
    database: process.env.DB_NAME || 'defaultdb',
    ssl: {
        rejectUnauthorized: false  
    }
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err.message);
        return;
    }
    console.log('Connected to the database!');
});

module.exports = connection;
