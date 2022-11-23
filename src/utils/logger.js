const fs = require('fs')
const { nowWithUtc, todayFormat } = require('./date')

const generateFolderLogs = (dynamicFolder, path) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const folderPath = `./${dynamicFolder}/${path}/${year}/${month}/${date}/`
  const pathForDatabase = `${dynamicFolder}/${path}/${year}/${month}/${date}/`
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true, mode: 0o755 })
      return {
        pathForDatabase,
        folderPath
      }
    }
    return {
      pathForDatabase,
      folderPath
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

const writeLog = (message, fileName = `auction-log-${todayFormat('DD-MM-YYYY')}.txt`, path = 'auction') => {
  try {
    const { folderPath } = generateFolderLogs('logs', path)
    const finalPath = `${__dirname}/../../${folderPath}/${fileName}`
    return fs.createWriteStream(finalPath, {
      flags: 'a',
      mode: 0o755
    }).write(`${nowWithUtc(new Date().toISOString(), 'DD-MM-YYYY H:mm:ss')} - ${message}\n`)
  } catch (error) {
    return error
  }
}

module.exports = {
  writeLog
}
