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
exports.map_ = exports.Filterable = exports.Compactable = exports.Functor = exports.getWitherable = exports.getFilterableWithIndex = exports.URI = exports.separate = exports.partitionMap = exports.partition = exports.mapWithIndex = exports.map = exports.filterMap = exports.filter = exports.compact = exports.fromFoldable = exports.singleton = exports.getMonoid = exports.getEq = exports.empty = exports.isSubmap = exports.lookup = exports.lookupWithKey = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.insertAt = exports.toUnfoldable = exports.toArray = exports.collect = exports.values = exports.keys = exports.elem = exports.member = exports.isEmpty = exports.size = exports.getShow = void 0;
var RM = __importStar(require("./ReadonlyMap"));
/* tslint:disable:readonly-array */
/**
 * @category instances
 * @since 2.0.0
 */
exports.getShow = RM.getShow;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.0.0
 */
exports.size = RM.size;
/**
 * Test whether or not a map is empty
 *
 * @since 2.0.0
 */
exports.isEmpty = RM.isEmpty;
// TODO: remove non-curried overloading in v3
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.0.0
 */
exports.member = RM.member;
// TODO: remove non-curried overloading in v3
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.0.0
 */
exports.elem = RM.elem;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.0.0
 */
exports.keys = RM.keys;
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.0.0
 */
exports.values = RM.values;
/**
 * @since 2.0.0
 */
exports.collect = RM.collect;
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.0.0
 */
exports.toArray = RM.toReadonlyArray;
function toUnfoldable(O, U) {
    return RM.toUnfoldable(O, U);
}
exports.toUnfoldable = toUnfoldable;
/**
 * Insert or replace a key/value pair in a map
 *
 * @category combinators
 * @since 2.0.0
 */
exports.insertAt = RM.insertAt;
/**
 * Delete a key and value from a map
 *
 * @category combinators
 * @since 2.0.0
 */
exports.deleteAt = RM.deleteAt;
/**
 * @since 2.0.0
 */
exports.updateAt = RM.updateAt;
/**
 * @since 2.0.0
 */
exports.modifyAt = RM.modifyAt;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
exports.pop = RM.pop;
// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.0.0
 */
exports.lookupWithKey = RM.lookupWithKey;
// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.0.0
 */
exports.lookup = RM.lookup;
// TODO: remove non-curried overloading in v3
/**
 * Test whether or not one `Map` contains all of the keys and values contained in another `Map`
 *
 * @since 2.0.0
 */
exports.isSubmap = RM.isSubmap;
/**
 * @since 2.0.0
 */
exports.empty = new Map();
/**
 * @category instances
 * @since 2.0.0
 */
exports.getEq = RM.getEq;
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @category instances
 * @since 2.0.0
 */
exports.getMonoid = RM.getMonoid;
/**
 * Create a map with one key/value pair
 *
 * @since 2.0.0
 */
exports.singleton = RM.singleton;
function fromFoldable(E, M, F) {
    return RM.fromFoldable(E, M, F);
}
exports.fromFoldable = fromFoldable;
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
exports.compact = RM.compact;
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.filter = RM.filter;
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.filterMap = RM.filterMap;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
exports.map = RM.map;
/**
 * @category FunctorWithIndex
 * @since 2.7.1
 */
exports.mapWithIndex = RM.mapWithIndex;
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.partition = RM.partition;
/**
 * @category Filterable
 * @since 2.0.0
 */
exports.partitionMap = RM.partitionMap;
/**
 * @category Compactable
 * @since 2.0.0
 */
exports.separate = RM.separate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Map';
/**
 * @category instances
 * @since 2.0.0
 */
exports.getFilterableWithIndex = RM.getFilterableWithIndex;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getWitherable = RM.getWitherable;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: map__
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Compactable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Filterable = {
    URI: exports.URI,
    map: map__,
    compact: exports.compact,
    separate: exports.separate,
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
exports.map_ = exports.Filterable;
