"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.apS = exports.apSW = exports.Do = exports.bind = exports.bindW = exports.bindTo = exports.reader = exports.Choice = exports.Strong = exports.Category = exports.Profunctor = exports.Monad = exports.Applicative = exports.Functor = exports.getMonoid = exports.getSemigroup = exports.URI = exports.id = exports.promap = exports.compose = exports.flatten = exports.chainFirst = exports.chain = exports.chainW = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.apW = exports.map = exports.local = exports.asks = exports.ask = void 0;
var E = __importStar(require("./Either"));
var function_1 = require("./function");
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Reads the current context
 *
 * @category constructors
 * @since 2.0.0
 */
var ask = function () { return function_1.identity; };
exports.ask = ask;
/**
 * Projects a value from the global context in a Reader
 *
 * @category constructors
 * @since 2.0.0
 */
exports.asks = function_1.identity;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 2.0.0
 */
var local = function (f) { return function (ma) { return function (q) { return ma(f(q)); }; }; };
exports.local = local;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var ap_ = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
var compose_ = function (bc, ab) { return function_1.pipe(bc, exports.compose(ab)); };
var promap_ = function (fea, f, g) { return function_1.pipe(fea, exports.promap(f, g)); };
var first_ = function (pab) { return function (_a) {
    var a = _a[0], c = _a[1];
    return [pab(a), c];
}; };
var second_ = function (pbc) { return function (_a) {
    var a = _a[0], b = _a[1];
    return [a, pbc(b)];
}; };
var left_ = function (pab) {
    return E.fold(function (a) { return E.left(pab(a)); }, E.right);
};
var right_ = function (pbc) {
    return E.fold(E.left, function (b) { return E.right(pbc(b)); });
};
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
var map = function (f) { return function (fa) { return function (r) { return f(fa(r)); }; }; };
exports.map = map;
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
var apW = function (fa) { return function (fab) { return function (r) { return fab(r)(fa(r)); }; }; };
exports.apW = apW;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
exports.ap = exports.apW;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apFirst = function (fb) {
    return function_1.flow(exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
};
exports.apFirst = apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apSecond = function (fb) {
    return function_1.flow(exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
};
exports.apSecond = apSecond;
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
exports.of = function_1.constant;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
var chainW = function (f) { return function (fa) { return function (r) { return f(fa(r))(r); }; }; };
exports.chainW = chainW;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
exports.chain = exports.chainW;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
var chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
exports.chainFirst = chainFirst;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * @category Semigroupoid
 * @since 2.0.0
 */
var compose = function (ab) { return function (bc) { return function_1.flow(ab, bc); }; };
exports.compose = compose;
/**
 * @category Profunctor
 * @since 2.0.0
 */
var promap = function (f, g) { return function (fea) { return function (a) { return g(fea(f(a))); }; }; };
exports.promap = promap;
/**
 * @category Category
 * @since 2.0.0
 */
var id = function () { return function_1.identity; };
exports.id = id;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Reader';
/**
 * @category instances
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function (e) { return S.concat(x(e), y(e)); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @category instances
 * @since 2.0.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: function () { return M.empty; }
    };
}
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Profunctor = {
    URI: exports.URI,
    map: map_,
    promap: promap_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Category = {
    URI: exports.URI,
    compose: compose_,
    id: exports.id
};
/**
 * @category instances
 * @since 2.8.3
 */
exports.Strong = {
    URI: exports.URI,
    map: map_,
    promap: promap_,
    first: first_,
    second: second_
};
/**
 * @category instances
 * @since 2.8.3
 */
exports.Choice = {
    URI: exports.URI,
    map: map_,
    promap: promap_,
    left: left_,
    right: right_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.reader = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    promap: promap_,
    compose: compose_,
    id: exports.id,
    first: first_,
    second: second_,
    left: left_,
    right: right_
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
var bindTo = function (name) {
    return exports.map(function_1.bindTo_(name));
};
exports.bindTo = bindTo;
/**
 * @since 2.8.0
 */
var bindW = function (name, f) {
    return exports.chainW(function (a) {
        return function_1.pipe(f(a), exports.map(function (b) { return function_1.bind_(a, name, b); }));
    });
};
exports.bindW = bindW;
/**
 * @since 2.8.0
 */
exports.bind = exports.bindW;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.Do = exports.of({});
/**
 * @since 2.8.0
 */
var apSW = function (name, fb) {
    return function_1.flow(exports.map(function (a) { return function (b) { return function_1.bind_(a, name, b); }; }), exports.apW(fb));
};
exports.apSW = apSW;
/**
 * @since 2.8.0
 */
exports.apS = exports.apSW;
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 *
 * @since 2.9.0
 */
var traverseArrayWithIndex = function (f) { return function (arr) { return function (r) { return arr.map(function (x, i) { return f(i, x)(r); }); }; }; };
exports.traverseArrayWithIndex = traverseArrayWithIndex;
/**
 * this function have the same behavior of `A.traverse(R.reader)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, Reader } from 'fp-ts/Reader'
 * import { pipe } from 'fp-ts/function'
 *
 * const add: (x: number) => Reader<{value:number}, number> = x => config => x + config.value
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, traverseArray(add))({value: 3}), pipe(arr, RA.map(x => x + 3)))
 *
 * @since 2.9.0
 */
var traverseArray = function (f) { return exports.traverseArrayWithIndex(function (_, a) { return f(a); }); };
exports.traverseArray = traverseArray;
/**
 * this function have the same behavior of `A.sequence(R.reader)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, Reader } from 'fp-ts/Reader'
 * import { pipe } from 'fp-ts/function'
 *
 * const add: (x: number) => Reader<{value:number}, number> = x => config => x + config.value
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, RA.map(add), sequenceArray)({value: 3}), pipe(arr, RA.map(x => x + 3)))
 *
 * @since 2.9.0
 */
exports.sequenceArray = exports.traverseArray(function_1.identity);
