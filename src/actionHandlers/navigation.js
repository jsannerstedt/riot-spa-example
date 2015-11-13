'use strict';

const actions = require('../actions');

module.exports = {
    navigate: function (payload) {
        if(typeof history !== 'undefined'){
            history.pushState(null, null, '#' + payload);
        }
        actions.routeChange(payload);
    }
};

//function getQueryString(queryObj) {
//    var params = [];
//
//    for (var key in queryObj) {
//        if (queryObj.hasOwnProperty(key)) {
//            params.push(key + '=' + encodeURIComponent(queryObj[key]));
//        }
//    }
//    return '?' + params.join('&');
//}
//
//function getObjectFromQueryString(url) {
//    var query = url.split('?')[1];
//    if(!query){
//        return {};
//    }
//    var keyValues = query.split('&');
//    var result = {};
//
//    keyValues.forEach(keyValue => {
//        var pair = keyValue.split('=');
//        result[pair[0]] = pair[1];
//    });
//    return result;
//}
//
//
//
//function trimLeadingSlash(url) {
//    if(url[0] === '/'){
//        return url.slice(1);
//    }
//    return url;
//}