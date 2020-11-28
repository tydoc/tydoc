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
exports.alt = exports.altW = exports.flatten = exports.chainFirst = exports.chainFirstW = exports.chain = exports.chainW = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.apW = exports.mapLeft = exports.bimap = exports.map = exports.filterOrElse = exports.filterOrElseW = exports.chainReaderTaskEitherK = exports.chainReaderTaskEitherKW = exports.fromReaderTaskEitherK = exports.chainTaskEitherK = exports.chainTaskEitherKW = exports.fromTaskEitherK = exports.chainIOEitherK = exports.chainIOEitherKW = exports.fromIOEitherK = exports.chainEitherK = exports.chainEitherKW = exports.fromEitherK = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.gets = exports.modify = exports.put = exports.get = exports.fromReaderTaskEither = exports.leftState = exports.rightState = exports.leftIO = exports.rightIO = exports.fromReaderEither = exports.fromIOEither = exports.leftReader = exports.rightReader = exports.fromTaskEither = exports.leftTask = exports.rightTask = exports.right = exports.left = void 0;
exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.apS = exports.apSW = exports.bind = exports.bindW = exports.bindTo = exports.execute = exports.evaluate = exports.execState = exports.evalState = exports.run = exports.stateReaderTaskEitherSeq = exports.stateReaderTaskEither = exports.Alt = exports.Bifunctor = exports.Applicative = exports.Functor = exports.URI = exports.throwError = exports.fromTask = exports.fromIO = void 0;
var E = __importStar(require("./Either"));
var function_1 = require("./function");
var RTE = __importStar(require("./ReaderTaskEither"));
/* tslint:enable:readonly-array */
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var left = function (e) { return function () { return RTE.left(e); }; };
exports.left = left;
/**
 * @category constructors
 * @since 2.0.0
 */
var right = function (a) { return function (s) {
    return RTE.right([a, s]);
}; };
exports.right = right;
/**
 * @category constructors
 * @since 2.0.0
 */
function rightTask(ma) {
    return exports.fromReaderTaskEither(RTE.rightTask(ma));
}
exports.rightTask = rightTask;
/**
 * @category constructors
 * @since 2.0.0
 */
function leftTask(me) {
    return exports.fromReaderTaskEither(RTE.leftTask(me));
}
exports.leftTask = leftTask;
/**
 * @category constructors
 * @since 2.0.0
 */
function fromTaskEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromTaskEither(ma));
}
exports.fromTaskEither = fromTaskEither;
/**
 * @category constructors
 * @since 2.0.0
 */
function rightReader(ma) {
    return exports.fromReaderTaskEither(RTE.rightReader(ma));
}
exports.rightReader = rightReader;
/**
 * @category constructors
 * @since 2.0.0
 */
function leftReader(me) {
    return exports.fromReaderTaskEither(RTE.leftReader(me));
}
exports.leftReader = leftReader;
/**
 * @category constructors
 * @since 2.0.0
 */
function fromIOEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromIOEither(ma));
}
exports.fromIOEither = fromIOEither;
/**
 * @category constructors
 * @since 2.0.0
 */
function fromReaderEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromReaderEither(ma));
}
exports.fromReaderEither = fromReaderEither;
/**
 * @category constructors
 * @since 2.0.0
 */
function rightIO(ma) {
    return exports.fromReaderTaskEither(RTE.rightIO(ma));
}
exports.rightIO = rightIO;
/**
 * @category constructors
 * @since 2.0.0
 */
function leftIO(me) {
    return exports.fromReaderTaskEither(RTE.leftIO(me));
}
exports.leftIO = leftIO;
/**
 * @category constructors
 * @since 2.0.0
 */
var rightState = function (sa) {
    return function_1.flow(sa, RTE.right);
};
exports.rightState = rightState;
/**
 * @category constructors
 * @since 2.0.0
 */
var leftState = function (me) { return function (s) { return RTE.left(me(s)[0]); }; };
exports.leftState = leftState;
/**
 * @category constructors
 * @since 2.0.0
 */
var fromReaderTaskEither = function (fa) { return function (s) {
    return function_1.pipe(fa, RTE.map(function (a) { return [a, s]; }));
}; };
exports.fromReaderTaskEither = fromReaderTaskEither;
/**
 * Get the current state
 *
 * @category constructors
 * @since 2.0.0
 */
var get = function () { return function (s) { return RTE.right([s, s]); }; };
exports.get = get;
/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
var put = function (s) { return function () {
    return RTE.right([undefined, s]);
}; };
exports.put = put;
/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
var modify = function (f) { return function (s) {
    return RTE.right([undefined, f(s)]);
}; };
exports.modify = modify;
/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
var gets = function (f) { return function (s) {
    return RTE.right([f(s), s]);
}; };
exports.gets = gets;
/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
exports.fromEither = 
/*#__PURE__*/
E.fold(function (e) { return exports.left(e); }, exports.right);
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
 * @since 2.4.4
 */
