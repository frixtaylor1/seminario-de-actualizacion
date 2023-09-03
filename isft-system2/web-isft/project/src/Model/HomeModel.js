class HomeModel {
    constructor(apiController) {
      this.apiController = apiController;
    }

    async getUserInfo(userData) {
      try {
        const result = await this.apiController.callApi('/getUserInfo', 'POST', userData);
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
  
  export { HomeModel };