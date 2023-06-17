const dotenv = require('dotenv');
dotenv.config();

module.exports = function DBConfig(){
  this.getEnv = () => {
    return {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    };
  }
};