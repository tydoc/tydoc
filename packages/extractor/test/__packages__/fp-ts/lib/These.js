"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.these = exports.Traversable = exports.Foldable = exports.Bifunctor = exports.Functor = exports.URI = exports.sequence = exports.traverse = exports.reduceRight = exports.foldMap = exports.reduce = exports.map = exports.mapLeft = exports.bimap = exports.fromOptions = exports.getRightOnly = exports.getLeftOnly = exports.rightOrBoth = exports.leftOrBoth = exports.isBoth = exports.isRight = exports.isLeft = exports.getRight = exports.getLeft = exports.toTuple = exports.getMonad = exports.getApplicative = exports.getSemigroup = exports.getEq = exports.getShow = exports.swap = exports.fold = exports.both = exports.right = exports.left = void 0;
var Eq_1 = require("./Eq");
var Option_1 = require("./Option");
var function_1 = require("./function");
/**
 * @category constructors
 * @since 2.0.0
 */
function left(left) {
    return { _tag: 'Left', left: left };
}
exports.left = left;
/**
 * @category constructors
 * @since 2.0.0
 */
function right(right) {
    return { _tag: 'Right', right: right };
}
exports.right = right;
/**
 * @category constructors
 * @since 2.0.0
 */
function both(left, right) {
    return { _tag: 'Both', left: left, right: right };
}
exports.both = both;
/**
 * @category destructors
 * @since 2.0.0
 */
function fold(onLeft, onRight, onBoth) {
    return function (fa) {
        switch (fa._tag) {
            case 'Left':
                return onLeft(fa.left);
            case 'Right':
                return onRight(fa.right);
            case 'Both':
                return onBoth(fa.left, fa.right);
        }
    };
}
exports.fold = fold;
/**
 * @category combinators
 * @since 2.4.0
 */
exports.swap = fold(right, left, function (e, a) { return both(a, e); });
/**
 * @category instances
 * @since 2.0.0
 */
function getShow(SE, SA) {
    return {
        show: fold(function (l) { return "left(" + SE.show(l) + ")"; }, function (a) { return "right(" + SA.show(a) + ")"; }, function (l, a) { return "both(" + SE.show(l) + ", " + SA.show(a) + ")"; })
    };
}
exports.getShow = getShow;
/**
 * @category instances
 * @since 2.0.0
 */
function getEq(EE, EA) {
    return Eq_1.fromEquals(function (x, y) {
        return isLeft(x)
            ? isLeft(y) && EE.equals(x.left, y.left)
            : isRight(x)
                ? isRight(y) && EA.equals(x.right, y.right)
                : isBoth(y) && EE.equals(x.left, y.left) && EA.equals(x.right, y.right);
    });
}
exports.getEq = getEq;
/**
 * @category instances
 * @since 2.0.0
 */
function getSemigroup(SE, SA) {
    return {
        concat: function (x, y) {
            return isLeft(x)
                ? isLeft(y)
                    ? left(SE.concat(x.left, y.left))
                    : isRight(y)
                        ? both(x.left, y.right)
                        : both(SE.concat(x.left, y.left), y.right)
                : isRight(x)
                    ? isLeft(y)
                        ? both(y.left, x.right)
                        : isRight(y)
                            ? right(SA.concat(x.right, y.right))
                            : both(y.left, SA.concat(x.right, y.right))
                    : isLeft(y)
                        ? both(SE.concat(x.left, y.left), x.right)
                        : isRight(y)
                            ? both(x.left, SA.concat(x.right, y.right))
                            : both(SE.concat(x.left, y.left), SA.concat(x.right, y.right));
        }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @category instances
 * @since 2.7.0
 */
function getApplicative(SE) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        of: right,
        ap: function (fab, fa) {
            return isLeft(fab)
                ? isLeft(fa)
                    ? left(SE.concat(fab.left, fa.left))
                    : isRight(fa)
                        ? left(fab.left)
                        : left(SE.concat(fab.left, fa.left))
                : isRight(fab)
                    ? isLeft(fa)
                        ? left(fa.left)
                        : isRight(fa)
                            ? right(fab.right(fa.right))
                            : both(fa.left, fab.right(fa.right))
                    : isLeft(fa)
                        ? left(SE.concat(fab.left, fa.left))
                        : isRight(fa)
                            ? both(fab.left, fab.right(fa.right))
                            : both(SE.concat(fab.left, fa.left), fab.right(fa.right));
        }
    };
}
exports.getApplicative = getApplicative;
/**
 * @category instances
 * @since 2.0.0
 */
function getMonad(SE) {
    var chain = function (ma, f) {
        if (isLeft(ma)) {
            return ma;
        }
        if (isRight(ma)) {
            return f(ma.right);
        }
        var fb = f(ma.right);
        return isLeft(fb)
            ? left(SE.concat(ma.left, fb.left))
            : isRight(fb)
                ? both(ma.left, fb.right)
                : both(SE.concat(ma.left, fb.left), fb.right);
    };
    var applicative = getApplicative(SE);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        of: right,
        ap: applicative.ap,
        chain: chain,
        throwError: left
    };
}
exports.getMonad = getMonad;
// TODO: make lazy in v3
/* tslint:disable:readonly-array */
/**
 * @example
 * import { toTuple, left, right, both } from 'fp-ts/These'
 *
 * assert.deepStrictEqual(toTuple('a', 1)(left('b')), ['b', 1])
 * assert.deepStrictEqual(toTuple('a', 1)(right(2)), ['a', 2])
 * assert.deepStrictEqual(toTuple('a', 1)(both('b', 2)), ['b', 2])
 *
 * @category destructors
 * @since 2.0.0
 */
