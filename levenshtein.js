/**
 * @fileOverview Levenshtein/Damerau-Levenshtein distance.
 * @license The MIT License (MIT).
 *    Copyright (c) 2013 Oleg Sklyanchuk.
 *    http://opensource.org/licenses/mit-license.html
 * @author Oleg Sklyanchuk
 */

/*jslint node: true */

'use strict';

/**
 * Calculates an optimal string alignment distance.
 * @param  {String|Array} a         Compared character sequence.
 * @param  {String|Array} b         Reference character sequence.
 * @param  {Boolean}      transpose Whether to consider transposition operation.
 * @return {Number}                 Optimal string alignment distance.
 */
module.exports = function (a, b, transpose) {
    var matrix = [],
        i, j, cost;

    // Input validation:
    if (typeof a !== 'string' && !Array.isArray(a)) {
        throw new TypeError('Expecting compared character sequence (a) to be' +
            ' a String or an Array. "' + typeof a + '" given.');
    }
    if (typeof b !== 'string' && !Array.isArray(b)) {
        throw new TypeError('Expecting reference character sequence (b) to be' +
            ' a String or an Array. "' + typeof b + '" given.');
    }

    // Initial matrix construction:
    for (i = 0; i <= a.length; i += 1) {
        matrix[i] = [i];
    }
    for (i = 1; i <= b.length; i += 1) {
        matrix[0][i] = i;
    }

    // The actual computation:
    for (i = 1; i <= a.length; i += 1) {
        for (j = 1; j <= b.length; j += 1) {
            cost = (a[i - 1] === b[j - 1]) ? 0 : 1;
            matrix[i][j] = (transpose && i > 1 && j > 1 &&
                    (a[i - 1] === b[j - 2]) && (a[i - 2] === b[j - 1])) ?
                Math.min(
                    matrix[i - 1][j] + 1, // deletion
                    matrix[i][j - 1] + 1, // insertion
                    matrix[i - 1][j - 1] + cost, // substitution
                    matrix[i - 2][j - 2] + cost // transposition
                ) :
                Math.min(
                    matrix[i - 1][j] + 1, // deletion
                    matrix[i][j - 1] + 1, // insertion
                    matrix[i - 1][j - 1] + cost // substitution
                );
        }
    }

    return matrix[a.length][b.length];
};