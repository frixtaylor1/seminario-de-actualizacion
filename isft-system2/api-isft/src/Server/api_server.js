const http = require('http');

const { AuthorizerHandler } = require('../Controller/AuthorizerHandler.js');
const { DataBaseHandler }   = require('../DataBaseHandler/DataBaseHandler.js');
const { sessionHandler }    = require('../Controller/SessionHandler.js');

class Server {
  constructor() {
    this.routes = {};
    this.headers = {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'content-type, custom-token, iduser',
      'Content-Type'                : 'application/json'
    };
  }

  get(path, handler) {
    this.routes['GET ' + path] = handler;
  }

  post(path, handler) {
    this.routes['POST ' + path] = handler;
  }

  handleRequest(req, res) {
    const method      = req.method;
    const url         = req.url;
    const customToken = req.headers['custom-token'];
    const key         = method + ' ' + url;

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
        const authorizerHandler = new AuthorizerHandler(new DataBaseHandler());
        const authorizationReqData = {
          iduser: req.headers['iduser'],
          path: url
        };

        console.log('IDUSER FOR AUTHORIZER: ', authorizationReqData);

        authorizerHandler.checkUserAuthorization(authorizationReqData).then(response => {
          const authorized = response.authorized;
          if (authorized) {
            this.handleCallable(req, res, handler);
          } else {
            this.sendResponse(res, 402, { error: 'Unauthorized error!' });
          }
        }).catch(error => {
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
    req.on('data', function(chunk) {
      body += chunk.toString();
    });

    req.on('end', function() {
      try {
        const requestData = body ? JSON.parse(body) : {};
        handler(requestData, function(statusCode, responseData) {
          this.sendResponse(res, statusCode, responseData);
        }.bind(this));
      } catch (error) {
        console.error('Error parsing request data:', error);
        this.sendResponse(res, 400, { error: 'Bad Request' });
      }
    }.bind(this));
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

      let id = sessionHandler.getidByToken(customToken);
      if (id && sessionHandler.compareToken(id, customToken)) {
        console.log('Authentication - Successful');
        return true;
      }

      console.log('Authentication - Failed');
      return false;
    }
  }

  start(port) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(port, function() {
      console.log('Servidor HTTP iniciado en el puerto ' + port);
    });
  }
}

module.exports = { Server };
