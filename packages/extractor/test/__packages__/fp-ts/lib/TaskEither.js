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
exports.getTaskValidation = exports.getAltTaskValidation = exports.getApplicativeTaskValidation = exports.getApplyMonoid = exports.getApplySemigroup = exports.getSemigroup = exports.URI = exports.throwError = exports.fromTask = exports.fromIO = exports.of = exports.alt = exports.altW = exports.flatten = exports.chainFirst = exports.chainFirstW = exports.chain = exports.chainW = exports.apSecond = exports.apFirst = exports.ap = exports.apW = exports.mapLeft = exports.bimap = exports.map = exports.chainIOEitherK = exports.chainIOEitherKW = exports.chainEitherK = exports.chainEitherKW = exports.fromIOEitherK = exports.fromEitherK = exports.tryCatchK = exports.filterOrElse = exports.filterOrElseW = exports.swap = exports.orElse = exports.getOrElse = exports.getOrElseW = exports.fold = exports.tryCatch = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.fromIOEither = exports.leftIO = exports.rightIO = exports.leftTask = exports.rightTask = exports.right = exports.left = void 0;
exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.apS = exports.apSW = exports.bind = exports.bindW = exports.bindTo = exports.Do = exports.bracket = exports.taskify = exports.taskEitherSeq = exports.taskEither = exports.Alt = exports.Bifunctor = exports.ApplicativeSeq = exports.ApplicativePar = exports.Functor = exports.getFilterable = void 0;
var E = __importStar(require("./Either"));
var Filterable_1 = require("./Filterable");
var function_1 = require("./function");
var T = __importStar(require("./Task"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
exports.left = 
/*#__PURE__*/
function_1.flow(E.left, T.of);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.right = 
/*#__PURE__*/
function_1.flow(E.right, T.of);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.rightTask = 
/*#__PURE__*/
T.map(E.right);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.leftTask = 
/*#__PURE__*/
T.map(E.left);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.rightIO = 
/*#__PURE__*/
function_1.flow(T.fromIO, exports.rightTask);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.leftIO = 
/*#__PURE__*/
function_1.flow(T.fromIO, exports.leftTask);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.fromIOEither = T.fromIO;
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
exports.fromEither = 
/*#__PURE__*/
E.fold(exports.left, function (a) { return exports.right(a); });
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
var fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? exports.left(onNone()) : exports.right(ma.value);
}; };
exports.fromOption = fromOption;
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); }; };
exports.fromPredicate = fromPredicate;
/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * @example
 * import { left, right } from 'fp-ts/Either'
 * import { tryCatch } from 'fp-ts/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1), String)().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'), String)().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @category constructors
 * @since 2.0.0
 */
function tryCatch(f, onRejected) {
    return function () { return f().then(E.right, function (reason) { return E.left(onRejected(reason)); }); };
}
exports.tryCatch = tryCatch;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.0.0
 */
exports.fold = 
/*#__PURE__*/
function_1.flow(E.fold, T.chain);
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
var getOrElseW = function (onLeft) { return function (ma) {
    return function_1.pipe(ma, T.chain(E.fold(onLeft, T.of)));
}; };
exports.getOrElseW = getOrElseW;
/**
 * @category destructors
 * @since 2.0.0
 */
exports.getOrElse = exports.getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
 *
 * See also [alt](#alt).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * async function test() {
 *   const errorHandler = TE.orElse((error: string) => TE.right(`recovering from ${error}...`))
 *   assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
 *   assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
 * }
 *
 * test()
 *
 * @category combinators
 * @since 2.0.0
 */
var orElse = function (f) { return T.chain(E.fold(f, exports.right)); };
exports.orElse = orElse;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.swap = 
/*#__PURE__*/
T.map(E.swap);
/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
var filterOrElseW = function (predicate, onFalse) {
    return exports.chainW(function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); });
};
exports.filterOrElseW = filterOrElseW;
/**
 * Derivable from `MonadThrow`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.filterOrElse = exports.filterOrElseW;
/**
 * Converts a function returning a `Promise` to one returning a `TaskEither`.
 *
 * @category combinators
 * @since 2.5.0
 */
function tryCatchK(f, onRejected) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch(function () { return f.apply(void 0, a); }, onRejected);
    };
}
exports.tryCatchK = tryCatchK;
/**
 * @category combinators
 * @since 2.4.0
 */
function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromEither(f.apply(void 0, a));
    };
}
exports.fromEitherK = fromEitherK;
/**
 * @category combinators
 * @since 2.4.0
 */
function fromIOEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromIOEither(f.apply(void 0, a));
    };
}
exports.fromIOEitherK = fromIOEitherK;
/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
var chainEitherKW = function (f) { return exports.chainW(fromEitherK(f)); };
exports.chainEitherKW = chainEitherKW;
/**
 * @category combinators
 * @since 2.4.0
 */
