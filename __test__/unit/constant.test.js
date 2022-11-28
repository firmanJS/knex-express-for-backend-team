/* eslint-disable no-undef */
const { HTTP } = require('../../src/utils/constant')

describe('all constant variable testing', () => {
  // test for HTTP
  it('CREATED', () => {
    expect(HTTP.CREATED).toBe(201)
  })
  it('SUCCESS', () => {
    expect(HTTP.OK).toBe(200)
  })
  it('ACCEPTED', () => {
    expect(HTTP.ACCEPTED).toBe(202)
  })
  it('BAD_REQUEST', () => {
    expect(HTTP.BAD_REQUEST).toBe(400)
  })
  it('UNAUTHORIZED', () => {
    expect(HTTP.UNAUTHORIZED).toBe(401)
  })
  it('FORBIDDEN', () => {
    expect(HTTP.FORBIDDEN).toBe(403)
  })
  it('NOT_FOUND', () => {
    expect(HTTP.NOT_FOUND).toBe(404)
  })
  it('UNPROCESSABLE_ENTITY', () => {
    expect(HTTP.UNPROCESSABLE_ENTITY).toBe(422)
  })
  it('INTERNAL_SERVER_ERROR', () => {
    expect(HTTP.INTERNAL_SERVER_ERROR).toBe(500)
  })
})
