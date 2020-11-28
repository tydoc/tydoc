"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.evaluate = exports.execWriter = exports.evalWriter = exports.writer = exports.Functor = exports.getMonad = exports.URI = exports.map = exports.censor = exports.listens = exports.pass = exports.listen = exports.tell = void 0;
var function_1 = require("./function");
// tslint:enable:readonly-array
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Appends a value to the accumulator
 *
 * @category combinators
 * @since 2.0.0
 */
var tell = function (w) { return function () { return [undefined, w]; }; };
exports.tell = tell;
// tslint:disable:readonly-array
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @category combinators
 * @since 2.0.0
 */
var listen = function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [[a, w], w];
}; };
exports.listen = listen;
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Applies the returned function to the accumulator
 *
 * @category combinators
 * @since 2.0.0
 */
var pass = function (fa) { return function () {
    var _a = fa(), _b = _a[0], a = _b[0], f = _b[1], w = _a[1];
    return [a, f(w)];
}; };
exports.pass = pass;
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @category combinators
 * @since 2.0.0
 */
var listens = function (f) { return function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [[a, f(w)], w];
}; }; };
exports.listens = listens;
// tslint:enable:readonly-array
/**
 * Modify the final accumulator value by applying a function
 *
 * @category combinators
 * @since 2.0.0
 */
var censor = function (f) { return function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [a, f(w)];
}; }; };
exports.censor = censor;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function (f) { return function (fa) { return function () {
    var _a = fa(), a = _a[0], w = _a[1];
    return [f(a), w];
}; }; };
exports.map = map;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Writer';
/**
 * @category instances
 * @since 2.0.0
 */
function getMonad(M) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return function () {
            var _a = fab(), f = _a[0], w1 = _a[1];
            var _b = fa(), a = _b[0], w2 = _b[1];
            return [f(a), M.concat(w1, w2)];
        }; },
        of: function (a) { return function () { return [a, M.empty]; }; },
        chain: function (fa, f) { return function () {
            var _a = fa(), a = _a[0], w1 = _a[1];
            var _b = f(a)(), b = _b[0], w2 = _b[1];
            return [b, M.concat(w1, w2)];
        }; }
    };
}
exports.getMonad = getMonad;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: map_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.writer = exports.Functor;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
var evalWriter = function (fa) { return fa()[0]; };
exports.evalWriter = evalWriter;
/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
var execWriter = function (fa) { return fa()[1]; };
exports.execWriter = execWriter;
/**
 * @since 2.8.0
 */
var evaluate = function (fa) { return fa()[0]; };
exports.evaluate = evaluate;
/**
 * @since 2.8.0
 */
var execute = function (fa) { return fa()[1]; };
exports.execute = execute;
