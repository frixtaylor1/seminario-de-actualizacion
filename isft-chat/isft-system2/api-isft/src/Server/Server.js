const http  = require('http');

const { ServerMessagesHandlerProxy } = require('./ServerMessageHandler.js');

class Server {
  constructor(serverMessageHandler = new ServerMessagesHandlerProxy()) {
    this.serverMessageHandler = serverMessageHandler;
  }

  /**
   * @brief Instancia el servidor http en un determinado puerto
   * 
   * @param numeric port  
   * @return void
   **/
  start(port) {
    const server = http.createServer((req, res) => {
      this.serverMessageHandler.handleMessages(req, res);
    });

    server.listen(port, () => {
      console.log('Servidor HTTP iniciado en el puerto ' + port);
    });
  
  }

  /**
   * @brief Establece una callback handler con un determinado path
   * 
   * @param string    port  
   * @param callable  void
   * @return void
   **/
  get(path, handler) {
    this.serverMessageHandler.setHandlerToPathGET(path, handler);
  }

  
  /**
   * @brief Establece una callback handler con un determinado path
   * 
   * @param string    port  
   * @param callable  void
   * @return void
   **/
  post(path, handler) {
    this.serverMessageHandler.setHandlerToPathPOST(path, handler);
  }
}

module.exports = {
  Server
};