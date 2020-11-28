"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boundedNumber = void 0;
/**
 * The `Bounded` type class represents totally ordered types that have an upper and lower boundary.
 *
 * Instances should satisfy the following law in addition to the `Ord` laws:
 *
 * - Bounded: `bottom <= a <= top`
 *
 * @since 2.0.0
 */
var Ord_1 = require("./Ord");
/**
 * @category instances
 * @since 2.0.0
 */
exports.boundedNumber = {
    equals: Ord_1.ordNumber.equals,
    compare: Ord_1.ordNumber.compare,
    top: Infinity,
    bottom: -Infinity
};
