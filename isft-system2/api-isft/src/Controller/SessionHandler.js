const { OwnCache } = require("../OwnCache/OwnCache");
const crypto= require("crypto");

class SessionHandler {
  constructor() {
    this.cache = new OwnCache();
  }

  compareToken(key, token) {
    let cachedToken = this.getToken(key);
    return (cachedToken === token);
  }

  generateToken(nicknameKey) {
    let token = (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16)
    );
    this.cache.setDataToCache(nicknameKey, token);
    return token;
  }

  getToken(nicknameKey) {
    return this.cache.getCachedData(nicknameKey);
  }

  getNicknameByToken(token) {
    return this.__getKeyByValue(token); 
  }

  __getKeyByValue(token) {
    const entry = [...this.cache.getCache().entries()].find(([key, val]) => val === token);
    return entry ? entry[0] : null;
  }
}

let sessionHandler = new SessionHandler();

module.exports = { sessionHandler };
