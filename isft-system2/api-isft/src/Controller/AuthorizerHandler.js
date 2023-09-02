const { UserHandler }  = require('./UserHandler.js');
const { GroupHandler } = require('./GroupHandler.js');

class AuthorizerHandler {
  constructor() {
  }
  
  checkAuthorization(user, path) {
    return true;
  }
}

module.exports = { AuthorizerHandler };