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
exports.reduceRight = exports.reduceWithIndex = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.extend = exports.duplicate = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.alt = exports.altW = exports.foldMap = exports.foldMapWithIndex = exports.intersperse = exports.prependToAll = exports.unzip = exports.zip = exports.zipWith = exports.fold = exports.concat = exports.of = exports.filterWithIndex = exports.filter = exports.modifyAt = exports.updateAt = exports.insertAt = exports.sort = exports.init = exports.last = exports.groupBy = exports.groupSort = exports.group = exports.getEq = exports.getSemigroup = exports.max = exports.min = exports.reverse = exports.tail = exports.head = exports.getShow = exports.unsnoc = exports.uncons = exports.fromArray = exports.fromReadonlyArray = exports.snoc = exports.cons = void 0;
exports.apS = exports.bind = exports.bindTo = exports.Do = exports.readonlyNonEmptyArray = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.Applicative = exports.FunctorWithIndex = exports.Functor = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = void 0;
var function_1 = require("./function");
var Option_1 = require("./Option");
var RA = __importStar(require("./ReadonlyArray"));
var Semigroup_1 = require("./Semigroup");
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.5.0
 */
exports.cons = RA.cons;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.5.0
 */
exports.snoc = RA.snoc;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.5.0
 */
function fromReadonlyArray(as) {
    return RA.isNonEmpty(as) ? Option_1.some(as) : Option_1.none;
}
exports.fromReadonlyArray = fromReadonlyArray;
/**
 * @category constructors
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
function fromArray(as) {
    return fromReadonlyArray(RA.fromArray(as));
}
exports.fromArray = fromArray;
/**
 * Produces a couple of the first element of the array, and a new array of the remaining elements, if any
 *
 * @example
 * import { cons, uncons } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(uncons(cons(1, [2, 3, 4])), [1, [2, 3, 4]])
 *
 * @category destructors
 * @since 2.9.0
 */
function uncons(nea) {
    return [nea[0], nea.slice(1)];
}
exports.uncons = uncons;
/**
 * Produces a couple of a copy of the array without its last element, and that last element
 *
 * @example
 * import { snoc, unsnoc } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unsnoc(snoc([1, 2, 3], 4)), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
function unsnoc(nea) {
    var l = nea.length - 1;
    return [nea.slice(0, l), nea[l]];
}
exports.unsnoc = unsnoc;
/**
 * @category instances
 * @since 2.5.0
 */
exports.getShow = RA.getShow;
/**
 * @since 2.5.0
 */
function head(nea) {
    return nea[0];
}
exports.head = head;
/**
 * @since 2.5.0
 */
function tail(nea) {
    return nea.slice(1);
}
exports.tail = tail;
/**
 * @category combinators
 * @since 2.5.0
 */
exports.reverse = RA.reverse;
/**
 * @since 2.5.0
 */
function min(ord) {
    var S = Semigroup_1.getMeetSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.min = min;
/**
 * @since 2.5.0
 */
function max(ord) {
    var S = Semigroup_1.getJoinSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.max = max;
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @category instances
 * @since 2.5.0
 */
function getSemigroup() {
    return {
        concat: concat
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @example
 * import { getEq, cons } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @category instances
 * @since 2.5.0
 */
exports.getEq = RA.getEq;
function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return RA.empty;
        }
        // tslint:disable-next-line: readonly-array
        var r = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var x = as[i];
            if (E.equals(x, head)) {
                nea.push(x);
            }
            else {
                r.push(nea);
                head = x;
                nea = [head];
            }
        }
        r.push(nea);
        return r;
    };
}
exports.group = group;
function groupSort(O) {
    var sortO = RA.sort(O);
    var groupO = group(O);
    return function (as) { return groupO(sortO(as)); };
}
exports.groupSort = groupSort;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @category constructors
 * @since 2.5.0
 */
function groupBy(f) {
    return function (as) {
        var r = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            var k = f(a);
            if (r.hasOwnProperty(k)) {
                r[k].push(a);
            }
            else {
                r[k] = [a];
            }
        }
        return r;
    };
}
exports.groupBy = groupBy;
/**
 * @since 2.5.0
 */
function last(nea) {
    return nea[nea.length - 1];
}
exports.last = last;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
function init(nea) {
    return nea.slice(0, -1);
}
exports.init = init;
/**
 * @category combinators
 * @since 2.5.0
 */
function sort(O) {
    return RA.sort(O);
}
exports.sort = sort;
/**
 * @since 2.5.0
 */
function insertAt(i, a) {
    return RA.insertAt(i, a);
}
exports.insertAt = insertAt;
/**
 * @since 2.5.0
 */
