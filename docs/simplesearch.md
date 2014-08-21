SimpleSearch
===

The SimpleSearch object defines several useful methods related to filtering and matching text. Methods prefixed with _ are private.



---

SimpleSearch._isAlphaNumeric(str) 
-----------------------------
Test a string to see if all characters are alphanumeric.

**Parameters**

**str**: string, The text to be tested

**Returns**: Boolean, Test a string to see if all characters are alphanumeric.

SimpleSearch._matchSingleWord(word, search) 
-----------------------------
Compare a search string against a single target word.

**Parameters**

**word**: string, The target string, which will be searched for
                          matching characters

**search**: string, The string of characters we are searching for

**Returns**: Boolean, Compare a search string against a single target word.

SimpleSearch._matchMultipleWords(words, search) 
-----------------------------
Compare a search string against multiple target words, ignoring word order.

**Parameters**

**words**: Array.&lt;string&gt;, Array of words to be searched

**search**: string, The string of characters we are searching for

**Returns**: Boolean, Compare a search string against multiple target words, ignoring word order.

SimpleSearch.matches(item, search) 
-----------------------------
Determine whether the search string is contained in item, regardless of
item's word order.

**Parameters**

**item**: string, The string to be searched for matches

**search**: string, The string of characters we are searching for

**Returns**: Boolean, Determine whether the search string is contained in item, regardless of
item's word order.

SimpleSearch.filter(data, search) 
-----------------------------
Given a search string, filter an array of strings using our string-matching
algorithm that is flexible about partial matches and word order.

**Parameters**

**data**: Array.&lt;string&gt;, Array of strings that will be filtered

**search**: string, The string of characters we are searching for

**Returns**: Array.&lt;string&gt;, - A new array, a subset of the original data


---








