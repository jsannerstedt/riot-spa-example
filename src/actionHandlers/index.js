'use strict';

module.exports = createMap([
    require('./navigation')
]);

// only one action handler per action atm
function createMap(array) {
    return array.reduce((previous, actionHandlers) => {
        return Object.keys(actionHandlers).reduce((map, key) => {
            map[key] = actionHandlers[key];
            return map;
        }, previous);
    }, {});
}