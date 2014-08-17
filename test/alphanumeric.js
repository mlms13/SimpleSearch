var should = require('should'),
    search = require('..');

describe('SimpleSearch', function () {
  describe('#isAlphaNumeric', function () {
    it('should return true for alpha-numeric strings', function () {
      search.isAlphaNumeric('abc').should.be.true;
      search.isAlphaNumeric('ABC').should.be.true;
      search.isAlphaNumeric('012').should.be.true;
      search.isAlphaNumeric('abcDEFghiJKLmnoPQRstuVWXyz0123').should.be.true;
    });

    it('should return false for strings with special characters', function () {
      search.isAlphaNumeric('!').should.be.false;
      search.isAlphaNumeric('?').should.be.false;
      search.isAlphaNumeric('<>').should.be.false;
      search.isAlphaNumeric('@#$%^&*').should.be.false;
      search.isAlphaNumeric('^abc').should.be.false;
      search.isAlphaNumeric('abc$').should.be.false;
      search.isAlphaNumeric('(test').should.be.false;
    });

    it('should return false for spaces', function () {
      search.isAlphaNumeric('abc def').should.be.false;
      search.isAlphaNumeric('abc ').should.be.false;
      search.isAlphaNumeric(' ').should.be.false;
    });
  });
});