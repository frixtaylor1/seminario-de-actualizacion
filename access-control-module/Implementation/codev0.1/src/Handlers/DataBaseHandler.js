const mysql = require('mysql');

class DataBaseHandler {
  constructor(dbconfig) {
    this.DataBaseConfiguration = dbconfig;
    this.Connection;
  }
  connect() {
    this.Connection = mysql.createConnection({
      host: this.DataBaseConfiguration.host,
      port: this.DataBaseConfiguration.port,
      user: this.DataBaseConfiguration.user,
      password: this.DataBaseConfiguration.password,
      database: this.DataBaseConfiguration.database
    });
    this.Connection.connect((error) => {
      if (error) {
        console.error('Error connecting to DataBase!', error);
        throw error;
      }
      console.log('Conection success!');
    })
  }
  query(statement, fields) {
    this.Connection.query(statement, (error, results, fields) => {
      if (error) {
        console.error('Query failed: ', error);
      }
      console.log('Results: ', results);
    });
  }
  close() {
    this.Connection.end();
  }
};

module.exports = { DataBaseHandler };