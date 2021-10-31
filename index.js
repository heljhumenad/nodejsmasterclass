// primary file for the API

//Node Dependencies
let http = require('http');

// server responds for all query string
let httpserver = http.createServer(function (req, res) {
    res.end('Hello World\n');
});

// start the server and listen to port 30000
httpserver.listen(3000, function () {
    console.log("The Server is listen on 3000..");
});