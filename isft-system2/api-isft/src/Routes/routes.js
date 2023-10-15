// routes.js
const { SessionHandler }  = require('../Handler/SessionHandler.js');
const { UserHandler }     = require('../Handler/UserHandler.js');

/**
 * Asigna los endpoint y sus respectivas callbacks
 * @param Server api 
 **/
module.exports = function routes(api) {
  const sessionHandler  = new SessionHandler();
  const userHandler     = new UserHandler();

  // Login and Register...
  api.post('/signIn', sessionHandler.signIn);
  api.post('/signUp', sessionHandler.signUp);

  // getUserInfo...
  api.post('/getUserInfo', userHandler.getUserInfo);

  // getUserList...
  api.post('/getUserList', userHandler.getUserList);

  // Test goodcall api...
  api.get('/greet', greet);
};

function greet(req, resCallback) {
  resCallback(200, { 'message': 'Hello, World!' });
}
