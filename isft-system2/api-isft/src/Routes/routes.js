const { SessionHandler }  = require('../Handler/SessionHandler.js');
const { UserHandler }     = require('../Handler/UserHandler.js');
const { ChatHandler }     = require('../Handler/ChatHandler.js');

/**
 * @brief Asigna los endpoint y sus respectivas callbacks
 * 
 * @param {Server} api 
 **/
module.exports = function routes(api) {
  const sessionHandler  = new SessionHandler();
  const userHandler     = new UserHandler();
  const chatHandler     = new ChatHandler();

  /**
   * @APIDOC `/signIn` 
  */
  api.post('/signIn', sessionHandler.signIn);

  /**
   * @APIDOC `/signUp` 
  */
  api.post('/signUp', sessionHandler.signUp);
  
  /**
   * @APIDOC `/logOut` 
  */
  api.post('/logOut', sessionHandler.logOut);

  /**
   * @APIDOC `/getUserInfo` 
  */
  api.post('/getUserInfo', userHandler.getUserInfo);

  /**
   * @APIDOC `/getUserList` 
  */
  api.post('/getUserList', userHandler.getUserList);

  /**
   * @APIDOC `/propose` 
  */
  api.post('/propose', chatHandler.propose);

  /**
   * @APIDOC `/askForProposal` 
  */
  api.post('/askForProposal', chatHandler.askForProposal);

  /**
   * @APIDOC `/sendMessage` 
  */
  api.post('/sendMessage', chatHandler.sendMessage);
  
  /**
   * @APIDOC `/greet` 
  */
  api.get('/greet', greet);

};

function greet(req, resCallback) {
  resCallback(200, { 'message': 'Hello, World!' });
}
