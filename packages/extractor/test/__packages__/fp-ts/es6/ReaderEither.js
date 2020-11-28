import * as E from './Either';
import { bindTo_, bind_, flow, identity, pipe } from './function';
import * as R from './Reader';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
export var left = 
/*#__PURE__*/
flow(E.left, R.of);
/**
 * @category constructors
 * @since 2.0.0
 */
export var right = 
/*#__PURE__*/
flow(E.right, R.of);
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightReader = 
/*#__PURE__*/
R.map(E.right);
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftReader = 
/*#__PURE__*/
R.map(E.left);
/**
 * @category constructors
 * @since 2.0.0
 */
export var ask = function () { return E.right; };
/**
 * @category constructors
 * @since 2.0.0
 */
export var asks = function (f) { return flow(f, E.right); };
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromEither = 
/*#__PURE__*/
E.fold(left, function (a) { return right(a); });
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? left(onNone()) : right(ma.value);
}; };
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }; };
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.0.0
 */
export var fold = 
/*#__PURE__*/
flow(E.fold, R.chain);
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export var getOrElseW = function (onLeft) { return function (ma) { return pipe(ma, R.chain(E.fold(onLeft, R.of))); }; };
/**
 * @category destructors
 * @since 2.0.0
 */
export var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.0.0
 */
export var orElse = function (f) { return R.chain(E.fold(f, right)); };
/**
 * @category combinators
 * @since 2.0.0
 */
export var swap = 
/*#__PURE__*/
R.map(E.swap);
// TODO: remove in v3
/**
 * @category combinators
 * @since 2.0.0
 */
export function local(f) {
    return function (ma) { return function (q) { return ma(f(q)); }; };
}
/**
 * @category combinators
 * @since 2.4.0
 */
export function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromEither(f.apply(void 0, a));
    };
}
/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export var chainEitherKW = function (f) { return chainW(fromEitherK(f)); };
/**
 * @category combinators
 * @since 2.4.0
 */
export var chainEitherK = chainEitherKW;
/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
export var filterOrElseW = function (predicate, onFalse) {
    return chainW(function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); });
};
/**
 * Derivable from `MonadThrow`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var filterOrElse = filterOrElseW;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return pipe(fa, mapLeft(f)); };
/* istanbul ignore next */
var ap_ = function (fab, fa) { return pipe(fab, ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return pipe(ma, chain(f)); };
/* istanbul ignore next */
var alt_ = function (fa, that) { return pipe(fa, alt(that)); };
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
export var map = function (f) {
    return R.map(E.map(f));
};
/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export var bimap = 
/*#__PURE__*/
flow(E.bimap, R.map);
/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export var mapLeft = function (f) {
    return R.map(E.mapLeft(f));
};
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export var apW = function (fa) {
    return flow(R.map(function (gab) { return function (ga) { return E.apW(ga)(gab); }; }), R.apW(fa));
};
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
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.8.5
 */
export var of = right;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export var chainW = function (f) { return function (ma) { return pipe(ma, R.chain(E.fold(left, f))); }; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = chainW;
/**
 * Less strict version of [`chainFirst`](#chainFirst)
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export var chainFirstW = function (f) {
    return chainW(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var chainFirst = chainFirstW;
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
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export var altW = function (that) { return function (fa) {
    return pipe(fa, R.chain(E.fold(that, right)));
}; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export var alt = altW;
/**
 * @category MonadThrow
 * @since 2.7.0
 */
export var throwError = left;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'ReaderEither';
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return R.getSemigroup(E.getSemigroup(S));
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return R.getSemigroup(E.getApplySemigroup(S));
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: right(M.empty)
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicativeReaderValidation(SE) {
    var AV = E.getApplicativeValidation(SE);
    var ap = function (fga) {
        return flow(R.map(function (gab) { return function (ga) { return AV.ap(gab, ga); }; }), R.ap(fga));
    };
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return pipe(fab, ap(fa)); },
        of: of
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export function getAltReaderValidation(SE) {
    var A = E.getAltValidation(SE);
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        alt: function (me, that) { return function (r) { return A.alt(me(r), function () { return that()(r); }); }; }
    };
}
// TODO: remove in v3
/**
 * @category instances
 * @since 2.3.0
 */
export function getReaderValidation(SE) {
    var applicativeReaderValidation = getApplicativeReaderValidation(SE);
    var altReaderValidation = getAltReaderValidation(SE);
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: applicativeReaderValidation.ap,
        of: of,
        chain: chain_,
        bimap: bimap_,
        mapLeft: mapLeft_,
        alt: altReaderValidation.alt,
        throwError: throwError
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
export var Bifunctor = {
    URI: URI,
    bimap: bimap_,
    mapLeft: mapLeft_
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
export var MonadThrow = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    throwError: throwError
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var readerEither = {
    URI: URI,
    bimap: bimap_,
    mapLeft: mapLeft_,
    map: map_,
    of: of,
    ap: ap_,
    chain: chain_,
    alt: alt_,
    throwError: left
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
 * @since 2.9.0
 */
export var traverseArrayWithIndex = function (f) {
    return flow(R.traverseArrayWithIndex(f), R.map(E.sequenceArray));
};
/**
 * @since 2.9.0
 */
export var traverseArray = function (f) { return traverseArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * @since 2.9.0
 */
export var sequenceArray = traverseArray(identity);
