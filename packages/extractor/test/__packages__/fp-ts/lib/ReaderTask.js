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
exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.apS = exports.apSW = exports.bind = exports.bindW = exports.bindTo = exports.Do = exports.run = exports.readerTaskSeq = exports.readerTask = exports.Monad = exports.ApplicativeSeq = exports.ApplicativePar = exports.Functor = exports.getMonoid = exports.getSemigroup = exports.URI = exports.flatten = exports.chainFirst = exports.chain = exports.chainW = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.apW = exports.map = exports.chainTaskK = exports.fromTaskK = exports.chainIOK = exports.fromIOK = exports.local = exports.asks = exports.ask = exports.fromIO = exports.fromReader = exports.fromTask = void 0;
var function_1 = require("./function");
var R = __importStar(require("./Reader"));
var T = __importStar(require("./Task"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.3.0
 */
exports.fromTask = 
/*#__PURE__*/
R.of;
/**
 * @category constructors
 * @since 2.3.0
 */
var fromReader = function (ma) { return function_1.flow(ma, T.of); };
exports.fromReader = fromReader;
/**
 * @category constructors
 * @since 2.3.0
 */
exports.fromIO = 
/*#__PURE__*/
function_1.flow(T.fromIO, exports.fromTask);
/**
 * @category constructors
 * @since 2.3.0
 */
var ask = function () { return T.of; };
exports.ask = ask;
/**
 * @category constructors
 * @since 2.3.0
 */
var asks = function (f) { return function_1.flow(T.of, T.map(f)); };
exports.asks = asks;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
// TODO: remove in v3
/**
 * @category combinators
 * @since 2.3.0
 */
exports.local = R.local;
/**
 * @category combinators
 * @since 2.4.0
 */
function fromIOK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromIO(f.apply(void 0, a));
    };
}
exports.fromIOK = fromIOK;
/**
 * @category combinators
 * @since 2.4.0
 */
var chainIOK = function (f) {
    return exports.chain(function (a) { return exports.fromIO(f(a)); });
};
exports.chainIOK = chainIOK;
/**
 * @category combinators
 * @since 2.4.0
 */
function fromTaskK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromTask(f.apply(void 0, a));
    };
}
exports.fromTaskK = fromTaskK;
/**
 * @category combinators
 * @since 2.4.0
 */
var chainTaskK = function (f) {
    return exports.chain(function (a) { return exports.fromTask(f(a)); });
};
exports.chainTaskK = chainTaskK;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
var apPar_ = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
var apSeq_ = function (fab, fa) {
    return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
};
var chain_ = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.3.0
 */
var map = function (f) { return function (fa) {
    return function_1.flow(fa, T.map(f));
}; };
exports.map = map;
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
var apW = function (fa) { return function (fab) { return function (r) { return function_1.pipe(fab(r), T.ap(fa(r))); }; }; };
exports.apW = apW;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.3.0
 */
exports.ap = exports.apW;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.3.0
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
 * @since 2.3.0
 */
var apSecond = function (fb) {
    return function_1.flow(exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
};
exports.apSecond = apSecond;
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.3.0
 */
var of = function (a) { return function () { return T.of(a); }; };
exports.of = of;
/**
 * Less strict version of  [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.7
 */
var chainW = function (f) { return function (fa) { return function (r) {
    return function_1.pipe(fa(r), T.chain(function (a) { return f(a)(r); }));
}; }; };
exports.chainW = chainW;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.3.0
 */
exports.chain = exports.chainW;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.3.0
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
 * @since 2.3.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.3.0
 */
exports.URI = 'ReaderTask';
/**
 * @category instances
 * @since 2.3.0
 */
function getSemigroup(S) {
    return R.getSemigroup(T.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * @category instances
 * @since 2.3.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: exports.of(M.empty)
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
exports.ApplicativePar = {
    URI: exports.URI,
    map: map_,
    ap: apPar_,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.ApplicativeSeq = {
    URI: exports.URI,
    map: map_,
    ap: apSeq_,
    of: exports.of
};
/**
 * @internal
 */
exports.Monad = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: apPar_,
    chain: chain_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.3.0
 */
exports.readerTask = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: apPar_,
    chain: chain_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask
};
// TODO: remove in v3
/**
 * Like `readerTask` but `ap` is sequential
 *
 * @category instances
 * @since 2.3.0
 */
exports.readerTaskSeq = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: apSeq_,
    chain: chain_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
// TODO: remove in v3
/**
 * @since 2.4.0
 */
/* istanbul ignore next */
function run(ma, r) {
    return ma(r)();
}
exports.run = run;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.Do = exports.of({});
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
 * @since 2.9.0
 */
var traverseArrayWithIndex = function (f) {
    return function_1.flow(R.traverseArrayWithIndex(f), R.map(T.sequenceArray));
};
exports.traverseArrayWithIndex = traverseArrayWithIndex;
/**
 * @since 2.9.0
 */
var traverseArray = function (f) { return exports.traverseArrayWithIndex(function (_, a) { return f(a); }); };
exports.traverseArray = traverseArray;
/**
 * @since 2.9.0
 */
exports.sequenceArray = exports.traverseArray(function_1.identity);
