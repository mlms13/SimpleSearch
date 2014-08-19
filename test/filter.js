var should = require('should'),
    search = require('..');

describe('SimpleSearch', function () {
  describe('#filter', function () {
    var data = ['barley', 'beans (lima)', 'beans (pinto)', 'beer', 'bulgar'];

    it('should return an array of all matching strings', function () {
      search.filter(data, 'b').should.have.length(data.length);
      search.filter(data, 'barl').should.eql([data[0]]);
      search.filter(data, 'zzz').should.be.an.instanceOf(Array);
      search.filter(data, 'eb').should.be.empty;
    });

    it('should not require consecutive letters', function () {
      search.filter(data, 'bl').should.eql([data[0], data[1], data[4]]);
    });

    it('should ignore extra spaces', function () {
      search.filter(data, 'b e e').should.eql([data[3]]);
    });

    it('should ignore word order', function () {
      search.filter(data, 'lima beans').should.eql([data[1]]);
    });
  });
});