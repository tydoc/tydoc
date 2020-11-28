/**
 * @since 2.0.0
 */
import { Applicative2 } from './Applicative'
import { Category2 } from './Category'
import { Choice2 } from './Choice'
import { Functor2 } from './Functor'
import { Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { Profunctor2 } from './Profunctor'
import { Semigroup } from './Semigroup'
import { Strong2 } from './Strong'
/**
 * @category model
 * @since 2.0.0
 */
export interface Reader<R, A> {
  (r: R): A
}
/**
 * Reads the current context
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const ask: <R>() => Reader<R, R>
/**
 * Projects a value from the global context in a Reader
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const local: <Q, R>(f: (d: Q) => R) => <A>(ma: Reader<R, A>) => Reader<Q, A>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B>
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export declare const apW: <Q, A>(fa: Reader<Q, A>) => <R, B>(fab: Reader<R, (a: A) => B>) => Reader<Q & R, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export declare const ap: <R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, B>
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export declare const of: Applicative2<URI>['of']
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export declare const chainW: <R, A, B>(f: (a: A) => Reader<R, B>) => <Q>(ma: Reader<Q, A>) => Reader<Q & R, B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export declare const chain: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, A>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A>
/**
 * @category Semigroupoid
 * @since 2.0.0
 */
export declare const compose: <A, B>(ab: Reader<A, B>) => <C>(bc: Reader<B, C>) => Reader<A, C>
/**
 * @category Profunctor
 * @since 2.0.0
 */
export declare const promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B>
/**
 * @category Category
 * @since 2.0.0
 */
export declare const id: Category2<URI>['id']
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'Reader'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Reader<E, A>
  }
}
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>>
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Functor: Functor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Applicative: Applicative2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Monad: Monad2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Profunctor: Profunctor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Category: Category2<URI>
/**
 * @category instances
 * @since 2.8.3
 */
export declare const Strong: Strong2<URI>
/**
 * @category instances
 * @since 2.8.3
 */
export declare const Choice: Choice2<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(name: N) => <R, A>(fa: Reader<R, A>) => Reader<R, { [K in N]: A }>
/**
 * @since 2.8.0
 */
export declare const bindW: <N extends string, A, Q, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<Q, B>
) => <R>(fa: Reader<R, A>) => Reader<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R, B>
) => (
  fa: Reader<R, A>
) => Reader<
  R,
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 * @since 2.9.0
 */
export declare const Do: Reader<unknown, {}>
/**
 * @since 2.8.0
 */
export declare const apSW: <A, N extends string, Q, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<Q, B>
) => <R>(fa: Reader<R, A>) => Reader<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, R, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R, B>
) => (
  fa: Reader<R, A>
) => Reader<
  R,
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 *
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (arr: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>>
/**
 * this function have the same behavior of `A.traverse(R.reader)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, Reader } from 'fp-ts/Reader'
 * import { pipe } from 'fp-ts/function'
 *
 * const add: (x: number) => Reader<{value:number}, number> = x => config => x + config.value
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, traverseArray(add))({value: 3}), pipe(arr, RA.map(x => x + 3)))
 *
 * @since 2.9.0
 */
export declare const traverseArray: <R, A, B>(
  f: (a: A) => Reader<R, B>
) => (arr: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>>
/**
 * this function have the same behavior of `A.sequence(R.reader)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, Reader } from 'fp-ts/Reader'
 * import { pipe } from 'fp-ts/function'
 *
 * const add: (x: number) => Reader<{value:number}, number> = x => config => x + config.value
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, RA.map(add), sequenceArray)({value: 3}), pipe(arr, RA.map(x => x + 3)))
 *
 * @since 2.9.0
 */
export declare const sequenceArray: <R, A>(arr: ReadonlyArray<Reader<R, A>>) => Reader<R, ReadonlyArray<A>>
