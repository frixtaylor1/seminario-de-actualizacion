const { Server } = require('./Server/api_server.js');

const      { callbackSignIn } = require('./SessionHandlerCallbacks.js');
const    { callbackRegister } = require('./SessionHandlerCallbacks.js');
const { callbackGetUserInfo } = require('./UserProfileHandlerCallbacks.js');

function start_api() {  
  const api = new Server();

  // Login and Register...
  api.post('/signIn',   callbackSignIn);
  api.post('/register', callbackRegister);
  
  // getUserInfo...
  api.post('/getUserInfo', callbackGetUserInfo);

  // Test goodcall api...
  api.get('/greet', greet);
  
  api.start(3000);
}

function greet(req, resCallback) {
  resCallback(200, { 'message': 'Hello, World!' });
}

module.exports = { start_api };