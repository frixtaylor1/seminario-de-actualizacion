const http  = require('http');

const { ServerMessagesHandlerProxy } = require('./ServerMessageHandler.js');

class Server {
  constructor(serverMessageHandler = new ServerMessagesHandlerProxy()) {
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
    this.serverMessageHandler.setHandlerToPathGET(path, handler);
  }

  post(path, handler) {
    this.serverMessageHandler.setHandlerToPathPOST(path, handler);
  }
}

module.exports = {
  Server
};