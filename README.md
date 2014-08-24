# SimpleSearch

SimpleSearch is becoming a powerful JavaScript tool to filter an array for matched (and approximately matched) strings.

## Installation and Setup

We use UMD to maintain compatibility with several popular module systems.

### CommonJS Setup (for environments like Node.js and Browserify)

Install SimpleSearch...

```
npm install --save simplesearch
```

...and require it in your project

```javascript
var SimpleSearch = require('simplesearch');
SimpleSearch.filter(...);
```

### AMD Setup (for Require.JS)

**Disclaimer:** it's been awhile since I've used Require.JS, and I'm no expert. This method is currently untested, but it should work.

Install SimpleSearch by downloading a [tagged release](https://github.com/mlms13/SimpleSearch/releases). Or you could install with npm and dig it out of the `node_modules` folder... I don't really know the preferred way to do package management in AMD environments.

Then, start using it like this:

```javascript
require(['path/to/simplesearch.js'], function(SimpleSearch) {
  SimpleSearch.filter(...);
});
```

### No module loader? No problem.

If you're just looking to dump a script into your page, we can work with that. Start by [downloading the latest release](https://github.com/mlms13/SimpleSearch/releases).

```html
<script src="/path/to/simplesearch.js"></script>
<script>
  window.SimpleSearch.filter(...);
</script>
```

## Configuration

In its simplest form:

```javascript
// filter(data, searchText)
var result = SimpleSearch.filter(["foo", "bar", "baz"], "ba");
// result: ["bar", "baz"]
```
For any search more complex than that, pass a configuration object to `filter` instead:

```javascript
// data as an array of objects instead of strings
var data = [{
  name: "berry",
  alias: ["strawberry", "acai", "blueberry"]
}, {
  name: "chickpea",
  alias: "garbanzo bean"
}, {
  name: "apple, raw"
}];

// filter(obj)
SimpleSearch.filter({
  data: data,
  fields: ["name", "alias"], // fields to be searched, ordered by preference.
                             // we only search "alias" if "name" doesn't match
  exactMatch: false, // if set to true, "ba" would not match "bean"
  splitWords: true, // if set to false, "bean garb" wouldn't match "garbanzo bean"
  punctuation: false, // if set to true, "(raw)" wouldn't match "raw"
  success: function (match) {
    // a callback function to be run for each matching item
    // receives a `match` object with the following properties
    // - `field` -- the field in which the match was found
    // - `original` -- original object (from data array) in which match was found
    // - `charPos` -- array of indexes of matched characters
    //                e.g. [0, 1, 3] for "bean" given search string "ben"
  },
  fail: function (original) {
    // callback to be run if match fails
    // receives the original object that was tested for a match
  }
});
```

## Roadmap

### Lofty goals for a simple project:

Given initial data of `["barley", "beans (lima)", "beans (pinto)", "beer", "bulgar"]`

- searching "b" should return all items
- searching "bl" should return "barley", "beans (lima)", and "bulgar"
- searching "eb" should return no results
- searching "lima beans" should return "beans (lima)"
- searching "b e e" should return "beer" (ignore extra spaces)

### Even loftier:

- Give each match a score, based on similarity to the search term
- Sort by score before returning array (and before calling success/fail callback functions)
