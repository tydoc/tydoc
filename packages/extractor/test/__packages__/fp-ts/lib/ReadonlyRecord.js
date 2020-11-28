"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URI = exports.separate = exports.compact = exports.reduceRight = exports.foldMap = exports.reduce = exports.partitionMap = exports.partition = exports.filterMap = exports.filter = exports.elem = exports.some = exports.every = exports.fromFoldableMap = exports.fromFoldable = exports.filterWithIndex = exports.filterMapWithIndex = exports.partitionWithIndex = exports.partitionMapWithIndex = exports.wilt = exports.wither = exports.sequence = exports.traverse = exports.traverseWithIndex = exports.singleton = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = exports.map = exports.mapWithIndex = exports.empty = exports.lookup = exports.getMonoid = exports.getEq = exports.isSubrecord = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.hasOwnProperty = exports.insertAt = exports.toUnfoldable = exports.toReadonlyArray = exports.collect = exports.keys = exports.isEmpty = exports.size = exports.getShow = exports.toRecord = exports.fromRecord = void 0;
exports.readonlyRecord = exports.Witherable = exports.TraversableWithIndex = exports.Traversable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.FoldableWithIndex = exports.Foldable = exports.FunctorWithIndex = exports.Functor = void 0;
var Eq_1 = require("./Eq");
var function_1 = require("./function");
var Option_1 = require("./Option");
/**
 * @category constructors
 * @since 2.5.0
 */
function fromRecord(r) {
    return Object.assign({}, r);
}
exports.fromRecord = fromRecord;
/**
 * @category destructors
 * @since 2.5.0
 */
function toRecord(r) {
    return Object.assign({}, r);
}
exports.toRecord = toRecord;
/**
 * @category instances
 * @since 2.5.0
 */
function getShow(S) {
    return {
        show: function (r) {
            var elements = collect(function (k, a) { return JSON.stringify(k) + ": " + S.show(a); })(r).join(', ');
            return elements === '' ? '{}' : "{ " + elements + " }";
        }
    };
}
exports.getShow = getShow;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.5.0
 */
function size(r) {
    return Object.keys(r).length;
}
exports.size = size;
/**
 * Test whether a record is empty
 *
 * @since 2.5.0
 */
function isEmpty(r) {
    return Object.keys(r).length === 0;
}
exports.isEmpty = isEmpty;
/**
 * @since 2.5.0
 */
function keys(r) {
    return Object.keys(r).sort();
}
exports.keys = keys;
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/ReadonlyRecord'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.5.0
 */
function collect(f) {
    return function (r) {
        // tslint:disable-next-line: readonly-array
        var out = [];
        for (var _i = 0, _a = keys(r); _i < _a.length; _i++) {
            var key = _a[_i];
            out.push(f(key, r[key]));
        }
        return out;
    };
}
exports.collect = collect;
/**
 * @category destructors
 * @since 2.5.0
 */
