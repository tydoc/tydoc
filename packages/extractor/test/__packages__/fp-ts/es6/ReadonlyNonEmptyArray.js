import { pipe, bind_, bindTo_, flow } from './function';
import { none, some } from './Option';
import * as RA from './ReadonlyArray';
import { getJoinSemigroup, getMeetSemigroup } from './Semigroup';
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.5.0
 */
export var cons = RA.cons;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.5.0
 */
export var snoc = RA.snoc;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.5.0
 */
export function fromReadonlyArray(as) {
    return RA.isNonEmpty(as) ? some(as) : none;
}
/**
 * @category constructors
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
export function fromArray(as) {
    return fromReadonlyArray(RA.fromArray(as));
}
/**
 * Produces a couple of the first element of the array, and a new array of the remaining elements, if any
 *
 * @example
 * import { cons, uncons } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(uncons(cons(1, [2, 3, 4])), [1, [2, 3, 4]])
 *
 * @category destructors
 * @since 2.9.0
 */
export function uncons(nea) {
    return [nea[0], nea.slice(1)];
}
/**
 * Produces a couple of a copy of the array without its last element, and that last element
 *
 * @example
 * import { snoc, unsnoc } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unsnoc(snoc([1, 2, 3], 4)), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
export function unsnoc(nea) {
    var l = nea.length - 1;
    return [nea.slice(0, l), nea[l]];
}
/**
 * @category instances
 * @since 2.5.0
 */
export var getShow = RA.getShow;
/**
 * @since 2.5.0
 */
export function head(nea) {
    return nea[0];
}
/**
 * @since 2.5.0
 */
export function tail(nea) {
    return nea.slice(1);
}
/**
 * @category combinators
 * @since 2.5.0
 */
export var reverse = RA.reverse;
/**
 * @since 2.5.0
 */
export function min(ord) {
    var S = getMeetSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
/**
 * @since 2.5.0
 */
export function max(ord) {
    var S = getJoinSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @category instances
 * @since 2.5.0
 */
export function getSemigroup() {
    return {
        concat: concat
    };
}
/**
 * @example
 * import { getEq, cons } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @category instances
 * @since 2.5.0
 */
export var getEq = RA.getEq;
export function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return RA.empty;
        }
        // tslint:disable-next-line: readonly-array
        var r = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var x = as[i];
            if (E.equals(x, head)) {
                nea.push(x);
            }
            else {
                r.push(nea);
                head = x;
                nea = [head];
            }
        }
        r.push(nea);
        return r;
    };
}
export function groupSort(O) {
    var sortO = RA.sort(O);
    var groupO = group(O);
    return function (as) { return groupO(sortO(as)); };
}
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @category constructors
 * @since 2.5.0
 */
export function groupBy(f) {
    return function (as) {
        var r = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            var k = f(a);
            if (r.hasOwnProperty(k)) {
                r[k].push(a);
            }
            else {
                r[k] = [a];
            }
        }
        return r;
    };
}
/**
 * @since 2.5.0
 */
export function last(nea) {
    return nea[nea.length - 1];
}
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
export function init(nea) {
    return nea.slice(0, -1);
}
/**
 * @category combinators
 * @since 2.5.0
 */
export function sort(O) {
    return RA.sort(O);
}
/**
 * @since 2.5.0
 */
export function insertAt(i, a) {
    return RA.insertAt(i, a);
}
/**
 * @since 2.5.0
 */
export function updateAt(i, a) {
    return RA.updateAt(i, a);
}
/**
 * @since 2.5.0
 */
export function modifyAt(i, f) {
    return RA.modifyAt(i, f);
}
export function filter(predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
}
/**
 * @since 2.5.0
 */
export function filterWithIndex(predicate) {
    return function (nea) { return fromReadonlyArray(nea.filter(function (a, i) { return predicate(i, a); })); };
}
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.5.0
 */
export var of = RA.of;
export function concat(fx, fy) {
    return fx.concat(fy);
}
/**
 * @since 2.5.0
 */
export function fold(S) {
    return function (fa) { return fa.reduce(S.concat); };
}
/**
 * @category combinators
 * @since 2.5.1
 */
