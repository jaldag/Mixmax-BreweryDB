var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sync = require('synchronize');
var cors = require('cors');

var fs = require('fs');
var https = require('https');
var options = {
  key : fs.readFileSync('server.key'),
  cert : fs.readFileSync('server.cert')
};

// Use fibers in all routes so we can use sync.await() to make async code easier to work with.
app.use(function(req, res, next) {
  sync.fiber(next);
});

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/beerResolver', cors(corsOptions), require('./api/beerResolver'));

https.createServer(options, app).listen(8443);
