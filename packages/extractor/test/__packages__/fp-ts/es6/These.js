import { fromEquals } from './Eq';
import { isNone, none, some } from './Option';
import { pipe } from './function';
/**
 * @category constructors
 * @since 2.0.0
 */
export function left(left) {
    return { _tag: 'Left', left: left };
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function right(right) {
    return { _tag: 'Right', right: right };
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function both(left, right) {
    return { _tag: 'Both', left: left, right: right };
}
/**
 * @category destructors
 * @since 2.0.0
 */
export function fold(onLeft, onRight, onBoth) {
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
/**
 * @category combinators
 * @since 2.4.0
 */
export var swap = fold(right, left, function (e, a) { return both(a, e); });
/**
 * @category instances
 * @since 2.0.0
 */
export function getShow(SE, SA) {
    return {
        show: fold(function (l) { return "left(" + SE.show(l) + ")"; }, function (a) { return "right(" + SA.show(a) + ")"; }, function (l, a) { return "both(" + SE.show(l) + ", " + SA.show(a) + ")"; })
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getEq(EE, EA) {
    return fromEquals(function (x, y) {
        return isLeft(x)
            ? isLeft(y) && EE.equals(x.left, y.left)
            : isRight(x)
                ? isRight(y) && EA.equals(x.right, y.right)
                : isBoth(y) && EE.equals(x.left, y.left) && EA.equals(x.right, y.right);
    });
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup(SE, SA) {
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
/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicative(SE) {
    return {
        URI: URI,
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
/**
 * @category instances
 * @since 2.0.0
 */
export function getMonad(SE) {
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
        URI: URI,
        _E: undefined,
        map: map_,
        of: right,
        ap: applicative.ap,
        chain: chain,
        throwError: left
    };
}
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
export function toTuple(e, a) {
    return function (fa) { return (isLeft(fa) ? [fa.left, a] : isRight(fa) ? [e, fa.right] : [fa.left, fa.right]); };
}
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
export function getLeft(fa) {
    return isLeft(fa) ? some(fa.left) : isRight(fa) ? none : some(fa.left);
}
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
export function getRight(fa) {
    return isLeft(fa) ? none : isRight(fa) ? some(fa.right) : some(fa.right);
}
/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
export function isLeft(fa) {
    return fa._tag === 'Left';
}
/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
export function isRight(fa) {
    return fa._tag === 'Right';
}
/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
export function isBoth(fa) {
    return fa._tag === 'Both';
}
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
export function leftOrBoth(e) {
    return function (ma) { return (isNone(ma) ? left(e) : both(e, ma.value)); };
}
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
export function rightOrBoth(a) {
    return function (me) { return (isNone(me) ? right(a) : both(me.value, a)); };
}
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
export function getLeftOnly(fa) {
    return isLeft(fa) ? some(fa.left) : none;
}
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
export function getRightOnly(fa) {
    return isRight(fa) ? some(fa.right) : none;
}
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
export function fromOptions(fe, fa) {
    return isNone(fe)
        ? isNone(fa)
            ? none
            : some(right(fa.value))
        : isNone(fa)
            ? some(left(fe.value))
            : some(both(fe.value, fa.value));
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return pipe(fa, mapLeft(f)); };
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
 * @since 2.0.0
 */
export var bimap = function (f, g) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : isRight(fa) ? right(g(fa.right)) : both(f(fa.left), g(fa.right));
}; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export var mapLeft = function (f) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : isBoth(fa) ? both(f(fa.left), fa.right) : fa;
}; };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) {
    return isLeft(fa) ? fa : isRight(fa) ? right(f(fa.right)) : both(fa.left, f(fa.right));
}; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduce = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : isRight(fa) ? f(b, fa.right) : f(b, fa.right);
}; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var foldMap = function (M) { return function (f) { return function (fa) {
    return isLeft(fa) ? M.empty : isRight(fa) ? f(fa.right) : f(fa.right);
}; }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduceRight = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : isRight(fa) ? f(fa.right, b) : f(fa.right, b);
}; };
/**
 * @since 2.6.3
 */
export var traverse = function (F) { return function (f) { return function (ta) {
    return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(f(ta.right), right) : F.map(f(ta.right), function (b) { return both(ta.left, b); });
}; }; };
/**
 * @since 2.6.3
 */
export var sequence = function (F) { return function (ta) {
    return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(ta.right, right) : F.map(ta.right, function (b) { return both(ta.left, b); });
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'These';
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
export var these = {
    URI: URI,
    map: map_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence
};
