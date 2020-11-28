import * as RT from './ReadonlyTuple';
// tslint:disable:readonly-array
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.0.0
 */
export var fst = RT.fst;
/**
 * @category destructors
 * @since 2.0.0
 */
export var snd = RT.snd;
/**
 * @category combinators
 * @since 2.0.0
 */
export var swap = RT.swap;
/**
 * @category instances
 * @since 2.0.0
 */
export var getApply = RT.getApply;
/**
 * @category instances
 * @since 2.0.0
 */
export var getApplicative = RT.getApplicative;
/**
 * @category instances
 * @since 2.0.0
 */
export var getChain = RT.getChain;
/**
 * @category instances
 * @since 2.0.0
 */
export var getMonad = RT.getMonad;
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var getChainRec = RT.getChainRec;
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
export var bimap = RT.bimap;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export var mapLeft = RT.mapLeft;
/**
 * @category Semigroupoid
 * @since 2.0.0
 */
export var compose = RT.compose;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var duplicate = RT.duplicate;
/**
 * @category Extend
 * @since 2.0.0
 */
export var extend = RT.extend;
/**
 * @category Extract
 * @since 2.6.2
 */
export var extract = RT.extract;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var foldMap = RT.foldMap;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export var map = RT.map;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduce = RT.reduce;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduceRight = RT.reduceRight;
/**
 * @since 2.6.3
 */
export var traverse = RT.traverse;
/**
 * @since 2.6.3
 */
export var sequence = RT.sequence;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Tuple';
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
export var Bifunctor = {
    URI: URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Semigroupoid = {
    URI: URI,
    compose: compose_
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
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var tuple = {
    URI: URI,
    compose: compose_,
    map: map_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    extract: extract,
    extend: extend_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence
};
