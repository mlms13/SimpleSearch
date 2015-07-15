package simplesearch;

using thx.Strings;

class SimpleSearch {
  /**
   * Compare a search string against a single target word.
   */
  private function matchSingleWord(word : String, search : String) : Bool {
    var prevMatch = -1; // location to start searching for matching chars

    // loop through each letter in `search`m ensuring it matches
    for (i in search.length) {
      var currentChar = search.charAt(i).toLowerCase();

      // non-alphanumeric characters can't cause a failed match
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
}
