var express = require('express');
var app = module.exports = express();

//CORS middleware
function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.configure(function() {
    app.use(allowCrossDomain);
    app.use('/', express.static(__dirname + '/public'));
});
