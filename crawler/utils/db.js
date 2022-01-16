const mysql = require('mysql2');
require('dotenv').config();
let connection = mysql.createConnection({
  host: process.env.DB_HOST, //127.0.0.1
  port: process.env.DB_PORT, //8080是apache
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
module.exports = connection;
