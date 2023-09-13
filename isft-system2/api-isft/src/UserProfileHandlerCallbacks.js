const { UserHandler } = require('./Controller/UserHandler.js');
const { dataBaseHandler } = require('./DataBaseHandler/DataBaseHandler.js');

async function callbackGetUserInfo(requestData, responseCallback) {
  let results;
  try {
    let userData = {
      iduser: requestData.iduser,
    };

    let userHandler = new UserHandler(dataBaseHandler);
    results = await userHandler.readById(userData);

    responseCallback(200, results[0]);

  } catch (error) {
    console.error('Error:', error);
    responseCallback(400, error);
  }

  return results;
}

module.exports = { callbackGetUserInfo };