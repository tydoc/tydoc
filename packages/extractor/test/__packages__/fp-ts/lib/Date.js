"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eqYear = exports.eqMonth = exports.eqDate = exports.now = exports.create = void 0;
/**
 * Returns the current `Date`
 *
 * @category constructors
 * @since 2.0.0
 */
var create = function () { return new Date(); };
exports.create = create;
/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC
 *
 * @since 2.0.0
 */
var now = function () { return new Date().getTime(); };
exports.now = now;
/**
 * @category instances
 * @since 2.6.0
 */
exports.eqDate = {
    equals: function (x, y) { return x.getDate() === y.getDate(); }
};
/**
 * @category instances
 * @since 2.6.0
 */
exports.eqMonth = {
    equals: function (x, y) { return x.getMonth() === y.getMonth(); }
};
/**
 * @category instances
 * @since 2.6.0
 */
exports.eqYear = {
    equals: function (x, y) { return x.getFullYear() === y.getFullYear(); }
};
