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
exports.taskThese = exports.bifunctorTaskThese = exports.functorTaskThese = exports.getMonad = exports.getApplicative = exports.getSemigroup = exports.URI = exports.fromTask = exports.fromIO = exports.of = exports.mapLeft = exports.bimap = exports.map = exports.swap = exports.toTuple = exports.fold = exports.fromIOEither = exports.leftIO = exports.rightIO = exports.leftTask = exports.rightTask = exports.both = exports.right = exports.left = void 0;
var function_1 = require("./function");
var T = __importStar(require("./Task"));
var TH = __importStar(require("./These"));
/**
 * @category constructors
 * @since 2.4.0
 */
exports.left = 
/*#__PURE__*/
function_1.flow(TH.left, T.of);
/**
 * @category constructors
 * @since 2.4.0
 */
exports.right = 
/*#__PURE__*/
function_1.flow(TH.right, T.of);
/**
 * @category constructors
 * @since 2.4.0
 */
exports.both = 
/*#__PURE__*/
function_1.flow(TH.both, T.of);
/**
 * @category constructors
 * @since 2.4.0
 */
exports.rightTask = 
/*#__PURE__*/
T.map(TH.right);
/**
 * @category constructors
 * @since 2.4.0
 */
exports.leftTask = 
/*#__PURE__*/
T.map(TH.left);
/**
 * @category constructors
 * @since 2.4.0
 */
exports.rightIO = 
/*#__PURE__*/
function_1.flow(T.fromIO, exports.rightTask);
/**
 * @category constructors
 * @since 2.4.0
 */
exports.leftIO = 
/*#__PURE__*/
function_1.flow(T.fromIO, exports.leftTask);
/**
 * @category constructors
 * @since 2.4.0
 */
exports.fromIOEither = 
/*#__PURE__*/
T.fromIO;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.4.0
 */
exports.fold = 
/*#__PURE__*/
function_1.flow(TH.fold, T.chain);
// TODO: make lazy in v3
/* tslint:disable:readonly-array */
/**
 * @category destructors
 * @since 2.4.0
 */
exports.toTuple = 
/*#__PURE__*/
function_1.flow(TH.toTuple, T.map);
/* tslint:enable:readonly-array */
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.4.0
 */
exports.swap = 
/*#__PURE__*/
T.map(TH.swap);
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return function_1.pipe(fa, exports.bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return function_1.pipe(fa, exports.mapLeft(f)); };
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
var map = function (f) { return T.map(TH.map(f)); };
exports.map = map;
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
var bimap = function (f, g) {
    return T.map(TH.bimap(f, g));
};
exports.bimap = bimap;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
var mapLeft = function (f) {
    return T.map(TH.mapLeft(f));
};
exports.mapLeft = mapLeft;
/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.7.0
 */
exports.of = exports.right;
/**
 * @category MonadIO
 * @since 2.7.0
 */
exports.fromIO = exports.rightIO;
/**
 * @category MonadIO
 * @since 2.7.0
 */
exports.fromTask = exports.rightTask;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.4.0
 */
exports.URI = 'TaskThese';
/**
 * @category instances
 * @since 2.4.0
 */
function getSemigroup(SE, SA) {
    return T.getSemigroup(TH.getSemigroup(SE, SA));
}
exports.getSemigroup = getSemigroup;
/**
 * @category instances
 * @since 2.7.0
 */
function getApplicative(A, SE) {
    var AV = TH.getApplicative(SE);
    var ap = function (fga) { return function (fgab) {
        return A.ap(A.map(fgab, function (h) { return function (ga) { return AV.ap(h, ga); }; }), fga);
    }; };
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return function_1.pipe(fab, ap(fa)); },
        of: exports.of
    };
}
exports.getApplicative = getApplicative;
// TODO: remove in v3 in favour of a non-constrained Monad / MonadTask instance
/**
 * @category instances
 * @since 2.4.0
 */
function getMonad(SE) {
    var A = getApplicative(T.ApplicativePar, SE);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: A.ap,
        of: exports.of,
        chain: function (ma, f) {
            return function_1.pipe(ma, T.chain(TH.fold(exports.left, f, function (e1, a) {
                return function_1.pipe(f(a), T.map(TH.fold(function (e2) { return TH.left(SE.concat(e1, e2)); }, function (b) { return TH.both(e1, b); }, function (e2, b) { return TH.both(SE.concat(e1, e2), b); })));
            })));
        },
        fromIO: exports.fromIO,
        fromTask: exports.fromTask
    };
}
exports.getMonad = getMonad;
/**
 * @category instances
 * @since 2.7.0
 */
exports.functorTaskThese = {
    URI: exports.URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.bifunctorTaskThese = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.4.0
 */
exports.taskThese = {
    URI: exports.URI,
    map: map_,
    bimap: bimap_,
    mapLeft: mapLeft_
};
