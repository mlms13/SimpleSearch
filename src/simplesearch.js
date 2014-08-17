var SimpleSearch = {};

SimpleSearch.matches = function (item, search) {
  var matchIndex = item.indexOf(search.charAt(0));

  // return false if the current character of `search` is not found
  // in the remaining subset of `item`
  if (matchIndex < 0) {
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
};

module.exports = SimpleSearch;