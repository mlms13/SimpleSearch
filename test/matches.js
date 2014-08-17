var should = require('should'),
    search = require('..');

describe('SimpleSearch', function () {
  describe('#matches', function () {
    it('should return true when search string is found', function () {
      search.matches('foo', 'f').should.be.true;
      search.matches('foo', 'foo').should.be.true;
    });

    it('should return true for incomplete matches', function () {
      search.matches('bar', 'ar').should.be.true;
      search.matches('bar', 'br').should.be.true;
    });

    it('should return false when search string is not found', function () {
      search.matches('baz', 'f').should.be.false;
      search.matches('baz', 'bazz').should.be.false;
    });

    it('should return false when character order is wrong', function () {
      search.matches('bar', 'rb').should.be.false;
    });

    it('should ignore character case', function () {
      search.matches('FooBar', 'foobar').should.be.true;
      search.matches('foobar', 'Bar').should.be.true;
    });

    it('should ignore spaces in the search string', function () {
      search.matches('foobar', 'foo bar').should.be.true;
      search.matches('foobar', 'f o o b a r').should.be.true;
    });

    it('should ignore non-alphanumeric characters', function () {
      search.matches('foobar', '(foo)').should.be.true;
      search.matches('foobar', 'foo?').should.be.true;
      search.matches('foobar', 'foo-bar').should.be.true;
      search.matches('foo.bar', 'foobar').should.be.true;
      search.matches('foobar', 'f00').should.be.false;
    });

    it('should match regardless of word order', function () {
      search.matches('foo bar', 'bar foo').should.be.true;
      search.matches('bar (foo)', 'foobar').should.be.true;
    });

    it('should not re-match to previously-matched words', function () {
      // after checking "bar", then switching to "foo"
      // you can't just jump back to bar
      search.matches('foo bar', 'ba foo r').should.be.false;
    });
  });
});