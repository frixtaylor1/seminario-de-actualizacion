const { ServerMessagesHandler } = require('./ServerMessageHandler');
const { AuthorizerHandler }     = require('../Handler/AuthorizerHandler.js');
const { dataBaseHandler }       = require('../DataBaseHandler/DataBaseHandler.js');
const { tokenHandler }          = require('../Handler/TokenHandler.js');

class ServerMessagesHandlerProxy {
  constructor(realObj = new ServerMessagesHandler()) {
    this.serverMessageHandler = realObj;
  }
  
  /**
   * @brief Settea un handler a una respectiva ruta
   * 
   * @param string path  
   * @param callable handler
   * @return void 
  **/
  setHandlerToPathPOST(path, handler) {
    this.serverMessageHandler.setHandlerToPathPOST(path, handler);
  }

  /**
   * @brief Settea un handler a una respectiva ruta
   * 
   * @param string path  
   * @param callable handler
   * @return void 
  **/
  setHandlerToPathGET(path, handler) {
    this.serverMessageHandler.setHandlerToPathGET(path, handler);
  }

  /**
   * @brief Gestiona los mensajes del Server
   * 
   * @param Request req  
   * @param ServerResponse res
   * @return void 
  **/
  handleMessages(req, res) {
    const url         = req.url;
    const customToken = req.headers['custom-token'];
    const method      = req.method;
    const key         = method + ' ' + url;

    if (method === 'OPTIONS') {
      this.serverMessageHandler.__handleOptions(res);
      return;
    }

    const handler = this.serverMessageHandler.routes[key];
    if (!handler) {
      this.serverMessageHandler.__sendResponse(res, 404, { error: 'Endpoint not found' });
      return;
    }

    if (this.__authenticateOrRegisterRequest(url, customToken)) {
      if (url !== '/signIn' && url !== '/signUp') {
        this.__authorize(req, res, handler);
        return;
      }
    }

    this.serverMessageHandler.handleMessages(req, res);
  }

  __authenticateOrRegisterRequest(url, customToken) {
    if (url === '/signIn' || url === '/register') {
      console.log('Authentication or Registration - Allowed call to /signIn; /register || without check');
      return true;
    } else {
      if (customToken === undefined) {
        console.log('Authentication - No Custom Token provided');
        return false;
      }

      let id = tokenHandler.getKeyByToken(customToken);
      if (id && tokenHandler.compareToken(id, customToken)) {
        console.log('Authentication - Success');
        return true;
      }

      console.log('Authentication - Failed : url: ', url, ' CustomToken: ', customToken);
      return false;
    }
  }

  __authorize(req, res, handler) {
    const url                   = req.url;
    const authorizerHandler     = new AuthorizerHandler(dataBaseHandler);
    const authorizationReqData  = {
      iduser: req.headers['iduser'],
      path  : url,
    };

    authorizerHandler
      .checkUserAuthorization(authorizationReqData)
      .then((response) => {
        const authorized = response.authorized;
        if (authorized) {
          /**
          * Genero un Nuevo Token...
          **/
          res.token = tokenHandler.generateToken(authorizationReqData.iduser); 
          this.serverMessageHandler.__handleCallable(req, res, handler);
        } else {
          this.serverMessageHandler.__sendResponse(res, 402, { error: 'Unauthorized error!' });
        }
      })
      .catch((error) => {
        console.error('Error checking authorization:', error);
        this.serverMessageHandler.__sendResponse(res, 500, { error: 'Internal Server Error' });
      }).finally(() => {
        (async () => { await authorizerHandler.dbHandler.close() });
      });
  }
}

module.exports = { ServerMessagesHandlerProxy };