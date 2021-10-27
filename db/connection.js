const mysql = require('mysql2');
const util = require('util');


let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "employee_db"
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
    if (err) throw err;
});


module.exports = connection;