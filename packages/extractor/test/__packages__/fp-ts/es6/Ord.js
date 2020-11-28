import { monoidOrdering } from './Ordering';
import { pipe } from './function';
// default compare for primitive types
function compare(x, y) {
    return x < y ? -1 : x > y ? 1 : 0;
}
function strictEqual(a, b) {
    return a === b;
}
/**
 * @category instances
 * @since 2.0.0
 */
export var ordString = {
    equals: strictEqual,
    compare: compare
};
/**
 * @category instances
 * @since 2.0.0
 */
export var ordNumber = {
    equals: strictEqual,
    compare: compare
};
/**
 * @category instances
 * @since 2.0.0
 */
export var ordBoolean = {
    equals: strictEqual,
    compare: compare
};
// TODO: curry in v3
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
export function lt(O) {
    return function (x, y) { return O.compare(x, y) === -1; };
}
// TODO: curry in v3
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
export function gt(O) {
    return function (x, y) { return O.compare(x, y) === 1; };
}
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
export function leq(O) {
    return function (x, y) { return O.compare(x, y) !== 1; };
}
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
export function geq(O) {
    return function (x, y) { return O.compare(x, y) !== -1; };
}
// TODO: curry in v3
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export function min(O) {
    return function (x, y) { return (O.compare(x, y) === 1 ? y : x); };
}
// TODO: curry in v3
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export function max(O) {
    return function (x, y) { return (O.compare(x, y) === -1 ? y : x); };
}
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
export function clamp(O) {
    var minO = min(O);
    var maxO = max(O);
    return function (low, hi) { return function (x) { return maxO(minO(x, hi), low); }; };
}
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
export function between(O) {
    var lessThanO = lt(O);
    var greaterThanO = gt(O);
    return function (low, hi) { return function (x) { return (lessThanO(x, low) || greaterThanO(x, hi) ? false : true); }; };
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function fromCompare(compare) {
    var optimizedCompare = function (x, y) { return (x === y ? 0 : compare(x, y)); };
    return {
        equals: function (x, y) { return optimizedCompare(x, y) === 0; },
        compare: optimizedCompare
    };
}
/**
 * Use `getMonoid` instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export function getSemigroup() {
    return {
        concat: function (x, y) { return fromCompare(function (a, b) { return monoidOrdering.concat(x.compare(a, b), y.compare(a, b)); }); }
    };
}
/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { contramap, getDualOrd, getMonoid, ordBoolean, ordNumber, ordString } from 'fp-ts/Ord'
 * import { pipe } from 'fp-ts/function'
 * import { fold } from 'fp-ts/Monoid'
 *
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 *   rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   ordString,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   ordNumber,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   ordBoolean,
 *   contramap((p: User) => p.rememberMe)
 * )
 *
 * const M = getMonoid<User>()
 *
 * const users: Array<User> = [
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
 * ]
 *
 * // sort by name, then by age, then by `rememberMe`
 * const O1 = fold(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = fold(M)([getDualOrd(byRememberMe), byName, byAge])
 * assert.deepStrictEqual(sort(O2)(users), [
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * @category instances
 * @since 2.4.0
 */
export function getMonoid() {
    return {
        // tslint:disable-next-line: deprecation
        concat: getSemigroup().concat,
        empty: fromCompare(function () { return 0; })
    };
}
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 *
 * @example
 * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/Ord'
 *
 * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @category instances
 * @since 2.0.0
 */
export function getTupleOrd() {
    var ords = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
    }
    var len = ords.length;
    return fromCompare(function (x, y) {
        var i = 0;
        for (; i < len - 1; i++) {
            var r = ords[i].compare(x[i], y[i]);
            if (r !== 0) {
                return r;
            }
        }
        return ords[i].compare(x[i], y[i]);
    });
}
/**
 * @category combinators
 * @since 2.0.0
 */
export function getDualOrd(O) {
    return fromCompare(function (x, y) { return O.compare(y, x); });
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
    return fromCompare(function (x, y) { return fa.compare(f(x), f(y)); });
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Ord';
/**
 * @category instances
 * @since 2.0.0
 */
export var ordDate = 
/*#__PURE__*/
pipe(ordNumber, contramap(function (date) { return date.valueOf(); }));
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
export var ord = Contravariant;
