package simplesearch;

using thx.Strings;

class SimpleSearch {
  /**
   * Compare a search string against a single target word. The search string can
   * have gaps, but its characters must match the order in the `word`. For
   * example, search "fbr" matches word "foobar", but search "brf" does not.
   **/
  private static function matchSingleWord(word : String, search : String) : Bool {
    var prevMatch = -1; // location to start searching for matching chars

    // loop through each letter in `search`m ensuring it matches
    for (i in search.length) {
      var currentChar = search.charAt(i).toLowerCase();

      // non-alphanumeric search characters can't cause a failed match
      if (!currentChar.isAlphaNum()) continue;

      // return false if the current character of `search`
      // does not exist in the remaining characters
      var matchIndex = word.indexOf(currentChar, prevMatch + 1);

      if (matchIndex < 0) {
        return false;
      }

      // if a match was found, update the index for the next round
      prevMatch = matchIndex;
    }

    // made it, so the search matches the target word
    return true;
  }

  /**
   * Compare a search string against multiple target words, ignoring word order.
   * Will return true only if all chars in the search string are found in the
   * `words`, following rules for individual word matches above.
   **/
  private static function matchMultipleWords(words : Array<String>, search : String) {
    // loop through each character in the search string, finding all words
    // that match the entire subset of the search string up to this point
    for (i in search.length) {

    }
    return true;
  }
}
