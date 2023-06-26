const crypto = require('crypto');

class SessionHandler {
  constructor() {
    this.token;
  
    this.generateToken();
  }

  compareToken(token) {
    return (this.token === token);
  }

  generateToken() {
    this.token = (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16)
    );
  }
}

module.exports = { SessionHandler };