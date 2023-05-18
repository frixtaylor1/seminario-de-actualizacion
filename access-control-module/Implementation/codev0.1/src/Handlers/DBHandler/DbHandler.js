require('dotenv').config();
const mysql = require('mysql');

class DataBaseHandler {
    constructor() {
        this.Connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }
    connect() {
        this.Connection.connect((error) => {
            if(error) {
                console.error('Error connecting to DataBase!', error);
                throw error;
            }
            console.log('Conection success!');
        })
    }
    query(statement) {
        this.Connection.query(statement, (error, results, fileds) => {
            if(error) {
                console.error('Query failed: ', error);
            }
            console.log('Results: ', results);
        });
    }
    close() {
        this.Connection.end();
    }
};

dbHandler = new DataBaseHandler();
dbHandler.connect();
dbHandler.query("SELECT * FROM user_data");
dbHandler.close();