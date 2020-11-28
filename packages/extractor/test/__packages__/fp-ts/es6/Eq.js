import { pipe } from './function';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
export function fromEquals(equals) {
    return {
        equals: function (x, y) { return x === y || equals(x, y); }
    };
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var contramap_ = function (fa, f) { return pipe(fa, contramap(f)); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Contravariant
 * @since 2.0.0
 */
export var contramap = function (f) { return function (fa) {
    return fromEquals(function (x, y) { return fa.equals(f(x), f(y)); });
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Eq';
/**
 * @category instances
 * @since 2.5.0
 */
export var eqStrict = {
    // tslint:disable-next-line: deprecation
    equals: strictEqual
};
/**
 * Use `eqStrict` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export function strictEqual(a, b) {
    return a === b;
}
/**
 * @category instances
 * @since 2.0.0
 */
export var eqString = eqStrict;
/**
 * @category instances
 * @since 2.0.0
 */
export var eqNumber = eqStrict;
/**
 * @category instances
 * @since 2.0.0
 */
export var eqBoolean = eqStrict;
/**
 * @category instances
 * @since 2.0.0
 */
export function getStructEq(eqs) {
    return fromEquals(function (x, y) {
        for (var k in eqs) {
            if (!eqs[k].equals(x[k], y[k])) {
                return false;
            }
        }
        return true;
    });
}
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
export function getTupleEq() {
    var eqs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eqs[_i] = arguments[_i];
    }
    return fromEquals(function (x, y) { return eqs.every(function (E, i) { return E.equals(x[i], y[i]); }); });
}
/**
 * @category instances
 * @since 2.0.0
 */
export var eqDate = {
    equals: function (x, y) { return x.valueOf() === y.valueOf(); }
};
var empty = {
    equals: function () { return true; }
};
/**
 * @category instances
 * @since 2.6.0
 */
export function getMonoid() {
    return {
        concat: function (x, y) { return fromEquals(function (a, b) { return x.equals(a, b) && y.equals(a, b); }); },
        empty: empty
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export var Contravariant = {
    URI: URI,
    contramap: contramap_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var eq = Contravariant;
