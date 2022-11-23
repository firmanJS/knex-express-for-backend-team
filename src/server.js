// make sure for crashing handler continues to run
const fs = require('fs')
const app = require('./app')

process.on('warning', (warning) => {
  console.warn(warning.name)
  console.warn(warning.message)
  console.warn(warning.stack)
})

const unhandledRejections = new Map()
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason)
  // alert here to sentry or email
  fs.writeSync(
    process.stderr.fd,
    `Caught rejection: ${promise}\n`
    + `Exception reason: ${reason}`
  )
})
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise)
})

process.on('uncaughtException', (err, origin) => {
  // alert here to sentry or email
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n`
    + `Exception origin: ${origin}`
  )
})

process.on('SIGTERM', () => {
  console.info('SIGTERM received')
})

app.listen(process.env.APP_PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.info(`${process?.env.APP_NAME} running in port ${process.env.APP_PORT}`)
  } else {
    console.info(`${process?.env.APP_NAME} is running`)
  }
})
