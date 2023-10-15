const { dataBaseHandler } = require('../DataBaseHandler/DataBaseHandler.js');
const { proposalHandler } = require('./ProposaHandler.js');

class ChatHandler {
  constructor(dbHandler = dataBaseHandler) {
    this.dbHandler = dbHandler;
  }

  /**
   * @APIDOC `/propose`
   * @brief Propone un chat con un usuario con determinado nickname...
   *
   * @method HTTP:POST
   * 
   * @param {JSON} requestData | contains {userOriginId, userTargetId }
   * @param {Callable} responseCallback
   * 
   * @return void
   */
  async propose(requestData, responseCallback) {
    const userOriginId = requestData.originUserId;
    const userTargetId = requestData.targetUserId;

    proposalHandler.addAProposal(userOriginId, userTargetId);
    responseCallback(200, { message: 'Proposal Sended!' });
  }
};

module.exports = { ChatHandler };