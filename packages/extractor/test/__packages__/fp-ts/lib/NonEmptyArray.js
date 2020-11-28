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
exports.reduceRight = exports.reduceWithIndex = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.extend = exports.duplicate = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.alt = exports.altW = exports.foldMap = exports.foldMapWithIndex = exports.intersperse = exports.prependToAll = exports.unzip = exports.zip = exports.zipWith = exports.fold = exports.concat = exports.of = exports.filterWithIndex = exports.filter = exports.copy = exports.modifyAt = exports.updateAt = exports.insertAt = exports.sort = exports.init = exports.last = exports.groupBy = exports.groupSort = exports.group = exports.getEq = exports.getSemigroup = exports.max = exports.min = exports.reverse = exports.tail = exports.head = exports.getShow = exports.unsnoc = exports.uncons = exports.fromArray = exports.snoc = exports.cons = void 0;
exports.apS = exports.bind = exports.bindTo = exports.Do = exports.nonEmptyArray = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.Applicative = exports.FunctorWithIndex = exports.Functor = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = void 0;
var RNEA = __importStar(require("./ReadonlyNonEmptyArray"));
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
exports.cons = RNEA.cons;
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
exports.snoc = RNEA.snoc;
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.0.0
 */
exports.fromArray = RNEA.fromArray;
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
exports.uncons = RNEA.uncons;
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
exports.unsnoc = RNEA.unsnoc;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getShow = RNEA.getShow;
/**
 * @since 2.0.0
 */
exports.head = RNEA.head;
/**
 * @since 2.0.0
 */
exports.tail = RNEA.tail;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.reverse = RNEA.reverse;
/**
 * @since 2.0.0
 */
exports.min = RNEA.min;
/**
 * @since 2.0.0
 */
exports.max = RNEA.max;
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @category instances
 * @since 2.0.0
 */
exports.getSemigroup = RNEA.getSemigroup;
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
exports.getEq = RNEA.getEq;
function group(E) {
    return RNEA.group(E);
}
exports.group = group;
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
exports.groupSort = RNEA.groupSort;
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
exports.groupBy = RNEA.groupBy;
/**
 * @since 2.0.0
 */
exports.last = RNEA.last;
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
exports.init = RNEA.init;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.sort = RNEA.sort;
/**
 * @since 2.0.0
 */
exports.insertAt = RNEA.insertAt;
/**
 * @since 2.0.0
 */
exports.updateAt = RNEA.updateAt;
/**
 * @since 2.0.0
 */
exports.modifyAt = RNEA.modifyAt;
/**
 * @category combinators
 * @since 2.0.0
 */
function copy(nea) {
    var l = nea.length;
    var as = Array(l);
    for (var i = 0; i < l; i++) {
        as[i] = nea[i];
    }
    return as;
}
exports.copy = copy;
function filter(predicate) {
    return RNEA.filter(predicate);
}
exports.filter = filter;
/**
 * @since 2.0.0
 */
exports.filterWithIndex = RNEA.filterWithIndex;
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
exports.of = RNEA.of;
function concat(fx, fy) {
    return RNEA.concat(fx, fy);
}
exports.concat = concat;
/**
 * @since 2.5.0
 */
exports.fold = RNEA.fold;
/**
 * @category combinators
 * @since 2.5.1
 */
exports.zipWith = RNEA.zipWith;
/**
 * @category combinators
 * @since 2.5.1
 */
exports.zip = RNEA.zip;
/**
 * @since 2.5.1
 */
exports.unzip = RNEA.unzip;
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
exports.prependToAll = RNEA.prependToAll;
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
exports.intersperse = RNEA.intersperse;
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
exports.foldMapWithIndex = RNEA.foldMapWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.foldMap = RNEA.foldMap;
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
exports.altW = RNEA.altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
exports.alt = RNEA.alt;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
exports.ap = RNEA.ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.apFirst = RNEA.apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.apSecond = RNEA.apSecond;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
exports.chain = RNEA.chain;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.chainFirst = RNEA.chainFirst;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.duplicate = RNEA.duplicate;
/**
 * @category Extend
 * @since 2.0.0
 */
exports.extend = RNEA.extend;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.flatten = RNEA.flatten;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
exports.map = RNEA.map;
/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
exports.mapWithIndex = RNEA.mapWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduce = RNEA.reduce;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
exports.reduceWithIndex = RNEA.reduceWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
exports.reduceRight = RNEA.reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
exports.reduceRightWithIndex = RNEA.reduceRightWithIndex;
/**
 * @since 2.6.3
 */
exports.traverse = RNEA.traverse;
/**
 * @since 2.6.3
 */
exports.sequence = RNEA.sequence;
/**
 * @since 2.6.3
 */
exports.traverseWithIndex = RNEA.traverseWithIndex;
/**
 * @since 2.7.0
 */
exports.extract = exports.head;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'NonEmptyArray';
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
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: map_,
    mapWithIndex: mapWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_
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
exports.FoldableWithIndex = {
    URI: exports.URI,
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
exports.Traversable = {
    URI: exports.URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverseWithIndex: traverseWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: map_,
    alt: alt_
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
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.nonEmptyArray = {
    URI: exports.URI,
    of: exports.of,
    map: map_,
    mapWithIndex: mapWithIndex_,
    ap: ap_,
    chain: chain_,
    extend: extend_,
    extract: exports.extract,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence,
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
exports.Do = exports.of({});
/**
 * @since 2.8.0
 */
exports.bindTo = RNEA.bindTo;
/**
 * @since 2.8.0
 */
exports.bind = RNEA.bind;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
exports.apS = RNEA.apS;
