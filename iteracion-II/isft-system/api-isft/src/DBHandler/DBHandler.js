const mysql = require('mysql');

class DataBaseHandler {
  constructor(dbconfig) {
    this.__connection = mysql.createConnection({
      host: dbconfig.host, 
      port: dbconfig.port,
      user: dbconfig.user,
      password: dbconfig.password,
      database: dbconfig.database
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.__connection.connect((error) => {
        if (error) {
          console.error('Error connecting to DataBase!', error);
          reject(error);
        } else {
          console.log('Connection success!');
          resolve();
        }
      });
    });
  }

  executeStoreProcedure(name, data) {
    const queryParams = Object.values(data)
      .map((value) => `'${value}'`)
      .join(", ");
    const query = `CALL ${name}(${queryParams})`;

    return new Promise((resolve, reject) => {
      this.__connection.query(query, (error, results, fields) => {
        if (error) {
          console.error('StoreProcedure execution failed: ', error);
          reject(error);
        } else {
          console.log('Results: ', results);
          resolve(results);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.__connection.end((error) => {
        if (error) {
          console.error('Error closing DataBase connection!', error);
          reject(error);
        } else {
          console.log('Connection closed!');
          resolve();
        }
      });
    });
  }
}

module.exports = { DataBaseHandler };
