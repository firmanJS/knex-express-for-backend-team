/* eslint-disable no-undef */
const httpMock = require('node-mocks-http');
const custom = require('../../src/utils/custom');

let req;
// let res
// let next

describe('all custom function testing', () => {
  beforeEach(() => {
    // create express request and response mock
    req = httpMock.createRequest();
    // res = httpMock.createResponse()
    // next = jest.fn()
  });
  it('is paramsHttp', () => {
    expect(custom.paramsHttp(req)).toStrictEqual({});
  });
  it('is reqQuery', () => {
    expect(custom.reqQuery(req)).toStrictEqual({});
  });
  it('is bodyHttp', () => {
    expect(custom.bodyHttp(req)).toStrictEqual({});
  });
  it('is numeric function', () => {
    expect(custom.isNumeric('2')).toBeTruthy();
  });
  it('is numeric function', () => {
    expect(custom.isNumeric(2)).toBe(false);
  });
  it('is slug function', () => {
    expect(custom.convertToSlug('testing data')).toBe('testing-data');
  });
  it('is slug error handlerfunction', () => {
    expect(custom.convertToSlug(123)).toBe('TypeError: text.toLowerCase is not a function');
  });
  it('is first upper string function', () => {
    expect(custom.ucword('testing')).toBe('Testing');
  });
  it('is first upper string function', () => {
    expect(custom.ucword({ a: 1 })).toStrictEqual({ a: 1 });
  });
  it('is replace function', () => {
    expect(custom.replaceString('aku-kamu', '-', ' ')).toBe('aku kamu');
  });
  it('is replace function error handler', () => {
    expect(custom.replaceString(123, '-', ' ')).toBe('TypeError: str.replace is not a function');
  });
  it('is currency function', () => {
    expect(custom.formatCurrency(2000)).toBe(custom.formatCurrency(2000));
  });
  it('is currency function', () => {
    expect(custom.formatCurrency({ a: 1 })).toBe('RpNaN');
  });
  it('is currency function', () => {
    expect(custom.formatCurrency({ a: 1 }, false)).toBe('TypeError: Currency code is required with currency style.');
  });
});
