import { SessionHandler } from "../Controller/SessionHandler.js";

class ApiController {
  constructor(url) {
    this.url = url;
  }

  async callApi(endpoint, method, data) {
    const fullUrl = this.url + endpoint;

    try {
      // Obtener el token de la clase SessionHandler
      let sessionHandler = new SessionHandler();
      const token = sessionHandler.getToken(); 
      
      let request = {
        method: method,
        headers: {
          'Custom-Token': token,
          'Content-Type': 'application/json'
        },
        body: method !== 'GET' ? JSON.stringify(data) : undefined
      };

      const response = await fetch(fullUrl, request);
      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { ApiController };
