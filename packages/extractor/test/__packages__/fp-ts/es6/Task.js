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
import { identity, pipe, bind_, bindTo_, flow } from './function';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
export var fromIO = function (ma) { return function () { return Promise.resolve(ma()); }; };
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
export function delay(millis) {
    return function (ma) { return function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                // tslint:disable-next-line: no-floating-promises
                ma().then(resolve);
            }, millis);
        });
    }; };
}
/**
 * @category combinators
 * @since 2.4.0
 */
export function fromIOK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIO(f.apply(void 0, a));
    };
}
/**
 * @category combinators
 * @since 2.4.0
 */
export function chainIOK(f) {
    return chain(fromIOK(f));
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return pipe(fa, map(f)); };
var apPar_ = function (fab, fa) { return pipe(fab, ap(fa)); };
var apSeq_ = function (fab, fa) {
    return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
};
var chain_ = function (ma, f) { return pipe(ma, chain(f)); };
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
export var map = function (f) { return function (fa) { return function () { return fa().then(f); }; }; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return function () {
    return Promise.all([fab(), fa()]).then(function (_a) {
        var f = _a[0], a = _a[1];
        return f(a);
    });
}; }; };
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var apFirst = function (fb) {
    return flow(map(function (a) { return function () { return a; }; }), ap(fb));
};
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var apSecond = function (fb) {
    return flow(map(function () { return function (b) { return b; }; }), ap(fb));
};
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export var of = function (a) { return function () { return Promise.resolve(a); }; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) { return function () {
    return ma().then(function (a) { return f(a)(); });
}; }; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var flatten = 
/*#__PURE__*/
chain(identity);
/**
 * @category MonadTask
 * @since 2.7.0
 */
export var fromTask = identity;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Task';
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
export function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return x().then(function (rx) { return y().then(function (ry) { return S.concat(rx, ry); }); }); }; }
    };
}
/**
 * Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.
 *
 * @category instances
 * @since 2.0.0
 */
export function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: of(M.empty)
    };
}
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
export function getRaceMonoid() {
    return {
        concat: function (x, y) { return function () { return Promise.race([x(), y()]); }; },
        empty: never
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export var Functor = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var ApplicativePar = {
    URI: URI,
    map: map_,
    ap: apPar_,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
export var ApplicativeSeq = {
    URI: URI,
    map: map_,
    ap: apSeq_,
    of: of
};
/**
 * Used in TaskEither.getTaskValidation
 *
 * @internal
 */
export var Monad = {
    URI: URI,
    map: map_,
    of: of,
    ap: apPar_,
    chain: chain_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var task = {
    URI: URI,
    map: map_,
    of: of,
    ap: apPar_,
    chain: chain_,
    fromIO: fromIO,
    fromTask: fromTask
};
// TODO: remove in v3
/**
 * Like `task` but `ap` is sequential
 *
 * @category instances
 * @since 2.0.0
 */
export var taskSeq = {
    URI: URI,
    map: map_,
    of: of,
    ap: apSeq_,
    chain: chain_,
    fromIO: fromIO,
    fromTask: fromTask
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * A `Task` that never completes.
 *
 * @since 2.0.0
 */
export var never = function () { return new Promise(function (_) { return undefined; }); };
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
export var Do = of({});
/**
 * @since 2.8.0
 */
export var bindTo = function (name) { return map(bindTo_(name)); };
/**
 * @since 2.8.0
 */
export var bind = function (name, f) {
    return chain(function (a) {
        return pipe(f(a), map(function (b) { return bind_(a, name, b); }));
    });
};
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
export var apS = function (name, fb) {
    return flow(map(function (a) { return function (b) { return bind_(a, name, b); }; }), ap(fb));
};
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
export var traverseArrayWithIndex = function (f) { return function (arr) { return function () { return Promise.all(arr.map(function (x, i) { return f(i, x)(); })); }; }; };
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
export var traverseArray = function (f) {
    return traverseArrayWithIndex(function (_, a) { return f(a); });
};
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
export var sequenceArray = function (arr) { return function () {
    return Promise.all(arr.map(function (x) { return x(); }));
}; };
/**
 * @since 2.9.0
 */
export var traverseSeqArrayWithIndex = function (f) { return function (arr) { return function () { return __awaiter(void 0, void 0, void 0, function () {
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
export var traverseSeqArray = function (f) { return traverseSeqArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * run tasks in array sequential and give a task of array
 *
 * this function have the same behavior of `A.sequence(T.taskSeq)` but it's stack safe.
 *
 * > **This function run all task sequentially for parallel use `sequenceArray` **
 *
 * @since 2.9.0
 */
export var sequenceSeqArray = traverseSeqArray(identity);
