const { dataBaseHandler } = require('../DataBaseHandler/DataBaseHandler.js');
const { SessionService }  = require('../Service/SessionService.js');
const { tokenHandler }    = require('./TokenHandler.js');
const { UserHandler }     = require('./UserHandler.js');

class SessionHandler {
  constructor(dbHandler = dataBaseHandler) {
    this.dbHandler      = dbHandler;
  }

  /**
   * Inicia session de usuario cuando se llama al endpoint `/signIn`
   * @param json requestData | contains {
   *    nickname,
   *    password
   * } 
   * @param callable responseCallback
   **/
  async signIn(requestData, responseCallback) {
    let results;
    let message;

    let userData = {
      'nickname': requestData.nickname,
      'password': requestData.password,
    };

    const sessionService = new SessionService();
    results = await sessionService.signIn(userData);

    const parsedResult  = JSON.parse(results.result);
    const validated     = parsedResult.validated === '1';

    if (validated) {
      let generatedToken = tokenHandler.generateToken(parsedResult.iduser);
      responseCallback(200, { token: generatedToken, iduser: parsedResult.iduser });
    } else {
      message = 'Password or Username worng!';
      responseCallback(401, { error: message });
    }
  }

  /**
   * Crea una cuenta de usuario cuando se llama al endpoint `/signUp`
   * @param json requestData | contains {
   *    nickname, 
   *    password, 
   *    name,
   *    surname, 
   *    dni, 
   *    gender, 
   *    telephone
   *  }
   * @param callable responseCallback
   **/
  async signUp(requestData, responseCallback) {

    let results;
    let userHandler = new UserHandler(this.dbHandler);
  
    let userData = {
      'nickname'  : requestData.nickname,
      'password'  : requestData.password,
      'name'      : requestData.name,
      'surname'   : requestData.surname,
      'dni'       : requestData.dni,
      'gender'    : requestData.gender,
      'telephone' : requestData.telephone,
    };
  
    results = await userHandler.create(userData);
  
    if (results) {
      responseCallback(200, { message: 'User registration successful', user: results });
    } else {
      responseCallback(403, { message: 'User registration failed' });
    }
  }
}

module.exports = { SessionHandler };