exports.toReadonlyArray = collect(function (k, a) { return [k, a]; });
function toUnfoldable(U) {
    return function (r) {
        var arr = exports.toReadonlyArray(r);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? Option_1.some([arr[b], b + 1]) : Option_1.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
function insertAt(k, a) {
    return function (r) {
        if (r[k] === a) {
            return r;
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return out;
    };
}
exports.insertAt = insertAt;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(k, r) {
    return _hasOwnProperty.call(r === undefined ? this : r, k);
}
exports.hasOwnProperty = hasOwnProperty;
function deleteAt(k) {
    return function (r) {
        if (!_hasOwnProperty.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
exports.deleteAt = deleteAt;
/**
 * @since 2.5.0
 */
function updateAt(k, a) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return Option_1.none;
        }
        if (r[k] === a) {
            return Option_1.some(r);
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return Option_1.some(out);
    };
}
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function modifyAt(k, f) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return Option_1.none;
        }
        var out = Object.assign({}, r);
        out[k] = f(r[k]);
        return Option_1.some(out);
    };
}
exports.modifyAt = modifyAt;
function pop(k) {
    var deleteAtk = deleteAt(k);
    return function (r) {
        var oa = lookup(k, r);
        return Option_1.isNone(oa) ? Option_1.none : Option_1.some([oa.value, deleteAtk(r)]);
    };
}
exports.pop = pop;
function isSubrecord(E) {
    return function (me, that) {
        if (that === undefined) {
            var isSubrecordE_1 = isSubrecord(E);
            return function (that) { return isSubrecordE_1(that, me); };
        }
        for (var k in me) {
            if (!_hasOwnProperty.call(that, k) || !E.equals(me[k], that[k])) {
                return false;
            }
        }
        return true;
    };
}
exports.isSubrecord = isSubrecord;
function getEq(E) {
    var isSubrecordE = isSubrecord(E);
    return Eq_1.fromEquals(function (x, y) { return isSubrecordE(x)(y) && isSubrecordE(y)(x); });
}
exports.getEq = getEq;
function getMonoid(S) {
    return {
        concat: function (x, y) {
            if (x === exports.empty) {
                return y;
            }
            if (y === exports.empty) {
                return x;
            }
            var keys = Object.keys(y);
            var len = keys.length;
            if (len === 0) {
                return x;
            }
            var r = Object.assign({}, x);
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                r[k] = _hasOwnProperty.call(x, k) ? S.concat(x[k], y[k]) : y[k];
            }
            return r;
        },
        empty: exports.empty
    };
}
exports.getMonoid = getMonoid;
function lookup(k, r) {
    if (r === undefined) {
        return function (r) { return lookup(k, r); };
    }
    return _hasOwnProperty.call(r, k) ? Option_1.some(r[k]) : Option_1.none;
}
exports.lookup = lookup;
/**
 * @since 2.5.0
 */
exports.empty = {};
function mapWithIndex(f) {
    return function (fa) {
        var out = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            out[key] = f(key, fa[key]);
        }
        return out;
    };
}
exports.mapWithIndex = mapWithIndex;
function map(f) {
    return mapWithIndex(function (_, a) { return f(a); });
}
exports.map = map;
function reduceWithIndex(b, f) {
    return function (fa) {
        var out = b;
        var ks = keys(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = f(k, out, fa[k]);
        }
        return out;
    };
}
exports.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(M) {
    return function (f) { return function (fa) {
        var out = M.empty;
        var ks = keys(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = M.concat(out, f(k, fa[k]));
        }
        return out;
    }; };
}
exports.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex(b, f) {
    return function (fa) {
        var out = b;
        var ks = keys(fa);
        var len = ks.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = ks[i];
            out = f(k, fa[k], out);
        }
        return out;
    };
}
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * Create a record with one key/value pair
 *
 * @category constructors
 * @since 2.5.0
 */
