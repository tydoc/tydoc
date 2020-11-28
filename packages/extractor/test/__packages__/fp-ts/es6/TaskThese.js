import { flow, pipe } from './function';
import * as T from './Task';
import * as TH from './These';
/**
 * @category constructors
 * @since 2.4.0
 */
export var left = 
/*#__PURE__*/
flow(TH.left, T.of);
/**
 * @category constructors
 * @since 2.4.0
 */
export var right = 
/*#__PURE__*/
flow(TH.right, T.of);
/**
 * @category constructors
 * @since 2.4.0
 */
export var both = 
/*#__PURE__*/
flow(TH.both, T.of);
/**
 * @category constructors
 * @since 2.4.0
 */
export var rightTask = 
/*#__PURE__*/
T.map(TH.right);
/**
 * @category constructors
 * @since 2.4.0
 */
export var leftTask = 
/*#__PURE__*/
T.map(TH.left);
/**
 * @category constructors
 * @since 2.4.0
 */
export var rightIO = 
/*#__PURE__*/
flow(T.fromIO, rightTask);
/**
 * @category constructors
 * @since 2.4.0
 */
export var leftIO = 
/*#__PURE__*/
flow(T.fromIO, leftTask);
/**
 * @category constructors
 * @since 2.4.0
 */
export var fromIOEither = 
/*#__PURE__*/
T.fromIO;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.4.0
 */
export var fold = 
/*#__PURE__*/
flow(TH.fold, T.chain);
// TODO: make lazy in v3
/* tslint:disable:readonly-array */
/**
 * @category destructors
 * @since 2.4.0
 */
export var toTuple = 
/*#__PURE__*/
flow(TH.toTuple, T.map);
/* tslint:enable:readonly-array */
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.4.0
 */
export var swap = 
/*#__PURE__*/
T.map(TH.swap);
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return pipe(fa, mapLeft(f)); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.4.0
 */
export var map = function (f) { return T.map(TH.map(f)); };
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export var bimap = function (f, g) {
    return T.map(TH.bimap(f, g));
};
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export var mapLeft = function (f) {
    return T.map(TH.mapLeft(f));
};
/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.7.0
 */
export var of = right;
/**
 * @category MonadIO
 * @since 2.7.0
 */
export var fromIO = rightIO;
/**
 * @category MonadIO
 * @since 2.7.0
 */
export var fromTask = rightTask;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.4.0
 */
export var URI = 'TaskThese';
/**
 * @category instances
 * @since 2.4.0
 */
export function getSemigroup(SE, SA) {
    return T.getSemigroup(TH.getSemigroup(SE, SA));
}
/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicative(A, SE) {
    var AV = TH.getApplicative(SE);
    var ap = function (fga) { return function (fgab) {
        return A.ap(A.map(fgab, function (h) { return function (ga) { return AV.ap(h, ga); }; }), fga);
    }; };
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return pipe(fab, ap(fa)); },
        of: of
    };
}
// TODO: remove in v3 in favour of a non-constrained Monad / MonadTask instance
/**
 * @category instances
 * @since 2.4.0
 */
export function getMonad(SE) {
    var A = getApplicative(T.ApplicativePar, SE);
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: A.ap,
        of: of,
        chain: function (ma, f) {
            return pipe(ma, T.chain(TH.fold(left, f, function (e1, a) {
                return pipe(f(a), T.map(TH.fold(function (e2) { return TH.left(SE.concat(e1, e2)); }, function (b) { return TH.both(e1, b); }, function (e2, b) { return TH.both(SE.concat(e1, e2), b); })));
            })));
        },
        fromIO: fromIO,
        fromTask: fromTask
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export var functorTaskThese = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var bifunctorTaskThese = {
    URI: URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.4.0
 */
export var taskThese = {
    URI: URI,
    map: map_,
    bimap: bimap_,
    mapLeft: mapLeft_
};
