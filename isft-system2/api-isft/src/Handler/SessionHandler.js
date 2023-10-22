const { dataBaseHandler } = require('../DataBaseHandler/DataBaseHandler.js');
const { SessionService }  = require('../Service/SessionService.js');
const { tokenHandler }    = require('./TokenHandler.js');
const { UserHandler }     = require('./UserHandler.js');
const { Sanitizer }       = require('../Common/Sanitizer.js');

class SessionHandler {
  constructor(dbHandler = dataBaseHandler) {
    this.dbHandler = dbHandler;
  }

  /**
   * @APIDOC `/signIn`
   *
   * @brief Inicia session de usuario cuando se llama al endpoint `/signIn`
   * 
   * @method HTTP:POST
   * 
   * @param {JSON} requestData | contains {
   *    nickname,
   *    password
   * } 
   * @param {Callable} responseCallback
   * 
   * @returns void
   **/
  async signIn(requestData, responseCallback) {
    let results;
    let message;

    let userData = {
      'nickname': Sanitizer.sanitizeInput(requestData.nickname),
      'password': Sanitizer.sanitizeInput(requestData.password),
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
   * @APIDOC `/signUp`
   * 
   * @brief Crea una cuenta de usuario cuando se llama al endpoint `/signUp`
   * 
   * @method HTTP:POST
   *
   * @param {JSON} requestData | contains {
   *    nickname, 
   *    password, 
   *    name,
   *    surname, 
   *    dni, 
   *    gender, 
   *    telephone
   *  }
   * @param {Callable} responseCallback
   * 
   * @returns void
   **/
  async signUp(requestData, responseCallback) {

    let results;
    let userHandler = new UserHandler();
  
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

  /**
   * @APIDOC `/logOut`
   * 
   * @brief Cierra la sesion `/logOut`
   * 
   * @method HTTP:POST
   *
   * @param {JSON} requestData | contains { iduser }
   * @param {Callable} responseCallback
   * 
   * @returns {JSON}
   **/
  async logOut(requestData, responseCallback) {

    let results;

    let userData = {
      'iduser': Sanitizer.sanitizeInput(requestData.iduser),
    };
    const sessionService = new SessionService();

    tokenHandler.removeToken(userData.iduser);
    results = await sessionService.logOut(userData);

    if (results.status) {
      responseCallback(results.status, { message: results.message });
    } else {
      responseCallback(results.status, { error: results.error });
    }
  }
}

module.exports = { SessionHandler };