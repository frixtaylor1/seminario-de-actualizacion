const fs = require('fs');

const { parseYAML } = require('../Common/YMLParser.js');

class ServerMessagesHandler {
  constructor() {
    this.routes  = {};
    this.headers = {};

    this.__loadServerParameters();
  }

  /**
   * @brief Gestiona los mensajes del Server
   * 
   * @param Request req  
   * @param ServerResponse res
   * @return void 
  **/
  handleMessages(req, res) {
    const method  = req.method;
    const url     = req.url;
    const key     = method + ' ' + url;

    const handler = this.routes[key];

    this.__handleCallable(req, res, handler);
  }

  /**
   * @brief Gestiona las callbacks
   * 
   * @param Request req  
   * @param ServerResponse res
   * @param callable handler
   * @return void
  **/
  __handleCallable(req, res, handler) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const requestData = body ? JSON.parse(body) : {};
        handler(requestData, (statusCode, responseData) => {
          this.__sendResponse(res, statusCode, responseData);
        });
      } catch (error) {
        console.error('Error parsing request data:', error);
        this.__sendResponse(res, 400, { error: 'Bad Request' });
      }
    });
  }

  /**
   * @brief Gestiona las options
   * 
   * @param ServerResponse res
   * @return void
  **/
  __handleOptions(res) {
    res.writeHead(204, this.headers);
    res.end();
  }

  /**
   * @brief Gestiona las respuestas
   * 
   * @param ServerResponse res
   * @param numeric statusCode
   * @param json responseData
   * @return void
  **/
  __sendResponse(res, statusCode, responseData) {
    res.writeHead(statusCode, this.headers);
    res.end(JSON.stringify(responseData));
  }

  /**
   * @brief Carga los parametros del servidor
   * @return void
  **/
  async __loadServerParameters() {
    try {
      const yamlContent = fs.readFileSync('./configuration/parameters.yml', 'utf8');
      const data = await parseYAML(yamlContent);
      const serverParametersObj = data.server;

      this.headers = {
        'Access-Control-Allow-Origin' : serverParametersObj.allowed_origin,
        'Access-Control-Allow-Methods': serverParametersObj.methods,
        'Access-Control-Allow-Headers': serverParametersObj.headers,
        'Content-Type'                : serverParametersObj.content_type,
      };
    } catch (error) {
      console.error('Error reading yml file server parameters:', error);
    }
  }
}

module.exports = { ServerMessagesHandler };