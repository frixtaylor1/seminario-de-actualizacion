const { Sanitizer } = require('../Common/Sanitizer.js');
const DataBaseHandler = require('../DBHandler/DBHandler.js');

class SignInHandler {
  constructor(dataBaseHandler) {
    this.dbhandler = dataBaseHandler;
  }

  async signIn(data) {
    let results;
    let Data = { 
      'nickname': Sanitizer.sanitizeInput(data.nickname),
      'password': Sanitizer.sanitizeInput(data.password)
    };

    try {
      await this.dbhandler.connect();
      
      const storeProcedureName = 'usp_signin';
      results = await this.dbhandler.executeStoreProcedure(storeProcedureName, Data);
      results = results[0];
    } catch(error) {
      console.error('Database Error context -> SignInHanlder -> signIn', error);
      results = error;
    }
    return results;
  } 
}

module.exports = { SignInHandler };