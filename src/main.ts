// make sure for crashing handler continues to run
import fs from 'fs';
import app from './app';
import config from './config';

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
    `Caught rejection: ${promise}\nException reason: ${reason}`
  );
});
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
});

process.on('uncaughtException', (err, origin) => {
  // alert here to sentry or email
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\nException origin: ${origin}`
  );
});

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
});

app.listen(config?.app?.port, () => {
  if (config?.app?.env === 'development') {
    console.info(
      `${config?.app?.name} running in port ${config?.app?.port} with env ${config?.app?.env}`
    );
  } else {
    console.info(
      `${config?.app?.name} is running with env ${config?.app?.env}`
    );
  }
});