function singleton(k, a) {
    var _a;
    return _a = {}, _a[k] = a, _a;
}
exports.singleton = singleton;
function traverseWithIndex(F) {
    return function (f) { return function (ta) {
        var ks = keys(ta);
        if (ks.length === 0) {
            return F.of(exports.empty);
        }
        var fr = F.of({});
        var _loop_1 = function (key) {
            fr = F.ap(F.map(fr, function (r) { return function (b) {
                r[key] = b;
                return r;
            }; }), f(key, ta[key]));
        };
        for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
            var key = ks_1[_i];
            _loop_1(key);
        }
        return fr;
    }; };
}
exports.traverseWithIndex = traverseWithIndex;
function traverse(F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
}
exports.traverse = traverse;
function sequence(F) {
    return traverseWithIndex(F)(function (_, a) { return a; });
}
exports.sequence = sequence;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wither = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(function_1.pipe(fa, traverseF(f)), exports.compact); }; };
};
exports.wither = wither;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wilt = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(function_1.pipe(fa, traverseF(f)), exports.separate); }; };
};
exports.wilt = wilt;
function partitionMapWithIndex(f) {
    return function (fa) {
        var left = {};
        var right = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            var e = f(key, fa[key]);
            switch (e._tag) {
                case 'Left':
                    left[key] = e.left;
                    break;
                case 'Right':
                    right[key] = e.right;
                    break;
            }
        }
        return {
            left: left,
            right: right
        };
    };
}
exports.partitionMapWithIndex = partitionMapWithIndex;
function partitionWithIndex(predicateWithIndex) {
    return function (fa) {
        var left = {};
        var right = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
            var key = keys_3[_i];
            var a = fa[key];
            if (predicateWithIndex(key, a)) {
                right[key] = a;
            }
            else {
                left[key] = a;
            }
        }
        return {
            left: left,
            right: right
        };
    };
}
exports.partitionWithIndex = partitionWithIndex;
function filterMapWithIndex(f) {
    return function (fa) {
        var r = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
            var key = keys_4[_i];
            var optionB = f(key, fa[key]);
            if (Option_1.isSome(optionB)) {
                r[key] = optionB.value;
            }
        }
        return r;
    };
}
exports.filterMapWithIndex = filterMapWithIndex;
function filterWithIndex(predicateWithIndex) {
    return function (fa) {
        var out = {};
        var changed = false;
        for (var key in fa) {
            if (_hasOwnProperty.call(fa, key)) {
                var a = fa[key];
                if (predicateWithIndex(key, a)) {
                    out[key] = a;
                }
                else {
                    changed = true;
                }
            }
        }
        return changed ? out : fa;
    };
}
exports.filterWithIndex = filterWithIndex;
function fromFoldable(M, F) {
    var fromFoldableMapM = fromFoldableMap(M, F);
    return function (fka) { return fromFoldableMapM(fka, function_1.identity); };
}
exports.fromFoldable = fromFoldable;
function fromFoldableMap(M, F) {
    return function (ta, f) {
        return F.reduce(ta, {}, function (r, a) {
            var _a = f(a), k = _a[0], b = _a[1];
            r[k] = _hasOwnProperty.call(r, k) ? M.concat(r[k], b) : b;
            return r;
        });
    };
}
exports.fromFoldableMap = fromFoldableMap;
/**
 * @since 2.5.0
 */
function every(predicate) {
    return function (r) {
        for (var k in r) {
            if (!predicate(r[k])) {
                return false;
            }
        }
        return true;
    };
}
exports.every = every;
/**
 * @since 2.5.0
 */
