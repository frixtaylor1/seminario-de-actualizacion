const { Sanitizer } = require('../Common/Sanitizer.js');

class SignInHandler {
  constructor(dataBaseHandler) {
    this.dbhandler = dataBaseHandler;
  }

  async signIn(data) {
    let result;

    try {
      await this.dbhandler.connect();
      
      const storeProcedureName = 'usp_signin';
      const inputData = {
        p_nickname: Sanitizer.sanitizeInput(data.nickname),
        p_password: Sanitizer.sanitizeInput(data.password),
      };
      result = await this.dbhandler.executeStoreProcedure(storeProcedureName, inputData);

      console.log(result);
      
      if(result[0][0]['count(*)']) {
        return { 'validated': true };
      } else {
        return { 'validated': false };
      }

    } catch(error) {
      console.error('Database Error context -> SignInHanlder -> signIn', error);
      return error;
    }
  }
}

module.exports = { SignInHandler };