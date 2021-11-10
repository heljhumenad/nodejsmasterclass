//fiel for

var crypto = require('crypto');
var config = require('./config')
var helpers = {};

//create an SHA-256 has function
helpers.hash = function (str) {
    if (typeof (str) == 'string' && str.length > 0) {
        var hash = crypto.createHmac('sha256', config.hashSecret).update(str).digest('hex');
        return hash;
    } else { return false; }
};

helpers.parse_json_object = function (str) {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
};

module.exports = helpers;