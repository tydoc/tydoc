/**
 * ```ts
 * interface IO<A> {
 *   (): A
 * }
 * ```
 *
 * `IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
 * type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
 * `IOEither`.
 *
 * @since 2.0.0
 */
import { Applicative1 } from './Applicative'
import { ChainRec1 } from './ChainRec'
import { Functor1 } from './Functor'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
/**
 * @category model
 * @since 2.0.0
 */
export interface IO<A> {
  (): A
}
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<B>
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export declare const of: Applicative1<URI>['of']
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
/**
 * @category MonadIO
 * @since 2.7.0
 */
export declare const fromIO: MonadIO1<URI>['fromIO']
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'IO'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: IO<A>
  }
}
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>>
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>>
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
export declare const MonadIO: MonadIO1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const ChainRec: ChainRec1<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const io: Monad1<URI> & MonadIO1<URI> & ChainRec1<URI>
/**
 * @since 2.9.0
 */
export declare const Do: IO<{}>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(name: N) => <A>(fa: IO<A>) => IO<{ [K in N]: A }>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IO<B>
) => (fa: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: IO<B>
) => (fa: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IO<B>
) => (arr: ReadonlyArray<A>) => IO<ReadonlyArray<B>>
/**
 * runs an action for every element in array, and accumulates the results IO in the array.
 *
 * this function have the same behavior of `A.traverse(IO.io)` but it's stack safe
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, IO } from 'fp-ts/IO'
 * import { pipe } from 'fp-ts/function'
 *
 * const logger: Array<unknown> = []
 * const log: <A>(a: A) => IO<void> = (a) => () => { logger.push(a) }
 *
 * pipe(RA.range(0, 100), traverseArray(log))()
 * assert.deepStrictEqual(logger, RA.range(0, 100))
 *
 * @since 2.9.0
 */
export declare const traverseArray: <A, B>(f: (a: A) => IO<B>) => (arr: ReadonlyArray<A>) => IO<ReadonlyArray<B>>
/**
 * transform Array of IO to IO of Array
 *
 * this function have the same behavior of `A.sequence(IO.io)` but it's stack safe
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, IO } from 'fp-ts/IO'
 * import { pipe } from 'fp-ts/function'
 *
 * const logger: Array<unknown> = []
 * const log: <A>(a: A) => IO<void> = (a) => () => { logger.push(a) }
 *
 * pipe(RA.range(0, 100), RA.map(log), sequenceArray)()
 * assert.deepStrictEqual(logger, RA.range(0, 100))
 *
 * @since 2.9.0
 */
export declare const sequenceArray: <A>(arr: ReadonlyArray<IO<A>>) => IO<ReadonlyArray<A>>
