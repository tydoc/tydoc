"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.never = exports.taskSeq = exports.task = exports.Monad = exports.ApplicativeSeq = exports.ApplicativePar = exports.Functor = exports.getRaceMonoid = exports.getMonoid = exports.getSemigroup = exports.URI = exports.fromTask = exports.flatten = exports.chainFirst = exports.chain = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.map = exports.chainIOK = exports.fromIOK = exports.delay = exports.fromIO = void 0;
var function_1 = require("./function");
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromIO = function (ma) { return function () { return Promise.resolve(ma()); }; };
exports.fromIO = fromIO;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Creates a task that will complete after a time delay
 *
 * @example
 * import { sequenceT } from 'fp-ts/Apply'
 * import * as T from 'fp-ts/Task'
 *
 * async function test() {
 *   const log: Array<string> = []
 *   const append = (message: string): T.Task<void> =>
 *     T.fromIO(() => {
 *       log.push(message)
 *     })
 *   const fa = append('a')
 *   const fb = append('b')
 *   const fc = T.delay(10)(append('c'))
 *   const fd = append('d')
 *   await sequenceT(T.task)(fa, fb, fc, fd)()
 *   assert.deepStrictEqual(log, ['a', 'b', 'd', 'c'])
 * }
 *
 * test()
 *
 * @category combinators
 * @since 2.0.0
 */
function delay(millis) {
    return function (ma) { return function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                // tslint:disable-next-line: no-floating-promises
                ma().then(resolve);
            }, millis);
        });
    }; };
}
exports.delay = delay;
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
function chainIOK(f) {
    return exports.chain(fromIOK(f));
}
exports.chainIOK = chainIOK;
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
 * @since 2.0.0
 */
var map = function (f) { return function (fa) { return function () { return fa().then(f); }; }; };
exports.map = map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
var ap = function (fa) { return function (fab) { return function () {
    return Promise.all([fab(), fa()]).then(function (_a) {
        var f = _a[0], a = _a[1];
        return f(a);
    });
}; }; };
exports.ap = ap;
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
var of = function (a) { return function () { return Promise.resolve(a); }; };
exports.of = of;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = function (f) { return function (ma) { return function () {
    return ma().then(function (a) { return f(a)(); });
}; }; };
exports.chain = chain;
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
 * @category MonadTask
 * @since 2.7.0
 */
exports.fromTask = function_1.identity;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Task';
/**
 * Lift a semigroup into 'Task', the inner values are concatenated using the provided `Semigroup`.
 *
 * @example
 * import * as T from 'fp-ts/Task'
 * import { semigroupString } from 'fp-ts/Semigroup'
 *
 * async function test() {
 *   const S = T.getSemigroup(semigroupString)
 *   const fa = T.of('a')
 *   const fb = T.of('b')
 *   assert.deepStrictEqual(await S.concat(fa, fb)(), 'ab')
 * }
 *
 * test()
 *
 * @category instances
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return x().then(function (rx) { return y().then(function (ry) { return S.concat(rx, ry); }); }); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.
 *
 * @category instances
 * @since 2.0.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: exports.of(M.empty)
    };
}
exports.getMonoid = getMonoid;
/**
 * Monoid returning the first completed task.
 *
 * Note: uses `Promise.race` internally.
 *
 * @example
 * import * as T from 'fp-ts/Task'
 *
 * async function test() {
 *   const S = T.getRaceMonoid<string>()
 *   const fa = T.delay(20)(T.of('a'))
 *   const fb = T.delay(10)(T.of('b'))
 *   assert.deepStrictEqual(await S.concat(fa, fb)(), 'b')
 * }
 *
 * test()
 *
 * @category instances
 * @since 2.0.0
 */
function getRaceMonoid() {
    return {
        concat: function (x, y) { return function () { return Promise.race([x(), y()]); }; },
        empty: exports.never
    };
}
exports.getRaceMonoid = getRaceMonoid;
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
 * Used in TaskEither.getTaskValidation
 *
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
 * @since 2.0.0
 */
exports.task = {
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
 * Like `task` but `ap` is sequential
 *
 * @category instances
 * @since 2.0.0
 */
exports.taskSeq = {
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
/**
 * A `Task` that never completes.
 *
 * @since 2.0.0
 */
var never = function () { return new Promise(function (_) { return undefined; }); };
exports.never = never;
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
var bindTo = function (name) { return exports.map(function_1.bindTo_(name)); };
exports.bindTo = bindTo;
/**
 * @since 2.8.0
 */
var bind = function (name, f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function (b) { return function_1.bind_(a, name, b); }));
    });
};
exports.bind = bind;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
var apS = function (name, fb) {
    return function_1.flow(exports.map(function (a) { return function (b) { return function_1.bind_(a, name, b); }; }), exports.ap(fb));
};
exports.apS = apS;
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
var traverseArrayWithIndex = function (f) { return function (arr) { return function () { return Promise.all(arr.map(function (x, i) { return f(i, x)(); })); }; }; };
exports.traverseArrayWithIndex = traverseArrayWithIndex;
/**
 * this function map array to task using provided function and transform it to a task of array.
 *
 * this function have the same behavior of `A.traverse(T.task)` but it's stack safe.
 *
 * > **This function run all task in parallel for sequential use `traverseSeqArray` **
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 * import { of, traverseArray } from 'fp-ts/Task'
 * async function test() {
 *   const arr = range(0, 10)
 *   assert.deepStrictEqual(await pipe(arr, traverseArray(of))(), arr)
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
var traverseArray = function (f) {
    return exports.traverseArrayWithIndex(function (_, a) { return f(a); });
};
exports.traverseArray = traverseArray;
/**
 * this function works like `Promise.all` it will get an array of tasks and return a task of array.
 *
 * this function have the same behavior of `A.sequence(T.task)` but it's stack safe.
 *
 * > **This function run all task in parallel for sequential use `sequenceSeqArray` **
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 * import { of, sequenceArray } from 'fp-ts/Task'
 *
 * async function test() {
 *   const arr = RA.range(1, 10)
 *   assert.deepStrictEqual(await pipe(arr, RA.map(of), sequenceArray)(), arr)
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
var sequenceArray = function (arr) { return function () {
    return Promise.all(arr.map(function (x) { return x(); }));
}; };
exports.sequenceArray = sequenceArray;
/**
 * @since 2.9.0
 */
var traverseSeqArrayWithIndex = function (f) { return function (arr) { return function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, i, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < arr.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, f(i, arr[i])()];
            case 2:
                r = _a.sent();
                result.push(r);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, result];
        }
    });
}); }; }; };
exports.traverseSeqArrayWithIndex = traverseSeqArrayWithIndex;
/**
 * runs an action for every element in array then run task sequential, and accumulates the results in the array.
 *
 * this function have the same behavior of `A.traverse(T.taskSeq)` but it's stack safe.
 *
 * > **This function run all task sequentially for parallel use `traverseArray` **
 *
 *
 * @since 2.9.0
 */
var traverseSeqArray = function (f) { return exports.traverseSeqArrayWithIndex(function (_, a) { return f(a); }); };
exports.traverseSeqArray = traverseSeqArray;
/**
 * run tasks in array sequential and give a task of array
 *
 * this function have the same behavior of `A.sequence(T.taskSeq)` but it's stack safe.
 *
 * > **This function run all task sequentially for parallel use `sequenceArray` **
 *
 * @since 2.9.0
 */
exports.sequenceSeqArray = exports.traverseSeqArray(function_1.identity);
