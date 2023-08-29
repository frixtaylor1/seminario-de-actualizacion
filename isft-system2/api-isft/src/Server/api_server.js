const http = require('http');
const { sessionHandler } = require('../Controller/SessionHandler.js');

class Server {
  constructor() {
    this.routes = {};
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'content-type, custom-token',
      'Content-Type': 'application/json'
    };
  }

  get(path, handler) {
    this.routes['GET ' + path] = handler;
  }

  post(path, handler) {
    this.routes['POST ' + path] = handler;
  }

  handleRequest(req, res) {
    const method = req.method;
    const url = req.url;
    const customToken = req.headers['custom-token'];
    const key = method + ' ' + url;
  
    if (method === 'OPTIONS') {
      this.handleOptions(res);
      return;
    }
    
    const handler = this.routes[key];
    if (!handler) {
      this.sendResponse(res, 404, { error: 'Endpoint not found' });
      return;
    }
  
    if (this.authenticateRequest(key, customToken)) {
      let body = '';
  
      req.on('data', function(chunk) {
        body += chunk.toString();
      });
  
      req.on('end', function() {
        const requestData = body ? JSON.parse(body) : {};
        handler(requestData, function(statusCode, responseData) {
          this.sendResponse(res, statusCode, responseData);
        }.bind(this));
      }.bind(this));
    } else {
      this.sendResponse(res, 401, { error: 'Authentication error' });
    }
  }

  handleOptions(res) {
    res.writeHead(204, this.headers);
    res.end();
  }

  sendResponse(res, statusCode, responseData) {
    res.writeHead(statusCode, this.headers);
    res.end(JSON.stringify(responseData));
  }

  authenticateRequest(method, customToken) {
    if ((method === 'POST /signIn' || method === 'POST /register')) {
      console.log('Authentication - Allowed without check');
      return true;
    } else {
      if (customToken === undefined) {
        console.log('Authentication - No Custom Token provided');
        return false;
      }
  
      let nickname = sessionHandler.getNicknameByToken(customToken);
      if (nickname && sessionHandler.compareToken(nickname, customToken)) {
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
