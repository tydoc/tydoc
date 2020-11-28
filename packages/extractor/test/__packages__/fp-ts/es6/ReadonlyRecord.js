import { fromEquals } from './Eq';
import { identity, pipe } from './function';
import { isNone, isSome, none, some as optionSome } from './Option';
/**
 * @category constructors
 * @since 2.5.0
 */
export function fromRecord(r) {
    return Object.assign({}, r);
}
/**
 * @category destructors
 * @since 2.5.0
 */
export function toRecord(r) {
    return Object.assign({}, r);
}
/**
 * @category instances
 * @since 2.5.0
 */
export function getShow(S) {
    return {
        show: function (r) {
            var elements = collect(function (k, a) { return JSON.stringify(k) + ": " + S.show(a); })(r).join(', ');
            return elements === '' ? '{}' : "{ " + elements + " }";
        }
    };
}
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.5.0
 */
export function size(r) {
    return Object.keys(r).length;
}
/**
 * Test whether a record is empty
 *
 * @since 2.5.0
 */
export function isEmpty(r) {
    return Object.keys(r).length === 0;
}
/**
 * @since 2.5.0
 */
export function keys(r) {
    return Object.keys(r).sort();
}
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
export function collect(f) {
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
/**
 * @category destructors
 * @since 2.5.0
 */
export var toReadonlyArray = collect(function (k, a) { return [k, a]; });
export function toUnfoldable(U) {
    return function (r) {
        var arr = toReadonlyArray(r);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? optionSome([arr[b], b + 1]) : none); });
    };
}
export function insertAt(k, a) {
    return function (r) {
        if (r[k] === a) {
            return r;
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return out;
    };
}
var _hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwnProperty(k, r) {
    return _hasOwnProperty.call(r === undefined ? this : r, k);
}
export function deleteAt(k) {
    return function (r) {
        if (!_hasOwnProperty.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
/**
 * @since 2.5.0
 */
export function updateAt(k, a) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return none;
        }
        if (r[k] === a) {
            return optionSome(r);
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return optionSome(out);
    };
}
/**
 * @since 2.5.0
 */
export function modifyAt(k, f) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return none;
        }
        var out = Object.assign({}, r);
        out[k] = f(r[k]);
        return optionSome(out);
    };
}
export function pop(k) {
    var deleteAtk = deleteAt(k);
    return function (r) {
        var oa = lookup(k, r);
        return isNone(oa) ? none : optionSome([oa.value, deleteAtk(r)]);
    };
}
export function isSubrecord(E) {
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
export function getEq(E) {
    var isSubrecordE = isSubrecord(E);
    return fromEquals(function (x, y) { return isSubrecordE(x)(y) && isSubrecordE(y)(x); });
}
export function getMonoid(S) {
    return {
        concat: function (x, y) {
            if (x === empty) {
                return y;
            }
            if (y === empty) {
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
        empty: empty
    };
}
export function lookup(k, r) {
    if (r === undefined) {
        return function (r) { return lookup(k, r); };
    }
    return _hasOwnProperty.call(r, k) ? optionSome(r[k]) : none;
}
/**
 * @since 2.5.0
 */
export var empty = {};
export function mapWithIndex(f) {
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
export function map(f) {
    return mapWithIndex(function (_, a) { return f(a); });
}
export function reduceWithIndex(b, f) {
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
export function foldMapWithIndex(M) {
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
export function reduceRightWithIndex(b, f) {
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
/**
 * Create a record with one key/value pair
 *
 * @category constructors
 * @since 2.5.0
 */
export function singleton(k, a) {
    var _a;
    return _a = {}, _a[k] = a, _a;
}
export function traverseWithIndex(F) {
    return function (f) { return function (ta) {
        var ks = keys(ta);
        if (ks.length === 0) {
            return F.of(empty);
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
export function traverse(F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
}
export function sequence(F) {
    return traverseWithIndex(F)(function (_, a) { return a; });
}
/**
 * @category Witherable
 * @since 2.6.5
 */
export var wither = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(pipe(fa, traverseF(f)), compact); }; };
};
/**
 * @category Witherable
 * @since 2.6.5
 */
export var wilt = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(pipe(fa, traverseF(f)), separate); }; };
};
export function partitionMapWithIndex(f) {
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
export function partitionWithIndex(predicateWithIndex) {
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
export function filterMapWithIndex(f) {
    return function (fa) {
        var r = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
            var key = keys_4[_i];
            var optionB = f(key, fa[key]);
            if (isSome(optionB)) {
                r[key] = optionB.value;
            }
        }
        return r;
    };
}
export function filterWithIndex(predicateWithIndex) {
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
export function fromFoldable(M, F) {
    var fromFoldableMapM = fromFoldableMap(M, F);
    return function (fka) { return fromFoldableMapM(fka, identity); };
}
export function fromFoldableMap(M, F) {
    return function (ta, f) {
        return F.reduce(ta, {}, function (r, a) {
            var _a = f(a), k = _a[0], b = _a[1];
            r[k] = _hasOwnProperty.call(r, k) ? M.concat(r[k], b) : b;
            return r;
        });
    };
}
/**
 * @since 2.5.0
 */
export function every(predicate) {
    return function (r) {
        for (var k in r) {
            if (!predicate(r[k])) {
                return false;
            }
        }
        return true;
    };
}
/**
 * @since 2.5.0
 */
export function some(predicate) {
    return function (r) {
        for (var k in r) {
            if (predicate(r[k])) {
                return true;
            }
        }
        return false;
    };
}
export function elem(E) {
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
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var mapWithIndex_ = function (fa, f) { return pipe(fa, mapWithIndex(f)); };
/* istanbul ignore next */
var reduce_ = function (fa, b, f) { return pipe(fa, reduce(b, f)); };
/* istanbul ignore next */
var foldMap_ = function (M) {
    var foldMapM = foldMap(M);
    return function (fa, f) { return pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var reduceRight_ = function (fa, b, f) { return pipe(fa, reduceRight(b, f)); };
/* istanbul ignore next */
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var filter_ = function (fa, predicate) {
    return pipe(fa, filter(predicate));
};
/* istanbul ignore next */
var filterMap_ = function (fa, f) { return pipe(fa, filterMap(f)); };
/* istanbul ignore next */
var partition_ = function (fa, predicate) { return pipe(fa, partition(predicate)); };
/* istanbul ignore next */
var partitionMap_ = function (fa, f) { return pipe(fa, partitionMap(f)); };
/* istanbul ignore next */
var reduceWithIndex_ = function (fa, b, f) {
    return pipe(fa, reduceWithIndex(b, f));
};
/* istanbul ignore next */
var foldMapWithIndex_ = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (fa, f) { return pipe(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var reduceRightWithIndex_ = function (fa, b, f) {
    return pipe(fa, reduceRightWithIndex(b, f));
};
/* istanbul ignore next */
var partitionMapWithIndex_ = function (fa, f) { return pipe(fa, partitionMapWithIndex(f)); };
/* istanbul ignore next */
var partitionWithIndex_ = function (fa, predicateWithIndex) {
    return pipe(fa, partitionWithIndex(predicateWithIndex));
};
/* istanbul ignore next */
var filterMapWithIndex_ = function (fa, f) {
    return pipe(fa, filterMapWithIndex(f));
};
/* istanbul ignore next */
var filterWithIndex_ = function (fa, predicateWithIndex) {
    return pipe(fa, filterWithIndex(predicateWithIndex));
};
/* istanbul ignore next */
var traverseWithIndex_ = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta, f) { return pipe(ta, traverseWithIndexF(f)); };
};
/* istanbul ignore next */
var wither_ = function (F) {
    var witherF = wither(F);
    return function (fa, f) { return pipe(fa, witherF(f)); };
};
/* istanbul ignore next */
var wilt_ = function (F) {
    var wiltF = wilt(F);
    return function (fa, f) { return pipe(fa, wiltF(f)); };
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Filterable
 * @since 2.5.0
 */
export var filter = function (predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
};
/**
 * @category Filterable
 * @since 2.5.0
 */
export var filterMap = function (f) { return filterMapWithIndex(function (_, a) { return f(a); }); };
/**
 * @category Filterable
 * @since 2.5.0
 */
export var partition = function (predicate) {
    return partitionWithIndex(function (_, a) { return predicate(a); });
};
/**
 * @category Filterable
 * @since 2.5.0
 */
export var partitionMap = function (f) {
    return partitionMapWithIndex(function (_, a) { return f(a); });
};
/**
 * @category Foldable
 * @since 2.5.0
 */
export var reduce = function (b, f) {
    return reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
/**
 * @category Foldable
 * @since 2.5.0
 */
export var foldMap = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
/**
 * @category Foldable
 * @since 2.5.0
 */
export var reduceRight = function (b, f) {
    return reduceRightWithIndex(b, function (_, a, b) { return f(a, b); });
};
/**
 * @category Compactable
 * @since 2.5.0
 */
export var compact = function (fa) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
        var key = keys_5[_i];
        var optionA = fa[key];
        if (isSome(optionA)) {
            r[key] = optionA.value;
        }
    }
    return r;
};
/**
 * @category Compactable
 * @since 2.5.0
 */
export var separate = function (fa) {
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
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
export var URI = 'ReadonlyRecord';
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
export var FunctorWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Foldable = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var FoldableWithIndex = {
    URI: URI,
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
export var Compactable = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Filterable = {
    URI: URI,
    map: map_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var FilterableWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    compact: compact,
    separate: separate,
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
export var Traversable = {
    URI: URI,
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
export var TraversableWithIndex = {
    URI: URI,
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
export var Witherable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: compact,
    separate: separate,
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
export var readonlyRecord = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: compact,
    separate: separate,
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
