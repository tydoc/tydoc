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
import * as RTE from './ReaderTaskEither';
/* tslint:enable:readonly-array */
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
export var left = function (e) { return function () { return RTE.left(e); }; };
/**
 * @category constructors
 * @since 2.0.0
 */
export var right = function (a) { return function (s) {
    return RTE.right([a, s]);
}; };
/**
 * @category constructors
 * @since 2.0.0
 */
export function rightTask(ma) {
    return fromReaderTaskEither(RTE.rightTask(ma));
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function leftTask(me) {
    return fromReaderTaskEither(RTE.leftTask(me));
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function fromTaskEither(ma) {
    return fromReaderTaskEither(RTE.fromTaskEither(ma));
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function rightReader(ma) {
    return fromReaderTaskEither(RTE.rightReader(ma));
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function leftReader(me) {
    return fromReaderTaskEither(RTE.leftReader(me));
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function fromIOEither(ma) {
    return fromReaderTaskEither(RTE.fromIOEither(ma));
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function fromReaderEither(ma) {
    return fromReaderTaskEither(RTE.fromReaderEither(ma));
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function rightIO(ma) {
    return fromReaderTaskEither(RTE.rightIO(ma));
}
/**
 * @category constructors
 * @since 2.0.0
 */
export function leftIO(me) {
    return fromReaderTaskEither(RTE.leftIO(me));
}
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightState = function (sa) {
    return flow(sa, RTE.right);
};
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftState = function (me) { return function (s) { return RTE.left(me(s)[0]); }; };
/**
 * @category constructors
 * @since 2.0.0
 */
export var fromReaderTaskEither = function (fa) { return function (s) {
    return pipe(fa, RTE.map(function (a) { return [a, s]; }));
}; };
/**
 * Get the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export var get = function () { return function (s) { return RTE.right([s, s]); }; };
/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
export var put = function (s) { return function () {
    return RTE.right([undefined, s]);
}; };
/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export var modify = function (f) { return function (s) {
    return RTE.right([undefined, f(s)]);
}; };
/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export var gets = function (f) { return function (s) {
    return RTE.right([f(s), s]);
}; };
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromEither = 
/*#__PURE__*/
E.fold(function (e) { return left(e); }, right);
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
 * @since 2.4.4
 */
export var fromPredicate = function (predicate, onFalse) { return function (a) {
    return predicate(a) ? right(a) : left(onFalse(a));
}; };
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
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
export var chainEitherKW = function (f) { return function (ma) { return pipe(ma, chainW(fromEitherK(f))); }; };
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
export var chainIOEitherKW = function (f) { return function (ma) { return pipe(ma, chainW(fromIOEitherK(f))); }; };
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
export var chainTaskEitherKW = function (f) { return function (ma) { return pipe(ma, chainW(fromTaskEitherK(f))); }; };
/**
 * @category combinators
 * @since 2.4.0
 */
export var chainTaskEitherK = chainTaskEitherKW;
/**
 * @category combinators
 * @since 2.4.0
 */
export function fromReaderTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromReaderTaskEither(f.apply(void 0, a));
    };
}
/**
 * Less strict version of [`chainReaderTaskEitherK`](#chainReaderTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export var chainReaderTaskEitherKW = function (f) { return function (ma) { return pipe(ma, chainW(fromReaderTaskEitherK(f))); }; };
/**
 * @category combinators
 * @since 2.4.0
 */
export var chainReaderTaskEitherK = chainReaderTaskEitherKW;
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
 * @since 2.4.4
 */
export var filterOrElse = filterOrElseW;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var ap_ = function (fab, fa) { return pipe(fab, ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return pipe(ma, chain(f)); };
/* istanbul ignore next */
var alt_ = function (fa, that) { return function (s) {
    return pipe(fa(s), RTE.alt(function () { return that()(s); }));
}; };
var bimap_ = function (fea, f, g) { return function (s) {
    return pipe(fea(s), RTE.bimap(f, function (_a) {
        var a = _a[0], s = _a[1];
        return [g(a), s];
    }));
}; };
var mapLeft_ = function (fea, f) { return function (s) { return pipe(fea(s), RTE.mapLeft(f)); }; };
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
export var map = function (f) { return function (fa) { return function (s1) {
    return pipe(fa(s1), RTE.map(function (_a) {
        var a = _a[0], s2 = _a[1];
        return [f(a), s2];
    }));
}; }; };
/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export var bimap = function (f, g) { return function (fa) {
    return bimap_(fa, f, g);
}; };
/**
 * Map a function over the third type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export var mapLeft = function (f) { return function (fa) {
    return mapLeft_(fa, f);
}; };
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export var apW = function (fa) { return function (fab) { return function (s1) {
    return pipe(fab(s1), RTE.chainW(function (_a) {
        var f = _a[0], s2 = _a[1];
        return pipe(fa(s2), RTE.map(function (_a) {
            var a = _a[0], s3 = _a[1];
            return [f(a), s3];
        }));
    }));
}; }; };
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
export var chainW = function (f) { return function (ma) { return function (s1) {
    return pipe(ma(s1), RTE.chainW(function (_a) {
        var a = _a[0], s2 = _a[1];
        return f(a)(s2);
    }));
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
    return pipe(fa(r), RTE.altW(function () { return that()(r); }));
}; }; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export var alt = altW;
/**
 * @category MonadIO
 * @since 2.7.0
 */
export var fromIO = rightIO;
/**
 * @category MonadTask
 * @since 2.7.0
 */
export var fromTask = rightTask;
/**
 * @category MonadThrow
 * @since 2.7.0
 */
export var throwError = left;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'StateReaderTaskEither';
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
export var Applicative = {
    URI: URI,
    map: map_,
    ap: ap_,
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
export var stateReaderTaskEither = {
    URI: URI,
    map: map_,
    of: of,
    ap: ap_,
    chain: chain_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    alt: alt_,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export var stateReaderTaskEitherSeq = {
    URI: URI,
    map: map_,
    of: of,
    ap: ap_,
    chain: chain_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    alt: alt_,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
// TODO: remove in v3
/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
/* istanbul ignore next */
export function run(ma, s, r) {
    return ma(s)(r)();
}
/* tslint:enable:readonly-array */
/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
export var evalState = function (fsa, s) {
    return pipe(fsa(s), RTE.map(function (_a) {
        var a = _a[0];
        return a;
    }));
};
/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
export var execState = function (fsa, s) {
    return pipe(fsa(s), RTE.map(function (_a) {
        var _ = _a[0], s = _a[1];
        return s;
    }));
};
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.8.0
 */
export var evaluate = function (s) { return function (ma) {
    return pipe(ma(s), RTE.map(function (_a) {
        var a = _a[0];
        return a;
    }));
}; };
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.8.0
 */
export var execute = function (s) { return function (ma) {
    return pipe(ma(s), RTE.map(function (_a) {
        var _ = _a[0], s = _a[1];
        return s;
    }));
}; };
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
export var bindTo = function (name) {
    return map(bindTo_(name));
};
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
export var traverseArrayWithIndex = function (f) { return function (arr) { return function (s) { return function (r) { return function () { return __awaiter(void 0, void 0, void 0, function () {
    var lastState, result, i, b, _a, newValue, newState;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                lastState = s;
                result = [];
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < arr.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, f(i, arr[i])(lastState)(r)()];
            case 2:
                b = _b.sent();
                if (E.isLeft(b)) {
                    return [2 /*return*/, b];
                }
                _a = b.right, newValue = _a[0], newState = _a[1];
                result.push(newValue);
                lastState = newState;
                _b.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, E.right([result, lastState])];
        }
    });
}); }; }; }; }; };
/**
 * @since 2.9.0
 */
export var traverseArray = function (f) {
    return traverseArrayWithIndex(function (_, a) { return f(a); });
};
/**
 * @since 2.9.0
 */
export var sequenceArray = traverseArray(identity);
