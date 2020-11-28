"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJoinMonoid = exports.getMeetMonoid = exports.getStructMonoid = exports.getEndomorphismMonoid = exports.getFunctionMonoid = exports.getDualMonoid = exports.getTupleMonoid = exports.fold = exports.monoidVoid = exports.monoidString = exports.monoidProduct = exports.monoidSum = exports.monoidAny = exports.monoidAll = void 0;
var function_1 = require("./function");
var S = __importStar(require("./Semigroup"));
/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidAll.concat(true, true), true)
 * assert.deepStrictEqual(M.monoidAll.concat(true, false), false)
 *
 * @category instances
 * @since 2.0.0
 */
exports.monoidAll = {
    concat: S.semigroupAll.concat,
    empty: true
};
/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidAny.concat(true, true), true)
 * assert.deepStrictEqual(M.monoidAny.concat(true, false), true)
 * assert.deepStrictEqual(M.monoidAny.concat(false, false), false)
 *
 * @category instances
 * @since 2.0.0
 */
exports.monoidAny = {
    concat: S.semigroupAny.concat,
    empty: false
};
/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidSum.concat(2, 3), 5)
 *
 * @category instances
 * @since 2.0.0
 */
exports.monoidSum = {
    concat: S.semigroupSum.concat,
    empty: 0
};
/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidProduct.concat(2, 3), 6)
 *
 * @category instances
 * @since 2.0.0
 */
exports.monoidProduct = {
    concat: S.semigroupProduct.concat,
    empty: 1
};
/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidString.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.0.0
 */
exports.monoidString = {
    concat: S.semigroupString.concat,
    empty: ''
};
/**
 * @category instances
 * @since 2.0.0
 */
exports.monoidVoid = {
    concat: S.semigroupVoid.concat,
    empty: undefined
};
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the monoid `empty` value.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.fold(M.monoidSum)([1, 2, 3]), 6)
 * assert.deepStrictEqual(M.fold(M.monoidSum)([]), 0)
 *
 * @since 2.0.0
 */
function fold(M) {
    return S.fold(M)(M.empty);
}
exports.fold = fold;
/**
 * Given a tuple of monoids returns a monoid for the tuple
 *
 * @example
 * import { getTupleMonoid, monoidString, monoidSum, monoidAll } from 'fp-ts/Monoid'
 *
 * const M1 = getTupleMonoid(monoidString, monoidSum)
 * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
 * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @category instances
 * @since 2.0.0
 */
function getTupleMonoid() {
    var monoids = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        monoids[_i] = arguments[_i];
    }
    return {
        concat: S.getTupleSemigroup.apply(S, monoids).concat,
        empty: monoids.map(function (m) { return m.empty; })
    };
}
exports.getTupleMonoid = getTupleMonoid;
/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { getDualMonoid, monoidString } from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(getDualMonoid(monoidString).concat('a', 'b'), 'ba')
 *
 * @category combinators
 * @since 2.0.0
 */
function getDualMonoid(M) {
    return {
        concat: S.getDualSemigroup(M).concat,
        empty: M.empty
    };
}
exports.getDualMonoid = getDualMonoid;
/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/function'
 * import * as M from 'fp-ts/Monoid'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = M.getFunctionMonoid(M.monoidAll)<number>()
 *
 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
 *
 * const M2 = M.getFunctionMonoid(M.monoidAny)<number>()
 *
 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.0.0
 */
function getFunctionMonoid(M) {
    return function () { return ({
        concat: S.getFunctionSemigroup(M)().concat,
        empty: function () { return M.empty; }
    }); };
}
exports.getFunctionMonoid = getFunctionMonoid;
// TODO: swap execution order in v3
/**
 * Endomorphism form a monoid where the `empty` value is the identity function.
 *
 * @category instances
 * @since 2.0.0
 */
function getEndomorphismMonoid() {
    return {
        concat: function (x, y) { return function (a) { return x(y(a)); }; },
        empty: function_1.identity
    };
}
exports.getEndomorphismMonoid = getEndomorphismMonoid;
/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const monoidPoint = M.getStructMonoid<Point>({
 *   x: M.monoidSum,
 *   y: M.monoidSum
 * })
 *
 * assert.deepStrictEqual(monoidPoint.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category instances
 * @since 2.0.0
 */
function getStructMonoid(monoids) {
    var empty = {};
    for (var _i = 0, _a = Object.keys(monoids); _i < _a.length; _i++) {
        var key = _a[_i];
        empty[key] = monoids[key].empty;
    }
    return {
        concat: S.getStructSemigroup(monoids).concat,
        empty: empty
    };
}
exports.getStructMonoid = getStructMonoid;
/**
 * Get a monoid where `concat` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `top` value.
 *
 * @example
 * import * as B from 'fp-ts/Bounded'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.getMeetMonoid(B.boundedNumber)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 1)
 *
 * @category instances
 * @since 2.0.0
 */
function getMeetMonoid(B) {
    return {
        concat: S.getMeetSemigroup(B).concat,
        empty: B.top
    };
}
exports.getMeetMonoid = getMeetMonoid;
/**
 * Get a monoid where `concat` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `bottom` value.
 *
 * @example
 * import * as B from 'fp-ts/Bounded'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.getJoinMonoid(B.boundedNumber)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 2)
 *
 * @category instances
 * @since 2.0.0
 */
function getJoinMonoid(B) {
    return {
        concat: S.getJoinSemigroup(B).concat,
        empty: B.bottom
    };
}
exports.getJoinMonoid = getJoinMonoid;
