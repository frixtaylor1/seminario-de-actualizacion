const { dataBaseHandler } = require('../DataBaseHandler/DataBaseHandler.js');
const { proposalHandler } = require('./ProposaHandler.js');
const { Sanitizer }       = require('../Common/Sanitizer.js');
const { chatStorage }     = require('./ChatStorage.js');

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
        proposals.push({
          'idProposal'  : idx,
          'idOriginUser': proposal['originIdUser'],
          'status'      : proposal['status'], 
        });
      }
      idx++;
    });
    
    responseCallback(200, {'proposals': proposals});
  }

  /**
   * @APIDOC `/sendMessage`
   * 
   * @brief Envia un mensaje a un usuario...
   *
   * @method HTTP:POST
   * 
   * @param {JSON} requestData | contains { userOriginId, userTargetId, body, state }
   * @param {Callable} responseCallback
   * 
   * @return void
   */
  async sendMessage(requestData, responseCallback) {

    try {
      let messageData = {
        'chatid'  : requestData.chatid,
        'originId': requestData.originId,
        'targetId': requestData.targetId,
        'body'    : requestData.body,
        'state'   : requestData.state,
      }

      chatStorage.storeChatMessages(requestData.chatid, messageData);

      responseCallback(200, { 
        message     : 'Message Sended ok!', 
        messageState: 'sended',
        messageData
      });

    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @APIDOC `/getMessages`
   * 
   * @brief obtiene los mensajes de un chat a un usuario...
   *
   * @method HTTP:POST
   * 
   * @param {JSON} requestData | contains { idChat }
   * @param {Callable} responseCallback
   * 
   * @return void
   */
  getMessages(requestData, responseCallback) {
    let chatid = requestData.chatid;
    
    let chatMessages = chatStorage.getChatMessages(chatid);

    responseCallback(200, { chatMessages });
  }

  /**
   * @APIDOC `/confirmChat`
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
  async confirmChat(requestData, responseCallback) {
    let proposalData = {
      'idProposal': Sanitizer.sanitizeInput(requestData.idProposal),
    };
  }

  /**
   * @APIDOC `/askForMessages`
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
};

module.exports = { ChatHandler };