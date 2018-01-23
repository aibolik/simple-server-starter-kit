const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const fs = require('fs');
const https = require('https');

/*
  Options for HTTP/S server
*/

/*
var options = {

};
*/

const port = 3000;

app.use(logger('dev'));
app.use(jsonParser());

app.get('/', function (req, res) {
    res.send(`Web server is working well on port number ${port}`)
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

var server = https.createServer(options, app);

server.listen(port, function () {
    console.log('App is listening on port ' + port);
});