exports.chainEitherK = exports.chainEitherKW;
/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
var chainIOEitherKW = function (f) { return exports.chainW(fromIOEitherK(f)); };
exports.chainIOEitherKW = chainIOEitherKW;
/**
 * @category combinators
 * @since 2.4.0
 */
exports.chainIOEitherK = exports.chainIOEitherKW;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return function_1.pipe(fa, exports.bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return function_1.pipe(fa, exports.mapLeft(f)); };
var apPar_ = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
var apSeq_ = function (fab, fa) {
    return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
};
/* istanbul ignore next */
var chain_ = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var alt_ = function (fa, that) { return function_1.pipe(fa, exports.alt(that)); };
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
var map = function (f) { return T.map(E.map(f)); };
exports.map = map;
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
exports.bimap = 
/*#__PURE__*/
function_1.flow(E.bimap, T.map);
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var mapLeft = function (f) {
    return T.map(E.mapLeft(f));
};
exports.mapLeft = mapLeft;
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
var apW = function (fa) {
    return function_1.flow(T.map(function (gab) { return function (ga) { return E.apW(ga)(gab); }; }), T.ap(fa));
};
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
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
var chainW = function (f) { return function (ma) {
    return function_1.pipe(ma, T.chain(E.fold(exports.left, f)));
}; };
exports.chainW = chainW;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
exports.chain = exports.chainW;
/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
var chainFirstW = function (f) {
    return exports.chainW(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
exports.chainFirstW = chainFirstW;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.chainFirst = exports.chainFirstW;
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
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) { return function_1.pipe(fa, T.chain(E.fold(that, exports.right))); }; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `TaskEither` returns `fa` if is a `Right` or the value returned by `that` otherwise.
 *
 * See also [orElse](#orElse).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.right(1),
 *       TE.alt(() => TE.right(2))
 *     )(),
 *     E.right(1)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.alt(() => TE.right(2))
 *     )(),
 *     E.right(2)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.alt(() => TE.left('b'))
 *     )(),
 *     E.left('b')
 *   )
 * }
 *
 * test()
 *
 * @category Alt
 * @since 2.0.0
 */
exports.alt = exports.altW;
/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.0.0
 */
exports.of = exports.right;
/**
 * @category MonadIO
 * @since 2.7.0
 */
exports.fromIO = exports.rightIO;
/**
 * @category MonadTask
 * @since 2.7.0
 */
exports.fromTask = exports.rightTask;
/**
 * @category MonadTask
 * @since 2.7.0
 */
exports.throwError = exports.left;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'TaskEither';
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
function getSemigroup(S) {
    return T.getSemigroup(E.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return T.getSemigroup(E.getApplySemigroup(S));
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @category instances
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: exports.right(M.empty)
    };
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
function getApplicativeTaskValidation(A, SE) {
    var AV = E.getApplicativeValidation(SE);
    var ap = function (fga) { return function (fgab) {
        return A.ap(A.map(fgab, function (h) { return function (ga) { return AV.ap(h, ga); }; }), fga);
    }; };
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return function_1.pipe(fab, ap(fa)); },
        of: exports.of
    };
}
exports.getApplicativeTaskValidation = getApplicativeTaskValidation;
/**
 * @category instances
 * @since 2.7.0
 */
function getAltTaskValidation(SE) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        alt: function (me, that) {
            return function_1.pipe(me, T.chain(function (e1) {
                return E.isRight(e1)
                    ? T.of(e1)
                    : function_1.pipe(that(), T.map(function (e2) { return (E.isLeft(e2) ? E.left(SE.concat(e1.left, e2.left)) : e2); }));
            }));
        }
    };
}
exports.getAltTaskValidation = getAltTaskValidation;
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
function getTaskValidation(SE) {
    var applicativeTaskValidation = getApplicativeTaskValidation(T.ApplicativePar, SE);
    var altTaskValidation = getAltTaskValidation(SE);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: applicativeTaskValidation.ap,
        of: exports.of,
        chain: chain_,
        bimap: bimap_,
        mapLeft: mapLeft_,
        alt: altTaskValidation.alt,
        fromIO: exports.fromIO,
        fromTask: exports.fromTask,
        throwError: exports.throwError
    };
}
exports.getTaskValidation = getTaskValidation;
/**
 * @category instances
 * @since 2.1.0
 */
function getFilterable(M) {
    var W = E.getWitherable(M);
    var F = Filterable_1.getFilterableComposition(T.Monad, W);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        compact: F.compact,
        separate: F.separate,
        filter: F.filter,
        filterMap: F.filterMap,
        partition: F.partition,
        partitionMap: F.partitionMap
    };
}
exports.getFilterable = getFilterable;
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
 * @category instances
 * @since 2.7.0
 */
