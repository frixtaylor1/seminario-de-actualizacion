import { SessionHandler } from "./SessionHandler.js";

class ApiController {
  constructor(url) {
    this.url = url;
  }

  async callApi(endpoint, method, data) {
    const fullUrl = this.url + endpoint;

    try {
      let sessionHandler = new SessionHandler();
      const tokenAndId = sessionHandler.getTokenAndId(); 
      
      let request = {
        method: method,
        headers: {
          'Custom-Token': tokenAndId.token,
          'Id'          : tokenAndId.id,
          'Content-Type': 'application/json'
        },
        body: method !== 'GET' ? JSON.stringify(data) : undefined
      };

      const response     = await fetch(fullUrl, request);
      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { ApiController };
