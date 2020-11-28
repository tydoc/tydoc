"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.apS = exports.bind = exports.bindTo = exports.execute = exports.evaluate = exports.execState = exports.evalState = exports.state = exports.Monad = exports.Applicative = exports.Functor = exports.URI = exports.flatten = exports.chainFirst = exports.chain = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.map = exports.gets = exports.modify = exports.put = exports.get = void 0;
/**
 * @since 2.0.0
 */
var function_1 = require("./function");
/* tslint:enable:readonly-array */
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Get the current state
 *
 * @category constructors
 * @since 2.0.0
 */
var get = function () { return function (s) { return [s, s]; }; };
exports.get = get;
/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
var put = function (s) { return function () { return [undefined, s]; }; };
exports.put = put;
/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
var modify = function (f) { return function (s) { return [undefined, f(s)]; }; };
exports.modify = modify;
/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
var gets = function (f) { return function (s) { return [f(s), s]; }; };
exports.gets = gets;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var ap_ = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function (f) { return function (fa) { return function (s1) {
    var _a = fa(s1), a = _a[0], s2 = _a[1];
    return [f(a), s2];
}; }; };
exports.map = map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
var ap = function (fa) { return function (fab) { return function (s1) {
    var _a = fab(s1), f = _a[0], s2 = _a[1];
    var _b = fa(s2), a = _b[0], s3 = _b[1];
    return [f(a), s3];
}; }; };
exports.ap = ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apFirst = function (fb) {
    return function_1.flow(exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
};
exports.apFirst = apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apSecond = function (fb) {
    return function_1.flow(exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
};
exports.apSecond = apSecond;
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
var of = function (a) { return function (s) { return [a, s]; }; };
exports.of = of;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = function (f) { return function (ma) { return function (s1) {
    var _a = ma(s1), a = _a[0], s2 = _a[1];
    return f(a)(s2);
}; }; };
exports.chain = chain;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
var chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
exports.chainFirst = chainFirst;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'State';
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.state = exports.Monad;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
var evalState = function (ma, s) { return ma(s)[0]; };
exports.evalState = evalState;
/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
var execState = function (ma, s) { return ma(s)[1]; };
exports.execState = execState;
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.8.0
 */
var evaluate = function (s) { return function (ma) { return ma(s)[0]; }; };
exports.evaluate = evaluate;
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.8.0
 */
var execute = function (s) { return function (ma) { return ma(s)[1]; }; };
exports.execute = execute;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
var bindTo = function (name) {
    return exports.map(function_1.bindTo_(name));
};
exports.bindTo = bindTo;
/**
 * @since 2.8.0
 */
var bind = function (name, f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function (b) { return function_1.bind_(a, name, b); }));
    });
};
exports.bind = bind;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
var apS = function (name, fb) {
    return function_1.flow(exports.map(function (a) { return function (b) { return function_1.bind_(a, name, b); }; }), exports.ap(fb));
};
exports.apS = apS;
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
var traverseArrayWithIndex = function (f) { return function (arr) { return function (s) {
    var lastState = s;
    // tslint:disable-next-line: readonly-array
    var values = [];
    for (var i = 0; i < arr.length; i++) {
        var _a = f(i, arr[i])(lastState), newValue = _a[0], newState = _a[1];
        values.push(newValue);
        lastState = newState;
    }
    return [values, lastState];
}; }; };
exports.traverseArrayWithIndex = traverseArrayWithIndex;
/**
 * This function has the same behavior of `A.traverse(S.State)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, State } from 'fp-ts/State'
 * import { pipe, tuple } from 'fp-ts/function'
 *
 * const add = (n: number): State<number, number> => (s: number) => tuple(n, n + s)
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, traverseArray(add))(0), [arr, arr.reduce((p, c) => p + c, 0)])
 *
 * @since 2.9.0
 */
var traverseArray = function (f) { return exports.traverseArrayWithIndex(function (_, a) { return f(a); }); };
exports.traverseArray = traverseArray;
/**
 * This function has the same behavior of `A.sequence(S.State)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, State } from 'fp-ts/State'
 * import { pipe, tuple } from 'fp-ts/function'
 *
 * const add = (n: number): State<number, number> => (s: number) => tuple(n, n + s)
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, RA.map(add), sequenceArray)(0), [arr, arr.reduce((p, c) => p + c, 0)])
 *
 * @since 2.9.0
 */
exports.sequenceArray = exports.traverseArray(function_1.identity);
