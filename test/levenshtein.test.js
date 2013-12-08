/**
 * @fileOverview Unit test suite for levenshtein.js.
 * @license The MIT License (MIT).
 *    Copyright (c) 2013 Oleg Sklyanchuk.
 *    http://opensource.org/licenses/mit-license.html
 * @author Oleg Sklyanchuk
 */

/*jslint node: true */
/*global describe, it */

'use strict';

var assert = require('assert'),
    levenshtein = require('../levenshtein.js'),
    // Pure Levenshtein (no substitutions) tests:
    levenshteinTests = [
        {a: '', b: '', result: 0}, // empty strings, no operations
        {a: 'abc', b: 'abc', result: 0}, // equal strings, no operations
        {a: 'a', b: 'b', result: 1}, // one substitution
        {a: 'a', b: '', result: 1}, // one deletion
        {a: 'aabc', b: 'abc', result: 1}, // one deletion
        {a: 'abcc', b: 'abc', result: 1}, // one deletion
        {a: '', b: 'a', result: 1}, // one insertion
        {a: 'abc', b: 'abcc', result: 1}, // one insertion
        {a: 'abc', b: 'aabc', result: 1}, // one insertion
        {a: 'teh', b: 'the', result: 2}, // 2 substitutions
        {a: 'tets', b: 'test', result: 2}, // 2 substitutions
        {a: 'fuor', b: 'four', result: 2}, // 2 substitutions
        {a: 'kitten', b: 'sitting', result: 3}, // 2 substitutions, 1 insertion
        {a: 'Saturday', b: 'Sunday', result: 3}, // 2 deletions, 1 substitution
        {a: 'rosettacode', b: 'raisethysword', result: 8} // 8 operations
    ],
    // Damerau-Levenshtein (with substitutions) tests:
    damerauLevenshteinTests = [
        {a: '', b: '', result: 0}, // empty strings, no operations
        {a: 'abc', b: 'abc', result: 0}, // equal strings, no operations
        {a: 'a', b: 'b', result: 1}, // one substitution
        {a: 'a', b: '', result: 1}, // one deletion
        {a: 'aabc', b: 'abc', result: 1}, // one deletion
        {a: 'abcc', b: 'abc', result: 1}, // one deletion
        {a: '', b: 'a', result: 1}, // one insertion
        {a: 'abc', b: 'abcc', result: 1}, // one insertion
        {a: 'abc', b: 'aabc', result: 1}, // one insertion
        {a: 'teh', b: 'the', result: 1}, // 1 transposition
        {a: 'tets', b: 'test', result: 1}, // 1 transposition
        {a: 'fuor', b: 'four', result: 1}, // 1 transposition
        {a: 'kitten', b: 'sitting', result: 3}, // 2 substitutions, 1 insertion
        {a: 'Saturday', b: 'Sunday', result: 3}, // 2 deletions, 1 substitution
        {a: 'rosettacode', b: 'raisethysword', result: 8}, // 8 operations
        // Optimal string alignment distance special cases:
        // see http://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
        // - Damerau-Levenshtein("CA", "ABC") is CA -> AC -> ABC
        // - OptimalStringAlignmentDistance("CA", "ABC") is CA -> A -> AB -> ABC
        {a: 'CA', b: 'ABC', result: 3} // 1 deletion, 2 insertions
    ];

function levenshteinTestCase(test) {
    var statement = 'should be ' + test.result +
        ' for ("' + test.a + '", "' + test.b + '")';
    it(statement, function () {
        assert.strictEqual(levenshtein(test.a, test.b), test.result);
    });
}

function damerauLevenshteinTestCase(test) {
    var statement = 'should be ' + test.result +
        ' for ("' + test.a + '", "' + test.b + '")';
    it(statement, function () {
        assert.strictEqual(levenshtein(test.a, test.b, true), test.result);
    });
}

// Sanity validation:
describe('library endpoint', function () {
    it('should be a function', function () {
        assert.strictEqual('function', typeof levenshtein);
    });
    it('should throw if called with no arguments', function () {
        assert.throws(levenshtein);
    });
    [undefined, null, true, 42, NaN, {}, /o/].forEach(function (value) {
        var valueType = (null) ? 'null' : typeof value;
        it('should throw if called with ' + valueType, function () {
            assert.throws(function () {
                levenshtein(value, value);
            });
        });
        it('should throw if called transposed with ' + valueType, function () {
            assert.throws(function () {
                levenshtein(value, value, true);
            });
        });
    });
    it('should not throw if called with two strings', function () {
        assert.doesNotThrow(function () {
            levenshtein('a', 'b');
            levenshtein('a', 'b', true);
        });
    });
    it('should not throw if called with two arrays', function () {
        assert.doesNotThrow(function () {
            levenshtein(['a'], ['b']);
            levenshtein(['a'], ['b'], true);
        });
    });
    it('should not throw if called with an array and a string', function () {
        assert.doesNotThrow(function () {
            levenshtein('a', ['b']);
            levenshtein('a', ['b'], true);
            levenshtein(['a'], 'b');
            levenshtein(['a'], 'b', true);
        });
    });
});

// Computing pure Levenshtein distance (no character transposition):
describe('levenshtein distance', function () {
    levenshteinTests.forEach(levenshteinTestCase);
});

// Computing Damerau-Levenshtein distance (with character transposition):
describe('damerau-levenshtein distance', function () {
    damerauLevenshteinTests.forEach(damerauLevenshteinTestCase);
});