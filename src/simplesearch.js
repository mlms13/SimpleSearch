var SimpleSearch = {};

SimpleSearch.isAlphaNumeric = function (str) {
  var code, i, len;

  // iterating and checking charCode is uglier but faster than regexp
  // http://jsperf.com/alphanumeric-charcode-vs-regexp
  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

SimpleSearch.matches = function (item, search) {
  var currentChar = search.charAt(0).toLowerCase(),
      matchIndex = item.toLowerCase().indexOf(currentChar);

  // return false if the current character of `search` is alphanumeric
  // and it is not found in the remaining subset of `item`
  if (SimpleSearch.isAlphaNumeric(currentChar) && matchIndex < 0) {
    return false;
  }

  // if we made it this far and there are no remaining characters
  // in our search string, it's a match
  if (search.length <= 1) {
    return true;
  }

  // otherwise, trim our original `item` to include only characters
  // after the current position. this causes "br" to match "bar"
  // but "rb" will not match "bar" because the order is wrong.
  item = item.substring(matchIndex + 1);

  // then recursively keep checking each letter in `search`
  return SimpleSearch.matches(item, search.substring(1));
};

SimpleSearch.filter = function (data, searchString) {
  var result = [],
      len,
      i;

  for (i = 0, len = data.length; i < len; i++) {
    if (SimpleSearch.matches(data[i], searchString)) {
      result.push(data[i]);
    }
  }

  return result;
};

module.exports = SimpleSearch;