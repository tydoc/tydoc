import { identity, pipe, unsafeCoerce } from './function';
/**
 * @category constructors
 * @since 2.0.0
 */
export var make = unsafeCoerce;
/**
 * @category instances
 * @since 2.0.0
 */
export function getShow(S) {
    return {
        show: function (c) { return "make(" + S.show(c) + ")"; }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export var getEq = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getOrd = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getBounded = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getSemigroup = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getMonoid = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getSemiring = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getRing = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getHeytingAlgebra = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getBooleanAlgebra = identity;
/**
 * @category instances
 * @since 2.0.0
 */
export function getApply(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return make(S.concat(fab, fa)); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: URI,
        _E: undefined,
        map: A.map,
        ap: A.ap,
        of: function () { return make(M.empty); }
    };
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var contramap_ = function (fa, f) { return pipe(fa, contramap(f)); };
/* istanbul ignore next */
var map_ = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return pipe(fa, mapLeft(f)); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Contravariant
 * @since 2.0.0
 */
export var contramap = function () { return unsafeCoerce; };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export var map = function () { return unsafeCoerce; };
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export var bimap = function (f) { return function (fa) {
    return make(f(fa));
}; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export var mapLeft = function (f) { return function (fa) { return make(f(fa)); }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Const';
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
export var Contravariant = {
    URI: URI,
    contramap: contramap_
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
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var const_ = {
    URI: URI,
    map: map_,
    contramap: contramap_,
    bimap: bimap_,
    mapLeft: mapLeft_
};
