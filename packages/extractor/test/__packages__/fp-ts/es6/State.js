/**
 * @since 2.0.0
 */
import { identity, pipe, bind_, bindTo_, flow } from './function';
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
export var get = function () { return function (s) { return [s, s]; }; };
/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
export var put = function (s) { return function () { return [undefined, s]; }; };
/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export var modify = function (f) { return function (s) { return [undefined, f(s)]; }; };
/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export var gets = function (f) { return function (s) { return [f(s), s]; }; };
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var ap_ = function (fab, fa) { return pipe(fab, ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return pipe(ma, chain(f)); };
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
export var map = function (f) { return function (fa) { return function (s1) {
    var _a = fa(s1), a = _a[0], s2 = _a[1];
    return [f(a), s2];
}; }; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return function (s1) {
    var _a = fab(s1), f = _a[0], s2 = _a[1];
    var _b = fa(s2), a = _b[0], s3 = _b[1];
    return [f(a), s3];
}; }; };
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var apFirst = function (fb) {
    return flow(map(function (a) { return function () { return a; }; }), ap(fb));
};
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var apSecond = function (fb) {
    return flow(map(function () { return function (b) { return b; }; }), ap(fb));
};
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export var of = function (a) { return function (s) { return [a, s]; }; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) { return function (s1) {
    var _a = ma(s1), a = _a[0], s2 = _a[1];
    return f(a)(s2);
}; }; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var flatten = 
/*#__PURE__*/
chain(identity);
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'State';
/**
 * @category instances
 * @since 2.7.0
 */
export var Functor = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Applicative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Monad = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var state = Monad;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export var evalState = function (ma, s) { return ma(s)[0]; };
/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export var execState = function (ma, s) { return ma(s)[1]; };
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.8.0
 */
export var evaluate = function (s) { return function (ma) { return ma(s)[0]; }; };
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.8.0
 */
export var execute = function (s) { return function (ma) { return ma(s)[1]; }; };
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
export var bindTo = function (name) {
    return map(bindTo_(name));
};
/**
 * @since 2.8.0
 */
export var bind = function (name, f) {
    return chain(function (a) {
        return pipe(f(a), map(function (b) { return bind_(a, name, b); }));
    });
};
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
export var apS = function (name, fb) {
    return flow(map(function (a) { return function (b) { return bind_(a, name, b); }; }), ap(fb));
};
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
export var traverseArrayWithIndex = function (f) { return function (arr) { return function (s) {
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
export var traverseArray = function (f) { return traverseArrayWithIndex(function (_, a) { return f(a); }); };
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
export var sequenceArray = traverseArray(identity);
