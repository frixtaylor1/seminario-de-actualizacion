const mysql = require('mysql');
const fs = require('fs').promises;
const { parseYAML } = require('../Common/YMLParser.js');

class DataBaseHandler {
  constructor(configFilePath = './configuration/parameters.yml') {
    this.configFilePath = configFilePath;
    this.configData = null;
    this.__connection = null;
    this.connect = this.connect.bind(this);
  }

  async loadConfig() {
    try {
      const yamlString = await fs.readFile(this.configFilePath, 'utf8');
      this.configData = await parseYAML(yamlString);

    } catch (error) {
      console.error('Error loading config:', error.message);
    }
  }

  async connect() {
    if (!this.configData) {
      throw new Error('Database configuration not loaded. Call loadConfig() first.');
    }

    if (this.__connection) {
      return; // Already connected
    }

    this.__connection = mysql.createConnection({
      host: 'db',
      port: this.configData.database.db_port,
      user: this.configData.database.db_user,
      password: this.configData.database.db_password,
      database: this.configData.database.db_name,
    });

    return new Promise((resolve, reject) => {
      this.__connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async executeStoreProcedure(name, data) {
    await this.connect(); // Ensure a connection is established before executing the procedure

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

  async close() {
    return new Promise((resolve, reject) => {
      if (this.__connection) {
        this.__connection.end((error) => {
          if (error) {
            console.error('Error closing DataBase connection!', error);
            reject(error);
          } else {
            console.log('Connection closed!');
            resolve();
          }
        });
        this.__connection = null; // Reset the connection
      } else {
        console.log('No active connection to close.');
        resolve();
      }
    });
  }
}

const dataBaseHandler = new DataBaseHandler();
dataBaseHandler.loadConfig();

module.exports = { dataBaseHandler };
