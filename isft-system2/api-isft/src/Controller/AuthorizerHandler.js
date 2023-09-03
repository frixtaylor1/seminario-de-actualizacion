
class AuthorizerHandler {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }

  async checkUserAuthorization(data) {
    let results = {};
    let Data = {
      'iduser': data.iduser,
      'path'  : data.path
    };

    console.log(Data);

    try {
      await this.dbHandler.connect();
      let storeProcedure = 'usp_is_user_authorized';
      results = await this.dbHandler.executeStoreProcedure(storeProcedure, Data);
    
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