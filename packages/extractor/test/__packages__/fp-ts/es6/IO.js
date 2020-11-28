import { identity, pipe, bind_, bindTo_, flow, constant } from './function';
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (ma, f) { return function () { return f(ma()); }; };
var ap_ = function (mab, ma) { return function () { return mab()(ma()); }; };
var chain_ = function (ma, f) { return function () { return f(ma())(); }; };
var chainRec_ = function (a, f) { return function () {
    var e = f(a)();
    while (e._tag === 'Left') {
        e = f(e.left)();
    }
    return e.right;
}; };
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
export var map = function (f) { return function (fa) { return map_(fa, f); }; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return ap_(fab, fa); }; };
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
export var of = constant;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) { return chain_(ma, f); }; };
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
/**
 * @category MonadIO
 * @since 2.7.0
 */
export var fromIO = identity;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'IO';
/**
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return S.concat(x(), y()); }; }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: of(M.empty)
    };
}
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
/**
 * @category instances
 * @since 2.7.0
 */
export var MonadIO = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    fromIO: fromIO
};
/**
 * @category instances
 * @since 2.7.0
 */
export var ChainRec = {
    URI: URI,
    map: map_,
    ap: ap_,
    chain: chain_,
    chainRec: chainRec_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var io = {
    URI: URI,
    map: map_,
    of: of,
    ap: ap_,
    chain: chain_,
    fromIO: fromIO,
    chainRec: chainRec_
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
export var Do = of({});
/**
 * @since 2.8.0
 */
export var bindTo = function (name) { return map(bindTo_(name)); };
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
export var traverseArrayWithIndex = function (f) { return function (arr) { return function () { return arr.map(function (a, i) { return f(i, a)(); }); }; }; };
/**
 * runs an action for every element in array, and accumulates the results IO in the array.
 *
 * this function have the same behavior of `A.traverse(IO.io)` but it's stack safe
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, IO } from 'fp-ts/IO'
 * import { pipe } from 'fp-ts/function'
 *
 * const logger: Array<unknown> = []
 * const log: <A>(a: A) => IO<void> = (a) => () => { logger.push(a) }
 *
 * pipe(RA.range(0, 100), traverseArray(log))()
 * assert.deepStrictEqual(logger, RA.range(0, 100))
 *
 * @since 2.9.0
 */
export var traverseArray = function (f) {
    return traverseArrayWithIndex(function (_, a) { return f(a); });
};
/**
 * transform Array of IO to IO of Array
 *
 * this function have the same behavior of `A.sequence(IO.io)` but it's stack safe
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, IO } from 'fp-ts/IO'
 * import { pipe } from 'fp-ts/function'
 *
 * const logger: Array<unknown> = []
 * const log: <A>(a: A) => IO<void> = (a) => () => { logger.push(a) }
 *
 * pipe(RA.range(0, 100), RA.map(log), sequenceArray)()
 * assert.deepStrictEqual(logger, RA.range(0, 100))
 *
 * @since 2.9.0
 */
export var sequenceArray = traverseArray(identity);
