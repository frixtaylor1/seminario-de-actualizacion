const { AuthorizerHandler } = require('./Controller/AuthorizerHandler.js');
const { UserHandler } = require('./Controller/UserHandler.js');
const { DataBaseHandler } = require('./DataBaseHandler/DataBaseHandler.js');

async function callbackGetUserInfo(requestData, responseCallback) {
  let results;
  try {
    const userData = {
      iduser: parseInt(requestData.iduser),
      path: requestData.path
    };
    
    const authorizerHandler = new AuthorizerHandler(new DataBaseHandler());
    results = await authorizerHandler.checkUserAuthorization(userData);

    let parsedResult = results[0][0];
    parsedResult     = JSON.parse(parsedResult.result);

    if (parsedResult.authorized === '1') {
      let userHandler = new UserHandler(new DataBaseHandler());
      results = await userHandler.readById(userData);
      responseCallback(200, results[0]);
    } else {
      responseCallback(401, {'authorized': false, 'message': 'Unauthorized execution!'});
    }
  } catch (error) {
    console.error('Error:', error);
    responseCallback(400, error);
  }

  return results;
}

module.exports = { callbackGetUserInfo };