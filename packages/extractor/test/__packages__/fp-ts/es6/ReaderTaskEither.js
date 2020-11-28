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
import * as E from './Either';
import { bindTo_, bind_, flow, identity, pipe } from './function';
import * as R from './Reader';
import * as T from './Task';
import * as TE from './TaskEither';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
export var fromTaskEither = 
/*#__PURE__*/
R.of;
/**
 * @category constructors
 * @since 2.0.0
 */
export var left = 
/*#__PURE__*/
flow(TE.left, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var right = 
/*#__PURE__*/
flow(TE.right, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightTask = 
/*#__PURE__*/
flow(TE.rightTask, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftTask = 
/*#__PURE__*/
flow(TE.leftTask, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightReader = function (ma) {
    return flow(ma, TE.right);
};
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftReader = function (me) {
    return flow(me, TE.left);
};
/**
 * @category constructors
 * @since 2.5.0
 */
export var rightReaderTask = function (ma) {
    return flow(ma, TE.rightTask);
};
/**
 * @category constructors
 * @since 2.5.0
 */
export var leftReaderTask = function (me) {
    return flow(me, TE.leftTask);
};
/**
 * @category constructors
 * @since 2.0.0
 */
export var fromIOEither = 
/*#__PURE__*/
flow(TE.fromIOEither, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var fromReaderEither = function (ma) {
    return flow(ma, TE.fromEither);
};
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightIO = 
/*#__PURE__*/
flow(TE.rightIO, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftIO = 
/*#__PURE__*/
flow(TE.leftIO, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var ask = function () { return TE.right; };
/**
 * @category constructors
 * @since 2.0.0
 */
export var asks = function (f) {
    return flow(TE.right, TE.map(f));
};
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromEither = 
/*#__PURE__*/
E.fold(left, function (a) { return right(a); });
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromOption = function (onNone) { return function (ma) { return (ma._tag === 'None' ? left(onNone()) : right(ma.value)); }; };
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }; };
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 2.0.0
 */
export function fold(onLeft, onRight) {
    return function (ma) { return function (r) {
        return pipe(ma(r), TE.fold(function (e) { return onLeft(e)(r); }, function (a) { return onRight(a)(r); }));
    }; };
}
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export var getOrElseW = function (onLeft) { return function (ma) { return function (r) {
    return TE.getOrElseW(function (e) { return onLeft(e)(r); })(ma(r));
}; }; };
/**
 * @category destructors
 * @since 2.0.0
 */
export var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.0.0
 */
export function orElse(onLeft) {
    return function (ma) { return function (r) { return TE.orElse(function (e) { return onLeft(e)(r); })(ma(r)); }; };
}
/**
 * @category combinators
 * @since 2.0.0
 */
export var swap = function (ma) { return flow(ma, TE.swap); };
// TODO: remove in v3
/**
 * @category combinators
 * @since 2.0.0
 */
export var local = R.local;
/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
export var filterOrElseW = function (predicate, onFalse) {
    return chainW(function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); });
};
/**
 * Derivable from `MonadThrow`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var filterOrElse = filterOrElseW;
/**
 * @category combinators
 * @since 2.4.0
 */
export function fromEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromEither(f.apply(void 0, a));
    };
}
/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export var chainEitherKW = function (f) { return chainW(fromEitherK(f)); };
/**
 * @category combinators
 * @since 2.4.0
 */
export var chainEitherK = chainEitherKW;
/**
 * @category combinators
 * @since 2.4.0
 */
export function fromIOEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIOEither(f.apply(void 0, a));
    };
}
/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export var chainIOEitherKW = function (f) { return chainW(fromIOEitherK(f)); };
/**
 * @category combinators
 * @since 2.4.0
 */
export var chainIOEitherK = chainIOEitherKW;
/**
 * @category combinators
 * @since 2.4.0
 */
export function fromTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromTaskEither(f.apply(void 0, a));
    };
}
/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export var chainTaskEitherKW = function (f) { return chainW(fromTaskEitherK(f)); };
/**
 * @category combinators
 * @since 2.4.0
 */
