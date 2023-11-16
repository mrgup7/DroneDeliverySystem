const mysql = require("mysql2/promise");
async function getConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "restaurant_supply_express",
  });
  return connection;
}

module.exports = getConnection;