var fromPredicate = function (predicate, onFalse) { return function (a) {
    return predicate(a) ? exports.right(a) : exports.left(onFalse(a));
}; };
exports.fromPredicate = fromPredicate;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
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
var chainEitherKW = function (f) { return function (ma) { return function_1.pipe(ma, exports.chainW(fromEitherK(f))); }; };
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
        return fromIOEither(f.apply(void 0, a));
    };
}
exports.fromIOEitherK = fromIOEitherK;
/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
var chainIOEitherKW = function (f) { return function (ma) { return function_1.pipe(ma, exports.chainW(fromIOEitherK(f))); }; };
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
        return fromTaskEither(f.apply(void 0, a));
    };
}
exports.fromTaskEitherK = fromTaskEitherK;
/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
var chainTaskEitherKW = function (f) { return function (ma) { return function_1.pipe(ma, exports.chainW(fromTaskEitherK(f))); }; };
exports.chainTaskEitherKW = chainTaskEitherKW;
/**
 * @category combinators
 * @since 2.4.0
 */
exports.chainTaskEitherK = exports.chainTaskEitherKW;
/**
 * @category combinators
 * @since 2.4.0
 */
function fromReaderTaskEitherK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromReaderTaskEither(f.apply(void 0, a));
    };
}
exports.fromReaderTaskEitherK = fromReaderTaskEitherK;
/**
 * Less strict version of [`chainReaderTaskEitherK`](#chainReaderTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
var chainReaderTaskEitherKW = function (f) { return function (ma) { return function_1.pipe(ma, exports.chainW(fromReaderTaskEitherK(f))); }; };
exports.chainReaderTaskEitherKW = chainReaderTaskEitherKW;
/**
 * @category combinators
 * @since 2.4.0
 */
exports.chainReaderTaskEitherK = exports.chainReaderTaskEitherKW;
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
 * @since 2.4.4
 */
exports.filterOrElse = exports.filterOrElseW;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var ap_ = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var alt_ = function (fa, that) { return function (s) {
    return function_1.pipe(fa(s), RTE.alt(function () { return that()(s); }));
}; };
var bimap_ = function (fea, f, g) { return function (s) {
    return function_1.pipe(fea(s), RTE.bimap(f, function (_a) {
        var a = _a[0], s = _a[1];
        return [g(a), s];
    }));
}; };
var mapLeft_ = function (fea, f) { return function (s) { return function_1.pipe(fea(s), RTE.mapLeft(f)); }; };
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
var map = function (f) { return function (fa) { return function (s1) {
    return function_1.pipe(fa(s1), RTE.map(function (_a) {
        var a = _a[0], s2 = _a[1];
        return [f(a), s2];
    }));
}; }; };
exports.map = map;
/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
var bimap = function (f, g) { return function (fa) {
    return bimap_(fa, f, g);
}; };
exports.bimap = bimap;
/**
 * Map a function over the third type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
var mapLeft = function (f) { return function (fa) {
    return mapLeft_(fa, f);
}; };
exports.mapLeft = mapLeft;
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
var apW = function (fa) { return function (fab) { return function (s1) {
    return function_1.pipe(fab(s1), RTE.chainW(function (_a) {
        var f = _a[0], s2 = _a[1];
        return function_1.pipe(fa(s2), RTE.map(function (_a) {
            var a = _a[0], s3 = _a[1];
            return [f(a), s3];
        }));
    }));
}; }; };
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
 * @since 2.7.0
 */
exports.of = exports.right;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
var chainW = function (f) { return function (ma) { return function (s1) {
    return function_1.pipe(ma(s1), RTE.chainW(function (_a) {
        var a = _a[0], s2 = _a[1];
        return f(a)(s2);
    }));
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
    return function_1.pipe(fa(r), RTE.altW(function () { return that()(r); }));
}; }; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
exports.alt = exports.altW;
/**
 * @category MonadIO
 * @since 2.7.0
 */
exports.fromIO = rightIO;
/**
 * @category MonadTask
 * @since 2.7.0
 */
exports.fromTask = rightTask;
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
exports.URI = 'StateReaderTaskEither';
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
exports.stateReaderTaskEither = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    alt: alt_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask,
    throwError: exports.throwError
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.stateReaderTaskEitherSeq = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    alt: alt_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask,
    throwError: exports.throwError
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
function run(ma, s, r) {
    return ma(s)(r)();
}
exports.run = run;
/* tslint:enable:readonly-array */
/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
var evalState = function (fsa, s) {
    return function_1.pipe(fsa(s), RTE.map(function (_a) {
        var a = _a[0];
        return a;
    }));
};
exports.evalState = evalState;
/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
var execState = function (fsa, s) {
    return function_1.pipe(fsa(s), RTE.map(function (_a) {
        var _ = _a[0], s = _a[1];
        return s;
    }));
};
exports.execState = execState;
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.8.0
 */
var evaluate = function (s) { return function (ma) {
    return function_1.pipe(ma(s), RTE.map(function (_a) {
        var a = _a[0];
        return a;
    }));
}; };
exports.evaluate = evaluate;
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.8.0
 */
var execute = function (s) { return function (ma) {
    return function_1.pipe(ma(s), RTE.map(function (_a) {
        var _ = _a[0], s = _a[1];
        return s;
    }));
}; };
exports.execute = execute;
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
var traverseArrayWithIndex = function (f) { return function (arr) { return function (s) { return function (r) { return function () { return __awaiter(void 0, void 0, void 0, function () {
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
exports.traverseArrayWithIndex = traverseArrayWithIndex;
/**
 * @since 2.9.0
 */
var traverseArray = function (f) {
    return exports.traverseArrayWithIndex(function (_, a) { return f(a); });
};
exports.traverseArray = traverseArray;
/**
 * @since 2.9.0
 */
exports.sequenceArray = exports.traverseArray(function_1.identity);
