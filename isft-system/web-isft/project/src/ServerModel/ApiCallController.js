
class ApiController {
  constructor(url) {
    this.url = url;
  }

  async callApi(endpoint, method, data) {
    const fullUrl = this.url + endpoint;
    if (method === 'GET') {
      let response = await fetch(fullUrl);
      let result = (await response.json()); 
      return result;
    } else {
      let request = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
}

export { ApiController };