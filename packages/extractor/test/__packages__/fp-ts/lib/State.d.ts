import { Functor2 } from './Functor'
import { Monad2 } from './Monad'
import { Applicative2 } from './Applicative'
/**
 * @category model
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}
/**
 * Get the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const get: <S>() => State<S, S>
/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const put: <S>(s: S) => State<S, void>
/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const modify: <S>(f: (s: S) => S) => State<S, void>
/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const gets: <S, A>(f: (s: S) => A) => State<S, A>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export declare const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, B>
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export declare const of: Applicative2<URI>['of']
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export declare const chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, A>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'State'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: State<E, A>
  }
}
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
 * @since 2.0.0
 */
export declare const state: Monad2<URI>
/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export declare const evalState: <S, A>(ma: State<S, A>, s: S) => A
/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export declare const execState: <S, A>(ma: State<S, A>, s: S) => S
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.8.0
 */
export declare const evaluate: <S>(s: S) => <A>(ma: State<S, A>) => A
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.8.0
 */
export declare const execute: <S>(s: S) => <A>(ma: State<S, A>) => S
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(name: N) => <S, A>(fa: State<S, A>) => State<S, { [K in N]: A }>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => State<S, B>
) => (fa: State<S, A>) => State<S, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, S, B>(
  name: Exclude<N, keyof A>,
  fb: State<S, B>
) => (fa: State<S, A>) => State<S, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (arr: ReadonlyArray<A>) => State<S, ReadonlyArray<B>>
/**
 * This function has the same behavior of `A.traverse(S.State)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, State } from 'fp-ts/State'
 * import { pipe, tuple } from 'fp-ts/function'
 *
 * const add = (n: number): State<number, number> => (s: number) => tuple(n, n + s)
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, traverseArray(add))(0), [arr, arr.reduce((p, c) => p + c, 0)])
 *
 * @since 2.9.0
 */
export declare const traverseArray: <A, S, B>(
  f: (a: A) => State<S, B>
) => (arr: ReadonlyArray<A>) => State<S, ReadonlyArray<B>>
/**
 * This function has the same behavior of `A.sequence(S.State)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, State } from 'fp-ts/State'
 * import { pipe, tuple } from 'fp-ts/function'
 *
 * const add = (n: number): State<number, number> => (s: number) => tuple(n, n + s)
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, RA.map(add), sequenceArray)(0), [arr, arr.reduce((p, c) => p + c, 0)])
 *
 * @since 2.9.0
 */
export declare const sequenceArray: <S, A>(arr: ReadonlyArray<State<S, A>>) => State<S, ReadonlyArray<A>>
