/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Applicative1 } from './Applicative'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Lazy, Predicate, Refinement } from './function'
import { Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { Monad1 } from './Monad'
import { Option } from './Option'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'
import { PipeableTraverseWithIndex1, TraversableWithIndex1 } from './TraversableWithIndex'
/**
 * @category model
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  0: A
}
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
export declare const cons: <A>(head: A, tail: Array<A>) => NonEmptyArray<A>
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
export declare const snoc: <A>(init: Array<A>, end: A) => NonEmptyArray<A>
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromArray: <A>(as: Array<A>) => Option<NonEmptyArray<A>>
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
export declare const uncons: <A>(nea: NonEmptyArray<A>) => readonly [A, Array<A>]
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
export declare const unsnoc: <A>(nea: NonEmptyArray<A>) => readonly [Array<A>, A]
/**
 * @category instances
 * @since 2.0.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const head: <A>(nea: NonEmptyArray<A>) => A
/**
 * @since 2.0.0
 */
export declare const tail: <A>(nea: NonEmptyArray<A>) => Array<A>
/**
 * @category combinators
 * @since 2.0.0
 */
export declare const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const min: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
/**
 * @since 2.0.0
 */
export declare const max: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @category instances
 * @since 2.0.0
 */
export declare const getSemigroup: <A = never>() => Semigroup<NonEmptyArray<A>>
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
export declare const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>>
/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @category combinators
 * @since 2.0.0
 */
export declare function group<B>(
  E: Eq<B>
): {
  <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  <A extends B>(as: Array<A>): Array<NonEmptyArray<A>>
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
export declare const groupSort: <B>(
  O: Ord<B>
) => {
  <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  <A extends B>(as: Array<A>): Array<NonEmptyArray<A>>
}
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
export declare const groupBy: <A>(f: (a: A) => string) => (as: Array<A>) => Record<string, NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const last: <A>(nea: NonEmptyArray<A>) => A
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
export declare const init: <A>(nea: NonEmptyArray<A>) => Array<A>
/**
 * @category combinators
 * @since 2.0.0
 */
export declare const sort: <B>(O: Ord<B>) => <A extends B>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @since 2.0.0
 */
export declare const insertAt: <A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const updateAt: <A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const modifyAt: <A>(i: number, f: (a: A) => A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @category combinators
 * @since 2.0.0
 */
export declare function copy<A>(nea: NonEmptyArray<A>): NonEmptyArray<A>
/**
 * @category combinators
 * @since 2.0.0
 */
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export declare function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * @since 2.0.0
 */
export declare const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export declare const of: Applicative1<URI>['of']
/**
 * @category constructors
 * @since 2.2.0
 */
export declare function concat<A>(fx: Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>
export declare function concat<A>(fx: NonEmptyArray<A>, fy: Array<A>): NonEmptyArray<A>
/**
 * @since 2.5.0
 */
export declare const fold: <A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A
/**
 * @category combinators
 * @since 2.5.1
 */
export declare const zipWith: <A, B, C>(
  fa: NonEmptyArray<A>,
  fb: NonEmptyArray<B>,
  f: (a: A, b: B) => C
) => NonEmptyArray<C>
/**
 * @category combinators
 * @since 2.5.1
 */
export declare const zip: {
  <B>(bs: NonEmptyArray<B>): <A>(as: NonEmptyArray<A>) => NonEmptyArray<[A, B]>
  <A, B>(as: NonEmptyArray<A>, bs: NonEmptyArray<B>): NonEmptyArray<[A, B]>
}
/**
 * @since 2.5.1
 */
export declare const unzip: <A, B>(as: NonEmptyArray<[A, B]>) => [NonEmptyArray<A>, NonEmptyArray<B>]
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
export declare const prependToAll: <A>(e: A) => (xs: NonEmptyArray<A>) => NonEmptyArray<A>
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
export declare const intersperse: <A>(e: A) => (as: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export declare const foldMapWithIndex: <S>(
  S: Semigroup<S>
) => <A>(f: (i: number, a: A) => S) => (fa: NonEmptyArray<A>) => S
/**
 * @category Foldable
 * @since 2.0.0
 */
export declare const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: NonEmptyArray<A>) => S
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export declare const altW: <B>(that: Lazy<NonEmptyArray<B>>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A | B>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export declare const alt: <A>(that: Lazy<NonEmptyArray<A>>) => (fa: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export declare const ap: <A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export declare const chain: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<A>
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
/**
 * @category Extend
 * @since 2.0.0
 */
export declare const extend: <A, B>(f: (fa: NonEmptyArray<A>) => B) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
/**
 * @category Foldable
 * @since 2.0.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export declare const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
/**
 * @category Foldable
 * @since 2.0.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export declare const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
/**
 * @since 2.6.3
 */
export declare const traverse: PipeableTraverse1<URI>
/**
 * @since 2.6.3
 */
export declare const sequence: Traversable1<URI>['sequence']
/**
 * @since 2.6.3
 */
export declare const traverseWithIndex: PipeableTraverseWithIndex1<URI, number>
/**
 * @since 2.7.0
 */
export declare const extract: Comonad1<URI>['extract']
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'NonEmptyArray'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: NonEmptyArray<A>
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
export declare const Alt: Alt1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Comonad: Comonad1<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI>
/**
 * @since 2.9.0
 */
export declare const Do: NonEmptyArray<{}>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(
  name: N
) => <A>(
  fa: NonEmptyArray<A>
) => NonEmptyArray<
  {
    [K in N]: A
  }
>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => NonEmptyArray<B>
) => (
  fa: NonEmptyArray<A>
) => NonEmptyArray<
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: NonEmptyArray<B>
) => (
  fa: NonEmptyArray<A>
) => NonEmptyArray<
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
