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
    let buffer = '';
    req.on('data', function (data) {
        buffer += stringDecoder.write(data);
    });
    req.on('end', function () {
        buffer += stringDecoder.end();
        //send the response
        res.end('Hello World\n');
        //log the request path
        // console.log('Request has been recieved on this path:' + trim_path + ' with this method:' + method + ' query string parameters:', queryobject);
        console.log('Request has recieved header with this payload:', buffer);
        console.log('type of:', typeof buffer)
    })
});

// start the server and listen to port 30000
httpserver.listen(port, function () {
    console.log("The Server is listen on port " + port);
});