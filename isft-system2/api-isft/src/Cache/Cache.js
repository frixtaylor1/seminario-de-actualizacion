const cache = new Map();

module.exports = function setDataToCache(key, value) {
  cache.set(key, value);
};

module.exports = function getCachedData(key) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  return undefined;
};