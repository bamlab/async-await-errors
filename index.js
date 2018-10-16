const express = require('express');
const Sentry = require('@sentry/node');

const app = express();

Sentry.init({
  dsn: 'https://b24f770389f4493dbdfe1b9d64782617@sentry.io/1302603',
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.get('/', function mainHandler(req, res) {
  throw new Error('Broke!');
});

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

app.listen(3000);
