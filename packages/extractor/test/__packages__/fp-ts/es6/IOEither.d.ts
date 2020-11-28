/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Applicative2, Applicative2C } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import { Filterable2C } from './Filterable'
import { Lazy, Predicate, Refinement } from './function'
import { Functor2 } from './Functor'
import * as I from './IO'
import { Monad2, Monad2C } from './Monad'
import { MonadIO2, MonadIO2C } from './MonadIO'
import { MonadThrow2, MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import Either = E.Either
import IO = I.IO
/**
 * @category model
 * @since 2.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const left: <E = never, A = never>(l: E) => IOEither<E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const right: <E = never, A = never>(a: A) => IOEither<E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => IOEither<E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const leftIO: <E = never, A = never>(me: IO<E>) => IOEither<E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => IOEither<E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>
}
/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @category constructors
 * @since 2.0.0
 */
export declare function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A>
/**
 * @category destructors
 * @since 2.0.0
 */
export declare const fold: <E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>) => (ma: IOEither<E, A>) => IO<B>
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export declare const getOrElseW: <E, B>(onLeft: (e: E) => I.IO<B>) => <A>(ma: IOEither<E, A>) => I.IO<B | A>
/**
 * @category destructors
 * @since 2.0.0
 */
export declare const getOrElse: <E, A>(onLeft: (e: E) => IO<A>) => (ma: IOEither<E, A>) => IO<A>
/**
 * @category combinators
 * @since 2.0.0
 */
export declare const orElse: <E, A, M>(onLeft: (e: E) => IOEither<M, A>) => (ma: IOEither<E, A>) => IOEither<M, A>
/**
 * @category combinators
 * @since 2.0.0
 */
export declare const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E>
/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: IOEither<E1, A>
  ) => IOEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A>
}
/**
 * Derivable from `MonadThrow`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
}
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => IOEither<E, B>
/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export declare const chainEitherKW: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <D>(ma: IOEither<D, A>) => IOEither<D | E, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const chainEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B>
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A>
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export declare const apW: <D, A>(fa: IOEither<D, A>) => <E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<D | E, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export declare const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, B>
/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.8.5
 */
export declare const of: Applicative2<URI>['of']
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export declare const chainW: <D, A, B>(f: (a: A) => IOEither<D, B>) => <E>(ma: IOEither<E, A>) => IOEither<D | E, B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export declare const chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export declare const chainFirstW: <D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <E>(ma: IOEither<E, A>) => IOEither<D | E, A>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export declare const altW: <E2, B>(
  that: Lazy<IOEither<E2, B>>
) => <E1, A>(fa: IOEither<E1, A>) => IOEither<E2 | E1, B | A>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export declare const alt: <E, A>(that: Lazy<IOEither<E, A>>) => (fa: IOEither<E, A>) => IOEither<E, A>
/**
 * @category MonadIO
 * @since 2.7.0
 */
export declare const fromIO: MonadIO2<URI>['fromIO']
/**
 * @category MonadThrow
 * @since 2.7.0
 */
export declare const throwError: MonadThrow2<URI>['throwError']
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'IOEither'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: IOEither<E, A>
  }
}
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>>
/**
 * @category instances
 * @since 2.7.0
 */
export declare function getApplicativeIOValidation<E>(SE: Semigroup<E>): Applicative2C<URI, E>
/**
 * @category instances
 * @since 2.7.0
 */
export declare function getAltIOValidation<E>(SE: Semigroup<E>): Alt2C<URI, E>
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getIOValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadIO2C<URI, E> & MonadThrow2C<URI, E>
/**
 * @category instances
 * @since 2.1.0
 */
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Functor: Functor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Bifunctor: Bifunctor2<URI>
/**
 * @category instances
 * @since 2.8.4
 */
export declare const ApplicativePar: Applicative2<URI>
/**
 * @category instances
 * @since 2.8.4
 */
export declare const ApplicativeSeq: Applicative2<URI>
/**
 * Use `ApplicativePar` instead
 *
 * @since 2.7.0
 * @category instances
 * @deprecated
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
export declare const Alt: Alt2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const MonadIO: MonadIO2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const MonadThrow: MonadThrow2<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadThrow2<URI>
/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * Derivable from `MonadThrow`.
 *
 * @since 2.0.0
 */
export declare const bracket: <E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: E.Either<E, B>) => IOEither<E, void>
) => IOEither<E, B>
/**
 * @since 2.9.0
 */
export declare const Do: IOEither<never, {}>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(name: N) => <E, A>(fa: IOEither<E, A>) => IOEither<E, { [K in N]: A }>
/**
 * @since 2.8.0
 */
export declare const bindW: <N extends string, A, D, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<D, B>
) => <E>(fa: IOEither<E, A>) => IOEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E, B>
) => (
  fa: IOEither<E, A>
) => IOEither<
  E,
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 * @since 2.8.0
 */
export declare const apSW: <A, N extends string, D, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<D, B>
) => <E>(fa: IOEither<E, A>) => IOEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, E, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E, B>
) => (
  fa: IOEither<E, A>
) => IOEither<
  E,
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>
/**
 * @since 2.9.0
 */
export declare const traverseArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>
/**
 *
 * @since 2.9.0
 */
export declare const sequenceArray: <E, A>(arr: ReadonlyArray<IOEither<E, A>>) => IOEither<E, ReadonlyArray<A>>
/**
 * @since 2.9.0
 */
export declare const traverseSeqArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>
/**
 * @since 2.9.0
 */
export declare const traverseSeqArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>
/**
 * @since 2.9.0
 */
export declare const sequenceSeqArray: <E, A>(arr: ReadonlyArray<IOEither<E, A>>) => IOEither<E, ReadonlyArray<A>>
