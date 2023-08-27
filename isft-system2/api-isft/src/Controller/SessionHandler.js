const crypto = require('crypto');
const setDataToCache = require('../Cache/Cache.js');
const getCachedData = require('../Cache/Cache.js');

class SessionHandler {
  compareToken(key, token) {
    let cachedToken = getCachedData(key); 
    return ( cachedToken === token );
  }

  generateToken(nickenameKey) {
    let token = (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16)
    );
    setDataToCache(nickenameKey, token);
    return token;
  }
}

module.exports = { SessionHandler };