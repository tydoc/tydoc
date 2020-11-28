/**
 * @since 2.0.0
 */
import { Semigroup } from './Semigroup'
import { Eq } from './Eq'
import { Monoid } from './Monoid'
/**
 * @category model
 * @since 2.0.0
 */
export declare type Ordering = -1 | 0 | 1
/**
 * @since 2.0.0
 */
export declare function sign(n: number): Ordering
/**
 * @category instances
 * @since 2.0.0
 */
export declare const eqOrdering: Eq<Ordering>
/**
 * Use `monoidOrdering` instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export declare const semigroupOrdering: Semigroup<Ordering>
/**
 * @category instances
 * @since 2.4.0
 */
export declare const monoidOrdering: Monoid<Ordering>
/**
 * @since 2.0.0
 */
export declare function invert(O: Ordering): Ordering
