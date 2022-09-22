const fs = require('fs')

const generateFolderLogs = (dynamicFolder, path) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const folderPath = `./${dynamicFolder}/${path}/${year}/${month}/${date}/`
  const pathForDatabase = `${dynamicFolder}/${path}/${year}/${month}/${date}/`
  try {
    if (!fs.existsSync(folderPath)) {
      console.log('generated folder');
      fs.mkdirSync(folderPath, { recursive: true, mode: 775 })
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

const logger = (fileName, type) => {
  try {
    const { folderPath } = generateFolderLogs('logs', type)
    const finalPath = `${__dirname}/../../${folderPath}/${fileName}`
    return fs.createWriteStream(finalPath, {
      flags: 'a'
    })
  } catch (error) {
    return error
  }
}

module.exports = {
  logger
}
