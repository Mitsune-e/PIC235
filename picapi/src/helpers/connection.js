const mysql = require('promise-mysql'); //mysql lib

class Connection {
  static async Connect() {

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    })

    return connection;
  }

  static Disconnect(connection) {
    connection.end();
  }

  static async Query(connection, queryString) {
    const results = await connection.query(queryString);

    return results;
  }
}

module.exports = {
  Connection
}
