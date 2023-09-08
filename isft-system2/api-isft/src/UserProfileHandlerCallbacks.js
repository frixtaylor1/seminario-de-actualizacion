const { AuthorizerHandler } = require('./Controller/AuthorizerHandler.js');
const { UserHandler } = require('./Controller/UserHandler.js');
const { DataBaseHandler } = require('./DataBaseHandler/DataBaseHandler.js');

async function callbackGetUserInfo(requestData, responseCallback) {
  let results;
  try {
    let userData = {
      iduser: requestData.iduser,
    };

    let userHandler = new UserHandler(new DataBaseHandler());
    results = await userHandler.readById(userData);

    console.log('RESULTS!: ', results);

    responseCallback(200, results[0]);

  } catch (error) {
    console.error('Error:', error);
    responseCallback(400, error);
  }

  return results;
}

module.exports = { callbackGetUserInfo };