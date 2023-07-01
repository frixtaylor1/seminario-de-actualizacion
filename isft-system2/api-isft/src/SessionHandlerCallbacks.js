const     { UserHandler } = require('./Controller/UserHandler.js');
const   { SignInHandler } = require('./Controller/SignInHandler.js');
const  { SessionHandler } = require('./Controller/SessionHandler.js');
const { DataBaseHandler } = require('./DataBaseHandler/DataBaseHandler.js');

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

function callbackRegister(requestData, responseCallback) {
  try {
    let results;
    let userHandler = new UserHandler(new DataBaseHandler((dbConfig())));

    let userData = {
      'nickname'  : requestData.nickname,
      'password'  : requestData.password,
      'name'      : requestData.name,
      'surname'   : requestData.surname,
      'dni'       : requestData.dni,
      'gender'    : requestData.gender,
      'telephone' : requestData.telephone,
    };

    (async () => {
      results = await userHandler.create(userData);
      responseCallback(200, results);
    })();
  } catch (error) {
    results = error;
    responseCallback(200, results);
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

module.exports = {
  callbackRegister,
  callbackSignIn
};