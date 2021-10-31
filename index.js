// primary file for the API

//Node Dependencies
let http = require('http');

// node dependencies to parse url
let url = require('url');

// server responds for all query string
let httpserver = http.createServer(function (req, res) {
    // get url and parse it
    let url_parse = url.parse(req.url, true);

    // get the path from the url
    let path = url_parse.pathname;
    let trim_path = path.replace(/^\/+|\/+$/g, '');

    // get a query string as an object
    let queryobject = url_parse.query;

    //get the http-methods
    let method = req.method.toUpperCase();

    //send the response
    res.end('Hello World\n');


    //log the request path
    console.log('Request has been recieved on this path:' + trim_path + 'with this method:' + method);
    console.log(queryobject);
});

// start the server and listen to port 30000
httpserver.listen(3000, function () {
    console.log("The Server is listen on 3000..");
});