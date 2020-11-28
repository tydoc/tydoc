import * as RS from './ReadonlySet';
/**
 * @category instances
 * @since 2.0.0
 */
export var getShow = RS.getShow;
/**
 * @since 2.0.0
 */
export var empty = new Set();
/**
 * @category constructors
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
export var toArray = RS.toReadonlyArray;
/**
 * @category instances
 * @since 2.0.0
 */
export var getEq = RS.getEq;
/**
 * @since 2.0.0
 */
export var some = RS.some;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category combinators
 * @since 2.0.0
 */
export var map = RS.map;
/**
 * @since 2.0.0
 */
export var every = RS.every;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 2.0.0
 */
export var chain = RS.chain;
// TODO: remove non-curried overloading in v3
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.0.0
 */
export var subset = RS.isSubset;
export function filter(predicate) {
    return RS.filter(predicate);
}
export function partition(predicate) {
    return RS.partition(predicate);
}
// TODO: remove non-curried overloading in v3
/**
 * Test if a value is a member of a set
 *
 * @since 2.0.0
 */
export var elem = RS.elem;
// TODO: remove non-curried overloading in v3
/**
 * Form the union of two sets
 *
 * @category combinators
 * @since 2.0.0
 */
export var union = RS.union;
// TODO: remove non-curried overloading in v3
/**
 * The set of elements which are in both the first and second set
 *
 * @category combinators
 * @since 2.0.0
 */
export var intersection = RS.intersection;
/**
 * @since 2.0.0
 */
export var partitionMap = RS.partitionMap;
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
export var difference = RS.difference;
/**
 * @category instances
 * @since 2.0.0
 */
export var getUnionMonoid = RS.getUnionMonoid;
/**
 * @category instances
 * @since 2.0.0
 */
export var getIntersectionSemigroup = RS.getIntersectionSemigroup;
/**
 * @since 2.0.0
 */
export var reduce = RS.reduce;
/**
 * @since 2.0.0
 */
export var foldMap = RS.foldMap;
/**
 * Create a set with one element
 *
 * @category constructors
 * @since 2.0.0
 */
export var singleton = RS.singleton;
/**
 * Insert a value into a set
 *
 * @category combinators
 * @since 2.0.0
 */
export var insert = RS.insert;
/**
 * Delete a value from a set
 *
 * @category combinators
 * @since 2.0.0
 */
export var remove = RS.remove;
/**
 * Checks an element is a member of a set;
 * If yes, removes the value from the set
 * If no, inserts the value to the set
 *
 * @category combinators
 * @since 2.5.0
 */
export function toggle(E) {
    var elemE = elem(E);
    var removeE = remove(E);
    var insertE = insert(E);
    return function (a) { return function (set) { return (elemE(a, set) ? removeE : insertE)(a)(set); }; };
}
/**
 * Create a set from an array
 *
 * @category constructors
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
export var fromArray = RS.fromArray;
/**
 * @category combinators
 * @since 2.0.0
 */
export var compact = RS.compact;
/**
 * @since 2.0.0
 */
export var separate = RS.separate;
/**
 * @category combinators
 * @since 2.0.0
 */
export var filterMap = RS.filterMap;
