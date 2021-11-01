// primary file for the API

//Node Dependencies
let http = require('http');

// node dependencies to parse url
let url = require('url');
let stringdecoder = require('string_decoder').StringDecoder;

const port = 3000;

// server responds for all query string
let httpserver = http.createServer(function (req, res) {
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
        let choosenHandler = typeof (router[trim_path]) !== 'undefined' ? router[trim_path] : handlers.notfound;

        //construct the data object that will be send to the handler
        let data = {
            'trim_path': trim_path,
            'queryobject': queryobject,
            'method': method,
            'headers': headers,
            'payload': buffer
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
            res.setHeader('Content-Type','application/json');
            //return the response
            res.writeHead(statusCode);
            res.end(payload_string);
            console.log('Returning the response:', statusCode, payload_string);


        });
    });
});

// start the server and listen to port 30000
httpserver.listen(port, function () {
    console.log("The Server is listen on port " + port);
});

//define handlers
let handlers = {};

//sample handler
handlers.sample = function (data, callback) {
    //callback an http.status code payload should be a object
    callback(406, { 'name': 'sample hanlder' });
};

//not found handlers
handlers.notfound = function (data, callback) {
    //callback an http status 404 but doesn't need an payload
    callback(404);
};
//define a request router object
let router = {
    'sample': handlers.sample
};