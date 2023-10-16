class UserHomeModel {
    constructor(apiController) {
      this.apiController = apiController;
    }

    async getUserInfo(userData) {
      try {
        const result = await this.apiController.callApi('/getUserInfo', 'POST', userData);
        
        console.log('result', result.data);
        
        return result.data[0];

      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
  
  export { UserHomeModel };