export var chainTaskEitherK = chainTaskEitherKW;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return pipe(fa, map(f)); };
var apPar_ = function (fab, fa) { return pipe(fab, ap(fa)); };
var apSeq_ = function (fab, fa) {
    return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
};
/* istanbul ignore next */
var chain_ = function (ma, f) { return pipe(ma, chain(f)); };
/* istanbul ignore next */
var alt_ = function (fa, that) { return pipe(fa, alt(that)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return pipe(fa, mapLeft(f)); };
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
export var map = function (f) { return function (fa) { return flow(fa, TE.map(f)); }; };
/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export var bimap = function (f, g) { return function (fa) { return function (r) {
    return pipe(fa(r), TE.bimap(f, g));
}; }; };
/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export var mapLeft = function (f) { return function (fa) { return function (r) { return pipe(fa(r), TE.mapLeft(f)); }; }; };
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export var apW = function (fa) { return function (fab) { return function (r) { return pipe(fab(r), TE.apW(fa(r))); }; }; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = apW;
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
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.7.0
 */
export var of = right;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export var chainW = function (f) { return function (fa) { return function (r) {
    return pipe(fa(r), TE.chainW(function (a) { return f(a)(r); }));
}; }; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = chainW;
/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export var chainFirstW = function (f) {
    return chainW(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var chainFirst = chainFirstW;
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
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export var altW = function (that) { return function (fa) { return function (r) {
    return pipe(fa(r), TE.altW(function () { return that()(r); }));
}; }; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export var alt = altW;
/**
 * @category MonadIO
 * @since 2.0.0
 */
export var fromIO = rightIO;
/**
 * @category MonadTask
 * @since 2.0.0
 */
export var fromTask = rightTask;
/**
 * @category MonadThrow
 * @since 2.0.0
 */
export var throwError = left;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'ReaderTaskEither';
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return R.getSemigroup(TE.getSemigroup(S));
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return R.getSemigroup(TE.getApplySemigroup(S));
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: right(M.empty)
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicativeReaderTaskValidation(A, SE) {
    var AV = TE.getApplicativeTaskValidation(A, SE);
    var ap = function (fga) {
        return flow(R.map(function (gab) { return function (ga) { return AV.ap(gab, ga); }; }), R.ap(fga));
    };
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return pipe(fab, ap(fa)); },
        of: of
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export function getAltReaderTaskValidation(SE) {
    var A = TE.getAltTaskValidation(SE);
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        alt: function (me, that) { return function (r) { return A.alt(me(r), function () { return that()(r); }); }; }
    };
}
// TODO: remove in v3
/**
 * @category instances
 * @since 2.3.0
 */
export function getReaderTaskValidation(SE) {
    var applicativeReaderTaskValidation = getApplicativeReaderTaskValidation(T.ApplicativePar, SE);
    var altReaderTaskValidation = getAltReaderTaskValidation(SE);
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        of: of,
        chain: chain_,
        bimap: bimap_,
        mapLeft: mapLeft_,
        ap: applicativeReaderTaskValidation.ap,
        alt: altReaderTaskValidation.alt,
        fromIO: fromIO,
        fromTask: fromTask,
        throwError: throwError
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
 * @category instances
 * @since 2.7.0
 */
export var Bifunctor = {
    URI: URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Alt = {
    URI: URI,
    map: map_,
    alt: alt_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var readerTaskEither = {
    URI: URI,
    map: map_,
    of: of,
    ap: apPar_,
    chain: chain_,
    alt: alt_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};
// TODO: remove in v3
/**
 * Like `readerTaskEither` but `ap` is sequential
 *
 * @category instances
 * @since 2.0.0
 */
export var readerTaskEitherSeq = {
    URI: URI,
    map: map_,
    of: of,
    ap: apSeq_,
    chain: chain_,
    alt: alt_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
// TODO: remove in v3
/**
 * @since 2.0.0
 */
/* istanbul ignore next */
export function run(ma, r) {
    return ma(r)();
}
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
export function bracket(aquire, use, release) {
    return function (r) {
        return TE.bracket(aquire(r), function (a) { return use(a)(r); }, function (a, e) { return release(a, e)(r); });
    };
}
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
export var bindW = function (name, f) {
    return chainW(function (a) {
        return pipe(f(a), map(function (b) { return bind_(a, name, b); }));
    });
};
/**
 * @since 2.8.0
 */
export var bind = bindW;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
export var apSW = function (name, fb) {
    return flow(map(function (a) { return function (b) { return bind_(a, name, b); }; }), apW(fb));
};
/**
 * @since 2.8.0
 */
export var apS = apSW;
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
export var traverseArrayWithIndex = function (f) { return function (arr) { return function (r) { return function () {
    return Promise.all(arr.map(function (x, i) { return f(i, x)(r)(); })).then(E.sequenceArray);
}; }; }; };
/**
 * @since 2.9.0
 */
export var traverseArray = function (f) { return traverseArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * @since 2.9.0
 */
export var sequenceArray = traverseArray(identity);
/**
 * @since 2.9.0
 */
export var traverseSeqArrayWithIndex = function (f) { return function (arr) { return function (r) { return function () { return __awaiter(void 0, void 0, void 0, function () {
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
/**
 * @since 2.9.0
 */
export var traverseSeqArray = function (f) {
    return traverseSeqArrayWithIndex(function (_, a) { return f(a); });
};
/**
 * @since 2.9.0
 */
export var sequenceSeqArray = traverseSeqArray(identity);
