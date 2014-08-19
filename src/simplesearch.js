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
  var _item = item.toLowerCase(),
      currentChar, matchIndex, i, len;

  // loop through each letter in `search`, ensuring it matches
  for (i = 0, len = search.length; i < len; i++) {
    currentChar = search.charAt(i).toLowerCase();

    // ignore non-alphanumeric characters completely
    if (!SimpleSearch.isAlphaNumeric(currentChar)) continue;

    // return false if the current character of `search`
    // does not exist in the remaining characters of _item
    matchIndex = _item.indexOf(currentChar);

    if (matchIndex < 0) {
      return false;
    }

    // item becomes only the characters after the current match
    // so `br` matches `bar` but `rb` doesn't
    _item = _item.substring(matchIndex + 1);
  }

  return true;
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
