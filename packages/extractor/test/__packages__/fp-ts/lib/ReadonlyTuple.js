"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readonlyTuple = exports.Traversable = exports.Foldable = exports.Comonad = exports.Semigroupoid = exports.Bifunctor = exports.Functor = exports.URI = exports.sequence = exports.traverse = exports.reduceRight = exports.foldMap = exports.reduce = exports.map = exports.duplicate = exports.extract = exports.extend = exports.compose = exports.mapLeft = exports.bimap = exports.getChainRec = exports.getMonad = exports.getChain = exports.getApplicative = exports.getApply = exports.swap = exports.snd = exports.fst = void 0;
var function_1 = require("./function");
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.5.0
 */
function fst(ea) {
    return ea[0];
}
exports.fst = fst;
/**
 * @category destructors
 * @since 2.5.0
 */
function snd(ea) {
    return ea[1];
}
exports.snd = snd;
/**
 * @category combinators
 * @since 2.5.0
 */
function swap(ea) {
    return [snd(ea), fst(ea)];
}
exports.swap = swap;
/**
 * @category instances
 * @since 2.5.0
 */
function getApply(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return [fst(fab)(fst(fa)), S.concat(snd(fab), snd(fa))]; }
    };
}
exports.getApply = getApply;
var of = function (M) { return function (a) {
    return [a, M.empty];
}; };
/**
 * @category instances
 * @since 2.5.0
 */
function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: exports.URI,
        _E: undefined,
        map: A.map,
        ap: A.ap,
        of: of(M)
    };
}
exports.getApplicative = getApplicative;
/**
 * @category instances
 * @since 2.5.0
 */
function getChain(S) {
    var A = getApply(S);
    return {
        URI: exports.URI,
        _E: undefined,
        map: A.map,
        ap: A.ap,
        chain: function (ma, f) {
            var _a = f(fst(ma)), b = _a[0], s = _a[1];
            return [b, S.concat(snd(ma), s)];
        }
    };
}
exports.getChain = getChain;
/**
 * @category instances
 * @since 2.5.0
 */
function getMonad(M) {
    var C = getChain(M);
    return {
        URI: exports.URI,
        _E: undefined,
        map: C.map,
        ap: C.ap,
        chain: C.chain,
        of: of(M)
    };
}
exports.getMonad = getMonad;
// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
function getChainRec(M) {
    var chainRec = function (a, f) {
        var result = f(a);
        var acc = M.empty;
        var s = fst(result);
        while (s._tag === 'Left') {
            acc = M.concat(acc, snd(result));
            result = f(s.left);
            s = fst(result);
        }
        return [s.right, M.concat(acc, snd(result))];
    };
    var C = getChain(M);
    return {
        URI: exports.URI,
        _E: undefined,
        map: C.map,
        ap: C.ap,
        chain: C.chain,
        chainRec: chainRec
    };
}
exports.getChainRec = getChainRec;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var compose_ = function (bc, ab) { return function_1.pipe(bc, exports.compose(ab)); };
/* istanbul ignore next */
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return function_1.pipe(fa, exports.bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return function_1.pipe(fa, exports.mapLeft(f)); };
/* istanbul ignore next */
var extend_ = function (wa, f) { return function_1.pipe(wa, exports.extend(f)); };
/* istanbul ignore next */
var reduce_ = function (fa, b, f) { return function_1.pipe(fa, exports.reduce(b, f)); };
/* istanbul ignore next */
var foldMap_ = function (M) {
    var foldMapM = exports.foldMap(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var reduceRight_ = function (fa, b, f) { return function_1.pipe(fa, exports.reduceRight(b, f)); };
/* istanbul ignore next */
var traverse_ = function (F) {
    var traverseF = exports.traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.5.0
 */
var bimap = function (f, g) { return function (fa) { return [g(fst(fa)), f(snd(fa))]; }; };
exports.bimap = bimap;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.5.0
 */
var mapLeft = function (f) { return function (fa) { return [
    fst(fa),
    f(snd(fa))
]; }; };
exports.mapLeft = mapLeft;
/**
 * @category Semigroupoid
 * @since 2.5.0
 */
var compose = function (ab) { return function (bc) { return [
    fst(bc),
    snd(ab)
]; }; };
exports.compose = compose;
/**
 * @category Extend
 * @since 2.5.0
 */
var extend = function (f) { return function (wa) { return [f(wa), snd(wa)]; }; };
exports.extend = extend;
/**
 * @category Extract
 * @since 2.6.2
 */
exports.extract = fst;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
var map = function (f) { return function (fa) { return [
    f(fst(fa)),
    snd(fa)
]; }; };
exports.map = map;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduce = function (b, f) { return function (fa) {
    return f(b, fst(fa));
}; };
exports.reduce = reduce;
/**
 * @category Foldable
 * @since 2.5.0
 */
var foldMap = function () {
    return function (f) { return function (fa) { return f(fst(fa)); }; };
};
exports.foldMap = foldMap;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return f(fst(fa), b);
}; };
exports.reduceRight = reduceRight;
/**
 * @since 2.6.3
 */
var traverse = function (F) {
    return function (f) { return function (ta) { return F.map(f(fst(ta)), function (b) { return [b, snd(ta)]; }); }; };
};
exports.traverse = traverse;
/**
 * @since 2.6.3
 */
var sequence = function (F) { return function (fas) {
    return F.map(fst(fas), function (a) { return [a, snd(fas)]; });
}; };
exports.sequence = sequence;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
exports.URI = 'ReadonlyTuple';
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
 * @since 2.5.0
 */
exports.readonlyTuple = {
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
