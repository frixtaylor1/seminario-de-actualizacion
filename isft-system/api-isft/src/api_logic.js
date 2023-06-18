const { Server } = require('./Server/api_server.js');

const { UserHandler } = require('./Controller/UserHandler.js');
const { DataBaseHandler } = require('./DBHandler/DBHandler.js');

const dotenv = require('dotenv');
dotenv.config();

function dbConfig() {
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_PORT);
  console.log(process.env.DB_USER);
  console.log(process.env.DB_PASSWORD);
  console.log(process.env.DB_NAME);
  return {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };
}

function ResponseGreet(requestData, resopnseCallback) {
  const message = { message: 'Hello, World!' };
  resopnseCallback(200, message);
}
function CallbackCreateUser(requestData, responseCallback) {
  let userHandler = new UserHandler(new DataBaseHandler((dbConfig())));
  
  try {
    console.log((requestData));
    let userdata = {
      'nickname':   requestData.nickname,
      'password':   requestData.password,
      'name':       requestData.name,
      'surname':    requestData.surname,
      'dni':        requestData.dni,
      'gender':     requestData.gender,
      'telephone':  requestData.telephone,
    };

    (async () => {
      await userHandler.create(userdata);
      let message = { 'message': 'good call' }; 
      responseCallback(200, message);
    })();
  } catch (error) {
    console.error('Error parsing JSON:', error);
    responseCallback(400, { 'message': 'Invalid JSON' });
  }
}

function start_api() {
  const api = new Server();

  api.get('/greet', ResponseGreet);
  api.post('/createUser', CallbackCreateUser);

  api.start(3000);
}

module.exports = { start_api };