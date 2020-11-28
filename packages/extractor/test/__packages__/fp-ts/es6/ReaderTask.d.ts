/**
 * @since 2.3.0
 */
import { Applicative2 } from './Applicative'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { MonadTask2 } from './MonadTask'
import { Monoid } from './Monoid'
import * as R from './Reader'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import Task = T.Task
import Reader = R.Reader
/**
 * @category model
 * @since 2.3.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
/**
 * @category constructors
 * @since 2.3.0
 */
export declare const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A>
/**
 * @category constructors
 * @since 2.3.0
 */
export declare const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A>
/**
 * @category constructors
 * @since 2.3.0
 */
export declare const fromIO: <R, A>(ma: IO<A>) => ReaderTask<R, A>
/**
 * @category constructors
 * @since 2.3.0
 */
export declare const ask: <R>() => ReaderTask<R, R>
/**
 * @category constructors
 * @since 2.3.0
 */
export declare const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A>
/**
 * @category combinators
 * @since 2.3.0
 */
export declare const local: <Q, R>(f: (f: Q) => R) => <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
): <R>(...a: A) => ReaderTask<R, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const chainTaskK: <A, B>(f: (a: A) => Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.3.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export declare const apW: <Q, A>(
  fa: ReaderTask<Q, A>
) => <R, B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<Q & R, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.3.0
 */
export declare const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.3.0
 */
export declare const apFirst: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.3.0
 */
export declare const apSecond: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.3.0
 */
export declare const of: Applicative2<URI>['of']
/**
 * Less strict version of  [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.7
 */
export declare const chainW: <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
) => <Q>(ma: ReaderTask<Q, A>) => ReaderTask<Q & R, B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.3.0
 */
export declare const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.3.0
 */
export declare const chainFirst: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.3.0
 */
export declare const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A>
/**
 * @category instances
 * @since 2.3.0
 */
export declare const URI = 'ReaderTask'
/**
 * @category instances
 * @since 2.3.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ReaderTask<E, A>
  }
}
/**
 * @category instances
 * @since 2.3.0
 */
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>>
/**
 * @category instances
 * @since 2.3.0
 */
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Functor: Functor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const ApplicativePar: Applicative2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const ApplicativeSeq: Applicative2<URI>
/**
 * @category instances
 * @since 2.3.0
 */
export declare const readerTask: MonadTask2<URI>
/**
 * Like `readerTask` but `ap` is sequential
 *
 * @category instances
 * @since 2.3.0
 */
export declare const readerTaskSeq: typeof readerTask
/**
 * @since 2.4.0
 */
export declare function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A>
/**
 * @since 2.9.0
 */
export declare const Do: ReaderTask<unknown, {}>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(
  name: N
) => <R, A>(fa: ReaderTask<R, A>) => ReaderTask<R, { [K in N]: A }>
/**
 * @since 2.8.0
 */
export declare const bindW: <N extends string, A, Q, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<Q, B>
) => <R>(fa: ReaderTask<R, A>) => ReaderTask<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R, B>
) => (
  fa: ReaderTask<R, A>
) => ReaderTask<
  R,
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 * @since 2.8.0
 */
export declare const apSW: <A, N extends string, Q, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<Q, B>
) => <R>(fa: ReaderTask<R, A>) => ReaderTask<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, R, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R, B>
) => (
  fa: ReaderTask<R, A>
) => ReaderTask<
  R,
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (arr: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>
/**
 * @since 2.9.0
 */
export declare const traverseArray: <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
) => (arr: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>
/**
 * @since 2.9.0
 */
export declare const sequenceArray: <R, A>(arr: ReadonlyArray<ReaderTask<R, A>>) => ReaderTask<R, ReadonlyArray<A>>
