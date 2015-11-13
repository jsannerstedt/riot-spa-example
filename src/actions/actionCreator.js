'use strict';

var riot = require('riot');

module.exports = function createActions(actionNames) {
    var actions = {};
    actionNames.forEach(name => {
        actions[name] = getAction(name);
    });
    return actions;
};

function getAction(name) {
    var events = {};
    var func = data => {
        console.log('action: ' + name, data);
        events.trigger('update', data);
        return data;
    };

    riot.observable(events);

    func.actionName = name;

    func.subscribe = callback => {
        events.on('update', callback);

        return () => {
            events.off('update', callback);
        };
    };

    return func;
}