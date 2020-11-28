import { Magma } from './Magma'
import { Ord } from './Ord'
import { ReadonlyRecord } from './ReadonlyRecord'
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroup<A> extends Magma<A> {}
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * const sum = S.fold(S.semigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 2.0.0
 */
export declare function fold<A>(
  S: Semigroup<A>
): {
  (startWith: A): (as: ReadonlyArray<A>) => A
  (startWith: A, as: ReadonlyArray<A>): A
}
/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.getFirstSemigroup<number>().concat(1, 2), 1)
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getFirstSemigroup<A = never>(): Semigroup<A>
/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.getLastSemigroup<number>().concat(1, 2), 2)
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getLastSemigroup<A = never>(): Semigroup<A>
/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.getTupleSemigroup(S.semigroupString, S.semigroupSum)
 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const S2 = S.getTupleSemigroup(S.semigroupString, S.semigroupSum, S.semigroupAll)
 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getTupleSemigroup<T extends ReadonlyArray<Semigroup<any>>>(
  ...semigroups: T
): Semigroup<
  {
    [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never
  }
>
/**
 * The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.getDualSemigroup(S.semigroupString).concat('a', 'b'), 'ba')
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getDualSemigroup<A>(S: Semigroup<A>): Semigroup<A>
/**
 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/function'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const S1 = S.getFunctionSemigroup(S.semigroupAll)<number>()
 *
 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
 *
 * const S2 = S.getFunctionSemigroup(S.semigroupAny)<number>()
 *
 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getFunctionSemigroup<S>(S: Semigroup<S>): <A = never>() => Semigroup<(a: A) => S>
/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const semigroupPoint = S.getStructSemigroup<Point>({
 *   x: S.semigroupSum,
 *   y: S.semigroupSum
 * })
 *
 * assert.deepStrictEqual(semigroupPoint.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getStructSemigroup<O extends ReadonlyRecord<string, any>>(
  semigroups: {
    [K in keyof O]: Semigroup<O[K]>
  }
): Semigroup<O>
/**
 * Get a semigroup where `concat` will return the minimum, based on the provided order.
 *
 * @example
 * import * as O from 'fp-ts/Ord'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.getMeetSemigroup(O.ordNumber)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 1)
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getMeetSemigroup<A>(O: Ord<A>): Semigroup<A>
/**
 * Get a semigroup where `concat` will return the maximum, based on the provided order.
 *
 * @example
 * import * as O from 'fp-ts/Ord'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.getJoinSemigroup(O.ordNumber)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 2)
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getJoinSemigroup<A>(O: Ord<A>): Semigroup<A>
/**
 * Return a semigroup for objects, preserving their type.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const S1 = S.getObjectSemigroup<Person>()
 * assert.deepStrictEqual(S1.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 2.0.0
 */
export declare function getObjectSemigroup<A extends object = never>(): Semigroup<A>
/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupAll.concat(true, true), true)
 * assert.deepStrictEqual(S.semigroupAll.concat(true, false), false)
 *
 * @category instances
 * @since 2.0.0
 */
export declare const semigroupAll: Semigroup<boolean>
/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupAny.concat(true, true), true)
 * assert.deepStrictEqual(S.semigroupAny.concat(true, false), true)
 * assert.deepStrictEqual(S.semigroupAny.concat(false, false), false)
 *
 * @category instances
 * @since 2.0.0
 */
export declare const semigroupAny: Semigroup<boolean>
/**
 * `number` semigroup under addition.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupSum.concat(2, 3), 5)
 *
 * @category instances
 * @since 2.0.0
 */
export declare const semigroupSum: Semigroup<number>
/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupProduct.concat(2, 3), 6)
 *
 * @category instances
 * @since 2.0.0
 */
export declare const semigroupProduct: Semigroup<number>
/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.semigroupString.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.0.0
 */
export declare const semigroupString: Semigroup<string>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const semigroupVoid: Semigroup<void>
/**
 * You can glue items between and stay associative.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.getIntercalateSemigroup(' ')(S.semigroupString)
 *
 * assert.strictEqual(S1.concat('a', 'b'), 'a b')
 * assert.strictEqual(S1.concat(S1.concat('a', 'b'), 'c'), S1.concat('a', S1.concat('b', 'c')))
 *
 * @category instances
 * @since 2.5.0
 */
export declare function getIntercalateSemigroup<A>(a: A): (S: Semigroup<A>) => Semigroup<A>
