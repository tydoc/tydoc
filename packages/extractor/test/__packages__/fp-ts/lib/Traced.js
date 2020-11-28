"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traced = exports.Functor = exports.URI = exports.map = exports.getComonad = exports.censor = exports.listens = exports.listen = exports.tracks = void 0;
var function_1 = require("./function");
// TODO: curry in v3
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
function tracks(M, f) {
    return function (wa) { return wa(f(wa(M.empty))); };
}
exports.tracks = tracks;
// tslint:disable:readonly-array
/**
 * Get the current position
 *
 * @since 2.0.0
 */
function listen(wa) {
    return function (e) { return [wa(e), e]; };
}
exports.listen = listen;
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
function listens(f) {
    return function (wa) { return function (e) { return [wa(e), f(e)]; }; };
}
exports.listens = listens;
// tslint:enable:readonly-array
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
function censor(f) {
    return function (wa) { return function (e) { return wa(f(e)); }; };
}
exports.censor = censor;
/**
 * @category instances
 * @since 2.0.0
 */
function getComonad(monoid) {
    function extend(wa, f) {
        return function (p1) { return f(function (p2) { return wa(monoid.concat(p1, p2)); }); };
    }
    function extract(wa) {
        return wa(monoid.empty);
    }
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        extend: extend,
        extract: extract
    };
}
exports.getComonad = getComonad;
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
var map = function (f) { return function (fa) { return function (p) { return f(fa(p)); }; }; };
exports.map = map;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Traced';
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
exports.traced = exports.Functor;
