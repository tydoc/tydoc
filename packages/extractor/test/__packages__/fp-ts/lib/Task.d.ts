/**
 * ```ts
 * interface Task<A> {
 *   (): Promise<A>
 * }
 * ```
 *
 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 *
 * @since 2.0.0
 */
import { Applicative1 } from './Applicative'
import { IO } from './IO'
import { Monad1 } from './Monad'
import { MonadTask1 } from './MonadTask'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Functor1 } from './Functor'
/**
 * @category model
 * @since 2.0.0
 */
export interface Task<A> {
  (): Promise<A>
}
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const fromIO: <A>(ma: IO<A>) => Task<A>
/**
 * Creates a task that will complete after a time delay
 *
 * @example
 * import { sequenceT } from 'fp-ts/Apply'
 * import * as T from 'fp-ts/Task'
 *
 * async function test() {
 *   const log: Array<string> = []
 *   const append = (message: string): T.Task<void> =>
 *     T.fromIO(() => {
 *       log.push(message)
 *     })
 *   const fa = append('a')
 *   const fb = append('b')
 *   const fc = T.delay(10)(append('c'))
 *   const fd = append('d')
 *   await sequenceT(T.task)(fa, fb, fc, fd)()
 *   assert.deepStrictEqual(log, ['a', 'b', 'd', 'c'])
 * }
 *
 * test()
 *
 * @category combinators
 * @since 2.0.0
 */
export declare function delay(millis: number): <A>(ma: Task<A>) => Task<A>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): (...a: A) => Task<B>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare function chainIOK<A, B>(f: (a: A) => IO<B>): (ma: Task<A>) => Task<B>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export declare const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<B>
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
export declare const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<A>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: Task<Task<A>>) => Task<A>
/**
 * @category MonadTask
 * @since 2.7.0
 */
export declare const fromTask: MonadTask1<URI>['fromTask']
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'Task'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Task<A>
  }
}
/**
 * Lift a semigroup into 'Task', the inner values are concatenated using the provided `Semigroup`.
 *
 * @example
 * import * as T from 'fp-ts/Task'
 * import { semigroupString } from 'fp-ts/Semigroup'
 *
 * async function test() {
 *   const S = T.getSemigroup(semigroupString)
 *   const fa = T.of('a')
 *   const fb = T.of('b')
 *   assert.deepStrictEqual(await S.concat(fa, fb)(), 'ab')
 * }
 *
 * test()
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<Task<A>>
/**
 * Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>>
/**
 * Monoid returning the first completed task.
 *
 * Note: uses `Promise.race` internally.
 *
 * @example
 * import * as T from 'fp-ts/Task'
 *
 * async function test() {
 *   const S = T.getRaceMonoid<string>()
 *   const fa = T.delay(20)(T.of('a'))
 *   const fb = T.delay(10)(T.of('b'))
 *   assert.deepStrictEqual(await S.concat(fa, fb)(), 'b')
 * }
 *
 * test()
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getRaceMonoid<A = never>(): Monoid<Task<A>>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Functor: Functor1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const ApplicativePar: Applicative1<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const ApplicativeSeq: Applicative1<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const task: Monad1<URI> & MonadTask1<URI>
/**
 * Like `task` but `ap` is sequential
 *
 * @category instances
 * @since 2.0.0
 */
export declare const taskSeq: typeof task
/**
 * A `Task` that never completes.
 *
 * @since 2.0.0
 */
export declare const never: Task<never>
/**
 * @since 2.9.0
 */
export declare const Do: Task<{}>
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(name: N) => <A>(fa: Task<A>) => Task<{ [K in N]: A }>
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Task<B>
) => (fa: Task<A>) => Task<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.8.0
 */
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: Task<B>
) => (fa: Task<A>) => Task<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (arr: ReadonlyArray<A>) => Task<ReadonlyArray<B>>
/**
 * this function map array to task using provided function and transform it to a task of array.
 *
 * this function have the same behavior of `A.traverse(T.task)` but it's stack safe.
 *
 * > **This function run all task in parallel for sequential use `traverseSeqArray` **
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 * import { of, traverseArray } from 'fp-ts/Task'
 * async function test() {
 *   const arr = range(0, 10)
 *   assert.deepStrictEqual(await pipe(arr, traverseArray(of))(), arr)
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
export declare const traverseArray: <A, B>(f: (a: A) => Task<B>) => (arr: ReadonlyArray<A>) => Task<ReadonlyArray<B>>
/**
 * this function works like `Promise.all` it will get an array of tasks and return a task of array.
 *
 * this function have the same behavior of `A.sequence(T.task)` but it's stack safe.
 *
 * > **This function run all task in parallel for sequential use `sequenceSeqArray` **
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 * import { of, sequenceArray } from 'fp-ts/Task'
 *
 * async function test() {
 *   const arr = RA.range(1, 10)
 *   assert.deepStrictEqual(await pipe(arr, RA.map(of), sequenceArray)(), arr)
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
export declare const sequenceArray: <A>(arr: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>>
/**
 * @since 2.9.0
 */
export declare const traverseSeqArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (arr: ReadonlyArray<A>) => Task<ReadonlyArray<B>>
/**
 * runs an action for every element in array then run task sequential, and accumulates the results in the array.
 *
 * this function have the same behavior of `A.traverse(T.taskSeq)` but it's stack safe.
 *
 * > **This function run all task sequentially for parallel use `traverseArray` **
 *
 *
 * @since 2.9.0
 */
export declare const traverseSeqArray: <A, B>(f: (a: A) => Task<B>) => (arr: ReadonlyArray<A>) => Task<ReadonlyArray<B>>
/**
 * run tasks in array sequential and give a task of array
 *
 * this function have the same behavior of `A.sequence(T.taskSeq)` but it's stack safe.
 *
 * > **This function run all task sequentially for parallel use `sequenceArray` **
 *
 * @since 2.9.0
 */
export declare const sequenceSeqArray: <A>(arr: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>>
