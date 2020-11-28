/**
 * ```ts
 * interface TaskEither<E, A> extends Task<Either<E, A>> {}
 * ```
 *
 * `TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Applicative2, Applicative2C } from './Applicative'
import { Apply1 } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import { Filterable2C } from './Filterable'
import { Lazy, Predicate, Refinement } from './function'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2, Monad2C } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2, MonadTask2C } from './MonadTask'
import { MonadThrow2, MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import Either = E.Either
import Task = T.Task
/**
 * @category model
 * @since 2.0.0
 */
export interface TaskEither<E, A> extends Task<Either<E, A>> {}
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const left: <E = never, A = never>(e: E) => TaskEither<E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const right: <E = never, A = never>(a: A) => TaskEither<E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const rightTask: <E = never, A = never>(ma: Task<A>) => TaskEither<E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const leftTask: <E = never, A = never>(me: Task<E>) => TaskEither<E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => TaskEither<E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const leftIO: <E = never, A = never>(me: IO<E>) => TaskEither<E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromEither: <E, A>(ma: E.Either<E, A>) => TaskEither<E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => TaskEither<E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<E, A>
}
/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * @example
 * import { left, right } from 'fp-ts/Either'
 * import { tryCatch } from 'fp-ts/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1), String)().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'), String)().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @category constructors
 * @since 2.0.0
 */
export declare function tryCatch<E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A>
/**
 * @category destructors
 * @since 2.0.0
 */
export declare const fold: <E, A, B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>
) => (ma: TaskEither<E, A>) => Task<B>
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export declare const getOrElseW: <E, B>(onLeft: (e: E) => T.Task<B>) => <A>(ma: TaskEither<E, A>) => T.Task<B | A>
/**
 * @category destructors
 * @since 2.0.0
 */
export declare const getOrElse: <E, A>(onLeft: (e: E) => Task<A>) => (ma: TaskEither<E, A>) => Task<A>
/**
 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
 *
 * See also [alt](#alt).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * async function test() {
 *   const errorHandler = TE.orElse((error: string) => TE.right(`recovering from ${error}...`))
 *   assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
 *   assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
 * }
 *
 * test()
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const orElse: <E, A, M>(onLeft: (e: E) => TaskEither<M, A>) => (ma: TaskEither<E, A>) => TaskEither<M, A>
/**
 * @category combinators
 * @since 2.0.0
 */
export declare const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E>
/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: TaskEither<E1, A>
  ) => TaskEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, A>
}
/**
 * Derivable from `MonadThrow`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, A>
}
/**
 * Converts a function returning a `Promise` to one returning a `TaskEither`.
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function tryCatchK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Promise<B>,
  onRejected: (reason: unknown) => E
): (...a: A) => TaskEither<E, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => TaskEither<E, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): (...a: A) => TaskEither<E, B>
/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export declare const chainEitherKW: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <D>(ma: TaskEither<D, A>) => TaskEither<D | E, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const chainEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export declare const chainIOEitherKW: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <D>(ma: TaskEither<D, A>) => TaskEither<D | E, B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, B>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskEither<E, A>) => TaskEither<G, B>
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskEither<E, A>) => TaskEither<G, A>
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export declare const apW: <D, A>(
  fa: TaskEither<D, A>
) => <E, B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<D | E, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export declare const ap: <E, A>(fa: TaskEither<E, A>) => <B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, B>
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export declare const chainW: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <D>(ma: TaskEither<D, A>) => TaskEither<E | D, B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export declare const chain: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export declare const chainFirstW: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <D>(ma: TaskEither<D, A>) => TaskEither<D | E, A>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, A>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <E, A>(mma: TaskEither<E, TaskEither<E, A>>) => TaskEither<E, A>
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export declare const altW: <E2, B>(
  that: Lazy<TaskEither<E2, B>>
) => <E1, A>(fa: TaskEither<E1, A>) => TaskEither<E2 | E1, B | A>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `TaskEither` returns `fa` if is a `Right` or the value returned by `that` otherwise.
 *
 * See also [orElse](#orElse).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.right(1),
 *       TE.alt(() => TE.right(2))
 *     )(),
 *     E.right(1)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.alt(() => TE.right(2))
 *     )(),
 *     E.right(2)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.alt(() => TE.left('b'))
 *     )(),
 *     E.left('b')
 *   )
 * }
 *
 * test()
 *
 * @category Alt
 * @since 2.0.0
 */
export declare const alt: <E, A>(that: Lazy<TaskEither<E, A>>) => (fa: TaskEither<E, A>) => TaskEither<E, A>
/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.0.0
 */
export declare const of: Applicative2<URI>['of']
/**
 * @category MonadIO
 * @since 2.7.0
 */
export declare const fromIO: MonadIO2<URI>['fromIO']
/**
 * @category MonadTask
 * @since 2.7.0
 */
export declare const fromTask: MonadTask2<URI>['fromTask']
/**
 * @category MonadTask
 * @since 2.7.0
 */
export declare const throwError: MonadThrow2<URI>['throwError']
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'TaskEither'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskEither<E, A>
  }
}
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>>
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>>
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<TaskEither<E, A>>
/**
 * @category instances
 * @since 2.7.0
 */
export declare function getApplicativeTaskValidation<E>(A: Apply1<T.URI>, SE: Semigroup<E>): Applicative2C<URI, E>
/**
 * @category instances
 * @since 2.7.0
 */
