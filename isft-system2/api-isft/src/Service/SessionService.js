const { Sanitizer }       = require('../Common/Sanitizer.js');
const { dataBaseHandler } = require('../DataBaseHandler/DataBaseHandler.js');

class SessionService {
  constructor(dbHandler = dataBaseHandler) {
    this.dbHandler = dbHandler;
  }

  async signIn(data) {
    let result;

    try {
      await this.dbHandler.connect();

      const storeProcedureName = 'usp_signin';
      const inputData = {
        p_nickname: Sanitizer.sanitizeInput(data.nickname),
        p_password: Sanitizer.sanitizeInput(data.password),
      };
      result = await this.dbHandler.executeStoreProcedure(storeProcedureName, inputData);
      let parsedResult = result[0][0];
      
      return parsedResult;

    } catch (error) {
      console.error('Database Error context -> SessionService -> signIn', error);
      return error;

    } finally {
      await this.dbHandler.close();
    }
  }

  async logOut(data) {
    let results;

    try {
      await this.dbHandler.connect();

      results = await this.dbHandler.executeStoreProcedure('usp_logout', data);

      if (results) {
        results = { status: 200, message: 'logged-out' };
      }
      await this.dbHandler.close();
      
    } catch (error) {
      console.error(error);
      results = { status: 400, error: error };
    }
    return results;
  }
}

module.exports = { SessionService };