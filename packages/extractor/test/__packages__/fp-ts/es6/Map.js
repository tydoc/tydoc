import * as RM from './ReadonlyMap';
/* tslint:disable:readonly-array */
/**
 * @category instances
 * @since 2.0.0
 */
export var getShow = RM.getShow;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.0.0
 */
export var size = RM.size;
/**
 * Test whether or not a map is empty
 *
 * @since 2.0.0
 */
export var isEmpty = RM.isEmpty;
// TODO: remove non-curried overloading in v3
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.0.0
 */
export var member = RM.member;
// TODO: remove non-curried overloading in v3
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.0.0
 */
export var elem = RM.elem;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.0.0
 */
export var keys = RM.keys;
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.0.0
 */
export var values = RM.values;
/**
 * @since 2.0.0
 */
export var collect = RM.collect;
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.0.0
 */
export var toArray = RM.toReadonlyArray;
export function toUnfoldable(O, U) {
    return RM.toUnfoldable(O, U);
}
/**
 * Insert or replace a key/value pair in a map
 *
 * @category combinators
 * @since 2.0.0
 */
export var insertAt = RM.insertAt;
/**
 * Delete a key and value from a map
 *
 * @category combinators
 * @since 2.0.0
 */
export var deleteAt = RM.deleteAt;
/**
 * @since 2.0.0
 */
export var updateAt = RM.updateAt;
/**
 * @since 2.0.0
 */
export var modifyAt = RM.modifyAt;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export var pop = RM.pop;
// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.0.0
 */
export var lookupWithKey = RM.lookupWithKey;
// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.0.0
 */
export var lookup = RM.lookup;
// TODO: remove non-curried overloading in v3
/**
 * Test whether or not one `Map` contains all of the keys and values contained in another `Map`
 *
 * @since 2.0.0
 */
export var isSubmap = RM.isSubmap;
/**
 * @since 2.0.0
 */
export var empty = new Map();
/**
 * @category instances
 * @since 2.0.0
 */
export var getEq = RM.getEq;
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @category instances
 * @since 2.0.0
 */
export var getMonoid = RM.getMonoid;
/**
 * Create a map with one key/value pair
 *
 * @since 2.0.0
 */
export var singleton = RM.singleton;
export function fromFoldable(E, M, F) {
    return RM.fromFoldable(E, M, F);
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map__ = RM.Functor.map;
var filter_ = RM.Filterable.filter;
var filterMap_ = RM.Filterable.filterMap;
var partition_ = RM.Filterable.partition;
var partitionMap_ = RM.Filterable.partitionMap;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Compactable
 * @since 2.0.0
 */
export var compact = RM.compact;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var filter = RM.filter;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var filterMap = RM.filterMap;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export var map = RM.map;
/**
 * @category FunctorWithIndex
 * @since 2.7.1
 */
export var mapWithIndex = RM.mapWithIndex;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var partition = RM.partition;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var partitionMap = RM.partitionMap;
/**
 * @category Compactable
 * @since 2.0.0
 */
export var separate = RM.separate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Map';
/**
 * @category instances
 * @since 2.0.0
 */
export var getFilterableWithIndex = RM.getFilterableWithIndex;
/**
 * @category instances
 * @since 2.0.0
 */
export var getWitherable = RM.getWitherable;
/**
 * @category instances
 * @since 2.7.0
 */
export var Functor = {
    URI: URI,
    map: map__
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
    map: map__,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var map_ = Filterable;
