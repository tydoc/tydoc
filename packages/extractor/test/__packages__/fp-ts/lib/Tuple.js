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
exports.tuple = exports.Traversable = exports.Foldable = exports.Comonad = exports.Semigroupoid = exports.Bifunctor = exports.Functor = exports.URI = exports.sequence = exports.traverse = exports.reduceRight = exports.reduce = exports.map = exports.foldMap = exports.extract = exports.extend = exports.duplicate = exports.compose = exports.mapLeft = exports.bimap = exports.getChainRec = exports.getMonad = exports.getChain = exports.getApplicative = exports.getApply = exports.swap = exports.snd = exports.fst = void 0;
var RT = __importStar(require("./ReadonlyTuple"));
// tslint:disable:readonly-array
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.0.0
 */
exports.fst = RT.fst;
/**
 * @category destructors
 * @since 2.0.0
 */
exports.snd = RT.snd;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.swap = RT.swap;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getApply = RT.getApply;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getApplicative = RT.getApplicative;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getChain = RT.getChain;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getMonad = RT.getMonad;
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.getChainRec = RT.getChainRec;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = RT.Functor.map;
var bimap_ = RT.Bifunctor.bimap;
var mapLeft_ = RT.Bifunctor.mapLeft;
var compose_ = RT.Semigroupoid.compose;
var extend_ = RT.Comonad.extend;
var reduce_ = RT.Foldable.reduce;
var foldMap_ = RT.Foldable.foldMap;
var reduceRight_ = RT.Foldable.reduceRight;
var traverse_ = RT.Traversable.traverse;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
exports.bimap = RT.bimap;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
exports.mapLeft = RT.mapLeft;
/**
 * @category Semigroupoid
 * @since 2.0.0
 */
exports.compose = RT.compose;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.duplicate = RT.duplicate;
/**
 * @category Extend
 * @since 2.0.0
 */
exports.extend = RT.extend;
/**
 * @category Extract
 * @since 2.6.2
 */
exports.extract = RT.extract;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.foldMap = RT.foldMap;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
exports.map = RT.map;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduce = RT.reduce;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduceRight = RT.reduceRight;
/**
 * @since 2.6.3
 */
exports.traverse = RT.traverse;
/**
 * @since 2.6.3
 */
exports.sequence = RT.sequence;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Tuple';
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
exports.Bifunctor = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Semigroupoid = {
    URI: exports.URI,
    compose: compose_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Comonad = {
    URI: exports.URI,
    map: map_,
    extend: extend_,
    extract: exports.extract
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.tuple = {
    URI: exports.URI,
    compose: compose_,
    map: map_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    extract: exports.extract,
    extend: extend_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence
};