function toTuple(e, a) {
    return function (fa) { return (isLeft(fa) ? [fa.left, a] : isRight(fa) ? [e, fa.right] : [fa.left, fa.right]); };
}
exports.toTuple = toTuple;
/* tslint:enable:readonly-array */
/**
 * Returns an `E` value if possible
 *
 * @example
 * import { getLeft, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
 *
 * @category destructors
 * @since 2.0.0
 */
function getLeft(fa) {
    return isLeft(fa) ? Option_1.some(fa.left) : isRight(fa) ? Option_1.none : Option_1.some(fa.left);
}
exports.getLeft = getLeft;
/**
 * Returns an `A` value if possible
 *
 * @example
 * import { getRight, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getRight(left('a')), none)
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(both('a', 1)), some(1))
 *
 * @category destructors
 * @since 2.0.0
 */
function getRight(fa) {
    return isLeft(fa) ? Option_1.none : isRight(fa) ? Option_1.some(fa.right) : Option_1.some(fa.right);
}
exports.getRight = getRight;
/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
function isLeft(fa) {
    return fa._tag === 'Left';
}
exports.isLeft = isLeft;
/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
function isRight(fa) {
    return fa._tag === 'Right';
}
exports.isRight = isRight;
/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
function isBoth(fa) {
    return fa._tag === 'Both';
}
exports.isBoth = isBoth;
// TODO: make lazy in v3
/**
 * @example
 * import { leftOrBoth, left, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(leftOrBoth('a')(none), left('a'))
 * assert.deepStrictEqual(leftOrBoth('a')(some(1)), both('a', 1))
 *
 * @category constructors
 * @since 2.0.0
 */
function leftOrBoth(e) {
    return function (ma) { return (Option_1.isNone(ma) ? left(e) : both(e, ma.value)); };
}
exports.leftOrBoth = leftOrBoth;
// TODO: make lazy in v3
/**
 * @example
 * import { rightOrBoth, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(rightOrBoth(1)(none), right(1))
 * assert.deepStrictEqual(rightOrBoth(1)(some('a')), both('a', 1))
 *
 * @category constructors
 * @since 2.0.0
 */
function rightOrBoth(a) {
    return function (me) { return (Option_1.isNone(me) ? right(a) : both(me.value, a)); };
}
exports.rightOrBoth = rightOrBoth;
/**
 * Returns the `E` value if and only if the value is constructed with `Left`
 *
 * @example
 * import { getLeftOnly, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
 * assert.deepStrictEqual(getLeftOnly(right(1)), none)
 * assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
 *
 * @category destructors
 * @since 2.0.0
 */
function getLeftOnly(fa) {
    return isLeft(fa) ? Option_1.some(fa.left) : Option_1.none;
}
exports.getLeftOnly = getLeftOnly;
/**
 * Returns the `A` value if and only if the value is constructed with `Right`
 *
 * @example
 * import { getRightOnly, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getRightOnly(left('a')), none)
 * assert.deepStrictEqual(getRightOnly(right(1)), some(1))
 * assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
 *
 * @category destructors
 * @since 2.0.0
 */
function getRightOnly(fa) {
    return isRight(fa) ? Option_1.some(fa.right) : Option_1.none;
}
exports.getRightOnly = getRightOnly;
/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @category constructors
 * @since 2.0.0
 */
function fromOptions(fe, fa) {
    return Option_1.isNone(fe)
        ? Option_1.isNone(fa)
            ? Option_1.none
            : Option_1.some(right(fa.value))
        : Option_1.isNone(fa)
            ? Option_1.some(left(fe.value))
            : Option_1.some(both(fe.value, fa.value));
}
exports.fromOptions = fromOptions;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return function_1.pipe(fa, exports.bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return function_1.pipe(fa, exports.mapLeft(f)); };
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
 * @since 2.0.0
 */
var bimap = function (f, g) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : isRight(fa) ? right(g(fa.right)) : both(f(fa.left), g(fa.right));
}; };
exports.bimap = bimap;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var mapLeft = function (f) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : isBoth(fa) ? both(f(fa.left), fa.right) : fa;
}; };
exports.mapLeft = mapLeft;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return isLeft(fa) ? fa : isRight(fa) ? right(f(fa.right)) : both(fa.left, f(fa.right));
}; };
exports.map = map;
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : isRight(fa) ? f(b, fa.right) : f(b, fa.right);
}; };
exports.reduce = reduce;
/**
 * @category Foldable
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) { return function (fa) {
    return isLeft(fa) ? M.empty : isRight(fa) ? f(fa.right) : f(fa.right);
}; }; };
exports.foldMap = foldMap;
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : isRight(fa) ? f(fa.right, b) : f(fa.right, b);
}; };
exports.reduceRight = reduceRight;
/**
 * @since 2.6.3
 */
var traverse = function (F) { return function (f) { return function (ta) {
    return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(f(ta.right), right) : F.map(f(ta.right), function (b) { return both(ta.left, b); });
}; }; };
exports.traverse = traverse;
/**
 * @since 2.6.3
 */
var sequence = function (F) { return function (ta) {
    return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(ta.right, right) : F.map(ta.right, function (b) { return both(ta.left, b); });
}; };
exports.sequence = sequence;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'These';
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
exports.these = {
    URI: exports.URI,
    map: map_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence
};
