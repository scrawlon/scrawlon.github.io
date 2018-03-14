
function setCache(key, jsonData, cacheTime) {
  if (typeof (Storage) === "undefined") { return false; }

  let record = {
    value: JSON.stringify(jsonData),
    timestamp: new Date().getTime() + cacheTime
  };

  /*console.log('load live data');*/
  localStorage.setItem(key, JSON.stringify(record));
}

function getCache(key) {
  if (typeof (Storage) === "undefined") { return false; }

  let cachedRecord = localStorage.getItem(key);
  let record = cachedRecord && JSON.parse(localStorage.getItem(key));

  /*console.log('load cached data');*/
  return (record && new Date().getTime() < record.timestamp && JSON.parse(record.value));
}

module.exports = {
  set: setCache,
  get: getCache
}
