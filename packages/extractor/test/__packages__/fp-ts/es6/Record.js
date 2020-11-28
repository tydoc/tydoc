import * as RR from './ReadonlyRecord';
/* tslint:disable:readonly-array */
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
export var getShow = RR.getShow;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
export var size = RR.size;
/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
export var isEmpty = RR.isEmpty;
/**
 * @since 2.0.0
 */
export var keys = RR.keys;
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/Record'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.0.0
 */
export var collect = RR.collect;
/**
 * @since 2.0.0
 */
export var toArray = RR.toReadonlyArray;
export function toUnfoldable(U) {
    return RR.toUnfoldable(U);
}
export function insertAt(k, a) {
    return RR.insertAt(k, a);
}
/**
 * @since 2.0.0
 */
export var hasOwnProperty = RR.hasOwnProperty;
export function deleteAt(k) {
    return RR.deleteAt(k);
}
/**
 * @since 2.0.0
 */
export var updateAt = RR.updateAt;
/**
 * @since 2.0.0
 */
export var modifyAt = RR.modifyAt;
export function pop(k) {
    return RR.pop(k);
}
// TODO: remove non-curried overloading in v3
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
export var isSubrecord = RR.isSubrecord;
export function getEq(E) {
    return RR.getEq(E);
}
export function getMonoid(S) {
    return RR.getMonoid(S);
}
// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a record
 *
 * @since 2.0.0
 */
export var lookup = RR.lookup;
/**
 * @since 2.0.0
 */
export var empty = {};
export function mapWithIndex(f) {
    return RR.mapWithIndex(f);
}
export function map(f) {
    return RR.map(f);
}
export function reduceWithIndex(b, f) {
    return RR.reduceWithIndex(b, f);
}
export function foldMapWithIndex(M) {
    return RR.foldMapWithIndex(M);
}
export function reduceRightWithIndex(b, f) {
    return RR.reduceRightWithIndex(b, f);
}
/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
export var singleton = RR.singleton;
export function traverseWithIndex(F) {
    return RR.traverseWithIndex(F);
}
export function traverse(F) {
    return RR.traverse(F);
}
export function sequence(F) {
    return RR.sequence(F);
}
/**
 * @category Witherable
 * @since 2.6.5
 */
export var wither = RR.wither;
/**
 * @category Witherable
 * @since 2.6.5
 */
export var wilt = RR.wilt;
export function partitionMapWithIndex(f) {
    return RR.partitionMapWithIndex(f);
}
export function partitionWithIndex(predicateWithIndex) {
    return RR.partitionWithIndex(predicateWithIndex);
}
export function filterMapWithIndex(f) {
    return RR.filterMapWithIndex(f);
}
export function filterWithIndex(predicateWithIndex) {
    return RR.filterWithIndex(predicateWithIndex);
}
export function fromFoldable(M, F) {
    return RR.fromFoldable(M, F);
}
export function fromFoldableMap(M, F) {
    return RR.fromFoldableMap(M, F);
}
/**
 * @since 2.0.0
 */
export var every = RR.every;
/**
 * @since 2.0.0
 */
export var some = RR.some;
// TODO: remove non-curried overloading in v3
/**
 * @since 2.0.0
 */
export var elem = RR.elem;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = RR.Functor.map;
var mapWithIndex_ = RR.FunctorWithIndex.mapWithIndex;
var reduce_ = RR.Foldable.reduce;
var foldMap_ = RR.Foldable.foldMap;
var reduceRight_ = RR.Foldable.reduceRight;
var reduceWithIndex_ = RR.FoldableWithIndex.reduceWithIndex;
var foldMapWithIndex_ = RR.FoldableWithIndex.foldMapWithIndex;
var reduceRightWithIndex_ = RR.FoldableWithIndex.reduceRightWithIndex;
var filter_ = RR.Filterable.filter;
var filterMap_ = RR.Filterable.filterMap;
var partition_ = RR.Filterable.partition;
var partitionMap_ = RR.Filterable.partitionMap;
var filterWithIndex_ = RR.FilterableWithIndex
    .filterWithIndex;
var filterMapWithIndex_ = RR.FilterableWithIndex.filterMapWithIndex;
var partitionWithIndex_ = RR.FilterableWithIndex
    .partitionWithIndex;
var partitionMapWithIndex_ = RR.FilterableWithIndex.partitionMapWithIndex;
var traverseWithIndex_ = RR.TraversableWithIndex
    .traverseWithIndex;
var wither_ = RR.Witherable.wither;
var wilt_ = RR.Witherable.wilt;
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return traverseF(f)(ta); };
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Filterable
 * @since 2.0.0
 */
export var filter = RR.filter;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var filterMap = RR.filterMap;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var foldMap = RR.foldMap;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var partition = RR.partition;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var partitionMap = RR.partitionMap;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduce = RR.reduce;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduceRight = RR.reduceRight;
/**
 * @category Compactable
 * @since 2.0.0
 */
export var compact = RR.compact;
/**
 * @category Compactable
 * @since 2.0.0
 */
export var separate = RR.separate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Record';
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
export var Compactable = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Filterable = {
    URI: URI,
    map: map_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var FilterableWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_
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
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverse: traverse_,
    sequence: sequence,
    traverseWithIndex: traverseWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Witherable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    wither: wither_,
    wilt: wilt_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var record = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    mapWithIndex: mapWithIndex_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    traverseWithIndex: traverseWithIndex_,
    wither: wither_,
    wilt: wilt_
};
