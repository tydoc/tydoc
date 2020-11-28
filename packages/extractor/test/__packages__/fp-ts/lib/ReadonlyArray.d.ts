/**
 * @since 2.5.0
 */
import { Alt1 } from './Alt'
import { Alternative1 } from './Alternative'
import { Applicative1 } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { Extend1 } from './Extend'
import { Filterable1 } from './Filterable'
import { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Lazy, Predicate, Refinement } from './function'
import { Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import * as O from './Option'
import { Ord } from './Ord'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'
import { PipeableTraverseWithIndex1, TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable1 } from './Unfoldable'
import { PipeableWilt1, PipeableWither1, Witherable1 } from './Witherable'
import Option = O.Option
/**
 * @category constructors
 * @since 2.5.0
 */
export declare function fromArray<A>(as: Array<A>): ReadonlyArray<A>
/**
 * @category destructors
 * @since 2.5.0
 */
export declare function toArray<A>(ras: ReadonlyArray<A>): Array<A>
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getShow<A>(S: Show<A>): Show<ReadonlyArray<A>>
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/ReadonlyArray'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.5.0
 */
export declare function getMonoid<A = never>(): Monoid<ReadonlyArray<A>>
/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import { eqString } from 'fp-ts/Eq'
 * import { getEq } from 'fp-ts/ReadonlyArray'
 *
 * const E = getEq(eqString)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.5.0
 */
export declare function getEq<A>(E: Eq<A>): Eq<ReadonlyArray<A>>
/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/ReadonlyArray'
 * import { ordString } from 'fp-ts/Ord'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @category instances
 * @since 2.5.0
 */
export declare function getOrd<A>(O: Ord<A>): Ord<ReadonlyArray<A>>
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyArray'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.5.0
 */
export declare function makeBy<A>(n: number, f: (i: number) => A): ReadonlyArray<A>
/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.5.0
 */
export declare function range(start: number, end: number): ReadonlyArray<number>
/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.5.0
 */
export declare function replicate<A>(n: number, a: A): ReadonlyArray<A>
/**
 * Removes one level of nesting
 *
 * Derivable from `Monad`.
 *
 * @example
 * import { flatten } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function flatten<A>(mma: ReadonlyArray<ReadonlyArray<A>>): ReadonlyArray<A>
/**
 * Break an array into its first element and remaining elements
 *
 * @example
 * import { foldLeft } from 'fp-ts/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category destructors
 * @since 2.5.0
 */
export declare function foldLeft<A, B>(
  onEmpty: Lazy<B>,
  onCons: (head: A, tail: ReadonlyArray<A>) => B
): (as: ReadonlyArray<A>) => B
/**
 * Break an array into its initial elements and the last element
 *
 * @category destructors
 * @since 2.5.0
 */
export declare function foldRight<A, B>(
  onEmpty: Lazy<B>,
  onCons: (init: ReadonlyArray<A>, last: A) => B
): (as: ReadonlyArray<A>) => B
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * @example
 * import { scanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function scanLeft<A, B>(b: B, f: (b: B, a: A) => B): (as: ReadonlyArray<A>) => ReadonlyArray<B>
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function scanRight<A, B>(b: B, f: (a: A, b: B) => B): (as: ReadonlyArray<A>) => ReadonlyArray<B>
/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 2.5.0
 */
export declare function isEmpty<A>(as: ReadonlyArray<A>): boolean
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`
 *
 * @category guards
 * @since 2.5.0
 */
export declare function isNonEmpty<A>(as: ReadonlyArray<A>): as is ReadonlyNonEmptyArray<A>
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
export declare function isOutOfBound<A>(i: number, as: ReadonlyArray<A>): boolean
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { lookup } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
 *
 * @since 2.5.0
 */
export declare function lookup(i: number): <A>(as: ReadonlyArray<A>) => Option<A>
export declare function lookup<A>(i: number, as: ReadonlyArray<A>): Option<A>
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], cons(0)), [0, 1, 2, 3])
 *
 * @category constructors
 * @since 2.5.0
 */
export declare function cons<A>(head: A): (tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>
export declare function cons<A>(head: A, tail: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.5.0
 */
export declare function snoc<A>(init: ReadonlyArray<A>, end: A): ReadonlyNonEmptyArray<A>
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.5.0
 */
export declare function head<A>(as: ReadonlyArray<A>): Option<A>
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.5.0
 */
export declare function last<A>(as: ReadonlyArray<A>): Option<A>
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.5.0
 */
export declare function tail<A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>>
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.5.0
 */
export declare function init<A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>>
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function takeLeft(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
 *
 * @since 2.5.0
 */
export declare function takeRight(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { takeLeftWhile } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function takeLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyArray<A>) => ReadonlyArray<B>
export declare function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * @since 2.5.0
 */
export interface Spanned<I, R> {
  readonly init: ReadonlyArray<I>
  readonly rest: ReadonlyArray<R>
}
/**
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @example
 * import { spanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
 *
 * @since 2.5.0
 */
export declare function spanLeft<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Spanned<B, A>
export declare function spanLeft<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Spanned<A, A>
/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { dropLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function dropLeft(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function dropRight(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropLeftWhile } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function dropLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
export declare function findIndex<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<number>
/**
 * Find the first element which satisfies a predicate (or a refinement) function
 *
 * @example
 * import { findFirst } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findFirst((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 1 }))
 *
 * @since 2.5.0
 */
export declare function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export declare function findFirst<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 2.5.0
 */
export declare function findFirstMap<A, B>(f: (a: A) => Option<B>): (as: ReadonlyArray<A>) => Option<B>
/**
 * Find the last element which satisfies a predicate function
 *
 * @example
 * import { findLast } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findLast((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 2 }))
 *
 * @since 2.5.0
 */
export declare function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export declare function findLast<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 2.5.0
 */
export declare function findLastMap<A, B>(f: (a: A) => Option<B>): (as: ReadonlyArray<A>) => Option<B>
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.5.0
 */
export declare function findLastIndex<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<number>
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.5.0
 */
export declare function insertAt<A>(i: number, a: A): (as: ReadonlyArray<A>) => Option<ReadonlyArray<A>>
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.5.0
 */
export declare function updateAt<A>(i: number, a: A): (as: ReadonlyArray<A>) => Option<ReadonlyArray<A>>
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.5.0
 */
export declare function deleteAt(i: number): <A>(as: ReadonlyArray<A>) => Option<ReadonlyArray<A>>
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.5.0
 */
export declare function modifyAt<A>(i: number, f: (a: A) => A): (as: ReadonlyArray<A>) => Option<ReadonlyArray<A>>
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function reverse<A>(as: ReadonlyArray<A>): ReadonlyArray<A>
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/ReadonlyArray'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function rights<E, A>(as: ReadonlyArray<Either<E, A>>): ReadonlyArray<A>
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/ReadonlyArray'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 2.5.0
 */
export declare function lefts<E, A>(as: ReadonlyArray<Either<E, A>>): ReadonlyArray<E>
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/ReadonlyArray'
 * import { ordNumber } from 'fp-ts/Ord'
 *
 * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare const sort: <B>(O: Ord<B>) => <A extends B>(as: readonly A[]) => readonly A[]
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function zipWith<A, B, C>(
  fa: ReadonlyArray<A>,
  fb: ReadonlyArray<B>,
  f: (a: A, b: B) => C
): ReadonlyArray<C>
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * @example
 * import { zip } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function zip<B>(bs: ReadonlyArray<B>): <A>(as: ReadonlyArray<A>) => ReadonlyArray<readonly [A, B]>
export declare function zip<A, B>(as: ReadonlyArray<A>, bs: ReadonlyArray<B>): ReadonlyArray<readonly [A, B]>
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.5.0
 */
export declare function unzip<A, B>(as: ReadonlyArray<readonly [A, B]>): readonly [ReadonlyArray<A>, ReadonlyArray<B>]
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependToAll } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(prependToAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
export declare const prependToAll: <A>(e: A) => (xs: readonly A[]) => readonly A[]
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
export declare function intersperse<A>(e: A): (as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function rotate(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Test if a value is a member of an array. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `ReadonlyArray<A>`.
 *
 * @example
 * import { elem } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(2)), true)
 * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(0)), false)
 *
 * @since 2.5.0
 */
export declare function elem<A>(
  E: Eq<A>
): {
  (a: A): (as: ReadonlyArray<A>) => boolean
  (a: A, as: ReadonlyArray<A>): boolean
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function uniq<A>(E: Eq<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/ReadonlyArray'
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
 * @since 2.5.0
 */
export declare function sortBy<B>(ords: ReadonlyArray<Ord<B>>): <A extends B>(as: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq, eqNumber } from 'fp-ts/Eq'
 * import { chop, spanLeft } from 'fp-ts/ReadonlyArray'
 *
 * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return chop(as => {
 *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare const chop: <A, B>(
  f: (as: ReadonlyNonEmptyArray<A>) => readonly [B, readonly A[]]
) => (as: readonly A[]) => readonly B[]
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.5.0
 */
export declare function splitAt(n: number): <A>(as: ReadonlyArray<A>) => readonly [ReadonlyArray<A>, ReadonlyArray<A>]
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
 * import { chunksOf } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 *
 * @since 2.5.0
 */
export declare function chunksOf(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>
/**
 * Array comprehension
 *
 * ```
 * [ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
 * ```
 *
 * @example
 * import { comprehension } from 'fp-ts/ReadonlyArray'
 * import { tuple } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], tuple, (a, b) => (a + b.length) % 2 === 0), [
 *   [1, 'a'],
 *   [1, 'b'],
 *   [3, 'a'],
 *   [3, 'b']
 * ])
 *
 * @category constructors
 * @since 2.5.0
 */
export declare function comprehension<A, B, C, D, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>, ReadonlyArray<C>, ReadonlyArray<D>],
  f: (a: A, b: B, c: C, d: D) => R,
  g?: (a: A, b: B, c: C, d: D) => boolean
): ReadonlyArray<R>
export declare function comprehension<A, B, C, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>, ReadonlyArray<C>],
  f: (a: A, b: B, c: C) => R,
  g?: (a: A, b: B, c: C) => boolean
): ReadonlyArray<R>
export declare function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => R,
  g?: (a: A) => boolean
): ReadonlyArray<R>
export declare function comprehension<A, B, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): ReadonlyArray<R>
export declare function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => boolean,
  g?: (a: A) => R
): ReadonlyArray<R>
/**
 * Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons
 *
 * @example
 * import { union } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], union(eqNumber)([2, 3])), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function union<A>(
  E: Eq<A>
): {
  (xs: ReadonlyArray<A>): (ys: ReadonlyArray<A>) => ReadonlyArray<A>
  (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<A>
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { intersection } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], intersection(eqNumber)([2, 3])), [2])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function intersection<A>(
  E: Eq<A>
): {
  (xs: ReadonlyArray<A>): (ys: ReadonlyArray<A>) => ReadonlyArray<A>
  (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<A>
}
/**
 * Creates an array of array values not included in the other given array using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { difference } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], difference(eqNumber)([2, 3])), [1])
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function difference<A>(
  E: Eq<A>
): {
  (xs: ReadonlyArray<A>): (ys: ReadonlyArray<A>) => ReadonlyArray<A>
  (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<A>
}
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.5.0
 */
export declare const of: Applicative1<URI>['of']
/**
 * @category Alternative
 * @since 2.7.0
 */
export declare const zero: Alternative1<URI>['zero']
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export declare const altW: <B>(that: Lazy<ReadonlyArray<B>>) => <A>(fa: ReadonlyArray<A>) => ReadonlyArray<A | B>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.5.0
 */
export declare const alt: <A>(that: Lazy<ReadonlyArray<A>>) => (fa: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.5.0
 */
export declare const ap: <A>(fa: ReadonlyArray<A>) => <B>(fab: ReadonlyArray<(a: A) => B>) => ReadonlyArray<B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
export declare const apFirst: <B>(fb: ReadonlyArray<B>) => <A>(fa: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
export declare const apSecond: <B>(fb: readonly B[]) => <A>(fa: readonly A[]) => readonly B[]
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.5.0
 */
export declare const chain: <A, B>(f: (a: A) => ReadonlyArray<B>) => (ma: ReadonlyArray<A>) => ReadonlyArray<B>
/**
 * @since 2.7.0
 */
export declare const chainWithIndex: <A, B>(
  f: (i: number, a: A) => ReadonlyArray<B>
) => (ma: ReadonlyArray<A>) => ReadonlyArray<B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.5.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => ReadonlyArray<B>) => (ma: ReadonlyArray<A>) => ReadonlyArray<A>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: ReadonlyArray<A>) => ReadonlyArray<B>
/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: ReadonlyArray<A>) => ReadonlyArray<B>
/**
 * @category Compactable
 * @since 2.5.0
 */
export declare const separate: <A, B>(fa: readonly Either<A, B>[]) => Separated<readonly A[], readonly B[]>
/**
 * @category Filterable
 * @since 2.5.0
 */
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: ReadonlyArray<A>) => ReadonlyArray<B>
  <A>(predicate: Predicate<A>): (fa: ReadonlyArray<A>) => ReadonlyArray<A>
}
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
export declare const filterMapWithIndex: <A, B>(
  f: (i: number, a: A) => O.Option<B>
) => (fa: readonly A[]) => readonly B[]
/**
 * @category Filterable
 * @since 2.5.0
 */
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: ReadonlyArray<A>) => ReadonlyArray<B>
/**
 * @category Compactable
 * @since 2.5.0
 */
export declare const compact: <A>(fa: ReadonlyArray<Option<A>>) => ReadonlyArray<A>
/**
 * @category Filterable
 * @since 2.5.0
 */
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fa: ReadonlyArray<A>
  ) => Separated<ReadonlyArray<A>, ReadonlyArray<B>>
  <A>(predicate: Predicate<A>): (fa: ReadonlyArray<A>) => Separated<ReadonlyArray<A>, ReadonlyArray<A>>
}
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
export declare const partitionWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (
    fa: ReadonlyArray<A>
  ) => Separated<ReadonlyArray<A>, ReadonlyArray<B>>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (
    fa: ReadonlyArray<A>
  ) => Separated<ReadonlyArray<A>, ReadonlyArray<A>>
}
/**
 * @category Filterable
 * @since 2.5.0
 */
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: ReadonlyArray<A>) => Separated<ReadonlyArray<B>, ReadonlyArray<C>>
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
export declare const partitionMapWithIndex: <A, B, C>(
  f: (i: number, a: A) => Either<B, C>
) => (fa: readonly A[]) => Separated<readonly B[], readonly C[]>
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
export declare const filterWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: ReadonlyArray<A>) => ReadonlyArray<B>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: ReadonlyArray<A>) => ReadonlyArray<A>
}
/**
 * @category Extend
 * @since 2.5.0
 */
export declare const extend: <A, B>(f: (fa: ReadonlyArray<A>) => B) => (wa: ReadonlyArray<A>) => ReadonlyArray<B>
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
export declare const duplicate: <A>(wa: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export declare const foldMapWithIndex: <M>(
  M: Monoid<M>
) => <A>(f: (i: number, a: A) => M) => (fa: ReadonlyArray<A>) => M
/**
 * @category Foldable
 * @since 2.5.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyArray<A>) => B
/**
 * @category Foldable
 * @since 2.5.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: ReadonlyArray<A>) => M
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export declare const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: ReadonlyArray<A>) => B
/**
 * @category Foldable
 * @since 2.5.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyArray<A>) => B
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export declare const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: ReadonlyArray<A>) => B
/**
 * **for optimized and stack safe version check the data types `traverseArray` function**
 * @category Traversable
 * @since 2.6.3
 */
export declare const traverse: PipeableTraverse1<URI>
/**
 * **for optimized and stack safe version check the data types `sequenceArray` function**
 * @category Traversable
 * @since 2.6.3
 */
export declare const sequence: Traversable1<URI>['sequence']
/**
 * **for optimized and stack safe version check the data types `traverseArrayWithIndex` function**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
export declare const traverseWithIndex: PipeableTraverseWithIndex1<URI, number>
/**
 * @category Witherable
 * @since 2.6.5
 */
export declare const wither: PipeableWither1<URI>
/**
 * @category Witherable
 * @since 2.6.5
 */
export declare const wilt: PipeableWilt1<URI>
/**
 * @category Unfoldable
 * @since 2.6.6
 */
export declare const unfold: <A, B>(b: B, f: (b: B) => O.Option<readonly [A, B]>) => readonly A[]
/**
 * @category instances
 * @since 2.5.0
 */
export declare const URI = 'ReadonlyArray'
/**
 * @category instances
 * @since 2.5.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: ReadonlyArray<A>
  }
}
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Functor: Functor1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const FunctorWithIndex: FunctorWithIndex1<URI, number>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Applicative: Applicative1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Monad: Monad1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Unfoldable: Unfoldable1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Alt: Alt1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Alternative: Alternative1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Extend: Extend1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Compactable: Compactable1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Filterable: Filterable1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const FilterableWithIndex: FilterableWithIndex1<URI, number>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Foldable: Foldable1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const FoldableWithIndex: FoldableWithIndex1<URI, number>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Traversable: Traversable1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const TraversableWithIndex: TraversableWithIndex1<URI, number>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Witherable: Witherable1<URI>
/**
 * @category instances
 * @since 2.5.0
 */
export declare const readonlyArray: FunctorWithIndex1<URI, number> &
  Monad1<URI> &
  Unfoldable1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  FilterableWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  TraversableWithIndex1<URI, number> &
  Witherable1<URI>
/**
 * @category unsafe
 * @since 2.5.0
 */
export declare function unsafeInsertAt<A>(i: number, a: A, as: ReadonlyArray<A>): ReadonlyArray<A>
/**
 * @category unsafe
 * @since 2.5.0
 */
export declare function unsafeUpdateAt<A>(i: number, a: A, as: ReadonlyArray<A>): ReadonlyArray<A>
/**
 * @category unsafe
 * @since 2.5.0
 */
export declare function unsafeDeleteAt<A>(i: number, as: ReadonlyArray<A>): ReadonlyArray<A>
/**
 * An empty array
 *
 * @since 2.5.0
 */
export declare const empty: ReadonlyArray<never>
/**
 * Check if a predicate holds true for every array member.
 *
 * @example
 * import { every } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], every(isPositive)), true)
 * assert.deepStrictEqual(pipe([1, 2, -3], every(isPositive)), false)
 *
 * @since 2.9.0
 */
export declare const every: <A>(predicate: Predicate<A>) => (as: readonly A[]) => boolean
/**
 * Check if a predicate holds true for any array member.
 *
 * @example
 * import { some } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
 * assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
 *
 * @since 2.9.0
 */
export declare const some: <A>(predicate: Predicate<A>) => (as: readonly A[]) => boolean
/**
 * @since 2.9.0
 */
export declare const Do: ReadonlyArray<{}>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(name: N) => <A>(fa: readonly A[]) => readonly { [K in N]: A }[]
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => readonly B[]
) => (fa: readonly A[]) => readonly { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: readonly B[]
) => (fa: readonly A[]) => readonly { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
