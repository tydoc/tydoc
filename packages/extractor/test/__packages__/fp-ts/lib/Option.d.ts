/**
 * ```ts
 * type Option<A> = None | Some<A>
 * ```
 *
 * `Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
 * an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
 * instance of `None`.
 *
 * An option could be looked at as a collection or foldable structure with either one or zero elements.
 * Another way to look at `Option` is: it represents the effect of a possibly failing computation.
 *
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Alternative1 } from './Alternative'
import { Applicative1 } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { Extend1 } from './Extend'
import { Filterable1 } from './Filterable'
import { Foldable1 } from './Foldable'
import { Lazy, Predicate, Refinement } from './function'
import { Functor1 } from './Functor'
import { Monad1 } from './Monad'
import { MonadThrow1 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'
import { PipeableWilt1, PipeableWither1, Witherable1 } from './Witherable'
/**
 * @category model
 * @since 2.0.0
 */
export interface None {
  readonly _tag: 'None'
}
/**
 * @category model
 * @since 2.0.0
 */
export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}
/**
 * @category model
 * @since 2.0.0
 */
export declare type Option<A> = None | Some<A>
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category guards
 * @since 2.0.0
 */
export declare const isSome: <A>(fa: Option<A>) => fa is Some<A>
/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category guards
 * @since 2.0.0
 */
export declare const isNone: <A>(fa: Option<A>) => fa is None
/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const none: Option<never>
/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const some: <A>(a: A) => Option<A>
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category constructors
 * @since 2.0.0
 */
export declare function fromNullable<A>(a: A): Option<NonNullable<A>>
/**
 * Returns a *smart constructor* based on the given predicate.
 *
 * @example
 * import { none, some, fromPredicate } from 'fp-ts/Option'
 *
 * const getOption = fromPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(getOption(-1), none)
 * assert.deepStrictEqual(getOption(1), some(1))
 *
 * @category constructors
 * @since 2.0.0
 */
export declare function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>
export declare function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @category constructors
 * @since 2.0.0
 */
export declare function tryCatch<A>(f: Lazy<A>): Option<A>
/**
 * Returns the `Left` value of an `Either` if possible.
 *
 * @example
 * import { getLeft, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 *
 * @category constructors
 * @since 2.0.0
 */
export declare function getLeft<E, A>(ma: Either<E, A>): Option<E>
/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 * import { getRight, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left('a')), none)
 *
 * @category constructors
 * @since 2.0.0
 */
export declare function getRight<E, A>(ma: Either<E, A>): Option<A>
/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getRight)
 *
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromEither: <E, A>(ma: Either<E, A>) => Option<A>
/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, fold } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export declare function fold<A, B>(onNone: Lazy<B>, onSome: (a: A) => B): (ma: Option<A>) => B
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNullable
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNullable
 *   ),
 *   null
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export declare function toNullable<A>(ma: Option<A>): A | null
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export declare function toUndefined<A>(ma: Option<A>): A | undefined
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export declare const getOrElseW: <B>(onNone: Lazy<B>) => <A>(ma: Option<A>) => B | A
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export declare const getOrElse: <A>(onNone: Lazy<A>) => (ma: Option<A>) => A
/**
 * Returns a *smart constructor* from a function that returns a nullable value.
 *
 * @example
 * import { fromNullableK, none, some } from 'fp-ts/Option'
 *
 * const f = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const g = fromNullableK(f)
 *
 * assert.deepStrictEqual(g('1'), some(1))
 * assert.deepStrictEqual(g('a'), none)
 *
 * @category combinators
 * @since 2.9.0
 */
export declare function fromNullableK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
): (...a: A) => Option<NonNullable<B>>
/**
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export declare const mapNullable: typeof chainNullableK
/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, fromNullable, chainNullableK } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Employee {
 *   company?: {
 *     address?: {
 *       street?: {
 *         name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   none
 * )
 *
 * @category combinators
 * @since 2.9.0
 */
export declare function chainNullableK<A, B>(f: (a: A) => B | null | undefined): (ma: Option<A>) => Option<B>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export declare const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: Option<B>) => <A>(fa: Option<A>) => Option<A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: Option<B>) => <A>(fa: Option<A>) => Option<B>
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.7.0
 */
export declare const of: Applicative1<URI>['of']
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export declare const chain: <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<A>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: Option<Option<A>>) => Option<A>
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export declare const altW: <B>(that: Lazy<Option<B>>) => <A>(fa: Option<A>) => Option<A | B>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 *
 * @category Alt
 * @since 2.0.0
 */
export declare const alt: <A>(that: Lazy<Option<A>>) => (fa: Option<A>) => Option<A>
/**
 * @category Alternative
 * @since 2.7.0
 */
export declare const zero: Alternative1<URI>['zero']
/**
 * @category MonadThrow
 * @since 2.7.0
 */
export declare const throwError: MonadThrow1<URI>['throwError']
/**
 * @category Extend
 * @since 2.0.0
 */
export declare const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B>
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const duplicate: <A>(ma: Option<A>) => Option<Option<A>>
/**
 * @category Foldable
 * @since 2.0.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Option<A>) => B
/**
 * @category Foldable
 * @since 2.0.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Option<A>) => M
/**
 * @category Foldable
 * @since 2.0.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Option<A>) => B
/**
 * @category Compactable
 * @since 2.0.0
 */
