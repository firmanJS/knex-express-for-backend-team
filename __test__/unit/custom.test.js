/* eslint-disable no-undef */
const custom = require('../../src/utils/custom')

describe('all custom function testing', () => {
  it('is numeric function', () => {
    expect(custom.isNumeric('2')).toBeTruthy()
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
