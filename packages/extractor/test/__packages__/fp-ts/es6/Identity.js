import { tailRec } from './ChainRec';
import { identity as id, pipe, bind_, bindTo_, flow } from './function';
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return pipe(fa, map(f)); };
var ap_ = function (fab, fa) { return pipe(fab, ap(fa)); };
var chain_ = function (ma, f) { return pipe(ma, chain(f)); };
/* istanbul ignore next */
var reduce_ = function (fa, b, f) { return pipe(fa, reduce(b, f)); };
/* istanbul ignore next */
var foldMap_ = function (M) { return function (fa, f) { return pipe(fa, foldMap(M)(f)); }; };
/* istanbul ignore next */
var reduceRight_ = function (fa, b, f) { return pipe(fa, reduceRight(b, f)); };
/* istanbul ignore next */
var alt_ = function (fa, that) { return pipe(fa, alt(that)); };
/* istanbul ignore next */
var extend_ = function (wa, f) { return pipe(wa, extend(f)); };
/* istanbul ignore next */
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return pipe(ta, traverseF(f)); };
};
var chainRec_ = tailRec;
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
export var map = function (f) { return function (fa) { return f(fa); }; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return fab(fa); }; };
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
export var of = id;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) { return f(ma); }; };
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
 * @category Extend
 * @since 2.0.0
 */
export var extend = function (f) { return function (wa) { return f(wa); }; };
/**
 * @category Extract
 * @since 2.6.2
 */
export var extract = id;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var duplicate = 
/*#__PURE__*/
extend(id);
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var flatten = 
/*#__PURE__*/
chain(id);
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduce = function (b, f) { return function (fa) { return f(b, fa); }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var foldMap = function () { return function (f) { return function (fa) { return f(fa); }; }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduceRight = function (b, f) { return function (fa) { return f(fa, b); }; };
/**
 * @since 2.6.3
 */
export var traverse = function (F) { return function (f) { return function (ta) { return F.map(f(ta), id); }; }; };
/**
 * @since 2.6.3
 */
export var sequence = function (F) { return function (ta) {
    return F.map(ta, id);
}; };
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export var altW = function () { return id; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export var alt = altW;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Identity';
/**
 * @category instances
 * @since 2.0.0
 */
export var getShow = id;
/**
 * @category instances
 * @since 2.0.0
 */
export var getEq = id;
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
export var Foldable = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Traversable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Alt = {
    URI: URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Comonad = {
    URI: URI,
    map: map_,
    extend: extend_,
    extract: extract
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
export var identity = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    alt: alt_,
    extract: extract,
    extend: extend_,
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
