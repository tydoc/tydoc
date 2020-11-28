/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * concat(x, concat(y, z)) = concat(concat(x, y), z)
 * ```
 *
 * A common example of a semigroup is the type `string` with the operation `+`.
 *
 * ```ts
 * import { Semigroup } from 'fp-ts/Semigroup'
 *
 * const semigroupString: Semigroup<string> = {
 *   concat: (x, y) => x + y
 * }
 *
 * const x = 'x'
 * const y = 'y'
 * const z = 'z'
 *
 * semigroupString.concat(x, y) // 'xy'
 *
 * semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'
 *
 * semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
 * ```
 *
 * *Adapted from https://typelevel.org/cats*
 *
 * @since 2.0.0
 */
import { identity } from './function';
import { max, min } from './Ord';
export function fold(S) {
    return function (startWith, as) {
        if (as === undefined) {
            var foldS_1 = fold(S);
            return function (as) { return foldS_1(startWith, as); };
        }
        return as.reduce(S.concat, startWith);
    };
}
/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.getFirstSemigroup<number>().concat(1, 2), 1)
 *
 * @category instances
 * @since 2.0.0
 */
export function getFirstSemigroup() {
    return { concat: identity };
}
/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.getLastSemigroup<number>().concat(1, 2), 2)
 *
 * @category instances
 * @since 2.0.0
 */
export function getLastSemigroup() {
    return { concat: function (_, y) { return y; } };
}
/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.getTupleSemigroup(S.semigroupString, S.semigroupSum)
 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const S2 = S.getTupleSemigroup(S.semigroupString, S.semigroupSum, S.semigroupAll)
 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @category instances
 * @since 2.0.0
 */
export function getTupleSemigroup() {
    var semigroups = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        semigroups[_i] = arguments[_i];
    }
    return {
        concat: function (x, y) { return semigroups.map(function (s, i) { return s.concat(x[i], y[i]); }); }
    };
}
/**
 * The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.getDualSemigroup(S.semigroupString).concat('a', 'b'), 'ba')
 *
 * @category instances
 * @since 2.0.0
 */
export function getDualSemigroup(S) {
    return {
        concat: function (x, y) { return S.concat(y, x); }
    };
}
/**
 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/function'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const S1 = S.getFunctionSemigroup(S.semigroupAll)<number>()
 *
 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
 *
 * const S2 = S.getFunctionSemigroup(S.semigroupAny)<number>()
 *
 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.0.0
 */
export function getFunctionSemigroup(S) {
    return function () { return ({
        concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
    }); };
}
/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const semigroupPoint = S.getStructSemigroup<Point>({
 *   x: S.semigroupSum,
 *   y: S.semigroupSum
 * })
 *
 * assert.deepStrictEqual(semigroupPoint.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category instances
 * @since 2.0.0
 */
export function getStructSemigroup(semigroups) {
    return {
        concat: function (x, y) {
            var r = {};
            for (var _i = 0, _a = Object.keys(semigroups); _i < _a.length; _i++) {
                var key = _a[_i];
                r[key] = semigroups[key].concat(x[key], y[key]);
            }
            return r;
        }
    };
}
/**
 * Get a semigroup where `concat` will return the minimum, based on the provided order.
 *
 * @example
 * import * as O from 'fp-ts/Ord'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.getMeetSemigroup(O.ordNumber)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 1)
 *
 * @category instances
 * @since 2.0.0
 */
export function getMeetSemigroup(O) {
    return {
        concat: min(O)
    };
}
/**
 * Get a semigroup where `concat` will return the maximum, based on the provided order.
 *
 * @example
 * import * as O from 'fp-ts/Ord'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.getJoinSemigroup(O.ordNumber)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 2)
 *
 * @category instances
 * @since 2.0.0
 */
export function getJoinSemigroup(O) {
    return {
        concat: max(O)
    };
}
/**
 * Return a semigroup for objects, preserving their type.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const S1 = S.getObjectSemigroup<Person>()
 * assert.deepStrictEqual(S1.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 2.0.0
 */
export function getObjectSemigroup() {
    return {
        concat: function (x, y) { return Object.assign({}, x, y); }
    };
}
/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupAll.concat(true, true), true)
 * assert.deepStrictEqual(S.semigroupAll.concat(true, false), false)
 *
 * @category instances
 * @since 2.0.0
 */
export var semigroupAll = {
    concat: function (x, y) { return x && y; }
};
/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupAny.concat(true, true), true)
 * assert.deepStrictEqual(S.semigroupAny.concat(true, false), true)
 * assert.deepStrictEqual(S.semigroupAny.concat(false, false), false)
 *
 * @category instances
 * @since 2.0.0
 */
export var semigroupAny = {
    concat: function (x, y) { return x || y; }
};
/**
 * `number` semigroup under addition.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupSum.concat(2, 3), 5)
 *
 * @category instances
 * @since 2.0.0
 */
export var semigroupSum = {
    concat: function (x, y) { return x + y; }
};
/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupProduct.concat(2, 3), 6)
 *
 * @category instances
 * @since 2.0.0
 */
export var semigroupProduct = {
    concat: function (x, y) { return x * y; }
};
/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupString.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.0.0
 */
export var semigroupString = {
    concat: function (x, y) { return x + y; }
};
/**
 * @category instances
 * @since 2.0.0
 */
export var semigroupVoid = {
    concat: function () { return undefined; }
};
/**
 * You can glue items between and stay associative.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.getIntercalateSemigroup(' ')(S.semigroupString)
 *
 * assert.strictEqual(S1.concat('a', 'b'), 'a b')
 * assert.strictEqual(S1.concat(S1.concat('a', 'b'), 'c'), S1.concat('a', S1.concat('b', 'c')))
 *
 * @category instances
 * @since 2.5.0
 */
export function getIntercalateSemigroup(a) {
    return function (S) { return ({
        concat: function (x, y) { return S.concat(x, S.concat(a, y)); }
    }); };
}
