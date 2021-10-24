
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

module.exports = main;

// const mysql = require('mysql2/promise');

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "12345678",
//     database: "employee_db"
// });

// connection.connect(function (err) {
//     if (err) throw err;
// });

// module.exports = connection;