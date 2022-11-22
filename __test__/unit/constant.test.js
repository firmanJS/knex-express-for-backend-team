const { HTTP } = require('../../src/utils/constant')

describe('all constant variable testing', () => {
  // test for HTTP
  it('BAD REQUEST VALUE ', () => {
    expect(HTTP.BAD_REQUEST).toBe(400)
  })
  it('HTTP CREATED', () => {
    expect(HTTP.CREATED).toBe(201)
  })
  it('FORBIDDEN PAGE', () => {
    expect(HTTP.FORBIDDEN).toBe(403)
  })
  it('NOTFOUND CODE', () => {
    expect(HTTP.NOT_FOUND).toBe(404)
  })
  it('HTTP OK', () => {
    expect(HTTP.OK).toBe(200)
  })
  it('INTERNAL SERVER ERRROR', () => {
    expect(HTTP.INTERNAL_SERVER_ERROR).toBe(500)
  })
  it('UNAUTHORIZED', () => {
    expect(HTTP.UNAUTHORIZED).toBe(401)
  })
})
