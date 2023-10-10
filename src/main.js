// make sure for crashing handler continues to run
const fs = require('fs');
const app = require('./app');
const { APP_NAME, APP_PORT, APP_ENV } = require('./config');

process.on('warning', (warning) => {
  console.warn(warning.name);
  console.warn(warning.message);
  console.warn(warning.stack);
});

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
  // alert here to sentry or email
  fs.writeSync(
    process.stderr.fd,
    `Caught rejection: ${promise}\n Exception reason: ${reason}`
  );
});
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
});

process.on('uncaughtException', (err, origin) => {
  // alert here to sentry or email
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n Exception origin: ${origin}`
  );
});

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
});

app.listen(APP_PORT, () => {
  if (APP_ENV === 'development') {
    console.info(`${APP_NAME} running in port ${APP_PORT} with env ${APP_ENV}`);
  } else {
    console.info(`${APP_NAME} is running with env ${APP_ENV}`);
  }
});
