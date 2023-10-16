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

  /**
   * @APIDOC `/askForProposal`
   * 
   * @brief Pregunta por proposiciones de chat para un usuario...
   *
   * @method HTTP:POST
   * 
   * @param {JSON} requestData | contains { userOriginId }
   * @param {Callable} responseCallback
   * 
   * @return void
   */
  askForProposal(requestData, responseCallback) {
    let proposals = new Array();

    const userOriginId = requestData.originUserId;

    let idx = 0;
    proposalHandler.listOfProposal.forEach(proposal => {
      if (proposal['targetIdUser'] == userOriginId) {
        proposals.push(idx);
      }
      idx++;
    });
    
    console.log('RESULTS >>>', );
    responseCallback(200, {'proposals': proposals});
  }
};

module.exports = { ChatHandler };