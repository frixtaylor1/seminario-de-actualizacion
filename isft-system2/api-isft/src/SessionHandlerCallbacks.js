const     { UserHandler } = require('./Controller/UserHandler.js');
const   { SignInHandler } = require('./Controller/SignInHandler.js');
const  { sessionHandler } = require('./Controller/SessionHandler.js');
const { DataBaseHandler } = require('./DataBaseHandler/DataBaseHandler.js');

function callbackRegister(requestData, responseCallback) {
  try {
    let results;
    let userHandler = new UserHandler(new DataBaseHandler());

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

      console.log('RESULTS CREATE USER: ', results);

      if (results) {
        responseCallback(200, { message: 'User registration successful', user: results });
      } else {
        responseCallback(403, { message: 'User registration failed' });
      }
    })();
  } catch (error) {
    responseCallback(500, { message: 'Internal server error', error: error.message });
  }
}

function callbackSignIn(requestData, responseCallback) {
  try {
    let results;
    let message;
    let signInHanlder = new SignInHandler(new DataBaseHandler());

    let userData = {
      'nickname': requestData.nickname,
      'password': requestData.password,
    };

    (async () => {
      results = await signInHanlder.signIn(userData);

      const parsedResult = JSON.parse(results.result);
      const validated = parsedResult.validated === '1';

      if (validated) {
        let generatedToken = sessionHandler.generateToken(parsedResult.iduser);
        responseCallback(200, { token: generatedToken, iduser: parsedResult.iduser });
      } else {
        message = 'Password or Username worng!';
        responseCallback(401, { error: message });
      }
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