const { Sanitizer } = require('../Common/Sanitizer.js');

class SignInHandler {
  constructor(dataBaseHandler) {
    this.dbHandler = dataBaseHandler;
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
      console.error('Database Error context -> SignInHandler -> signIn', error);
      return error;

    } finally {
      await this.dbHandler.close();
    }
  }
}

module.exports = { SignInHandler };