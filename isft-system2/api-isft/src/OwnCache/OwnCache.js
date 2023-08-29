class OwnCache {
  constructor() {
    this.cache = new Map();
  }

  setDataToCache(key, value) {
    this.cache.set(key, value);
  };
  
  getCachedData(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    return undefined;
  }
  
  cacheClear() {
    this.cache.clear();
  }

  getCache() {
    return this.cache;
  }
}

module.exports = { OwnCache };