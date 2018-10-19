const express = require('express');
const Sentry = require('@sentry/node');
const { callService1 } = require('./service1');

const app = express();

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.get('/', (req, res, next) => {
  callService1()
    .then(() => {
      res.send('ok');
    })
    .catch(error => {
      next(error);
    });
});

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  console.log(err.stack);
  res.statusCode = 500;
  res.send(res.sentry + '\n');
});

app.listen(3000);
