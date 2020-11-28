import * as RA from './ReadonlyArray';
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/* tslint:disable:readonly-array */
/**
 * @category instances
 * @since 2.0.0
 */
export var getShow = RA.getShow;
/**
 * Returns a `Monoid` for `Array<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/Array'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.0.0
 */
export var getMonoid = RA.getMonoid;
/**
 * Derives an `Eq` over the `Array` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import { eqString } from 'fp-ts/Eq'
 * import { getEq } from 'fp-ts/Array'
 *
 * const E = getEq(eqString)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.0.0
 */
export var getEq = RA.getEq;
/**
 * Derives an `Ord` over the `Array` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/Array'
 * import { ordString } from 'fp-ts/Ord'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 * @category instances
 * @since 2.0.0
 */
export var getOrd = RA.getOrd;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/Array'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.0.0
 */
export var makeBy = RA.makeBy;
/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @example
 * import { range } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.0.0
 */
export var range = RA.range;
/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.0.0
 */
export var replicate = RA.replicate;
/**
 * Removes one level of nesting.
 *
 * Derivable from `Monad`.
 *
 * @example
 * import { flatten } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
export var flatten = RA.flatten;
/**
 * Break an array into its first element and remaining elements
 *
 * @example
 * import { foldLeft } from 'fp-ts/Array'
 *
 * const len: <A>(as: Array<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category destructors
 * @since 2.0.0
 */
export var foldLeft = RA.foldLeft;
/**
 * Break an array into its initial elements and the last element
 *
 * @category destructors
 * @since 2.0.0
 */
