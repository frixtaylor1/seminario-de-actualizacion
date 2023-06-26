const { SignInHandler } = require('./Controller/SignInHandler.js');
const { SessionHandler } = require('./Controller/SessionHandler.js');
const { DataBaseHandler } = require('./DBHandler/DBHandler.js');

const dotenv = require('dotenv');
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

function callbackSignUp(requestData, responseCallback) {
  try {
    let userHandler = new UserHandler(new DataBaseHandler((dbConfig())));

    let userdata = {
      'nickname': requestData.nickname,
      'password': requestData.password,
      'name': requestData.name,
      'surname': requestData.surname,
      'dni': requestData.dni,
      'gender': requestData.gender,
      'telephone': requestData.telephone,
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
    let message;
    let signInHanlder = new SignInHandler(new DataBaseHandler((dbConfig())));

    let userData = {
      'nickname': requestData.nickname,
      'password': requestData.password,
    };

    (async () => {
      results = await signInHanlder.signIn(userData);

      if (results['validated']) {
        let sessionHandler = new SessionHandler();
        message = sessionHandler.token;
      }
      responseCallback(200, { token: message });

      await signInHanlder.dbhandler.close();
    })();
  } catch (error) {
    results = error;
    responseCallback(200, results);
  }
}

module.exports = { callbackSignUp };
module.exports = { callbackSignIn }; 