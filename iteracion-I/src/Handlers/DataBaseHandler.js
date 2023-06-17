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
    this.__connection.connect((error) => {
      if (error) {
        console.error('Error connecting to DataBase!', error);
        throw error;
      }
      console.log('Conection success!');
    })
  }

  executeStoreProcedure(name, data) {
    return new Promise((resolve, reject) => {
      const queryParams = Object.values(data)
        .map((value) => `'${value}'`)
        .join(", ");
      const query = `CALL ${name}(${queryParams})`;
  
      this.__connection.query(query, (error, results, fields) => {
        if (error) {
          console.error('StoreProcedure execution failed: ', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  close() {
    this.__connection.end();
  }
};

module.exports = { DataBaseHandler };