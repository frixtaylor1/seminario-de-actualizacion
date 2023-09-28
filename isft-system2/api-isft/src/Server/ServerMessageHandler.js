const fs    = require('fs');

const { AuthorizerHandler } = require('../Controller/AuthorizerHandler.js');
const { dataBaseHandler }   = require('../DataBaseHandler/DataBaseHandler.js');
const { tokenHandler }      = require('../Controller/TokenHandler.js');
const { parseYAML }         = require('../Common/YMLParser.js');

class ServerMessagesHandler {
  constructor() {
    this.routes  = {};
    this.headers = {};

    this.__loadServerParameters();
  }

  handleMessages(req, res) {
    const method        = req.method;
    const url           = req.url;
    const customToken   = req.headers['custom-token'];
    const key           = method + ' ' + url;

    if (method === 'OPTIONS') {
      this.handleOptions(res);
      return;
    }

    const handler = this.routes[key];
    if (!handler) {
      this.sendResponse(res, 404, { error: 'Endpoint not found' });
      return;
    }

    if (this.authenticateOrRegisterRequest(url, customToken)) {
      if (url !== '/signIn' && url !== '/register') {
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
              this.handleCallable(req, res, handler);
            } else {
              this.sendResponse(res, 402, { error: 'Unauthorized error!' });
            }
          })
          .catch((error) => {
            console.error('Error checking authorization:', error);
            this.sendResponse(res, 500, { error: 'Internal Server Error' });
          });
      } else {
        this.handleCallable(req, res, handler);
      }
    } else {
      this.sendResponse(res, 401, { error: 'Authentication error!' });
    }
  }

  handleCallable(req, res, handler) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const requestData = body ? JSON.parse(body) : {};
        handler(requestData, (statusCode, responseData) => {
          this.sendResponse(res, statusCode, responseData);
        });
      } catch (error) {
        console.error('Error parsing request data:', error);
        this.sendResponse(res, 400, { error: 'Bad Request' });
      }
    });
  }

  handleOptions(res) {
    res.writeHead(204, this.headers);
    res.end();
  }

  sendResponse(res, statusCode, responseData) {
    res.writeHead(statusCode, this.headers);
    res.end(JSON.stringify(responseData));
  }

  authenticateOrRegisterRequest(url, customToken) {
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

      console.log('Authentication - Failed');
      return false;
    }
  }

  async __loadServerParameters() {
    try {
      const yamlContent         = fs.readFileSync('./configuration/parameters.yml', 'utf8');
      const data                = await parseYAML(yamlContent);
      const serverParametersObj = data.server;

      this.headers = {
        'Access-Control-Allow-Origin'   : serverParametersObj.allowed_origin,
        'Access-Control-Allow-Methods'  : serverParametersObj.methods,
        'Access-Control-Allow-Headers'  : serverParametersObj.headers,
        'Content-Type'                  : serverParametersObj.content_type,
      };
    } catch (error) {
      console.error('Error reading yml file server parameters:', error);
    }
  }
}

module.exports = { ServerMessagesHandler };