// primary file for the API

//Node Dependencies
let http = require('http');
let https = require('https');
let config = require('./lib/config');
let _data = require('./lib/data');
let handlers = require('./lib/handlers');
let helpers = require('./lib/helpers');
//TESTING
// you can manipulate and use the data object 
// basic read, update, create, delete object file.
// _data.create('test', 'new_file_format', { 'fizz': 'buzz' }, function (err, data) {
//     console.log('This is an error occured', err + 'save by the data:' + data);
// });

// node dependencies to parse url
let url = require('url');
let stringdecoder = require('string_decoder').StringDecoder;
//require the file


// server responds for all query string
let httpserver = http.createServer(function (req, res) {
    unified_server(req, res);
});

// start the server and listen to port that assign to http
httpserver.listen(config.http_port, function () {
    console.log("The Server is listen on port " + config.http_port);
});

//TODO : create the openssl key and cert file.
let httpsServerOptions = {
    // 'key': fs.readFileSync('./https/key.pem'),
    //'cert': fs.readFileSync('./https/cert.pem')
};

//server responds for all query string to https
let https_server = https.createServer(httpsServerOptions, function (req, res) {
    unified_server(req, res);
});
// start the server and listen to port that assign to https
https_server.listen(config.https_port, function () {
    console.log("The Server is listen on port " + config.https_port);
});

let unified_server = function (req, res) {
    // get url and parse it
    let url_parse = url.parse(req.url, true);

    // get the path from the url
    let path = url_parse.pathname;
    let trim_path = path.replace(/^\/+|\/+$/g, '');

    // get a query string as an object
    let queryobject = url_parse.query;

    //get the headers and a object type
    let headers = req.headers;

    //get the http-methods
    let method = req.method.toUpperCase();



    //get the payload if any
    let stringDecoder = new stringdecoder('utf-8');
    // create variable that will hold the stream of data
    let buffer = '';

    //create callback function to accept and append the stream of data from the http server
    req.on('data', function (data) {
        buffer += stringDecoder.write(data);
    });

    //corelated all the stream of data if http server finish sending of stream of data
    req.on('end', function () {
        buffer += stringDecoder.end();

        //choose the handler this request should go. if not found call not found handler
        var choosenHandler = typeof (router[trim_path]) !== 'undefined' ? router[trim_path] : handlers.notfound;

        //construct the data object that will be send to the handler
        var data = {
            'trim_path': trim_path,
            'queryobject': queryobject,
            'method': method,
            'headers': headers,
            'payload': helpers.parse_json_object(buffer)
        };


        //route the request to the handler specified in the router
        choosenHandler(data, function (statusCode, payload) {
            //use the status code called back by the handler or default to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            //use the payload called back by the handler or default to an empty object
            payload = typeof (payload) == 'object' ? payload : {};

            //convert the payload to a string
            payload_string = JSON.stringify(payload);

            //return the response as json content type
            res.setHeader('Content-Type', 'application/json');
            //return the response
            res.writeHead(statusCode);
            res.end(payload_string);
            console.log('Returning the response:', statusCode, payload_string);


        });
    });
};


//define a request router object
// request router path
let router = {
    'sample': handlers.sample,
    'users': handlers.users,
    'search': handlers.search,
    'ping': handlers.ping
};