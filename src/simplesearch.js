/**
 * @module SimpleSearch
 * @type {Object} The SimpleSearch object defines two useful methods related
 *  to filtering and matching text.
 */
var SimpleSearch = {};

/**
 * Test a string to see if all characters are alphanumeric.
 * @param  {string}  str - The text to be tested
 * @return {Boolean}
 * @private
 */
SimpleSearch._isAlphaNumeric = function (str) {
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

/**
 * Compare a search string against a single target word.
 * @param  {string} word   - The target string, which will be searched for
 *                           matching characters
 * @param  {string} search - The string of characters we are searching for
 * @return {Boolean}
 * @private
 */
SimpleSearch._matchSingleWord = function (word, search) {
  var prevMatch = -1,
      currentChar, matchIndex, i, len;

  // loop through each letter in `search`, ensuring it matches
  for (i = 0, len = search.length; i < len; i++) {
    currentChar = search.charAt(i).toLowerCase();

    // ignore non-alphanumeric characters completely
    if (!SimpleSearch._isAlphaNumeric(currentChar)) continue;

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

/**
 * Compare a search string against multiple target words, ignoring word order.
 * @param  {string[]} words - Array of words to be searched
 * @param  {string} search  - The string of characters we are searching for
 * @return {Boolean}
 * @private
 */
SimpleSearch._matchMultipleWords = function (words, search) {
  var matchIndexes, prevMatchIndexes, matchWords, prevMatchWords, stringToCheck,
      i, j, sLen, wLen;

  // for each letter in search, and for each word in our array
  // find all words that match every character up to this point
  for (i = 0, sLen = search.length; i < sLen; i++) {
    // keep track of whether we added words for this letter
    matchIndexes = [];
    matchWords = [];

    // initialize prevMatches, which is extra important the first time through
    prevMatchIndexes = prevMatchIndexes || [];
    prevMatchWords = prevMatchWords || words.slice(0);

    // only check the words that passed last time (or all words on first run)
    for (j = 0, wLen = prevMatchWords.length; j < wLen; j++) {
      stringToCheck = search.substring(0, i + 1);

      if (SimpleSearch._matchSingleWord(prevMatchWords[j], stringToCheck)) {
        // after the first round, refer back to our stored index, because we
        // want to know where to find the word in the original `words`
        matchIndexes.push(i > 0 ? prevMatchIndexes[j] : j);
        matchWords.push(prevMatchWords[j]);
      }
    }

    // if there are no more matches
    if (!matchIndexes.length) {
      if (!prevMatchIndexes.length) {
        // if there were no previous matches, the match failed
        return false;
      } else if (prevMatchIndexes.length > 1) {
        // if we matched multiple partial words, we can't know
        // for sure which one to remove. for now, don't remove either.
        return SimpleSearch._matchMultipleWords(words, search.substring(i));
      } else {
        // there was exactly one matching word, so remove it
        words.splice(prevMatchIndexes[0], 1);

        // and trim our search string, since we're done with this round
        search = search.substring(i);

        // if there are still multiple words, recurse
        // otherwise, simply match a single word with the remaining string
        return words.length > 1 ?
          SimpleSearch._matchMultipleWords(words, search) :
          SimpleSearch._matchSingleWord(words[0], search);
      }
    }

    prevMatchWords = matchWords.slice(0);
    prevMatchIndexes = matchIndexes.slice(0);
  }

  // as always, return true if we run out of search characters
  return true;
};

/**
 * Given an item to test against and a search string to look for, return true
 * or false, depending on whether the match is found, according to our criteria:
 *  - The search string can leave out characters
 *  - Search string cannot get character order wrong
 *  - Ignore spaces in the search string
 *  - Ignore other non-alphanumeric characters in the search string
 *  - Word order of the target item doesn't matter
 *
 * @param  {string} item - The string to be searched for matches
 * @param  {string} search - The string of characters we are searching for
 * @return {Boolean}
 *
 * @example
 * SimpleSearch.matches('foobar', 'fbr'); // returns true
 * SimpleSearch.matches('foobar', 'bf'); // returns false
 * SimpleSearch.matches('foo', 'f oo!'); // returns true
 * SimpleSearch.matches('bar (foo)', foobar); // returns true
 */
SimpleSearch.matches = function (item, search) {
  var items = item.toLowerCase().split(' ');

  return items.length > 1 ?
    SimpleSearch._matchMultipleWords(items, search) :
    SimpleSearch._matchSingleWord(items[0], search);
};

/**
 * Given an array as the first paramater and a string of search text as the
 * second, filter() will return a new array that is a subset of the original.
 * The results are filtered according to the criteria listed for matches().
 *
 * @param  {string[]} data - Array of strings that will be filtered
 * @param  {string} search - The string of characters we are searching for
 * @return {string[]} - A new array, a subset of the original data
 *
 * @example
 * SimpleSearch.filter(["foo", "bar", "baz"], "ba"); // returns ["bar", "baz"]
 */
SimpleSearch.filter = function (data, search) {
  var result = [],
      len,
      i;

  for (i = 0, len = data.length; i < len; i++) {
    if (SimpleSearch.matches(data[i], search)) {
      result.push(data[i]);
    }
  }

  return result;
};
