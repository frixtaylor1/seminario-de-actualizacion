class OwnCache {
  constructor() {
    this.cache = new Map();
  }

  setDataToCache(key, value) {
    this.cache.set(key, value);
  };
  
  getDataByKey(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    return undefined;
  }
  
  clear() {
    this.cache.clear();
  }

  getData() {
    return this.cache;
  }
}

module.exports = { OwnCache };