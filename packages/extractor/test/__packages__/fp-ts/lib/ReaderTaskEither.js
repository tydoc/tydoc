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
exports.alt = exports.altW = exports.flatten = exports.chainFirst = exports.chainFirstW = exports.chain = exports.chainW = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.apW = exports.mapLeft = exports.bimap = exports.map = exports.chainTaskEitherK = exports.chainTaskEitherKW = exports.fromTaskEitherK = exports.chainIOEitherK = exports.chainIOEitherKW = exports.fromIOEitherK = exports.chainEitherK = exports.chainEitherKW = exports.fromEitherK = exports.filterOrElse = exports.filterOrElseW = exports.local = exports.swap = exports.orElse = exports.getOrElse = exports.getOrElseW = exports.fold = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.asks = exports.ask = exports.leftIO = exports.rightIO = exports.fromReaderEither = exports.fromIOEither = exports.leftReaderTask = exports.rightReaderTask = exports.leftReader = exports.rightReader = exports.leftTask = exports.rightTask = exports.right = exports.left = exports.fromTaskEither = void 0;
exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.apS = exports.apSW = exports.bind = exports.bindW = exports.bindTo = exports.Do = exports.bracket = exports.run = exports.readerTaskEitherSeq = exports.readerTaskEither = exports.Alt = exports.Bifunctor = exports.ApplicativeSeq = exports.ApplicativePar = exports.Functor = exports.getReaderTaskValidation = exports.getAltReaderTaskValidation = exports.getApplicativeReaderTaskValidation = exports.getApplyMonoid = exports.getApplySemigroup = exports.getSemigroup = exports.URI = exports.throwError = exports.fromTask = exports.fromIO = void 0;
var E = __importStar(require("./Either"));
var function_1 = require("./function");
var R = __importStar(require("./Reader"));
var T = __importStar(require("./Task"));
var TE = __importStar(require("./TaskEither"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
exports.fromTaskEither = 
/*#__PURE__*/
R.of;
/**
 * @category constructors
 * @since 2.0.0
 */
exports.left = 
/*#__PURE__*/
function_1.flow(TE.left, exports.fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.right = 
/*#__PURE__*/
function_1.flow(TE.right, exports.fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.rightTask = 
/*#__PURE__*/
function_1.flow(TE.rightTask, exports.fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.leftTask = 
/*#__PURE__*/
function_1.flow(TE.leftTask, exports.fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
var rightReader = function (ma) {
    return function_1.flow(ma, TE.right);
};
exports.rightReader = rightReader;
/**
 * @category constructors
 * @since 2.0.0
 */
var leftReader = function (me) {
    return function_1.flow(me, TE.left);
};
exports.leftReader = leftReader;
/**
 * @category constructors
 * @since 2.5.0
 */
var rightReaderTask = function (ma) {
    return function_1.flow(ma, TE.rightTask);
};
exports.rightReaderTask = rightReaderTask;
/**
 * @category constructors
 * @since 2.5.0
 */
var leftReaderTask = function (me) {
    return function_1.flow(me, TE.leftTask);
};
exports.leftReaderTask = leftReaderTask;
/**
 * @category constructors
 * @since 2.0.0
 */
exports.fromIOEither = 
/*#__PURE__*/
function_1.flow(TE.fromIOEither, exports.fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
var fromReaderEither = function (ma) {
    return function_1.flow(ma, TE.fromEither);
};
exports.fromReaderEither = fromReaderEither;
/**
 * @category constructors
 * @since 2.0.0
 */
exports.rightIO = 
/*#__PURE__*/
function_1.flow(TE.rightIO, exports.fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.leftIO = 
/*#__PURE__*/
function_1.flow(TE.leftIO, exports.fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
var ask = function () { return TE.right; };
exports.ask = ask;
/**
 * @category constructors
 * @since 2.0.0
 */
var asks = function (f) {
    return function_1.flow(TE.right, TE.map(f));
};
exports.asks = asks;
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
var fromOption = function (onNone) { return function (ma) { return (ma._tag === 'None' ? exports.left(onNone()) : exports.right(ma.value)); }; };
exports.fromOption = fromOption;
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? exports.right(a) : exports.left(onFalse(a))); }; };
exports.fromPredicate = fromPredicate;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.0.0
 */
function fold(onLeft, onRight) {
    return function (ma) { return function (r) {
        return function_1.pipe(ma(r), TE.fold(function (e) { return onLeft(e)(r); }, function (a) { return onRight(a)(r); }));
    }; };
}
exports.fold = fold;
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
var getOrElseW = function (onLeft) { return function (ma) { return function (r) {
    return TE.getOrElseW(function (e) { return onLeft(e)(r); })(ma(r));
}; }; };
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
 * @category combinators
 * @since 2.0.0
 */
function orElse(onLeft) {
    return function (ma) { return function (r) { return TE.orElse(function (e) { return onLeft(e)(r); })(ma(r)); }; };
}
exports.orElse = orElse;
/**
 * @category combinators
 * @since 2.0.0
 */
var swap = function (ma) { return function_1.flow(ma, TE.swap); };
exports.swap = swap;
// TODO: remove in v3
/**
 * @category combinators
 * @since 2.0.0
 */
exports.local = R.local;
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
/**
 * @category combinators
 * @since 2.4.0
 */
function fromTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromTaskEither(f.apply(void 0, a));
    };
}
exports.fromTaskEitherK = fromTaskEitherK;
/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
var chainTaskEitherKW = function (f) { return exports.chainW(fromTaskEitherK(f)); };
exports.chainTaskEitherKW = chainTaskEitherKW;
/**
 * @category combinators
 * @since 2.4.0
 */
exports.chainTaskEitherK = exports.chainTaskEitherKW;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
var apPar_ = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
var apSeq_ = function (fab, fa) {
    return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
};
/* istanbul ignore next */
var chain_ = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var alt_ = function (fa, that) { return function_1.pipe(fa, exports.alt(that)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return function_1.pipe(fa, exports.bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return function_1.pipe(fa, exports.mapLeft(f)); };
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
var map = function (f) { return function (fa) { return function_1.flow(fa, TE.map(f)); }; };
exports.map = map;
/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var bimap = function (f, g) { return function (fa) { return function (r) {
    return function_1.pipe(fa(r), TE.bimap(f, g));
}; }; };
exports.bimap = bimap;
/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var mapLeft = function (f) { return function (fa) { return function (r) { return function_1.pipe(fa(r), TE.mapLeft(f)); }; }; };
exports.mapLeft = mapLeft;
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
var apW = function (fa) { return function (fab) { return function (r) { return function_1.pipe(fab(r), TE.apW(fa(r))); }; }; };
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
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.7.0
 */
exports.of = exports.right;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
var chainW = function (f) { return function (fa) { return function (r) {
    return function_1.pipe(fa(r), TE.chainW(function (a) { return f(a)(r); }));
}; }; };
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
var altW = function (that) { return function (fa) { return function (r) {
    return function_1.pipe(fa(r), TE.altW(function () { return that()(r); }));
}; }; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
exports.alt = exports.altW;
/**
 * @category MonadIO
 * @since 2.0.0
 */
exports.fromIO = exports.rightIO;
/**
 * @category MonadTask
 * @since 2.0.0
 */
exports.fromTask = exports.rightTask;
/**
 * @category MonadThrow
 * @since 2.0.0
 */
exports.throwError = exports.left;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'ReaderTaskEither';
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
function getSemigroup(S) {
    return R.getSemigroup(TE.getSemigroup(S));
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
    return R.getSemigroup(TE.getApplySemigroup(S));
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
function getApplicativeReaderTaskValidation(A, SE) {
    var AV = TE.getApplicativeTaskValidation(A, SE);
    var ap = function (fga) {
        return function_1.flow(R.map(function (gab) { return function (ga) { return AV.ap(gab, ga); }; }), R.ap(fga));
    };
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return function_1.pipe(fab, ap(fa)); },
        of: exports.of
    };
}
exports.getApplicativeReaderTaskValidation = getApplicativeReaderTaskValidation;
/**
 * @category instances
 * @since 2.7.0
 */
function getAltReaderTaskValidation(SE) {
    var A = TE.getAltTaskValidation(SE);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        alt: function (me, that) { return function (r) { return A.alt(me(r), function () { return that()(r); }); }; }
    };
}
exports.getAltReaderTaskValidation = getAltReaderTaskValidation;
// TODO: remove in v3
/**
 * @category instances
 * @since 2.3.0
 */
function getReaderTaskValidation(SE) {
    var applicativeReaderTaskValidation = getApplicativeReaderTaskValidation(T.ApplicativePar, SE);
    var altReaderTaskValidation = getAltReaderTaskValidation(SE);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        of: exports.of,
        chain: chain_,
        bimap: bimap_,
        mapLeft: mapLeft_,
        ap: applicativeReaderTaskValidation.ap,
        alt: altReaderTaskValidation.alt,
        fromIO: exports.fromIO,
        fromTask: exports.fromTask,
        throwError: exports.throwError
    };
}
exports.getReaderTaskValidation = getReaderTaskValidation;
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
exports.readerTaskEither = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: apPar_,
    chain: chain_,
    alt: alt_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask,
    throwError: exports.throwError
};
// TODO: remove in v3
/**
 * Like `readerTaskEither` but `ap` is sequential
 *
 * @category instances
 * @since 2.0.0
 */
exports.readerTaskEitherSeq = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: apSeq_,
    chain: chain_,
    alt: alt_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask,
    throwError: exports.throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
// TODO: remove in v3
/**
 * @since 2.0.0
 */
/* istanbul ignore next */
function run(ma, r) {
    return ma(r)();
}
exports.run = run;
/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * Derivable from `MonadThrow`.
 *
 * @since 2.0.4
 */
function bracket(aquire, use, release) {
    return function (r) {
        return TE.bracket(aquire(r), function (a) { return use(a)(r); }, function (a, e) { return release(a, e)(r); });
    };
}
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
var bindTo = function (name) { return exports.map(function_1.bindTo_(name)); };
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
var traverseArrayWithIndex = function (f) { return function (arr) { return function (r) { return function () {
    return Promise.all(arr.map(function (x, i) { return f(i, x)(r)(); })).then(E.sequenceArray);
}; }; }; };
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
/**
 * @since 2.9.0
 */
var traverseSeqArrayWithIndex = function (f) { return function (arr) { return function (r) { return function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, i, b;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < arr.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, f(i, arr[i])(r)()];
            case 2:
                b = _a.sent();
                if (E.isLeft(b)) {
                    return [2 /*return*/, b];
                }
                result.push(b.right);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, E.right(result)];
        }
    });
}); }; }; }; };
exports.traverseSeqArrayWithIndex = traverseSeqArrayWithIndex;
/**
 * @since 2.9.0
 */
var traverseSeqArray = function (f) {
    return exports.traverseSeqArrayWithIndex(function (_, a) { return f(a); });
};
exports.traverseSeqArray = traverseSeqArray;
/**
 * @since 2.9.0
 */
exports.sequenceSeqArray = exports.traverseSeqArray(function_1.identity);
