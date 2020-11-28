"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eq = exports.Contravariant = exports.getMonoid = exports.eqDate = exports.getTupleEq = exports.getStructEq = exports.eqBoolean = exports.eqNumber = exports.eqString = exports.strictEqual = exports.eqStrict = exports.URI = exports.contramap = exports.fromEquals = void 0;
var function_1 = require("./function");
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
function fromEquals(equals) {
    return {
        equals: function (x, y) { return x === y || equals(x, y); }
    };
}
exports.fromEquals = fromEquals;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var contramap_ = function (fa, f) { return function_1.pipe(fa, exports.contramap(f)); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Contravariant
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return fromEquals(function (x, y) { return fa.equals(f(x), f(y)); });
}; };
exports.contramap = contramap;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Eq';
/**
 * @category instances
 * @since 2.5.0
 */
exports.eqStrict = {
    // tslint:disable-next-line: deprecation
    equals: strictEqual
};
/**
 * Use `eqStrict` instead
 *
 * @since 2.0.0
 * @deprecated
 */
function strictEqual(a, b) {
    return a === b;
}
exports.strictEqual = strictEqual;
/**
 * @category instances
 * @since 2.0.0
 */
exports.eqString = exports.eqStrict;
/**
 * @category instances
 * @since 2.0.0
 */
exports.eqNumber = exports.eqStrict;
/**
 * @category instances
 * @since 2.0.0
 */
exports.eqBoolean = exports.eqStrict;
/**
 * @category instances
 * @since 2.0.0
 */
function getStructEq(eqs) {
    return fromEquals(function (x, y) {
        for (var k in eqs) {
            if (!eqs[k].equals(x[k], y[k])) {
                return false;
            }
        }
        return true;
    });
}
exports.getStructEq = getStructEq;
/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @example
 * import { getTupleEq, eqString, eqNumber, eqBoolean } from 'fp-ts/Eq'
 *
 * const E = getTupleEq(eqString, eqNumber, eqBoolean)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @category instances
 * @since 2.0.0
 */
function getTupleEq() {
    var eqs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eqs[_i] = arguments[_i];
    }
    return fromEquals(function (x, y) { return eqs.every(function (E, i) { return E.equals(x[i], y[i]); }); });
}
exports.getTupleEq = getTupleEq;
/**
 * @category instances
 * @since 2.0.0
 */
exports.eqDate = {
    equals: function (x, y) { return x.valueOf() === y.valueOf(); }
};
var empty = {
    equals: function () { return true; }
};
/**
 * @category instances
 * @since 2.6.0
 */
function getMonoid() {
    return {
        concat: function (x, y) { return fromEquals(function (a, b) { return x.equals(a, b) && y.equals(a, b); }); },
        empty: empty
    };
}
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Contravariant = {
    URI: exports.URI,
    contramap: contramap_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.eq = exports.Contravariant;