exports.Bifunctor = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: map_,
    alt: alt_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.taskEither = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_,
    map: map_,
    of: exports.of,
    ap: apPar_,
    chain: chain_,
    alt: alt_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask,
    throwError: exports.throwError
};
// TODO: remove in v3
/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @category instances
 * @since 2.0.0
 */
exports.taskEitherSeq = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_,
    map: map_,
    of: exports.of,
    ap: apSeq_,
    chain: chain_,
    alt: alt_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask,
    throwError: exports.throwError
};
function taskify(f) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function () {
            return new Promise(function (resolve) {
                var cbResolver = function (e, r) { return (e != null ? resolve(E.left(e)) : resolve(E.right(r))); };
                f.apply(null, args.concat(cbResolver));
            });
        };
    };
}
exports.taskify = taskify;
/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * Derivable from `MonadThrow`.
 *
 * @since 2.0.0
 */
var bracket = function (acquire, use, release) {
    return function_1.pipe(acquire, exports.chain(function (a) {
        return function_1.pipe(function_1.pipe(use(a), T.map(E.right)), exports.chain(function (e) {
            return function_1.pipe(release(a, e), exports.chain(function () { return (E.isLeft(e) ? exports.left(e.left) : exports.of(e.right)); }));
        }));
    }));
};
exports.bracket = bracket;
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
var traverseArrayWithIndex = function (f) { return function (arr) {
    return function_1.pipe(arr, T.traverseArrayWithIndex(f), T.map(E.sequenceArray));
}; };
exports.traverseArrayWithIndex = traverseArrayWithIndex;
/**
 * this function have the same behavior of `A.traverse(TE.taskEither)` but it's stack safe and perform better
 *
 * *this function run all tasks in parallel and does not bail out, for sequential version use `traverseSeqArray`*
 *
 * @example
 *
 * import * as TE from 'fp-ts/TaskEither'
 * import * as A from 'fp-ts/Array'
 * import { right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * const PostRepo = {
 *  findById : (id: number) => TE.of({id, title: ''})
 * }
 *
 * const findAllPosts = (ids:number[]) => pipe(ids, TE.traverseArray(PostRepo.findById))
 *
 * async function test() {
 *   const ids = A.range(0, 10)
 *
 *   assert.deepStrictEqual(
 *     await findAllPosts(ids)(),
 *     right(
 *       pipe(
 *         ids,
 *         A.map((id) => ({ id, title: ''}))
 *       )
 *     )
 *   )
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
var traverseArray = function (f) { return exports.traverseArrayWithIndex(function (_, a) { return f(a); }); };
exports.traverseArray = traverseArray;
/**
 * this function have the same behavior of `A.sequence(TE.taskEither)` but it's stack safe and perform better
 *
 * *this function run all tasks in parallel and does not bail out, for sequential version use `sequenceSeqArray`*
 *
 * @example
 *
 * import * as TE from 'fp-ts/TaskEither'
 * import * as A from 'fp-ts/Array'
 * import { right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * const PostRepo = {
 *  findById : (id: number) => TE.of({id, title: ''})
 * }
 *
 * const findAllPosts = (ids:number[]) => pipe(ids, A.map(PostRepo.findById), TE.sequenceArray)
 *
 * async function test() {
 *   const ids = A.range(0, 10)
 *
 *   assert.deepStrictEqual(
 *     await findAllPosts(ids)(),
 *     right(
 *       pipe(
 *         ids,
 *         A.map((id) => ({ id, title: ''}))
 *       )
 *     )
 *   )
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
exports.sequenceArray = exports.traverseArray(function_1.identity);
/**
 * @since 2.9.0
 */
var traverseSeqArrayWithIndex = function (f) { return function (arr) { return function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, i, e;
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
                e = _a.sent();
                if (E.isLeft(e)) {
                    return [2 /*return*/, e];
                }
                result.push(e.right);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, E.right(result)];
        }
    });
}); }; }; };
exports.traverseSeqArrayWithIndex = traverseSeqArrayWithIndex;
/**
 * this function have the same behavior of `A.traverse(TE.taskEitherSeq)` but it's stack safe and perform better
 *
 * *this function run all tasks in sequential order and bails out on left side of either, for parallel version use `traverseArray`*
 *
 * @since 2.9.0
 */
var traverseSeqArray = function (f) { return exports.traverseSeqArrayWithIndex(function (_, a) { return f(a); }); };
exports.traverseSeqArray = traverseSeqArray;
/**
 * this function have the same behavior of `A.sequence(TE.taskEitherSeq)` but it's stack safe and perform better
 *
 * *this function run all tasks in sequential order and bails out on left side of either, for parallel version use `sequenceArray`*
 *
 * @since 2.9.0
 */
exports.sequenceSeqArray = exports.traverseSeqArray(function_1.identity);