export var foldRight = RA.foldRight;
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * @example
 * import { scanLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @category combinators
 * @since 2.0.0
 */
export var scanLeft = RA.scanLeft;
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @category combinators
 * @since 2.0.0
 */
export var scanRight = RA.scanRight;
/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/Array'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 2.0.0
 */
export var isEmpty = RA.isEmpty;
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`
 *
 * @category guards
 * @since 2.0.0
 */
export var isNonEmpty = RA.isNonEmpty;
/**
 * Test whether an array contains a particular index
 *
 * @since 2.0.0
 */
export var isOutOfBound = RA.isOutOfBound;
// TODO: remove non-curried overloading in v3
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { lookup } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
 *
 * @since 2.0.0
 */
export var lookup = RA.lookup;
// TODO: remove non-curried overloading in v3
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], cons(0)), [0, 1, 2, 3])
 *
 * @category constructors
 * @since 2.0.0
 */
export var cons = RA.cons;
// TODO: curry in v3
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.0.0
 */
export var snoc = RA.snoc;
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
export var head = RA.head;
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
export var last = RA.last;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
export var tail = RA.tail;
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
export var init = RA.init;
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
 *
 * @category combinators
 * @since 2.0.0
 */
export var takeLeft = RA.takeLeft;
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
 *
 * @category combinators
 * @since 2.0.0
 */
export var takeRight = RA.takeRight;
export function takeLeftWhile(predicate) {
    return RA.takeLeftWhile(predicate);
}
export function spanLeft(predicate) {
    return RA.spanLeft(predicate);
}
/* tslint:enable:readonly-keyword */
/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { dropLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
 *
 * @category combinators
 * @since 2.0.0
 */
export var dropLeft = RA.dropLeft;
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
export var dropRight = RA.dropRight;
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropLeftWhile } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 *
 * @category combinators
 * @since 2.0.0
 */
export var dropLeftWhile = RA.dropLeftWhile;
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.0.0
 */
export var findIndex = RA.findIndex;
export function findFirst(predicate) {
    return RA.findFirst(predicate);
}
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @category destructors
 * @since 2.0.0
 */
export var findFirstMap = RA.findFirstMap;
export function findLast(predicate) {
    return RA.findLast(predicate);
}
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @category destructors
 * @since 2.0.0
 */
export var findLastMap = RA.findLastMap;
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.0.0
 */
export var findLastIndex = RA.findLastIndex;
/**
 * @category combinators
 * @since 2.0.0
 */
export var copy = RA.toArray;
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/Array'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.0.0
 */
export var insertAt = RA.insertAt;
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.0.0
 */
export var updateAt = RA.updateAt;
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.0.0
 */
export var deleteAt = RA.deleteAt;
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.0.0
 */
export var modifyAt = RA.modifyAt;
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @category combinators
 * @since 2.0.0
 */
export var reverse = RA.reverse;
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/Array'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @category combinators
 * @since 2.0.0
 */
export var rights = RA.rights;
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/Array'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @category combinators
 * @since 2.0.0
 */
export var lefts = RA.lefts;
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { ordNumber } from 'fp-ts/Ord'
 *
 * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
export var sort = RA.sort;
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @category combinators
 * @since 2.0.0
 */
export var zipWith = RA.zipWith;
// TODO: remove non-curried overloading in v3
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * @example
 * import { zip } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @category combinators
 * @since 2.0.0
 */
export var zip = RA.zip;
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.0.0
 */
export var unzip = RA.unzip;
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependToAll } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(prependToAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
export var prependToAll = RA.prependToAll;
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
export var intersperse = RA.intersperse;
/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
export var rotate = RA.rotate;
// TODO: remove non-curried overloading in v3
/**
 * Test if a value is a member of an array. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 *
 * @example
 * import { elem } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(2)), true)
 * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(0)), false)
 *
 * @since 2.0.0
 */
export var elem = RA.elem;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.0.0
 */
export var uniq = RA.uniq;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/Array'
 * import { ord, ordString, ordNumber } from 'fp-ts/Ord'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = ord.contramap(ordString, (p: Person) => p.name)
 * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.0.0
 */
export var sortBy = RA.sortBy;
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq, eqNumber } from 'fp-ts/Eq'
 * import { chop, spanLeft } from 'fp-ts/Array'
 *
 * const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
 *   return chop(as => {
 *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @category combinators
 * @since 2.0.0
 */
export var chop = RA.chop;
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.0.0
 */
export var splitAt = RA.splitAt;
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 * @since 2.0.0
 */
export var chunksOf = RA.chunksOf;
export function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    return RA.comprehension(input, f, g);
}
// TODO: remove non-curried overloading in v3
/**
 * Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons
 *
 * @example
 * import { union } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], union(eqNumber)([2, 3])), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
export var union = RA.union;
// TODO: remove non-curried overloading in v3
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { intersection } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], intersection(eqNumber)([2, 3])), [2])
 *
 * @category combinators
 * @since 2.0.0
 */
export var intersection = RA.intersection;
// TODO: remove non-curried overloading in v3
/**
 * Creates an array of array values not included in the other given array using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { difference } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], difference(eqNumber)([2, 3])), [1])
 *
 * @category combinators
 * @since 2.0.0
 */
export var difference = RA.difference;
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export var of = RA.of;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = RA.Monad.map;
var ap_ = RA.Monad.ap;
var chain_ = RA.Monad.chain;
var mapWithIndex_ = RA.FunctorWithIndex.mapWithIndex;
var filter_ = RA.Filterable.filter;
var filterMap_ = RA.Filterable.filterMap;
var partition_ = RA.Filterable.partition;
var partitionMap_ = RA.Filterable.partitionMap;
var filterWithIndex_ = RA.FilterableWithIndex
    .filterWithIndex;
var filterMapWithIndex_ = RA.FilterableWithIndex
    .filterMapWithIndex;
var partitionWithIndex_ = RA.FilterableWithIndex
    .partitionWithIndex;
var partitionMapWithIndex_ = RA.FilterableWithIndex
    .partitionMapWithIndex;
var reduce_ = RA.Foldable.reduce;
var foldMap_ = RA.Foldable.foldMap;
var reduceRight_ = RA.Foldable.reduceRight;
var traverse_ = RA.Traversable.traverse;
var alt_ = RA.Alternative.alt;
var reduceWithIndex_ = RA.FoldableWithIndex.reduceWithIndex;
var foldMapWithIndex_ = RA.FoldableWithIndex.foldMapWithIndex;
var reduceRightWithIndex_ = RA.FoldableWithIndex.reduceRightWithIndex;
var traverseWithIndex_ = RA.TraversableWithIndex
    .traverseWithIndex;
var extend_ = RA.Extend.extend;
var wither_ = RA.Witherable.wither;
var wilt_ = RA.Witherable.wilt;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export var map = RA.map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = RA.ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var apFirst = RA.apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var apSecond = RA.apSecond;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = RA.chain;
/**
 * @since 2.7.0
 */
export var chainWithIndex = RA.chainWithIndex;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var chainFirst = RA.chainFirst;
/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
export var mapWithIndex = RA.mapWithIndex;
/**
 * @category Compactable
 * @since 2.0.0
 */
export var compact = RA.compact;
/**
 * @category Compactable
 * @since 2.0.0
 */
export var separate = RA.separate;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var filter = RA.filter;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var filterMap = RA.filterMap;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var partition = RA.partition;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
export var partitionWithIndex = RA.partitionWithIndex;
/**
 * @category Filterable
 * @since 2.0.0
 */
export var partitionMap = RA.partitionMap;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
export var partitionMapWithIndex = RA.partitionMapWithIndex;
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
 * @since 2.0.0
 */
export var alt = RA.alt;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
export var filterMapWithIndex = RA.filterMapWithIndex;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
export var filterWithIndex = RA.filterWithIndex;
/**
 * @category Extend
 * @since 2.0.0
 */
export var extend = RA.extend;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var duplicate = RA.duplicate;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var foldMap = RA.foldMap;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export var foldMapWithIndex = RA.foldMapWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduce = RA.reduce;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export var reduceWithIndex = RA.reduceWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduceRight = RA.reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export var reduceRightWithIndex = RA.reduceRightWithIndex;
/**
 * **for optimized and stack safe version check the data types `traverseArray` function**
 * @category Traversable
 * @since 2.6.3
 */
export var traverse = RA.traverse;
/**
 * **for optimized and stack safe version check the data types `sequenceArray` function**
 * @category Traversable
 * @since 2.6.3
 */
export var sequence = RA.sequence;
/**
 * **for optimized and stack safe version check the data types `traverseArrayWithIndex` function**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
export var traverseWithIndex = RA.traverseWithIndex;
/**
 * @category Witherable
 * @since 2.6.5
 */
export var wither = RA.wither;
/**
 * @category Witherable
 * @since 2.6.5
 */
export var wilt = RA.wilt;
/**
 * @category Unfoldable
 * @since 2.6.6
 */
export var unfold = RA.unfold;
/**
 * @category Alternative
 * @since 2.7.0
 */
export var zero = RA.Alternative.zero;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Array';
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
export var Unfoldable = {
    URI: URI,
    unfold: unfold
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
export var Alternative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    alt: alt_,
    zero: zero
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Extend = {
    URI: URI,
    map: map_,
    extend: extend_
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
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_
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
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    wither: wither_,
    wilt: wilt_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var array = {
    URI: URI,
    compact: compact,
    separate: separate,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    mapWithIndex: mapWithIndex_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    alt: alt_,
    zero: zero,
    unfold: unfold,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverseWithIndex: traverseWithIndex_,
    extend: extend_,
    wither: wither_,
    wilt: wilt_
};
// -------------------------------------------------------------------------------------
// unsafe
// -------------------------------------------------------------------------------------
/**
 * @category unsafe
 * @since 2.0.0
 */
export var unsafeInsertAt = RA.unsafeInsertAt;
/**
 * @category unsafe
 * @since 2.0.0
 */
export var unsafeUpdateAt = RA.unsafeUpdateAt;
/**
 * @category unsafe
 * @since 2.0.0
 */
export var unsafeDeleteAt = RA.unsafeDeleteAt;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * An empty array
 *
 * @since 2.0.0
 */
export var empty = [];
/**
 * @since 2.9.0
 */
export var every = RA.every;
/**
 * @since 2.9.0
 */
export var some = RA.some;
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
export var bindTo = RA.bindTo;
/**
 * @since 2.8.0
 */
export var bind = RA.bind;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
export var apS = RA.apS;
