const { Server }                = require('./Server/Server.js');
const { ServerMessagesHandler } = require('./Server/ServerMessageHandler.js');
const routes                    = require('./Routes/routes.js');

/**
 * `ISFT API CONTROL-ACCESS SYSTEM` 
 **/
function main() {  
  let api = new Server(new ServerMessagesHandler());
  
  routes(api);

  api.start(3000);
}

module.exports = { main };