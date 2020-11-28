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
exports.filterMap = exports.separate = exports.compact = exports.fromArray = exports.toggle = exports.remove = exports.insert = exports.singleton = exports.foldMap = exports.reduce = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.difference = exports.partitionMap = exports.intersection = exports.union = exports.elem = exports.partition = exports.filter = exports.subset = exports.chain = exports.every = exports.map = exports.some = exports.getEq = exports.toArray = exports.empty = exports.getShow = void 0;
var RS = __importStar(require("./ReadonlySet"));
/**
 * @category instances
 * @since 2.0.0
 */
exports.getShow = RS.getShow;
/**
 * @since 2.0.0
 */
exports.empty = new Set();
/**
 * @category constructors
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
exports.toArray = RS.toReadonlyArray;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getEq = RS.getEq;
/**
 * @since 2.0.0
 */
exports.some = RS.some;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.map = RS.map;
/**
 * @since 2.0.0
 */
exports.every = RS.every;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.chain = RS.chain;
// TODO: remove non-curried overloading in v3
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.0.0
 */
exports.subset = RS.isSubset;
function filter(predicate) {
    return RS.filter(predicate);
}
exports.filter = filter;
function partition(predicate) {
    return RS.partition(predicate);
}
exports.partition = partition;
// TODO: remove non-curried overloading in v3
/**
 * Test if a value is a member of a set
 *
 * @since 2.0.0
 */
exports.elem = RS.elem;
// TODO: remove non-curried overloading in v3
/**
 * Form the union of two sets
 *
 * @category combinators
 * @since 2.0.0
 */
exports.union = RS.union;
// TODO: remove non-curried overloading in v3
/**
 * The set of elements which are in both the first and second set
 *
 * @category combinators
 * @since 2.0.0
 */
exports.intersection = RS.intersection;
/**
 * @since 2.0.0
 */
exports.partitionMap = RS.partitionMap;
// TODO: remove non-curried overloading in v3
/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference } from 'fp-ts/Set'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(new Set([1, 2]), difference(eqNumber)(new Set([1, 3]))), new Set([2]))
 *
 * @category combinators
 * @since 2.0.0
 */
exports.difference = RS.difference;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getUnionMonoid = RS.getUnionMonoid;
/**
 * @category instances
 * @since 2.0.0
 */
exports.getIntersectionSemigroup = RS.getIntersectionSemigroup;
/**
 * @since 2.0.0
 */
exports.reduce = RS.reduce;
/**
 * @since 2.0.0
 */
exports.foldMap = RS.foldMap;
/**
 * Create a set with one element
 *
 * @category constructors
 * @since 2.0.0
 */
exports.singleton = RS.singleton;
/**
 * Insert a value into a set
 *
 * @category combinators
 * @since 2.0.0
 */
exports.insert = RS.insert;
/**
 * Delete a value from a set
 *
 * @category combinators
 * @since 2.0.0
 */
exports.remove = RS.remove;
/**
 * Checks an element is a member of a set;
 * If yes, removes the value from the set
 * If no, inserts the value to the set
 *
 * @category combinators
 * @since 2.5.0
 */
function toggle(E) {
    var elemE = exports.elem(E);
    var removeE = exports.remove(E);
    var insertE = exports.insert(E);
    return function (a) { return function (set) { return (elemE(a, set) ? removeE : insertE)(a)(set); }; };
}
exports.toggle = toggle;
/**
 * Create a set from an array
 *
 * @category constructors
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
exports.fromArray = RS.fromArray;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.compact = RS.compact;
/**
 * @since 2.0.0
 */
exports.separate = RS.separate;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.filterMap = RS.filterMap;
