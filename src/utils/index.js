'use strict';

module.exports = {
    guid: function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },
    forOwn: function forOwn(object, cb) {
        var i;
        if (!object) {
            return;
        }
        for (i in object) {
            if (object.hasOwnProperty(i)) {
                cb(object[i], i);
            }
        }
    },
    extend: function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift({});
        return Object.assign.apply(null, args);
    },
    trimLeadingSlash: function (url) {
        if (url[0] === '/') {
            return url.slice(1);
        }
        return url;
    }
};