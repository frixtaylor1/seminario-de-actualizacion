import { ApiController } from "../Controller/ApiCallController.js";
import { Crypto }        from "../Controller/Crypto.js";

class ChatModel {
  constructor(apiController = new ApiController('http://127.0.0.1:3036')) {
    this.apiController = apiController;
  }

  async getUserList(callback = null) {
    try {
      const result = await this.apiController.callApi('/getUserList', 'POST');
      if (callback) {
        callback(null, result);
      }

      if (result.data) {
        return result.data[0];
      }

    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }

  async sendMessage(messageData) {
    let crypto = new Crypto();

    let result = await this.apiController.callApi('/sendMessage', 'POST', messageData);

    console.log(result);
  }

  async propose(targetUserId, callback = null) {
    let data = {
      originUserId: parseInt(localStorage.getItem('iduser')),
      targetUserId: targetUserId,
    };

    try {
      const result = await this.apiController.callApi('/propose', 'POST', data);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }
  
  async getProposals(callback = null) {
    let data = {
      originUserId: localStorage.getItem('iduser'),
    };

    try {
      const result = await this.apiController.callApi('/askForProposal', 'POST', data);

      if (callback) {
        callback(null, result);
      }

      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }

  async askForMessage(chatId) {
    let data = {
      'chatId': chatId,
    };

    try {
      const result = await this.apiController.callApi('/askForMessage', 'POST', data);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }

  async confirmProposal(proposalId) {
    let data = {
      'proposalId': proposalId,
    };

    try {
      const result = await this.apiController.callApi('/confirmProposal', 'POST', data);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }

  async declineProposal(proposalId) {
    let data = {
      'proposalId': proposalId,
    };

    try {
      const result = await this.apiController.callApi('/declineProposal', 'POST', data);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }
}

export { ChatModel };