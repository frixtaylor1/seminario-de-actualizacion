
class AuthorizerHandler {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }

  /**
   * @brief Chequea si un usuario tiene la autorizacion para realizar una determinada tarea
   * 
   * @param {JSON} data | contains {
   *    iduser, 
   *    path
   * }
   * @returns {JSON}
   **/
  async checkUserAuthorization(data) {
    let results = {};
    let Data = {
      'iduser': parseInt(data.iduser),
      'path'  : data.path
    };

    try {
      await this.dbHandler.connect();

      let storeProcedure = 'usp_is_user_authorized';
      results = await this.dbHandler.executeStoreProcedure(storeProcedure, Data);

      let parsedResult = results[0][0];
      parsedResult     = JSON.parse(parsedResult.result);

      if (parsedResult.authorized === '1') {
        results = { authorized: true, message: 'Authorized' };
      } else {
        results = { authorized: false, message: 'Error unauthorized!' };
      }
    } catch(error) {
      console.error('Database Error context -> GroupHandler -> checkUserAuthorization', error);
      results = error;
      
    } finally {
      await this.dbHandler.close();
    }

    return results;
  }
}

module.exports = { AuthorizerHandler };