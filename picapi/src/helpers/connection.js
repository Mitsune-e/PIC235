import mysql, { Connection, createConnection } from 'promise-mysql'; //mysql lib

export class Connection {
  static Connect() {

    const connection = yield mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: procress.env.DB_PASS,
      database: procress.env.DB_NAME,
      port: procress.env.DB_PORT
    })

    return connection;

  }

  static Disconnect() {

  }

}


