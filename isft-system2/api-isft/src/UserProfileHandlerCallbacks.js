const { AuthorizerHandler } = require('./Controller/AuthorizerHandler.js');
const { DataBaseHandler } = require('./DataBaseHandler/DataBaseHandler.js');

async function callbackGetUserInfo(requestData, responseCallback) {
  try {
    const userData = {
      iduser: parseInt(requestData.iduser),
      path: requestData.path
    };

    const authorizerHandler = new AuthorizerHandler(new DataBaseHandler());
    let results = await authorizerHandler.checkUserAuthorization(userData);

    let parsedResult = results[0][0];
    parsedResult     = JSON.parse(parsedResult.result);

    if (parsedResult.authorized ==='1') {
      responseCallback(200, {'authorized': true, 'message': 'Authorized!'});
    } else {
      responseCallback(401, {'authorized': false, 'message': 'Unauthorized execution!'});
    }
  } catch (error) {
    console.error('Error:', error);
    responseCallback(400, error);
  }
}

module.exports = { callbackGetUserInfo };