function some(predicate) {
    return function (r) {
        for (var k in r) {
            if (predicate(r[k])) {
                return true;
            }
        }
        return false;
    };
}
exports.some = some;
function elem(E) {
    return function (a, fa) {
        if (fa === undefined) {
            var elemE_1 = elem(E);
            return function (fa) { return elemE_1(a, fa); };
        }
        for (var k in fa) {
            if (E.equals(fa[k], a)) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return function_1.pipe(fa, map(f)); };
/* istanbul ignore next */
var mapWithIndex_ = function (fa, f) { return function_1.pipe(fa, mapWithIndex(f)); };
/* istanbul ignore next */
var reduce_ = function (fa, b, f) { return function_1.pipe(fa, exports.reduce(b, f)); };
/* istanbul ignore next */
var foldMap_ = function (M) {
    var foldMapM = exports.foldMap(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var reduceRight_ = function (fa, b, f) { return function_1.pipe(fa, exports.reduceRight(b, f)); };
/* istanbul ignore next */
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var filter_ = function (fa, predicate) {
    return function_1.pipe(fa, exports.filter(predicate));
};
/* istanbul ignore next */
var filterMap_ = function (fa, f) { return function_1.pipe(fa, exports.filterMap(f)); };
/* istanbul ignore next */
var partition_ = function (fa, predicate) { return function_1.pipe(fa, exports.partition(predicate)); };
/* istanbul ignore next */
var partitionMap_ = function (fa, f) { return function_1.pipe(fa, exports.partitionMap(f)); };
/* istanbul ignore next */
var reduceWithIndex_ = function (fa, b, f) {
    return function_1.pipe(fa, reduceWithIndex(b, f));
};
/* istanbul ignore next */
var foldMapWithIndex_ = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var reduceRightWithIndex_ = function (fa, b, f) {
    return function_1.pipe(fa, reduceRightWithIndex(b, f));
};
/* istanbul ignore next */
var partitionMapWithIndex_ = function (fa, f) { return function_1.pipe(fa, partitionMapWithIndex(f)); };
/* istanbul ignore next */
var partitionWithIndex_ = function (fa, predicateWithIndex) {
    return function_1.pipe(fa, partitionWithIndex(predicateWithIndex));
};
/* istanbul ignore next */
var filterMapWithIndex_ = function (fa, f) {
    return function_1.pipe(fa, filterMapWithIndex(f));
};
/* istanbul ignore next */
var filterWithIndex_ = function (fa, predicateWithIndex) {
    return function_1.pipe(fa, filterWithIndex(predicateWithIndex));
};
/* istanbul ignore next */
var traverseWithIndex_ = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta, f) { return function_1.pipe(ta, traverseWithIndexF(f)); };
};
/* istanbul ignore next */
var wither_ = function (F) {
    var witherF = exports.wither(F);
    return function (fa, f) { return function_1.pipe(fa, witherF(f)); };
};
/* istanbul ignore next */
var wilt_ = function (F) {
    var wiltF = exports.wilt(F);
    return function (fa, f) { return function_1.pipe(fa, wiltF(f)); };
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Filterable
 * @since 2.5.0
 */
var filter = function (predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
};
exports.filter = filter;
/**
 * @category Filterable
 * @since 2.5.0
 */
var filterMap = function (f) { return filterMapWithIndex(function (_, a) { return f(a); }); };
exports.filterMap = filterMap;
/**
 * @category Filterable
 * @since 2.5.0
 */
var partition = function (predicate) {
    return partitionWithIndex(function (_, a) { return predicate(a); });
};
exports.partition = partition;
/**
 * @category Filterable
 * @since 2.5.0
 */
var partitionMap = function (f) {
    return partitionMapWithIndex(function (_, a) { return f(a); });
};
exports.partitionMap = partitionMap;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduce = function (b, f) {
    return reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
exports.reduce = reduce;
/**
 * @category Foldable
 * @since 2.5.0
 */
var foldMap = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
exports.foldMap = foldMap;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduceRight = function (b, f) {
    return reduceRightWithIndex(b, function (_, a, b) { return f(a, b); });
};
exports.reduceRight = reduceRight;
/**
 * @category Compactable
 * @since 2.5.0
 */
var compact = function (fa) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
        var key = keys_5[_i];
        var optionA = fa[key];
        if (Option_1.isSome(optionA)) {
            r[key] = optionA.value;
        }
    }
    return r;
};
exports.compact = compact;
/**
 * @category Compactable
 * @since 2.5.0
 */
var separate = function (fa) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
        var key = keys_6[_i];
        var e = fa[key];
        switch (e._tag) {
            case 'Left':
                left[key] = e.left;
                break;
            case 'Right':
                right[key] = e.right;
                break;
        }
    }
    return {
        left: left,
        right: right
    };
};
exports.separate = separate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
exports.URI = 'ReadonlyRecord';
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
exports.Compactable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Filterable = {
    URI: exports.URI,
    map: map_,
    compact: exports.compact,
    separate: exports.separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FilterableWithIndex = {
    URI: exports.URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    compact: exports.compact,
    separate: exports.separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_
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
    sequence: sequence
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
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverse: traverse_,
    sequence: sequence,
    traverseWithIndex: traverseWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Witherable = {
    URI: exports.URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: exports.compact,
    separate: exports.separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    wither: wither_,
    wilt: wilt_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
exports.readonlyRecord = {
    URI: exports.URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: exports.compact,
    separate: exports.separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    mapWithIndex: mapWithIndex_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    traverseWithIndex: traverseWithIndex_,
    wither: wither_,
    wilt: wilt_
};
