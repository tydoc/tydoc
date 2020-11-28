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
exports.Alt = exports.Monad = exports.Applicative = exports.ApplicativeSeq = exports.ApplicativePar = exports.Bifunctor = exports.Functor = exports.getFilterable = exports.getIOValidation = exports.getAltIOValidation = exports.getApplicativeIOValidation = exports.getApplyMonoid = exports.getApplySemigroup = exports.getSemigroup = exports.URI = exports.throwError = exports.fromIO = exports.alt = exports.altW = exports.flatten = exports.chainFirst = exports.chainFirstW = exports.chain = exports.chainW = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.apW = exports.mapLeft = exports.bimap = exports.map = exports.chainEitherK = exports.chainEitherKW = exports.fromEitherK = exports.filterOrElse = exports.filterOrElseW = exports.swap = exports.orElse = exports.getOrElse = exports.getOrElseW = exports.fold = exports.tryCatch = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.leftIO = exports.rightIO = exports.right = exports.left = void 0;
exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.apS = exports.apSW = exports.bind = exports.bindW = exports.bindTo = exports.Do = exports.bracket = exports.ioEither = exports.MonadThrow = exports.MonadIO = void 0;
var E = __importStar(require("./Either"));
var Filterable_1 = require("./Filterable");
var function_1 = require("./function");
var I = __importStar(require("./IO"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
exports.left = 
/*#__PURE__*/
function_1.flow(E.left, I.of);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.right = 
/*#__PURE__*/
function_1.flow(E.right, I.of);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.rightIO = 
/*#__PURE__*/
I.map(E.right);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.leftIO = 
/*#__PURE__*/
I.map(E.left);
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
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @category constructors
 * @since 2.0.0
 */
function tryCatch(f, onError) {
    return function () { return E.tryCatch(f, onError); };
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
function_1.flow(E.fold, I.chain);
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
var getOrElseW = function (onLeft) { return function (ma) {
    return function_1.pipe(ma, I.chain(E.fold(onLeft, I.of)));
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
 * @category combinators
 * @since 2.0.0
 */
var orElse = function (f) {
    return I.chain(E.fold(f, exports.right));
};
exports.orElse = orElse;
/**
 * @category combinators
 * @since 2.0.0
 */
exports.swap = 
/*#__PURE__*/
I.map(E.swap);
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
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var ap_ = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
var apSeq_ = function (fab, fa) {
    return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
};
/* istanbul ignore next */
var chain_ = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var bimap_ = function (fa, f, g) { return function_1.pipe(fa, exports.bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fa, f) { return function_1.pipe(fa, exports.mapLeft(f)); };
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
var map = function (f) { return I.map(E.map(f)); };
exports.map = map;
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
exports.bimap = 
/*#__PURE__*/
function_1.flow(E.bimap, I.map);
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var mapLeft = function (f) { return I.map(E.mapLeft(f)); };
exports.mapLeft = mapLeft;
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
var apW = function (fa) {
    return function_1.flow(I.map(function (gab) { return function (ga) { return E.apW(ga)(gab); }; }), I.ap(fa));
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
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.8.5
 */
exports.of = exports.right;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
var chainW = function (f) { return function (ma) {
    return function_1.pipe(ma, I.chain(E.fold(exports.left, f)));
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
var altW = function (that) { return function (fa) {
    return function_1.pipe(fa, I.chain(E.fold(that, exports.right)));
}; };
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
 * @since 2.7.0
 */
exports.fromIO = exports.rightIO;
/**
 * @category MonadThrow
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
exports.URI = 'IOEither';
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
function getSemigroup(S) {
    return I.getSemigroup(E.getSemigroup(S));
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
    return I.getSemigroup(E.getApplySemigroup(S));
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
function getApplicativeIOValidation(SE) {
    var AV = E.getApplicativeValidation(SE);
    var ap = function (fga) {
        return function_1.flow(I.map(function (gab) { return function (ga) { return AV.ap(gab, ga); }; }), I.ap(fga));
    };
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return function_1.pipe(fab, ap(fa)); },
        of: exports.of
    };
}
exports.getApplicativeIOValidation = getApplicativeIOValidation;
/**
 * @category instances
 * @since 2.7.0
 */
function getAltIOValidation(SE) {
    var A = E.getAltValidation(SE);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        alt: function (me, that) { return function () { return A.alt(me(), function () { return that()(); }); }; }
    };
}
exports.getAltIOValidation = getAltIOValidation;
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
function getIOValidation(SE) {
    var applicativeIOValidation = getApplicativeIOValidation(SE);
    var altIOValidation = getAltIOValidation(SE);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: applicativeIOValidation.ap,
        of: exports.of,
        chain: chain_,
        bimap: bimap_,
        mapLeft: mapLeft_,
        alt: altIOValidation.alt,
        fromIO: exports.fromIO,
        throwError: exports.throwError
    };
}
exports.getIOValidation = getIOValidation;
/**
 * @category instances
 * @since 2.1.0
 */
function getFilterable(M) {
    var W = E.getWitherable(M);
    var F = Filterable_1.getFilterableComposition(I.Monad, W);
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
exports.Bifunctor = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 2.8.4
 */
exports.ApplicativePar = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of
};
/**
 * @category instances
 * @since 2.8.4
 */
exports.ApplicativeSeq = {
    URI: exports.URI,
    map: map_,
    ap: apSeq_,
    of: exports.of
};
/**
 * Use `ApplicativePar` instead
 *
 * @since 2.7.0
 * @category instances
 * @deprecated
 */
exports.Applicative = exports.ApplicativePar;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_
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
/**
 * @category instances
 * @since 2.7.0
 */
exports.MonadIO = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_,
    fromIO: exports.fromIO
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.MonadThrow = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_,
    throwError: exports.throwError
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.ioEither = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    alt: alt_,
    fromIO: exports.fromIO,
    throwError: exports.throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
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
        return function_1.pipe(function_1.pipe(use(a), I.map(E.right)), exports.chain(function (e) {
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
var traverseArrayWithIndex = function (f) {
    return function_1.flow(I.traverseArrayWithIndex(f), I.map(E.sequenceArray));
};
exports.traverseArrayWithIndex = traverseArrayWithIndex;
/**
 * @since 2.9.0
 */
var traverseArray = function (f) { return exports.traverseArrayWithIndex(function (_, a) { return f(a); }); };
exports.traverseArray = traverseArray;
/**
 *
 * @since 2.9.0
 */
exports.sequenceArray = exports.traverseArray(function_1.identity);
/**
 * @since 2.9.0
 */
var traverseSeqArrayWithIndex = function (f) { return function (arr) { return function () {
    // tslint:disable-next-line: readonly-array
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var b = f(i, arr[i])();
        if (E.isLeft(b)) {
            return b;
        }
        result.push(b.right);
    }
    return E.right(result);
}; }; };
exports.traverseSeqArrayWithIndex = traverseSeqArrayWithIndex;
/**
 * @since 2.9.0
 */
var traverseSeqArray = function (f) { return exports.traverseSeqArrayWithIndex(function (_, a) { return f(a); }); };
exports.traverseSeqArray = traverseSeqArray;
/**
 * @since 2.9.0
 */
exports.sequenceSeqArray = exports.traverseSeqArray(function_1.identity);
