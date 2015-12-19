'use strict';

export default reducerCollection => {
  return Object.keys(reducerCollection).reduce((map, key) => {
    return Object.keys(reducerCollection[key]).reduce((reducerMap, reducerName) => {
      reducerMap[reducerName] = reducerMap[reducerName] || [];
      reducerMap[reducerName].push(reducerCollection[key][reducerName]);
      reducerCollection[key][reducerName].namespace = key;
      return reducerMap;
    }, map);
  }, {});
};
