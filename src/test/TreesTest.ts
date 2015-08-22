/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../main/Trees.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');


/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('Trees', () => {

    describe('Empty set', () => {
        it('should be empty', (done) => {
	       var emptySet = Trees.newSet()
           expect(emptySet.isEmpty).to.equal(true);
            done(); 
        });

        it('should not be 7', (done) => {
            expect(2+4).to.not.equals(7);
            done();
        });
    });
});