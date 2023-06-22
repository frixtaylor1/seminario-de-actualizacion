class ApiController {
  constructor(url) {
    this.url = url;
  }

  async callApi(endpoint, method, data) {
    const fullUrl = this.url + endpoint;

    let request = {
      method: method,
      body: method !== 'GET' ? JSON.stringify(data) : undefined  // No incluyas el cuerpo en una solicitud GET
    };

    try {
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