const Sentry = require('@sentry/node');
const errorHandlerFactory = message => (cause, args) => {
  const error = new Error(message);
  Error.captureStackTrace(this, errorHandlerFactory);
  if (cause) {
    error.cause = cause;
    error.stack = cause.stack + error.stack;
  }
  if (args) error.args = args;
  return error;
};

const service1Exception = errorHandlerFactory('SERVICE1_EXCEPTION_FN');
const service2Exception = errorHandlerFactory('SERVICE2_EXCEPTION_FN');

module.exports = {
  service1Exception,
  service2Exception,
};
