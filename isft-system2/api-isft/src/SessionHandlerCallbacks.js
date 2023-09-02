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
    let signInHanlder = new SignInHandler(new DataBaseHandler());

    let userData = {
      'nickname': requestData.nickname,
      'password': requestData.password,
    };

    (async () => {
      results = await signInHanlder.signIn(userData);

      console.log(results);

      if (results['validated'] === true) {
        message = sessionHandler.generateToken(userData.nickname);
        console.log('comparision of tokens: ' , sessionHandler.compareToken(userData.nickname, message));
        responseCallback(200, { token: message });
      } else {
        message = 'Password or Username worng!';
        responseCallback(401, { error: message });
      }

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