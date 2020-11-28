import * as E from './Either';
import { bindTo_, bind_, flow, identity, pipe, constant } from './function';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Reads the current context
 *
 * @category constructors
 * @since 2.0.0
 */
export var ask = function () { return identity; };
/**
 * Projects a value from the global context in a Reader
 *
 * @category constructors
 * @since 2.0.0
 */
export var asks = identity;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 2.0.0
 */
export var local = function (f) { return function (ma) { return function (q) { return ma(f(q)); }; }; };
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var ap_ = function (fab, fa) { return pipe(fab, ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return pipe(ma, chain(f)); };
var compose_ = function (bc, ab) { return pipe(bc, compose(ab)); };
var promap_ = function (fea, f, g) { return pipe(fea, promap(f, g)); };
var first_ = function (pab) { return function (_a) {
    var a = _a[0], c = _a[1];
    return [pab(a), c];
}; };
var second_ = function (pbc) { return function (_a) {
    var a = _a[0], b = _a[1];
    return [a, pbc(b)];
}; };
var left_ = function (pab) {
    return E.fold(function (a) { return E.left(pab(a)); }, E.right);
};
var right_ = function (pbc) {
    return E.fold(E.left, function (b) { return E.right(pbc(b)); });
};
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
export var map = function (f) { return function (fa) { return function (r) { return f(fa(r)); }; }; };
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export var apW = function (fa) { return function (fab) { return function (r) { return fab(r)(fa(r)); }; }; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = apW;
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
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export var chainW = function (f) { return function (fa) { return function (r) { return f(fa(r))(r); }; }; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = chainW;
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
 * @category Semigroupoid
 * @since 2.0.0
 */
export var compose = function (ab) { return function (bc) { return flow(ab, bc); }; };
/**
 * @category Profunctor
 * @since 2.0.0
 */
export var promap = function (f, g) { return function (fea) { return function (a) { return g(fea(f(a))); }; }; };
/**
 * @category Category
 * @since 2.0.0
 */
export var id = function () { return identity; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Reader';
/**
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return {
        concat: function (x, y) { return function (e) { return S.concat(x(e), y(e)); }; }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: function () { return M.empty; }
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
    of: of,
    ap: ap_,
    chain: chain_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Profunctor = {
    URI: URI,
    map: map_,
    promap: promap_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Category = {
    URI: URI,
    compose: compose_,
    id: id
};
/**
 * @category instances
 * @since 2.8.3
 */
export var Strong = {
    URI: URI,
    map: map_,
    promap: promap_,
    first: first_,
    second: second_
};
/**
 * @category instances
 * @since 2.8.3
 */
export var Choice = {
    URI: URI,
    map: map_,
    promap: promap_,
    left: left_,
    right: right_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var reader = {
    URI: URI,
    map: map_,
    of: of,
    ap: ap_,
    chain: chain_,
    promap: promap_,
    compose: compose_,
    id: id,
    first: first_,
    second: second_,
    left: left_,
    right: right_
};
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
export var bindW = function (name, f) {
    return chainW(function (a) {
        return pipe(f(a), map(function (b) { return bind_(a, name, b); }));
    });
};
/**
 * @since 2.8.0
 */
export var bind = bindW;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
export var Do = of({});
/**
 * @since 2.8.0
 */
export var apSW = function (name, fb) {
    return flow(map(function (a) { return function (b) { return bind_(a, name, b); }; }), apW(fb));
};
/**
 * @since 2.8.0
 */
export var apS = apSW;
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 *
 * @since 2.9.0
 */
export var traverseArrayWithIndex = function (f) { return function (arr) { return function (r) { return arr.map(function (x, i) { return f(i, x)(r); }); }; }; };
/**
 * this function have the same behavior of `A.traverse(R.reader)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, Reader } from 'fp-ts/Reader'
 * import { pipe } from 'fp-ts/function'
 *
 * const add: (x: number) => Reader<{value:number}, number> = x => config => x + config.value
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, traverseArray(add))({value: 3}), pipe(arr, RA.map(x => x + 3)))
 *
 * @since 2.9.0
 */
export var traverseArray = function (f) { return traverseArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * this function have the same behavior of `A.sequence(R.reader)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, Reader } from 'fp-ts/Reader'
 * import { pipe } from 'fp-ts/function'
 *
 * const add: (x: number) => Reader<{value:number}, number> = x => config => x + config.value
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, RA.map(add), sequenceArray)({value: 3}), pipe(arr, RA.map(x => x + 3)))
 *
 * @since 2.9.0
 */
export var sequenceArray = traverseArray(identity);
