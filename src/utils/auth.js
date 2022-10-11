const crypto = require('crypto')
const jwtDecode = require('jwt-decode')

const generatePassword = (payload) => {
  try {
    payload.salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(payload.password, payload.salt, 10000, 100, 'sha512').toString('hex')
    payload.password = hash
    return payload
  } catch (error) {
    console.info('error generated password', error)
    return payload
  }
}

const isValidPassword = (password, hash, salt) => {
  try {
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 100, 'sha512').toString('hex')
    return hash === hashPassword
  } catch (error) {
    console.info('error validated password', error)
    return false
  }
}

const decodeToken = (type, req) => {
  try {
    const payload = {}
    const tokenHeader = req?.headers?.authorization ?? ''
    const token = tokenHeader.split(' ')[1]
    const decode = jwtDecode(token)
    switch (type) {
      case 'created':
        payload.created_by = decode?.sub ?? 0
        break;
      case 'updated':
        payload.updated_by = decode?.sub ?? 0
        payload.updated_at = new Date().toISOString()
        break;
      case 'deleted':
        payload.deleted_by = decode?.sub ?? 0
        payload.deleted_at = new Date().toISOString()
        break;
      case 'default':
        payload.users_id = decode?.sub ?? 0
        break;
      case 'getRoles':
        return decode?.roles ?? []
      case 'refreshToken':
        payload.users_id = decode?.sub
        payload.is_admin = decode?.roles.toString() === 'front' ? 0 : 1
        payload.roles = decode?.roles ?? []
        break;
      default:
        return payload
    }
    console.info(`decoded token is : ${JSON.stringify(payload)})`);
    return payload
  } catch (error) {
    console.error(`error decoded token : ${error})`);
    return {
      users_id: '',
      created_by: ''
    }
  }
}

module.exports = {
  generatePassword,
  isValidPassword,
  decodeToken
}
