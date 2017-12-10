
function setCache(key, jsonData, cacheTime) {
  if (typeof (Storage) === "undefined") { return false; }

  var record = {
    value: JSON.stringify(jsonData),
    timestamp: new Date().getTime() + cacheTime
  };

  /*console.log('load live data');*/
  localStorage.setItem(key, JSON.stringify(record));
}

function getCache(key) {
  if (typeof (Storage) === "undefined") { return false; }

  var record = JSON.parse(localStorage.getItem(key));

  if (!record){return false;}

  /*console.log('load cached data');*/
  return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
}

module.exports = {
  set: setCache,
  get: getCache
}
