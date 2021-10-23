
async function main() {
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "employee_db"
    });
    return connection;
}

// connection.connect(function (err) {
//     if (err) throw err;
// });

module.exports = main;