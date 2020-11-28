import * as RNEA from './ReadonlyNonEmptyArray';
/* tslint:enable:readonly-keyword */
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.0.0
 */
export var cons = RNEA.cons;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.0.0
 */
export var snoc = RNEA.snoc;
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromArray = RNEA.fromArray;
/**
 * Produces a couple of the first element of the array, and a new array of the remaining elements, if any
 *
 * @example
 * import { cons, uncons } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(uncons(cons(1, [2, 3, 4])), [1, [2, 3, 4]])
 *
 * @category destructors
 * @since 2.9.0
 */
export var uncons = RNEA.uncons;
/**
 * Produces a couple of a copy of the array without its last element, and that last element
 *
 * @example
 * import { snoc, unsnoc } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(unsnoc(snoc([1, 2, 3], 4)), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
export var unsnoc = RNEA.unsnoc;
/**
 * @category instances
 * @since 2.0.0
 */
export var getShow = RNEA.getShow;
/**
 * @since 2.0.0
 */
export var head = RNEA.head;
/**
 * @since 2.0.0
 */
export var tail = RNEA.tail;
/**
 * @category combinators
 * @since 2.0.0
 */
export var reverse = RNEA.reverse;
/**
 * @since 2.0.0
 */
export var min = RNEA.min;
/**
 * @since 2.0.0
 */
export var max = RNEA.max;
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @category instances
 * @since 2.0.0
 */
export var getSemigroup = RNEA.getSemigroup;
/**
 * @example
 * import { getEq, cons } from 'fp-ts/NonEmptyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @category instances
 * @since 2.0.0
 */
export var getEq = RNEA.getEq;
export function group(E) {
    return RNEA.group(E);
}
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @category combinators
 * @since 2.0.0
 */
export var groupSort = RNEA.groupSort;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @category constructors
 * @since 2.0.0
 */
export var groupBy = RNEA.groupBy;
/**
 * @since 2.0.0
 */
export var last = RNEA.last;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.2.0
 */
export var init = RNEA.init;
/**
 * @category combinators
 * @since 2.0.0
 */
export var sort = RNEA.sort;
/**
 * @since 2.0.0
 */
export var insertAt = RNEA.insertAt;
/**
 * @since 2.0.0
 */
export var updateAt = RNEA.updateAt;
/**
 * @since 2.0.0
 */
export var modifyAt = RNEA.modifyAt;
/**
 * @category combinators
 * @since 2.0.0
 */
export function copy(nea) {
    var l = nea.length;
    var as = Array(l);
    for (var i = 0; i < l; i++) {
        as[i] = nea[i];
    }
    return as;
}
export function filter(predicate) {
    return RNEA.filter(predicate);
}
/**
 * @since 2.0.0
 */
export var filterWithIndex = RNEA.filterWithIndex;
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export var of = RNEA.of;
export function concat(fx, fy) {
    return RNEA.concat(fx, fy);
}
/**
 * @since 2.5.0
 */
export var fold = RNEA.fold;
/**
 * @category combinators
 * @since 2.5.1
 */
export var zipWith = RNEA.zipWith;
/**
 * @category combinators
 * @since 2.5.1
 */
export var zip = RNEA.zip;
/**
 * @since 2.5.1
 */
export var unzip = RNEA.unzip;
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { cons, prependToAll } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(prependToAll(9)(cons(1, [2, 3, 4])), cons(9, [1, 9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
export var prependToAll = RNEA.prependToAll;
/**
 * Places an element in between members of an array
 *
 * @example
 * import { cons, intersperse } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)(cons(1, [2, 3, 4])), cons(1, [9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
export var intersperse = RNEA.intersperse;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = RNEA.Functor.map;
var mapWithIndex_ = RNEA.FunctorWithIndex.mapWithIndex;
var ap_ = RNEA.Applicative.ap;
var chain_ = RNEA.Monad.chain;
var extend_ = RNEA.Comonad.extend;
var reduce_ = RNEA.Foldable.reduce;
var foldMap_ = RNEA.Foldable.foldMap;
var reduceRight_ = RNEA.Foldable.reduceRight;
var traverse_ = RNEA.Traversable.traverse;
var alt_ = RNEA.Alt.alt;
var reduceWithIndex_ = RNEA.FoldableWithIndex
    .reduceWithIndex;
var foldMapWithIndex_ = RNEA.FoldableWithIndex
    .foldMapWithIndex;
var reduceRightWithIndex_ = RNEA.FoldableWithIndex
    .reduceRightWithIndex;
var traverseWithIndex_ = RNEA.TraversableWithIndex
    .traverseWithIndex;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export var foldMapWithIndex = RNEA.foldMapWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var foldMap = RNEA.foldMap;
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export var altW = RNEA.altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export var alt = RNEA.alt;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = RNEA.ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var apFirst = RNEA.apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var apSecond = RNEA.apSecond;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = RNEA.chain;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var chainFirst = RNEA.chainFirst;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var duplicate = RNEA.duplicate;
/**
 * @category Extend
 * @since 2.0.0
 */
export var extend = RNEA.extend;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var flatten = RNEA.flatten;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export var map = RNEA.map;
/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
export var mapWithIndex = RNEA.mapWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduce = RNEA.reduce;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export var reduceWithIndex = RNEA.reduceWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduceRight = RNEA.reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export var reduceRightWithIndex = RNEA.reduceRightWithIndex;
/**
 * @since 2.6.3
 */
export var traverse = RNEA.traverse;
/**
 * @since 2.6.3
 */
export var sequence = RNEA.sequence;
/**
 * @since 2.6.3
 */
export var traverseWithIndex = RNEA.traverseWithIndex;
/**
 * @since 2.7.0
 */
export var extract = head;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'NonEmptyArray';
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
 * @since 2.0.0
 */
export var nonEmptyArray = {
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
export var bindTo = RNEA.bindTo;
/**
 * @since 2.8.0
 */
export var bind = RNEA.bind;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
export var apS = RNEA.apS;
