const { isType }          = require("../Common/TypeValidate.js");
const { Sanitizer }       = require("../Common/Sanitizer.js");
const { UserService }     = require("../Service/UserService.js");
const { dataBaseHandler } = require("../DataBaseHandler/DataBaseHandler.js");

class UserHandler {
  constructor(dbHandler = dataBaseHandler) {
    this.dbHandler    = dbHandler;
  }

  async create(data) {
    let results;
    let Data = {
      'nickname'  : Sanitizer.sanitizeInput(data.nickname),
      'password'  : Sanitizer.sanitizeInput(data.password),
      'name'      : Sanitizer.sanitizeInput(data.name),
      'surname'   : Sanitizer.sanitizeInput(data.surname),
      'dni'       : Sanitizer.sanitizeInput(data.dni),
      'gender'    : Sanitizer.sanitizeInput(data.gender),
      'telephone' : Sanitizer.sanitizeInput(data.telephone),
    };

    if (this.__validateUserDataCreate(Data)) {
      try {
        await this.dbHandler.connect();

        const storeProcedureName = 'usp_create_user';
        results = await this.dbHandler.executeStoreProcedure(storeProcedureName, Data);

        await this.dbHandler.close();
      } catch (error) {
        console.error('Database Error context -> UserHandler -> create', error);
        results = error;
      }
    } else {
      results = new Error('Fields are null or empty in create');
    }

    return results;
  }

  async readUserByNickname(data) {
    let results;
    let Data = {
      'nickname': Sanitizer.sanitizeInput(data.nickname),
    };

    try {
      await this.dbHandler.connect();

      const storeProcedureName = 'usp_read_user_by_nickname';
      results = await this.dbHandler.executeStoreProcedure(storeProcedureName, Data);

    } catch (error) {
      console.error('Database Error context -> UserHandler -> readUserByNickname', error);
      results = error;
    } finally {
      await this.dbHandler.close();
    }
    return results;
  }

  /**
   * @APIDOC `/getUserInfo` 
   *
   * @brief Obtiene la informacion de usuario cuando se realiza la llamada al endpoint 
   * 
   * @method HTTP:POST
   *
   * @param {json} requestData          | contains iduser
   * @param {callable} responseCallback | a callback para el response.
   * 
   * @return json
   **/
  async getUserInfo(requestData, responseCallback) {
    let results = {};

    let data = {
      iduser: requestData.iduser,
    };

    const userService = new UserService();

    results = await userService.getUserInfo(data)
    responseCallback(results.status, results.results);
    
    return results;
  }

  /**
   * @APIDOC `/getUserList`
   * 
   * @brief Obtiene la informacion de usuario cuando se realiza la llamada al endpoint
   * 
   * @method HTTP:POST
   * 
   * @param {json} requestData          | contains iduser
   * @param {callable} responseCallback | a callback para el response.
   * 
   * @return json
   **/
  async getUserList(requestData, responseCallback) {
    let results = {};

    const userService = new UserService();

    results = await userService.getUserList();
    responseCallback(results.status, results.results);

    return results;
  }

  __validateUserDataCreate(data) {
    return Object.values(data).every(element => isType(element, 'string') && element !== "");
  }
}

module.exports = { UserHandler };