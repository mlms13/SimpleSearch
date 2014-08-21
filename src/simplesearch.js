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

SimpleSearch.matchSingleWord = function (word, search) {
  var prevMatch = -1,
      currentChar, matchIndex, i, len;

  // loop through each letter in `search`, ensuring it matches
  for (i = 0, len = search.length; i < len; i++) {
    currentChar = search.charAt(i).toLowerCase();

    // ignore non-alphanumeric characters completely
    if (!SimpleSearch.isAlphaNumeric(currentChar)) continue;

    // return false if the current character of `search`
    // does not exist in the remaining characters of _item
    matchIndex = word.indexOf(currentChar, prevMatch + 1);

    if (matchIndex < 0) {
      return false;
    }

    // if a match was found, update the index for the next round
    prevMatch = matchIndex;
  }

  return true;
};

SimpleSearch.matchMultipleWords = function (words, search) {
  var currentMatches = [],
      prevMatches = [],
      i, j, sLen, wLen;

  // for each letter in search, and for each word in our array
  // find all words that match every character up to this point
  for (i = 0, sLen = search.length; i < sLen; i++) {
    // keep track of whether we added words for this letter
    currentMatches = [];

    for (j = 0, wLen = words.length; j < wLen; j++) {
      // FIXME: this is inefficient. we only need to check words that
      // matched the last time through
      if (SimpleSearch.matchSingleWord(words[j], search.substring(0, i + 1))) {
        currentMatches.push(j);
        addedWords = true;
      }
    }

    // if there are no more matches
    if (!currentMatches.length) {
      if (!prevMatches.length) {
        // if there were no previous matches, the match failed
        return false;
      } else if (prevMatches.length > 1) {
        // FIXME: shit. not really sure how to handle this.
        // if we matched multiple partial words, we can't know
        // for sure which one to remove. for now, don't remove either.
        // just keep checking the remaining search characters
        return SimpleSearch.matchMultipleWords(words, search.substring(i));
      } else {
        // there was exactly one matching word, so remove it
        words.splice(prevMatches[0], 1);

        // and trim our search string, since we're done with this round
        search = search.substring(i);

        // if there are still multiple words, recurse
        // otherwise, simply match a single word with the remaining string
        return words.length > 1 ?
          SimpleSearch.matchMultipleWords(words, search) :
          SimpleSearch.matchSingleWord(words[0], search);
      }
    }

    prevMatches = currentMatches.slice(0);
  }

  // as always, return true if we run out of search characters
  return true;
};

SimpleSearch.matches = function (item, search) {
  var items = item.toLowerCase().split(' ');

  return items.length > 1 ?
    SimpleSearch.matchMultipleWords(items, search) :
    SimpleSearch.matchSingleWord(items[0], search);
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
