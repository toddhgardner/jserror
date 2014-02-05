var express = require('express');
var app = module.exports = express();

app.configure(function() {
    app.use('/', express.static(__dirname + '/public'));
});
