/**
 * The `Bounded` type class represents totally ordered types that have an upper and lower boundary.
 *
 * Instances should satisfy the following law in addition to the `Ord` laws:
 *
 * - Bounded: `bottom <= a <= top`
 *
 * @since 2.0.0
 */
import { ordNumber } from './Ord';
/**
 * @category instances
 * @since 2.0.0
 */
export var boundedNumber = {
    equals: ordNumber.equals,
    compare: ordNumber.compare,
    top: Infinity,
    bottom: -Infinity
};
