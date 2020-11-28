/**
 * @since 2.0.0
 */
import { Alt4 } from './Alt'
import { Applicative4 } from './Applicative'
import { Bifunctor4 } from './Bifunctor'
import * as E from './Either'
import { Lazy, Predicate, Refinement } from './function'
import { Functor4 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad4 } from './Monad'
import { MonadIO4 } from './MonadIO'
import { MonadTask4 } from './MonadTask'
import { MonadThrow4 } from './MonadThrow'
import { Option } from './Option'
import { Reader } from './Reader'
import { ReaderEither } from './ReaderEither'
import * as RTE from './ReaderTaskEither'
import { State } from './State'
import { Task } from './Task'
import { TaskEither } from './TaskEither'
import ReaderTaskEither = RTE.ReaderTaskEither
import Either = E.Either
/**
 * @category model
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const left: <S, R, E = never, A = never>(e: E) => StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const right: <S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare function rightTask<S, R, E = never, A = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare function leftTask<S, R, E = never, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare function fromTaskEither<S, R, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare function rightReader<S, R, E = never, A = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare function leftReader<S, R, E = never, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare function fromIOEither<S, R, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare function fromReaderEither<S, R, E, A>(ma: ReaderEither<R, E, A>): StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare function rightIO<S, R, E = never, A = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare function leftIO<S, R, E = never, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const rightState: <S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const leftState: <S, R, E = never, A = never>(me: State<S, E>) => StateReaderTaskEither<S, R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const fromReaderTaskEither: <S, R, E, A>(
  ma: ReaderTaskEither<R, E, A>
) => StateReaderTaskEither<S, R, E, A>
/**
 * Get the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S>
/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void>
/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const modify: <S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void>
/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromEither: <S, R, E, A>(ma: Either<E, A>) => StateReaderTaskEither<S, R, E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromOption: <E>(onNone: Lazy<E>) => <S, R, A>(ma: Option<A>) => StateReaderTaskEither<S, R, E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.4.4
 */
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    a: A
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<S, R, E, A>
}
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export declare const chainEitherKW: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <S, R, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export declare const chainIOEitherKW: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <S, R, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export declare const chainTaskEitherKW: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromReaderTaskEitherK<R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): <S>(...a: A) => StateReaderTaskEither<S, R, E, B>
/**
 * Less strict version of [`chainReaderTaskEitherK`](#chainReaderTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export declare const chainReaderTaskEitherKW: <R, E, A, B>(
  f: (a: A) => RTE.ReaderTaskEither<R, E, B>
) => <S, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const chainReaderTaskEitherK: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E1 | E2, A>
}
/**
 * Derivable from `MonadThrow`.
 *
 * @category combinators
 * @since 2.4.4
 */
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, A>
}
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B>
/**
 * Map a function over the third type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A>
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export declare const apW: <S, Q, D, A>(
  fa: StateReaderTaskEither<S, Q, D, A>
) => <R, E, B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, Q & R, D | E, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export declare const ap: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <S, R, E, B>(
  fb: StateReaderTaskEither<S, R, E, B>
) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <S, R, E, B>(
  fb: StateReaderTaskEither<S, R, E, B>
) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.7.0
 */
export declare const of: Applicative4<URI>['of']
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export declare const chainW: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => <Q, D>(ma: StateReaderTaskEither<S, Q, D, A>) => StateReaderTaskEither<S, Q & R, D | E, B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export declare const chain: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export declare const chainFirstW: <S, R, D, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, D, B>
) => <Q, E>(ma: StateReaderTaskEither<S, Q, E, A>) => StateReaderTaskEither<S, Q & R, D | E, A>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <S, R, E, A>(
  mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A>
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export declare const altW: <S, R2, E2, B>(
  that: () => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(fa: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B | A>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export declare const alt: <S, R, E, A>(
  that: Lazy<StateReaderTaskEither<S, R, E, A>>
) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
/**
 * @category MonadIO
 * @since 2.7.0
 */
export declare const fromIO: MonadIO4<URI>['fromIO']
/**
 * @category MonadTask
 * @since 2.7.0
 */
export declare const fromTask: MonadTask4<URI>['fromTask']
/**
 * @category MonadThrow
 * @since 2.7.0
 */
export declare const throwError: MonadThrow4<URI>['throwError']
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'StateReaderTaskEither'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind4<S, R, E, A> {
    readonly [URI]: StateReaderTaskEither<S, R, E, A>
  }
}
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Functor: Functor4<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Applicative: Applicative4<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Bifunctor: Bifunctor4<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Alt: Alt4<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const stateReaderTaskEither: Monad4<URI> &
  Bifunctor4<URI> &
  Alt4<URI> &
  MonadTask4<URI> &
  MonadThrow4<URI>
/**
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export declare const stateReaderTaskEitherSeq: typeof stateReaderTaskEither
/**
 * @since 2.0.0
 */
export declare function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>>
/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export declare const evalState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, A>
/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export declare const execState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, S>
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.8.0
 */
export declare const evaluate: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => RTE.ReaderTaskEither<R, E, A>
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.8.0
 */
export declare const execute: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => RTE.ReaderTaskEither<R, E, S>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(
  name: N
) => <S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, { [K in N]: A }>
/**
 * @since 2.8.0
 */
export declare const bindW: <N extends string, A, S, Q, D, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, Q, D, B>
) => <R, E>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, Q & R, D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<
  S,
  R,
  E,
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 * @since 2.8.0
 */
export declare const apSW: <A, N extends string, S, Q, D, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, Q, D, B>
) => <R, E>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, Q & R, D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, S, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R, E, B>
) => (
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<
  S,
  R,
  E,
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <S, R, E, A, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (arr: ReadonlyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyArray<B>>
/**
 * @since 2.9.0
 */
export declare const traverseArray: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (arr: ReadonlyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyArray<B>>
/**
 * @since 2.9.0
 */
export declare const sequenceArray: <S, R, E, A>(
  arr: ReadonlyArray<StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, ReadonlyArray<A>>
