const app = require('./app')

let server

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  console.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.info('SIGTERM received')
  if (server) {
    server.close()
  }
})

app.listen(process.env.APP_PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.info(`${process?.env.APP_NAME} running in port ${process.env.APP_PORT}`)
  } else {
    console.info(`${process?.env.APP_NAME} is running`)
  }
})

// make sure for crashing handler continues to run
// const fs = require('fs')
// const app = require('./app')

// process.on('warning', (warning) => {
//   console.warn(warning.name)
//   console.warn(warning.message)
//   console.warn(warning.stack)
// })

// const unhandledRejections = new Map()
// process.on('unhandledRejection', (reason, promise) => {
//   unhandledRejections.set(promise, reason)
//   fs.writeSync(
//     process.stderr.fd,
//     `Caught rejection: ${promise}\n`
//     + `Exception reason: ${reason}`
//   )
//   process.exit()
// })
// process.on('rejectionHandled', (promise) => {
//   unhandledRejections.delete(promise)
// })

// process.on('uncaughtException', (err, origin) => {
//   fs.writeSync(
//     process.stderr.fd,
//     `Caught exception: ${err}\n`
//     + `Exception origin: ${origin}`
//   )
// })

// process.on('SIGTERM', () => {
//   console.info('SIGTERM received')
// })

// app.listen(process.env.APP_PORT, () => {
//   if (process.env.NODE_ENV === 'development') {
//     console.info(`${process?.env.APP_NAME} running in port ${process.env.APP_PORT}`)
//   } else {
//     console.info(`${process?.env.APP_NAME} is running`)
//   }
// })
