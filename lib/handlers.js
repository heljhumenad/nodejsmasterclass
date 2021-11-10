// Request Handlers
//Dependencies
var _data = require('./data');
var helpers = require('./helpers');

//define handlers
var handlers = {};

//users handlers
handlers.users = function (data, callback) {
    var available_method = ['post', 'get', 'put', 'delete'];
    if (available_method.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
};
handlers._users = {};
// !Required Data: firstname,lastname,phone,password,tosAgreement(boolean flag)
// *Optional: None
handlers._users.post = function (data, callback) {
    // !Sanity Checking and all required fields need to fill out
    var firstname = typeof (data.payload.firstname) == 'string' && data.payload.firstname.trim().length > 0 ? data.payload.firstname.trim() : false;
    var lastname = typeof (data.payload.lastname) == 'string' && data.payload.lastname.trim().length > 0 ? data.payload.lastname.trim() : false;
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement.trim().length == true ? true : false;

    if (firstname && lastname && phone && password && tosAgreement) {
        //make sure the user doesn't already exist
        _data.read('users', phone, function (err, data) {
            if (err) {
                //put logic
                // hash the password
                var hash_password = helpers.hash(password);
                var user_obj = {
                    'firstname': firstname,
                    'lastname': lastname,
                    'phone': phone,
                    'hash_password': hash_password,
                    'tosAgreement': true
                };
                if (hash_password) {
                    _data.create('users', phone, user_obj, function (err) {
                        if (!err) {
                            callback(200, { 'Success': 'Data has been saved' });
                        } else {
                            console.log(err);
                            callback(500, { 'Error': 'Could not create users' });
                        }
                    });
                } else {
                    callback(404, { 'error': 'User of data already exist' });
                }
            } else {
                callback(500, { 'Error': 'you will still hash the password' });
            }
        });
    } else {
        callback(404, { 'error': 'Missing Required Statement' });
    }
};

handlers._users.get = function (data, callback) {

};
handlers._users.put = function (data, callback) {

};
handlers._users.delete = function (data, callback) {

};
//sample handler
handlers.sample = function (data, callback) {
    //callback an http.status code payload should be a object
    callback(200, { 'name': 'sample hanlder' });
};

handlers.search = function (data, callback) {
    callback(201,
        {
            'search': 'databuse',
            'lost': 'mechanics'
        })
}
//initiate the ping response
handlers.ping = function (data, callback) {
    callback(200,
        {
            'message': 'The server is online'
        })
};
//not found handlers
handlers.notfound = function (data, callback) {
    //callback an http status 404 but doesn't need an payload
    callback(404);
};

//export the handlers 
module.exports = handlers;