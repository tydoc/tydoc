import { pipe } from './function';
// TODO: curry in v3
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
export function tracks(M, f) {
    return function (wa) { return wa(f(wa(M.empty))); };
}
// tslint:disable:readonly-array
/**
 * Get the current position
 *
 * @since 2.0.0
 */
export function listen(wa) {
    return function (e) { return [wa(e), e]; };
}
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export function listens(f) {
    return function (wa) { return function (e) { return [wa(e), f(e)]; }; };
}
// tslint:enable:readonly-array
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export function censor(f) {
    return function (wa) { return function (e) { return wa(f(e)); }; };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getComonad(monoid) {
    function extend(wa, f) {
        return function (p1) { return f(function (p2) { return wa(monoid.concat(p1, p2)); }); };
    }
    function extract(wa) {
        return wa(monoid.empty);
    }
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        extend: extend,
        extract: extract
    };
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return pipe(fa, map(f)); };
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
export var map = function (f) { return function (fa) { return function (p) { return f(fa(p)); }; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Traced';
/**
 * @category instances
 * @since 2.7.0
 */
export var Functor = {
    URI: URI,
    map: map_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var traced = Functor;
