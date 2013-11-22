# (Damerau-)Levenshtein distance.

[![Build Status](https://travis-ci.org/olegskl/levenshtein.png)](https://travis-ci.org/olegskl/levenshtein)
[![Code Climate](https://codeclimate.com/github/olegskl/levenshtein.png)](https://codeclimate.com/github/olegskl/levenshtein)

Computes a "distance" (string metric) between two finite character sequences by counting the minimum number of operations needed to transform one string into the other, where an operation is defined as an insertion, deletion, or substitution of a single character (Levenshtein algorithm), or a transposition of two adjacent characters (Damerau-Levenshtein (OSAD) algorithm).

### Installation

    npm install git://github.com/olegskl/levenshtein.git

or in package.json as a dependency:

    "dependencies": {
        "levenshtein": "git://github.com/olegskl/levenshtein.git"
    }

### Usage

    var levenshtein = require('levenshtein'),
        levenshteinDistance = levenshtein('teh', 'the'), // 2
        damerauLevenshteinDistance = levenshtein('teh', 'the', true); // 1

### Tests

If [Mocha](https://github.com/visionmedia/mocha) is not installed:

    npm install

Use any of the following to run the test suite:

    mocha
<!-- -->
    npm test

### License

http://opensource.org/licenses/mit-license.html