function updateAt(i, a) {
    return RA.updateAt(i, a);
}
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function modifyAt(i, f) {
    return RA.modifyAt(i, f);
}
exports.modifyAt = modifyAt;
function filter(predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
}
exports.filter = filter;
/**
 * @since 2.5.0
 */
function filterWithIndex(predicate) {
    return function (nea) { return fromReadonlyArray(nea.filter(function (a, i) { return predicate(i, a); })); };
}
exports.filterWithIndex = filterWithIndex;
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.5.0
 */
exports.of = RA.of;
function concat(fx, fy) {
    return fx.concat(fy);
}
exports.concat = concat;
/**
 * @since 2.5.0
 */
function fold(S) {
    return function (fa) { return fa.reduce(S.concat); };
}
exports.fold = fold;
/**
 * @category combinators
 * @since 2.5.1
 */
exports.zipWith = RA.zipWith;
/**
 * @category combinators
 * @since 2.5.1
 */
exports.zip = RA.zip;
/**
 * @since 2.5.1
 */
exports.unzip = RA.unzip;
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { cons, prependToAll } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(prependToAll(9)(cons(1, [2, 3, 4])), cons(9, [1, 9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
exports.prependToAll = RA.prependToAll;
/**
 * Places an element in between members of an array
 *
 * @example
 * import { cons, intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)(cons(1, [2, 3, 4])), cons(1, [9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
exports.intersperse = RA.intersperse;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = RA.Functor.map;
var mapWithIndex_ = RA.FunctorWithIndex.mapWithIndex;
var ap_ = RA.Applicative.ap;
var chain_ = RA.Monad.chain;
var extend_ = RA.Extend.extend;
var reduce_ = RA.Foldable.reduce;
var foldMap_ = RA.Foldable.foldMap;
var reduceRight_ = RA.Foldable.reduceRight;
var traverse_ = RA.Traversable.traverse;
var alt_ = RA.Alt.alt;
var reduceWithIndex_ = RA.FoldableWithIndex.reduceWithIndex;
var foldMapWithIndex_ = RA.FoldableWithIndex
    .foldMapWithIndex;
var reduceRightWithIndex_ = RA.FoldableWithIndex
    .reduceRightWithIndex;
var traverseWithIndex_ = RA.TraversableWithIndex
    .traverseWithIndex;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var foldMapWithIndex = function (S) { return function (f) { return function (fa) { return fa.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, fa[0])); }; }; };
exports.foldMapWithIndex = foldMapWithIndex;
/**
 * @category Foldable
 * @since 2.5.0
 */
var foldMap = function (S) { return function (f) { return function (fa) {
    return fa.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(fa[0]));
}; }; };
exports.foldMap = foldMap;
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
exports.altW = RA.altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
exports.alt = RA.alt;
/**
 * @category Apply
 * @since 2.5.0
 */
exports.ap = RA.ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apFirst = RA.apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apSecond = RA.apSecond;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.5.0
 */
exports.chain = RA.chain;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.chainFirst = RA.chainFirst;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.duplicate = RA.duplicate;
/**
 * @category Extend
 * @since 2.5.0
 */
exports.extend = RA.extend;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.flatten = RA.flatten;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
exports.map = RA.map;
/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
exports.mapWithIndex = RA.mapWithIndex;
/**
 * @category Foldable
 * @since 2.5.0
 */
exports.reduce = RA.reduce;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
exports.reduceWithIndex = RA.reduceWithIndex;
/**
 * @category Foldable
 * @since 2.5.0
 */
exports.reduceRight = RA.reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
exports.reduceRightWithIndex = RA.reduceRightWithIndex;
/**
 * @since 2.6.3
 */
exports.traverse = RA.traverse;
/**
 * @since 2.6.3
 */
exports.sequence = RA.sequence;
/**
 * @since 2.6.3
 */
exports.traverseWithIndex = RA.traverseWithIndex;
/**
 * @since 2.6.3
 */
exports.extract = head;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
exports.URI = 'ReadonlyNonEmptyArray';
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
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: map_,
    mapWithIndex: mapWithIndex_
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
    ap: ap_,
    of: exports.of,
    chain: chain_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverseWithIndex: traverseWithIndex_
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
exports.Comonad = {
    URI: exports.URI,
    map: map_,
    extend: extend_,
    extract: exports.extract
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
exports.readonlyNonEmptyArray = {
    URI: exports.URI,
    of: exports.of,
    map: map_,
    mapWithIndex: mapWithIndex_,
    ap: ap_,
    chain: chain_,
    extend: extend_,
    extract: exports.extract,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverseWithIndex: traverseWithIndex_,
    alt: alt_
};
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
