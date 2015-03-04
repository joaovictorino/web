var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.port || 1337;
var app = express();
var mongoOp = require('./server/MongoOperations.js');
app.use(bodyParser());
app.get('/API/entidades', mongoOp.fetch);
app.post('/API/entidades', mongoOp.add);
app.put('/API/entidades/:entidadeID', mongoOp.modify);
app.get('/', function (request, response) { 
    response.sendfile("views/Lista.html");
});
app.use('/', express.static(path.join(__dirname, '/client')));
app.listen(port);
/*http.createServer(function (request, response) {
    response.writeHeader(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
}).listen(port);*/