var express = require('express');
var request = require('request');

var app = express();
var apiServerHost = 'https://api-v2.soundcloud.com';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', function(req, res) {
  console.log('serve: ' + req.url);
  var url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(4004);

