'use strict';

module.exports = {
    get: key => {
        var val;
        if(typeof localStorage === 'undefined') {
            return {};
        }
        val = localStorage[key];
        return val ? JSON.parse(val) : {};
    },
    set: (key, value) => {
        if(typeof localStorage === 'undefined'){
            return;
        }
        localStorage[key] = JSON.stringify(value);
    }
};