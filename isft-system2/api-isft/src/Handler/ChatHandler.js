const { dataBaseHandler } = require('../DataBaseHandler/DataBaseHandler.js');
const { proposalHandler } = require('./ProposaHandler.js');
const { Sanitizer }       = require('../Common/Sanitizer.js');
const { chatStorage }     = require('./ChatStorage.js');
const crypto              = require("crypto");

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

    const uuid = crypto.randomUUID();

    const proposal = proposalHandler.addAProposal(userOriginId, userTargetId, uuid);

    responseCallback(200, { message: 'Proposal Sended!', proposalData: proposal });
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
      if (proposal && proposal['targetIdUser'] == userOriginId) {
        proposals.push(proposal);
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
        'originId': requestData.originId,
        'targetId': requestData.targetId,
        'body'    : requestData.body,
        'state'   : requestData.state,
      };

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

    responseCallback(200, chatMessages);
  }

  /**
   * @APIDOC `/confirmProposal`
   * 
   * @brief Pregunta por proposiciones de chat para un usuario...
   *
   * @method HTTP:POST
   * 
   * @param {JSON} requestData | contains { userOriginId, idProposal }
   * @param {Callable} responseCallback
   * 
   * @return void
   */
  async confirmProposal(requestData, responseCallback) {
    proposalHandler.removeProposal(requestData.proposalId);

    responseCallback(200, { message: 'proposalData removed!' });
  }

  /**
   * @APIDOC `/askForMessage`
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
  askForMessage(requestData, responseCallback) {
    if (chatStorage.storage.get(requestData.chatId) === undefined) {
      return ;
    }

    let lastMessage = (chatStorage.storage.get(requestData.chatId)).slice(-1)[0];
  

    if (lastMessage.originId === requestData.iduser || lastMessage.state.name === 'received') {
      responseCallback(200, {});
      return ;
    } else {    
      
      const actualDate = new Date();
      const formatedDate = actualDate.toLocaleString('es-ES', { 
        year: 'numeric', month  : '2-digit', day    : '2-digit', 
        hour: '2-digit', minute : '2-digit', second : '2-digit' 
      });
  
      (chatStorage.storage.get(requestData.chatId)).slice(-1)[0].state.name = 'received';
      (chatStorage.storage.get(requestData.chatId)).slice(-1)[0].state.time = formatedDate;
  
      responseCallback(200, lastMessage);
    }
  }
};

module.exports = { ChatHandler };