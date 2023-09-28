const http  = require('http');

const { ServerMessagesHandler } = require('./ServerMessageHandler.js');

class Server {
  constructor(serverMessageHandler = new ServerMessagesHandler()) {
    this.serverMessageHandler = serverMessageHandler;
  }

  start(port) {
    const server = http.createServer((req, res) => {
      this.serverMessageHandler.handleMessages(req, res);
    });

    server.listen(port, () => {
      console.log('Servidor HTTP iniciado en el puerto ' + port);
    });
  
  }

  get(path, handler) {
    this.serverMessageHandler.routes['GET ' + path] = handler;
  }

  post(path, handler) {
    this.serverMessageHandler.routes['POST ' + path] = handler;
  }
}

module.exports = {
  Server,
  ServerMessagesHandler,
};