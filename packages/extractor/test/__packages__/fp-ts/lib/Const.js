"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.const_ = exports.Bifunctor = exports.Contravariant = exports.Functor = exports.URI = exports.mapLeft = exports.bimap = exports.map = exports.contramap = exports.getApplicative = exports.getApply = exports.getBooleanAlgebra = exports.getHeytingAlgebra = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBounded = exports.getOrd = exports.getEq = exports.getShow = exports.make = void 0;
var function_1 = require("./function");
/**
 * @category constructors
 * @since 2.0.0
 */
exports.make = function_1.unsafeCoerce;
/**
 * @category instances
 * @since 2.0.0
 */
function getShow(S) {
    return {
        show: function (c) { return "make(" + S.show(c) + ")"; }
    };
}
exports.getShow = getShow;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getEq = function_1.identity;
/**
 * @category instances
 * @since 2.6.0
 */
exports.getOrd = function_1.identity;
/**
 * @category instances
 * @since 2.6.0
 */
exports.getBounded = function_1.identity;
/**
 * @category instances
 * @since 2.6.0
 */
exports.getSemigroup = function_1.identity;
/**
 * @category instances
 * @since 2.6.0
 */
exports.getMonoid = function_1.identity;
/**
 * @category instances
 * @since 2.6.0
 */
exports.getSemiring = function_1.identity;
/**
 * @category instances
 * @since 2.6.0
 */
exports.getRing = function_1.identity;
/**
 * @category instances
 * @since 2.6.0
 */
exports.getHeytingAlgebra = function_1.identity;
/**
 * @category instances
 * @since 2.6.0
 */
exports.getBooleanAlgebra = function_1.identity;
/**
 * @category instances
 * @since 2.0.0
 */
function getApply(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return exports.make(S.concat(fab, fa)); }
    };
}
exports.getApply = getApply;
/**
 * @category instances
 * @since 2.0.0
 */
function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: exports.URI,
        _E: undefined,
        map: A.map,
        ap: A.ap,
        of: function () { return exports.make(M.empty); }
    };
}
exports.getApplicative = getApplicative;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var contramap_ = function (fa, f) { return function_1.pipe(fa, exports.contramap(f)); };
/* istanbul ignore next */
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return function_1.pipe(fa, exports.bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return function_1.pipe(fa, exports.mapLeft(f)); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Contravariant
 * @since 2.0.0
 */
var contramap = function () { return function_1.unsafeCoerce; };
exports.contramap = contramap;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function () { return function_1.unsafeCoerce; };
exports.map = map;
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
var bimap = function (f) { return function (fa) {
    return exports.make(f(fa));
}; };
exports.bimap = bimap;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
var mapLeft = function (f) { return function (fa) { return exports.make(f(fa)); }; };
exports.mapLeft = mapLeft;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Const';
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
exports.Contravariant = {
    URI: exports.URI,
    contramap: contramap_
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
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.const_ = {
    URI: exports.URI,
    map: map_,
    contramap: contramap_,
    bimap: bimap_,
    mapLeft: mapLeft_
};
