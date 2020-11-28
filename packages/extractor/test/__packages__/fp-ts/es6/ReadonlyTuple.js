import { identity, pipe } from './function';
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.5.0
 */
export function fst(ea) {
    return ea[0];
}
/**
 * @category destructors
 * @since 2.5.0
 */
export function snd(ea) {
    return ea[1];
}
/**
 * @category combinators
 * @since 2.5.0
 */
export function swap(ea) {
    return [snd(ea), fst(ea)];
}
/**
 * @category instances
 * @since 2.5.0
 */
export function getApply(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return [fst(fab)(fst(fa)), S.concat(snd(fab), snd(fa))]; }
    };
}
var of = function (M) { return function (a) {
    return [a, M.empty];
}; };
/**
 * @category instances
 * @since 2.5.0
 */
export function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: URI,
        _E: undefined,
        map: A.map,
        ap: A.ap,
        of: of(M)
    };
}
/**
 * @category instances
 * @since 2.5.0
 */
export function getChain(S) {
    var A = getApply(S);
    return {
        URI: URI,
        _E: undefined,
        map: A.map,
        ap: A.ap,
        chain: function (ma, f) {
            var _a = f(fst(ma)), b = _a[0], s = _a[1];
            return [b, S.concat(snd(ma), s)];
        }
    };
}
/**
 * @category instances
 * @since 2.5.0
 */
export function getMonad(M) {
    var C = getChain(M);
    return {
        URI: URI,
        _E: undefined,
        map: C.map,
        ap: C.ap,
        chain: C.chain,
        of: of(M)
    };
}
// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
export function getChainRec(M) {
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
        URI: URI,
        _E: undefined,
        map: C.map,
        ap: C.ap,
        chain: C.chain,
        chainRec: chainRec
    };
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var compose_ = function (bc, ab) { return pipe(bc, compose(ab)); };
/* istanbul ignore next */
var map_ = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return pipe(fa, mapLeft(f)); };
/* istanbul ignore next */
var extend_ = function (wa, f) { return pipe(wa, extend(f)); };
/* istanbul ignore next */
var reduce_ = function (fa, b, f) { return pipe(fa, reduce(b, f)); };
/* istanbul ignore next */
var foldMap_ = function (M) {
    var foldMapM = foldMap(M);
    return function (fa, f) { return pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var reduceRight_ = function (fa, b, f) { return pipe(fa, reduceRight(b, f)); };
/* istanbul ignore next */
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return pipe(ta, traverseF(f)); };
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
export var bimap = function (f, g) { return function (fa) { return [g(fst(fa)), f(snd(fa))]; }; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.5.0
 */
export var mapLeft = function (f) { return function (fa) { return [
    fst(fa),
    f(snd(fa))
]; }; };
/**
 * @category Semigroupoid
 * @since 2.5.0
 */
export var compose = function (ab) { return function (bc) { return [
    fst(bc),
    snd(ab)
]; }; };
/**
 * @category Extend
 * @since 2.5.0
 */
export var extend = function (f) { return function (wa) { return [f(wa), snd(wa)]; }; };
/**
 * @category Extract
 * @since 2.6.2
 */
export var extract = fst;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
export var duplicate = 
/*#__PURE__*/
extend(identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export var map = function (f) { return function (fa) { return [
    f(fst(fa)),
    snd(fa)
]; }; };
/**
 * @category Foldable
 * @since 2.5.0
 */
export var reduce = function (b, f) { return function (fa) {
    return f(b, fst(fa));
}; };
/**
 * @category Foldable
 * @since 2.5.0
 */
export var foldMap = function () {
    return function (f) { return function (fa) { return f(fst(fa)); }; };
};
/**
 * @category Foldable
 * @since 2.5.0
 */
export var reduceRight = function (b, f) { return function (fa) {
    return f(fst(fa), b);
}; };
/**
 * @since 2.6.3
 */
export var traverse = function (F) {
    return function (f) { return function (ta) { return F.map(f(fst(ta)), function (b) { return [b, snd(ta)]; }); }; };
};
/**
 * @since 2.6.3
 */
export var sequence = function (F) { return function (fas) {
    return F.map(fst(fas), function (a) { return [a, snd(fas)]; });
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
export var URI = 'ReadonlyTuple';
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
 * @since 2.5.0
 */
export var readonlyTuple = {
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
