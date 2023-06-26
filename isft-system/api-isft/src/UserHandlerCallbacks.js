function callbackReadUserByNickname(requestData, responseCallback) {
  try {
    let userHandler = new UserHandler(new DataBaseHandler((dbConfig())));
    let id = { nickname: requestData.nickname };
    (async () => {
      let results = await userHandler.readUserByNickname(id);
      responseCallback(200, results[0]);
    })();
  } catch (error) {
    responseCallback(200, { 'message': 'Invalid JSON' });
  }
}

module.exports = { callbackReadUserByNickname };