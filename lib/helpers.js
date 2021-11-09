//fiel for

let crypto = require('crypto');
let config = require('./config');
let helpers = {};

//create an SHA-256 has function
helpers.hash = function (str) {
    if (typeof (str) == 'string' && str.length > 0) {
        let hash = crypto.createHmac('sha256', config.hashSecret).update(str).digest('hex');
        return hash;
    } else { return false; }
}












modules.exports = helpers;