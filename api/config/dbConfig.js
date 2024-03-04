// Local Host - C:\kairu\School\OJT Files\ojt-api

const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',    
    database: 'ojt',
    connectionLimit: 10 // Adjust as needed
});

module.exports = pool;
