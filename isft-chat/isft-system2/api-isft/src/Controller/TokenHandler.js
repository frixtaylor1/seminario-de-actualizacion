const { OwnCache }  = require("../OwnCache/OwnCache.js");
const crypto        = require("crypto");

class TokenHandler {
  constructor() {
    this.cache = new OwnCache();
  }

  /**
   * Compara un token devolviendo true si coinciden
   *
   * @param any key
   * @param string token 
   **/
  compareToken(key, token) {
    let cachedToken = this.getToken(key);
    return (cachedToken === token);
  }
  
  /**
   * Retorna un uuid y lo almacena
   * @param numeric iduser
   * @return string
   **/
  generateToken(iduser) {
    let token = crypto.randomUUID();
    this.cache.setDataToCache(iduser, token);
    return token;
  }

  /**
   * Obtiene un token por su key
   *
   * @param any key
   * @param string token 
   **/
  getToken(key) {
    return this.cache.getDataByKey(key);
  }

  /**
   * Obtiene un key por su token
   *
   * @param string token
   * @param any key 
   **/
  getKeyByToken(token) {
    return this.__getKeyByValue(token); 
  }

  __getKeyByValue(token) {
    const entry = [...this.cache.getData().entries()].find(([key, val]) => val === token);
    return entry ? entry[0] : null;
  }
}

let tokenHandler = new TokenHandler();

module.exports = { tokenHandler };
