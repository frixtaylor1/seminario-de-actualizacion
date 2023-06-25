const { Server } = require('./Server/api_server.js');

const { UserHandler } = require('./Controller/UserHandler.js');
const { DataBaseHandler } = require('./DBHandler/DBHandler.js');

const dotenv = require('dotenv');
const { SignInHandler } = require('./Controller/SignInHandler.js');
dotenv.config();

function dbConfig() {
  return {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };
}

function responseGreet(requestData, resopnseCallback) {
  const message = { message: 'Hello, World!' };
  resopnseCallback(200, message);
}

function callbackSignUp(requestData, responseCallback) {
  try {
    let userHandler = new UserHandler(new DataBaseHandler((dbConfig())));

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

function callbackSignIn(requestData, responseCallback) {
  try {
    let results;
    let signInHanlder = new SignInHandler(new DataBaseHandler((dbConfig())));

    let userData = { 
      'nickname': requestData.nickname,
      'password': requestData.password,
    };

    (async () => {
    results = await signInHanlder.signIn(userData);
    let message = results; 
    responseCallback(200, message);

    await signInHanlder.dbhandler.close();
    })();
  } catch(error) {
    results = error;
    responseCallback(200, results);
  }
}

function callbackReadUserByNickname(requestData, responseCallback) {
  try {  
    let userHandler = new UserHandler(new DataBaseHandler((dbConfig())));
    let id = { nickname: requestData.nickname };
    (async () => {
      let results = await userHandler.readUserByNickname(id);
      responseCallback(200, results[0]);
    })();
  } catch (error) {    
    responseCallback(200, { 'message': 'Invalid JSON' });
  }
}

function start_api() {  
  const api = new Server();

  api.get('/greet', responseGreet);
  api.post('/signUp', callbackSignUp);
  api.post('/readUser', callbackReadUserByNickname);
  api.post('/signIn', callbackSignIn);

  api.start(3000);
}

module.exports = { start_api };