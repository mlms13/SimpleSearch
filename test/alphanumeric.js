var should = require('should'),
    search = require('..');

describe('SimpleSearch', function () {
  describe('#_isAlphaNumeric', function () {
    it('should return true for alpha-numeric strings', function () {
      search._isAlphaNumeric('abc').should.be.true;
      search._isAlphaNumeric('ABC').should.be.true;
      search._isAlphaNumeric('012').should.be.true;
      search._isAlphaNumeric('abcDEFghiJKLmnoPQRstuVWXyz0123').should.be.true;
    });

    it('should return false for strings with special characters', function () {
      search._isAlphaNumeric('!').should.be.false;
      search._isAlphaNumeric('?').should.be.false;
      search._isAlphaNumeric('<>').should.be.false;
      search._isAlphaNumeric('@#$%^&*').should.be.false;
      search._isAlphaNumeric('^abc').should.be.false;
      search._isAlphaNumeric('abc$').should.be.false;
      search._isAlphaNumeric('(test').should.be.false;
    });

    it('should return false for spaces', function () {
      search._isAlphaNumeric('abc def').should.be.false;
      search._isAlphaNumeric('abc ').should.be.false;
      search._isAlphaNumeric(' ').should.be.false;
    });
  });
});