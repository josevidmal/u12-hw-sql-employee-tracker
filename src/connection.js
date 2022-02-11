require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
    },
    console.log('Connected to the hr_db database.')
);

connection.connect((err) => {
    if (err) {
        throw err;
    }
})

module.exports = connection;