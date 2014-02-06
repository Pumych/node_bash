var spawn   = require('child_process').spawn;
var express = require('express');
var app     = express();
var http    = require('http');
var server  = http.createServer(app);

server.listen(3000);

app.use(express.static(__dirname));

var count = 0;

app.get('/colorsRequest', function(req, res) {
    console.log(new Date());

    // TODO: Add output error if there is no file

    var command = spawn(__dirname + '/run.sh', [ req.query.color || '' ]);
    var output  = [];

    command.stdout.on('data', function(chunk) {
        output.push(chunk);
    });

    command.on('close', function(code) {
        if (code === 0)
            res.send(Buffer.concat(output));
        else
            res.send(500); // when the script fails, generate a Server Error HTTP response
    });
});

console.log('run_bash: listening 3000');