export var zipWith = RA.zipWith;
/**
 * @category combinators
 * @since 2.5.1
 */
export var zip = RA.zip;
/**
 * @since 2.5.1
 */
export var unzip = RA.unzip;
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { cons, prependToAll } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(prependToAll(9)(cons(1, [2, 3, 4])), cons(9, [1, 9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
export var prependToAll = RA.prependToAll;
/**
 * Places an element in between members of an array
 *
 * @example
 * import { cons, intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)(cons(1, [2, 3, 4])), cons(1, [9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
export var intersperse = RA.intersperse;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = RA.Functor.map;
var mapWithIndex_ = RA.FunctorWithIndex.mapWithIndex;
var ap_ = RA.Applicative.ap;
var chain_ = RA.Monad.chain;
var extend_ = RA.Extend.extend;
var reduce_ = RA.Foldable.reduce;
var foldMap_ = RA.Foldable.foldMap;
var reduceRight_ = RA.Foldable.reduceRight;
var traverse_ = RA.Traversable.traverse;
var alt_ = RA.Alt.alt;
var reduceWithIndex_ = RA.FoldableWithIndex.reduceWithIndex;
var foldMapWithIndex_ = RA.FoldableWithIndex
    .foldMapWithIndex;
var reduceRightWithIndex_ = RA.FoldableWithIndex
    .reduceRightWithIndex;
var traverseWithIndex_ = RA.TraversableWithIndex
    .traverseWithIndex;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export var foldMapWithIndex = function (S) { return function (f) { return function (fa) { return fa.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, fa[0])); }; }; };
/**
 * @category Foldable
 * @since 2.5.0
 */
export var foldMap = function (S) { return function (f) { return function (fa) {
    return fa.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(fa[0]));
}; }; };
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export var altW = RA.altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export var alt = RA.alt;
/**
 * @category Apply
 * @since 2.5.0
 */
export var ap = RA.ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
export var apFirst = RA.apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
export var apSecond = RA.apSecond;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.5.0
 */
export var chain = RA.chain;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.5.0
 */
export var chainFirst = RA.chainFirst;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
export var duplicate = RA.duplicate;
/**
 * @category Extend
 * @since 2.5.0
 */
export var extend = RA.extend;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.5.0
 */
export var flatten = RA.flatten;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export var map = RA.map;
/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
export var mapWithIndex = RA.mapWithIndex;
/**
 * @category Foldable
 * @since 2.5.0
 */
export var reduce = RA.reduce;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export var reduceWithIndex = RA.reduceWithIndex;
/**
 * @category Foldable
 * @since 2.5.0
 */
export var reduceRight = RA.reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export var reduceRightWithIndex = RA.reduceRightWithIndex;
/**
 * @since 2.6.3
 */
export var traverse = RA.traverse;
/**
 * @since 2.6.3
 */
export var sequence = RA.sequence;
/**
 * @since 2.6.3
 */
export var traverseWithIndex = RA.traverseWithIndex;
/**
 * @since 2.6.3
 */
export var extract = head;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
export var URI = 'ReadonlyNonEmptyArray';
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
export var FunctorWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Applicative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Monad = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_
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
export var FoldableWithIndex = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_
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
/**
 * @category instances
 * @since 2.7.0
 */
export var TraversableWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverseWithIndex: traverseWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Alt = {
    URI: URI,
    map: map_,
    alt: alt_
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
// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
export var readonlyNonEmptyArray = {
    URI: URI,
    of: of,
    map: map_,
    mapWithIndex: mapWithIndex_,
    ap: ap_,
    chain: chain_,
    extend: extend_,
    extract: extract,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverseWithIndex: traverseWithIndex_,
    alt: alt_
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
export var Do = of({});
/**
 * @since 2.8.0
 */
export var bindTo = function (name) { return map(bindTo_(name)); };
/**
 * @since 2.8.0
 */
export var bind = function (name, f) {
    return chain(function (a) {
        return pipe(f(a), map(function (b) { return bind_(a, name, b); }));
    });
};
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
export var apS = function (name, fb) {
    return flow(map(function (a) { return function (b) { return bind_(a, name, b); }; }), ap(fb));
};