export declare function getAltTaskValidation<E>(SE: Semigroup<E>): Alt2C<URI, E>
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getTaskValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadTask2C<URI, E> & MonadThrow2C<URI, E>
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
export declare const ApplicativePar: Applicative2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const ApplicativeSeq: Applicative2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Bifunctor: Bifunctor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Alt: Alt2<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const taskEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadTask2<URI> & MonadThrow2<URI>
/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @category instances
 * @since 2.0.0
 */
export declare const taskEitherSeq: typeof taskEither
/**
 * Convert a node style callback function to one returning a `TaskEither`
 *
 * **Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
 * behaviour, add an explicit type annotation
 *
 * ```ts
 * // readFile admits multiple overloadings
 *
 * // const readFile: (a: string) => TaskEither<NodeJS.ErrnoException, Buffer>
 * const readFile = taskify(fs.readFile)
 *
 * const readFile2: (filename: string, encoding: string) => TaskEither<NodeJS.ErrnoException, Buffer> = taskify(
 *   fs.readFile
 * )
 * ```
 *
 * @example
 * import { taskify } from 'fp-ts/TaskEither'
 * import * as fs from 'fs'
 *
 * // const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
 * const stat = taskify(fs.stat)
 * assert.strictEqual(stat.length, 0)
 *
 * @since 2.0.0
 */
export declare function taskify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => TaskEither<L, R>
export declare function taskify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => TaskEither<L, R>
export declare function taskify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => TaskEither<L, R>
export declare function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => TaskEither<L, R>
export declare function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => TaskEither<L, R>
export declare function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => TaskEither<L, R>
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
  acquire: TaskEither<E, A>,
  use: (a: A) => TaskEither<E, B>,
  release: (a: A, e: E.Either<E, B>) => TaskEither<E, void>
) => TaskEither<E, B>
/**
 * @since 2.9.0
 */
export declare const Do: TaskEither<never, {}>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(fa: TaskEither<E, A>) => TaskEither<E, { [K in N]: A }>
/**
 * @since 2.8.0
 */
export declare const bindW: <N extends string, A, D, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskEither<D, B>
) => <E>(fa: TaskEither<E, A>) => TaskEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskEither<E, B>
) => (
  fa: TaskEither<E, A>
) => TaskEither<
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
  fb: TaskEither<D, B>
) => <E>(fa: TaskEither<E, A>) => TaskEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, E, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E, B>
) => (
  fa: TaskEither<E, A>
) => TaskEither<
  E,
  {
    [K in keyof A | N]: K extends keyof A ? A[K] : B
  }
>
/**
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <A, B, E>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (arr: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>
/**
 * this function have the same behavior of `A.traverse(TE.taskEither)` but it's stack safe and perform better
 *
 * *this function run all tasks in parallel and does not bail out, for sequential version use `traverseSeqArray`*
 *
 * @example
 *
 * import * as TE from 'fp-ts/TaskEither'
 * import * as A from 'fp-ts/Array'
 * import { right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * const PostRepo = {
 *  findById : (id: number) => TE.of({id, title: ''})
 * }
 *
 * const findAllPosts = (ids:number[]) => pipe(ids, TE.traverseArray(PostRepo.findById))
 *
 * async function test() {
 *   const ids = A.range(0, 10)
 *
 *   assert.deepStrictEqual(
 *     await findAllPosts(ids)(),
 *     right(
 *       pipe(
 *         ids,
 *         A.map((id) => ({ id, title: ''}))
 *       )
 *     )
 *   )
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
export declare const traverseArray: <A, B, E>(
  f: (a: A) => TaskEither<E, B>
) => (arr: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>
/**
 * this function have the same behavior of `A.sequence(TE.taskEither)` but it's stack safe and perform better
 *
 * *this function run all tasks in parallel and does not bail out, for sequential version use `sequenceSeqArray`*
 *
 * @example
 *
 * import * as TE from 'fp-ts/TaskEither'
 * import * as A from 'fp-ts/Array'
 * import { right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * const PostRepo = {
 *  findById : (id: number) => TE.of({id, title: ''})
 * }
 *
 * const findAllPosts = (ids:number[]) => pipe(ids, A.map(PostRepo.findById), TE.sequenceArray)
 *
 * async function test() {
 *   const ids = A.range(0, 10)
 *
 *   assert.deepStrictEqual(
 *     await findAllPosts(ids)(),
 *     right(
 *       pipe(
 *         ids,
 *         A.map((id) => ({ id, title: ''}))
 *       )
 *     )
 *   )
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
export declare const sequenceArray: <A, E>(arr: ReadonlyArray<TaskEither<E, A>>) => TaskEither<E, ReadonlyArray<A>>
/**
 * @since 2.9.0
 */
export declare const traverseSeqArrayWithIndex: <A, B, E>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (arr: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>
/**
 * this function have the same behavior of `A.traverse(TE.taskEitherSeq)` but it's stack safe and perform better
 *
 * *this function run all tasks in sequential order and bails out on left side of either, for parallel version use `traverseArray`*
 *
 * @since 2.9.0
 */
export declare const traverseSeqArray: <A, B, E>(
  f: (a: A) => TaskEither<E, B>
) => (arr: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>
/**
 * this function have the same behavior of `A.sequence(TE.taskEitherSeq)` but it's stack safe and perform better
 *
 * *this function run all tasks in sequential order and bails out on left side of either, for parallel version use `sequenceArray`*
 *
 * @since 2.9.0
 */
export declare const sequenceSeqArray: <A, E>(arr: ReadonlyArray<TaskEither<E, A>>) => TaskEither<E, ReadonlyArray<A>>