export declare const compact: <A>(fa: Option<Option<A>>) => Option<A>
/**
 * @category Compactable
 * @since 2.0.0
 */
export declare const separate: <A, B>(ma: Option<Either<A, B>>) => Separated<Option<A>, Option<B>>
/**
 * @category Filterable
 * @since 2.0.0
 */
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Option<B>
  <A>(predicate: Predicate<A>): (fa: Option<A>) => Option<A>
}
/**
 * @category Filterable
 * @since 2.0.0
 */
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B>
/**
 * @category Filterable
 * @since 2.0.0
 */
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Separated<Option<A>, Option<B>>
  <A>(predicate: Predicate<A>): (fa: Option<A>) => Separated<Option<A>, Option<A>>
}
/**
 * @category Filterable
 * @since 2.0.0
 */
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Option<A>) => Separated<Option<B>, Option<C>>
/**
 * @category Traversable
 * @since 2.6.3
 */
export declare const traverse: PipeableTraverse1<URI>
/**
 * @category Traversable
 * @since 2.6.3
 */
export declare const sequence: Traversable1<URI>['sequence']
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
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'Option'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Option<A>
  }
}
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getShow<A>(S: Show<A>): Show<Option<A>>
/**
 * @example
 * import { none, some, getEq } from 'fp-ts/Option'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getEq<A>(E: Eq<A>): Eq<Option<A>>
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/Option'
 * import { ordNumber } from 'fp-ts/Ord'
 *
 * const O = getOrd(ordNumber)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getOrd<A>(O: Ord<A>): Ord<Option<A>>
/**
 * `Apply` semigroup
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getApplySemigroup, some, none } from 'fp-ts/Option'
 * import { semigroupSum } from 'fp-ts/Semigroup'
 *
 * const S = getApplySemigroup(semigroupSum)
 * assert.deepStrictEqual(S.concat(none, none), none)
 * assert.deepStrictEqual(S.concat(some(1), none), none)
 * assert.deepStrictEqual(S.concat(none, some(1)), none)
 * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getApplySemigroup<A>(S: Semigroup<A>): Semigroup<Option<A>>
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getApplyMonoid<A>(M: Monoid<A>): Monoid<Option<A>>
/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getFirstMonoid<A = never>(): Monoid<Option<A>>
/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getLastMonoid<A = never>(): Monoid<Option<A>>
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(a) | some(a)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/Option'
 * import { semigroupSum } from 'fp-ts/Semigroup'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getMonoid<A>(S: Semigroup<A>): Monoid<Option<A>>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Functor: Functor1<URI>
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
export declare const Traversable: Traversable1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Witherable: Witherable1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const MonadThrow: MonadThrow1<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const option: Monad1<URI> &
  Foldable1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Witherable1<URI> &
  MonadThrow1<URI>
/**
 * Returns `true` if `ma` contains `a`
 *
 * @example
 * import { some, none, elem } from 'fp-ts/Option'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * assert.strictEqual(elem(eqNumber)(1, some(1)), true)
 * assert.strictEqual(elem(eqNumber)(2, some(1)), false)
 * assert.strictEqual(elem(eqNumber)(1, none), false)
 *
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): (a: A, ma: Option<A>) => boolean
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 2.0.0
 */
export declare function exists<A>(predicate: Predicate<A>): (ma: Option<A>) => boolean
/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * ```ts
 * import { some, none, getRefinement } from 'fp-ts/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 * ```
 *
 * @since 2.0.0
 */
export declare function getRefinement<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B>
/**
 * @since 2.9.0
 */
export declare const Do: Option<{}>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(name: N) => <A>(fa: Option<A>) => Option<{ [K in N]: A }>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (fa: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: Option<B>
) => (fa: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 *
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Option<B>
) => (arr: readonly A[]) => Option<readonly B[]>
/**
 * Runs an action for every element in array and accumulates the results in option
 *
 * this function have the same behavior of `A.sequence(O.option)` but it's optimized and perform better
 *
 * @example
 *
 * import * as A from 'fp-ts/Array'
 * import { traverseArray, some, fromPredicate, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(pipe(arr, traverseArray(some)), some(arr))
 * assert.deepStrictEqual(pipe(arr, traverseArray(fromPredicate((x) => x > 5))), none)
 *
 * @since 2.9.0
 */
export declare const traverseArray: <A, B>(
  f: (a: A) => Option<B>
) => (arr: ReadonlyArray<A>) => Option<ReadonlyArray<B>>
/**
 * get an array of option and convert it to option of array
 *
 * this function have the same behavior of `A.sequence(O.option)` but it's optimized and perform better
 *
 * @example
 *
 * import * as A from 'fp-ts/Array'
 * import { sequenceArray, some, none, fromPredicate } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(pipe(arr, A.map(some), sequenceArray), some(arr))
 * assert.deepStrictEqual(pipe(arr, A.map(fromPredicate(x => x > 8)), sequenceArray), none)
 *
 * @since 2.9.0
 */
export declare const sequenceArray: <A>(arr: ReadonlyArray<Option<A>>) => Option<ReadonlyArray<A>>
