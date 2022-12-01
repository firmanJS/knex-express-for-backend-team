/* eslint-disable no-undef */
const httpMock = require('node-mocks-http')
const custom = require('../../src/utils/custom')

let req
// let res
// let next

describe('all custom function testing', () => {
  beforeEach(() => {
    // create express request and response mock
    req = httpMock.createRequest()
    // res = httpMock.createResponse()
    // next = jest.fn()
  })
  it('is paramsHttp', () => {
    expect(custom.paramsHttp(req)).toStrictEqual({})
  })
  it('is queryHttp', () => {
    expect(custom.queryHttp(req)).toStrictEqual({})
  })
  it('is bodyHttp', () => {
    expect(custom.bodyHttp(req)).toStrictEqual({})
  })
  it('is numeric function', () => {
    expect(custom.isNumeric('2')).toBeTruthy()
  })
  it('is numeric function', () => {
    expect(custom.isNumeric(2)).toBe(false)
  })
  it('is slug function', () => {
    expect(custom.convertToSlug('testing data')).toBe('testing-data')
  })
  it('is first upper string function', () => {
    expect(custom.ucword('testing')).toBe('Testing')
  })
  it('is currency function', () => {
    expect(custom.formatCurrency(2000)).toBe(custom.formatCurrency(2000))
  })
})
