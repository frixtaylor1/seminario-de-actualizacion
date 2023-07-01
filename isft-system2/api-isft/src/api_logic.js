const { Server } = require('./Server/api_server.js');

const { callbackSignIn } = require('./SessionHandlerCallbacks.js');
const { callbackRegister } = require('./SessionHandlerCallbacks.js');

function start_api() {  
  const api = new Server();

  api.post('/signIn', callbackSignIn);
  api.post('/register', callbackRegister);
  api.get('/greet', greet);
  
  api.start(3000);
}

function greet(req, resCallback) {
  resCallback(200, { 'message': 'Hello, World!' });
}

module.exports = { start_api };