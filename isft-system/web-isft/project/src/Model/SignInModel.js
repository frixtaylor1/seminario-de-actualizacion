class SignInModel {
  constructor(apiController) {
    this.apiController = apiController;
  }

  async signIn(userData, callback) {
    try {
      const result = await this.apiController.callApi('/signIn', 'POST', userData);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }
}

export { SignInModel };