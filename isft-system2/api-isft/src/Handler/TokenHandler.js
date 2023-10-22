const { OwnCache }  = require("../OwnCache/OwnCache.js");
const crypto        = require("crypto");

class TokenHandler {
  constructor() {
    this.cache = new OwnCache();
  }

  /**
   * @brief Compara un token devolviendo true si coinciden
   *
   * @param {any} key
   * @param {string} token
   * 
   * @returns {boolean} 
   **/
  compareToken(key, token) {
    let cachedToken = this.getToken(key);
    return (cachedToken === token);
  }
  
  /**
   * @brief Retorna un uuid y lo almacena
   * 
   * @param {numeric} iduser
   * 
   * @returns {string}
   **/
  generateToken(iduser) {
    let token = crypto.randomUUID();
    this.cache.setDataToCache(iduser, token);
    return token;
  }

  /**
   * @brief Obtiene un token por su key
   *
   * @param {any} key
   * @param {string} token 
   * 
   * @returns {string}
   **/
  getToken(key) {
    return this.cache.getDataByKey(key);
  }

  /**
   * @brief Obtiene un key por su token
   *
   * @param {string} token
   * @param {any} key 
   * 
   * @returns {any}
   **/
  getKeyByToken(token) {
    return this.__getKeyByValue(token); 
  }

  /**
   * @brief Elimina un token por su key
   *
   * @param {any} key
   *
   * @returns {void}
   *
   **/
  removeToken(idUser) {
    this.cache.cache.delete(idUser);
  }

  __getKeyByValue(token) {
    const entry = [...this.cache.getData().entries()].find(([key, val]) => val === token);
    return entry ? entry[0] : null;
  }
}

let tokenHandler = new TokenHandler();

module.exports = { tokenHandler };
