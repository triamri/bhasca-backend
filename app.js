const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes')
const cors = require('cors')
require('dotenv').config()

const googleTranslate = require('@google-cloud/translate')(process.env.API_GOOGLE);

const photo = require('./routes/photo');
const translate = require('./routes/translate');
const app = express();

app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api/photo', photo);
app.use('/api/translate', translate);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
