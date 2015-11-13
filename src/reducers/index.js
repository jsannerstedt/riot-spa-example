'use strict';

module.exports = combineReducers({
    route: require('./route')
});

function combineReducers(obj) {
    return Object.keys(obj).reduce((map, key) => {
        return Object.keys(obj[key]).reduce((reducerMap, reducerName) => {
            reducerMap[reducerName] = reducerMap[reducerName] || [];
            reducerMap[reducerName].push(obj[key][reducerName]);
            obj[key][reducerName].namespace = key;
            return reducerMap;
        }, map);
    }, {});
}