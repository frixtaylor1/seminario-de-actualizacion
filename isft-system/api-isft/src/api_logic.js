const { Server } = require('./Server/api_server.js');

const { callbackSignIn, callbackSignUp } = require('./SessionHandlerCallbacks.js');
const { callbackReadUserByNickname } = require('./UserHandlerCallbacks.js');

function start_api() {  
  const api = new Server();

  api.post('/signUp', callbackSignUp);
  api.post('/readUser', callbackReadUserByNickname);
  api.post('/signIn', callbackSignIn);

  api.start(3000);
}

module.exports = { start_api };