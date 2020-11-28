/**
 * @since 2.4.0
 */
import { Applicative2, Applicative2C } from './Applicative'
import { Apply1 } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2, MonadTask2C } from './MonadTask'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TH from './These'
import These = TH.These
import Task = T.Task
/**
 * @category model
 * @since 2.4.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}
/**
 * @category constructors
 * @since 2.4.0
 */
export declare const left: <E = never, A = never>(e: E) => TaskThese<E, A>
/**
 * @category constructors
 * @since 2.4.0
 */
export declare const right: <E = never, A = never>(a: A) => TaskThese<E, A>
/**
 * @category constructors
 * @since 2.4.0
 */
export declare const both: <E, A>(e: E, a: A) => TaskThese<E, A>
/**
 * @category constructors
 * @since 2.4.0
 */
export declare const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A>
/**
 * @category constructors
 * @since 2.4.0
 */
export declare const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A>
/**
 * @category constructors
 * @since 2.4.0
 */
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => TaskThese<E, A>
/**
 * @category constructors
 * @since 2.4.0
 */
export declare const leftIO: <E = never, A = never>(me: IO<E>) => TaskThese<E, A>
/**
 * @category constructors
 * @since 2.4.0
 */
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A>
/**
 * @category destructors
 * @since 2.4.0
 */
export declare const fold: <E, B, A>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>,
  onBoth: (e: E, a: A) => Task<B>
) => (fa: TaskThese<E, A>) => Task<B>
/**
 * @category destructors
 * @since 2.4.0
 */
export declare const toTuple: <E, A>(e: E, a: A) => (fa: TaskThese<E, A>) => Task<[E, A]>
/**
 * @category combinators
 * @since 2.4.0
 */
export declare const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.4.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B>
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B>
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A>
/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.7.0
 */
export declare const of: Applicative2<URI>['of']
/**
 * @category MonadIO
 * @since 2.7.0
 */
export declare const fromIO: MonadIO2<URI>['fromIO']
/**
 * @category MonadIO
 * @since 2.7.0
 */
export declare const fromTask: MonadTask2<URI>['fromTask']
/**
 * @category instances
 * @since 2.4.0
 */
export declare const URI = 'TaskThese'
/**
 * @category instances
 * @since 2.4.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskThese<E, A>
  }
}
/**
 * @category instances
 * @since 2.4.0
 */
export declare function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>>
/**
 * @category instances
 * @since 2.7.0
 */
export declare function getApplicative<E>(A: Apply1<T.URI>, SE: Semigroup<E>): Applicative2C<URI, E>
/**
 * @category instances
 * @since 2.4.0
 */
export declare function getMonad<E>(SE: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const functorTaskThese: Functor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const bifunctorTaskThese: Bifunctor2<URI>
/**
 * @category instances
 * @since 2.4.0
 */
export declare const taskThese: Functor2<URI> & Bifunctor2<URI>
