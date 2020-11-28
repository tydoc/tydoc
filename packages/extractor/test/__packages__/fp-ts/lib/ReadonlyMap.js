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
exports.readonlyMap = exports.Filterable = exports.Compactable = exports.Functor = exports.getWitherable = exports.getFilterableWithIndex = exports.URI = exports.separate = exports.partitionMap = exports.partition = exports.mapWithIndex = exports.map = exports.filterMap = exports.filter = exports.compact = exports.fromFoldable = exports.singleton = exports.getMonoid = exports.getEq = exports.empty = exports.isSubmap = exports.lookup = exports.lookupWithKey = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.insertAt = exports.toUnfoldable = exports.toReadonlyArray = exports.collect = exports.values = exports.keys = exports.elem = exports.member = exports.isEmpty = exports.size = exports.getShow = exports.toMap = exports.fromMap = void 0;
var Either_1 = require("./Either");
var Eq_1 = require("./Eq");
var function_1 = require("./function");
var O = __importStar(require("./Option"));
/**
 * @category constructors
 * @since 2.5.0
 */
function fromMap(m) {
    return new Map(m);
}
exports.fromMap = fromMap;
/**
 * @category destructors
 * @since 2.5.0
 */
function toMap(m) {
    return new Map(m);
}
exports.toMap = toMap;
/**
 * @category instances
 * @since 2.5.0
 */
function getShow(SK, SA) {
    return {
        show: function (m) {
            var elements = '';
            m.forEach(function (a, k) {
                elements += "[" + SK.show(k) + ", " + SA.show(a) + "], ";
            });
            if (elements !== '') {
                elements = elements.substring(0, elements.length - 2);
            }
            return "new Map([" + elements + "])";
        }
    };
}
exports.getShow = getShow;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.5.0
 */
function size(d) {
    return d.size;
}
exports.size = size;
/**
 * Test whether or not a map is empty
 *
 * @since 2.5.0
 */
function isEmpty(d) {
    return d.size === 0;
}
exports.isEmpty = isEmpty;
function member(E) {
    var lookupE = lookup(E);
    return function (k, m) {
        if (m === undefined) {
            var memberE_1 = member(E);
            return function (m) { return memberE_1(k, m); };
        }
        return O.isSome(lookupE(k, m));
    };
}
exports.member = member;
function elem(E) {
    return function (a, m) {
        if (m === undefined) {
            var elemE_1 = elem(E);
            return function (m) { return elemE_1(a, m); };
        }
        var values = m.values();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = values.next()).done) {
            var v = e.value;
            if (E.equals(a, v)) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.5.0
 */
function keys(O) {
    return function (m) { return Array.from(m.keys()).sort(O.compare); };
}
exports.keys = keys;
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.5.0
 */
function values(O) {
    return function (m) { return Array.from(m.values()).sort(O.compare); };
}
exports.values = values;
/**
 * @since 2.5.0
 */
function collect(O) {
    var keysO = keys(O);
    return function (f) { return function (m) {
        // tslint:disable-next-line: readonly-array
        var out = [];
        var ks = keysO(m);
        for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
            var key = ks_1[_i];
            out.push(f(key, m.get(key)));
        }
        return out;
    }; };
}
exports.collect = collect;
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @category destructors
 * @since 2.5.0
 */
function toReadonlyArray(O) {
    return collect(O)(function (k, a) { return [k, a]; });
}
exports.toReadonlyArray = toReadonlyArray;
function toUnfoldable(ord, U) {
    var toArrayO = toReadonlyArray(ord);
    return function (d) {
        var arr = toArrayO(d);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? O.some([arr[b], b + 1]) : O.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
/**
 * Insert or replace a key/value pair in a map
 *
 * @category combinators
 * @since 2.5.0
 */
function insertAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, a) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (O.isNone(found)) {
            var r = new Map(m);
            r.set(k, a);
            return r;
        }
        else if (found.value[1] !== a) {
            var r = new Map(m);
            r.set(found.value[0], a);
            return r;
        }
        return m;
    }; };
}
exports.insertAt = insertAt;
/**
 * Delete a key and value from a map
 *
 * @category combinators
 * @since 2.5.0
 */
function deleteAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (O.isSome(found)) {
            var r = new Map(m);
            r.delete(found.value[0]);
            return r;
        }
        return m;
    }; };
}
exports.deleteAt = deleteAt;
/**
 * @since 2.5.0
 */
function updateAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, a) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (O.isNone(found)) {
            return O.none;
        }
        var r = new Map(m);
        r.set(found.value[0], a);
        return O.some(r);
    }; };
}
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function modifyAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, f) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (O.isNone(found)) {
            return O.none;
        }
        var r = new Map(m);
        r.set(found.value[0], f(found.value[1]));
        return O.some(r);
    }; };
}
exports.modifyAt = modifyAt;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.5.0
 */
function pop(E) {
    var lookupE = lookup(E);
    var deleteAtE = deleteAt(E);
    return function (k) {
        var deleteAtEk = deleteAtE(k);
        return function (m) {
            return function_1.pipe(lookupE(k, m), O.map(function (a) { return [a, deleteAtEk(m)]; }));
        };
    };
}
exports.pop = pop;
function lookupWithKey(E) {
    return function (k, m) {
        if (m === undefined) {
            var lookupWithKeyE_1 = lookupWithKey(E);
            return function (m) { return lookupWithKeyE_1(k, m); };
        }
        var entries = m.entries();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            var _a = e.value, ka = _a[0], a = _a[1];
            if (E.equals(ka, k)) {
                return O.some([ka, a]);
            }
        }
        return O.none;
    };
}
exports.lookupWithKey = lookupWithKey;
function lookup(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, m) {
        if (m === undefined) {
            var lookupE_1 = lookup(E);
            return function (m) { return lookupE_1(k, m); };
        }
        return function_1.pipe(lookupWithKeyE(k, m), O.map(function (_a) {
            var _ = _a[0], a = _a[1];
            return a;
        }));
    };
}
exports.lookup = lookup;
function isSubmap(SK, SA) {
    var lookupWithKeyS = lookupWithKey(SK);
    return function (me, that) {
        if (that === undefined) {
            var isSubmapSKSA_1 = isSubmap(SK, SA);
            return function (that) { return isSubmapSKSA_1(that, me); };
        }
        var entries = me.entries();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            var _a = e.value, k = _a[0], a = _a[1];
            var d2OptA = lookupWithKeyS(k, that);
            if (O.isNone(d2OptA) || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
                return false;
            }
        }
        return true;
    };
}
exports.isSubmap = isSubmap;
/**
 * @since 2.5.0
 */
exports.empty = new Map();
/**
 * @category instances
 * @since 2.5.0
 */
function getEq(SK, SA) {
    var isSubmap_ = isSubmap(SK, SA);
    return Eq_1.fromEquals(function (x, y) { return isSubmap_(x, y) && isSubmap_(y, x); });
}
exports.getEq = getEq;
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @category instances
 * @since 2.5.0
 */
function getMonoid(SK, SA) {
    var lookupWithKeyS = lookupWithKey(SK);
    return {
        concat: function (mx, my) {
            if (mx === exports.empty) {
                return my;
            }
            if (my === exports.empty) {
                return mx;
            }
            var r = new Map(mx);
            var entries = my.entries();
            var e;
            // tslint:disable-next-line: strict-boolean-expressions
            while (!(e = entries.next()).done) {
                var _a = e.value, k = _a[0], a = _a[1];
                var mxOptA = lookupWithKeyS(k, mx);
                if (O.isSome(mxOptA)) {
                    r.set(mxOptA.value[0], SA.concat(mxOptA.value[1], a));
                }
                else {
                    r.set(k, a);
                }
            }
            return r;
        },
        empty: exports.empty
    };
}
exports.getMonoid = getMonoid;
/**
 * Create a map with one key/value pair
 *
 * @category constructors
 * @since 2.5.0
 */
function singleton(k, a) {
    return new Map([[k, a]]);
}
exports.singleton = singleton;
function fromFoldable(E, M, F) {
    return function (fka) {
        var lookupWithKeyE = lookupWithKey(E);
        return F.reduce(fka, new Map(), function (b, _a) {
            var k = _a[0], a = _a[1];
            var bOpt = lookupWithKeyE(k, b);
            if (O.isSome(bOpt)) {
                b.set(bOpt.value[0], M.concat(bOpt.value[1], a));
            }
            else {
                b.set(k, a);
            }
            return b;
        });
    };
}
exports.fromFoldable = fromFoldable;
var mapWithIndex_ = function (fa, f) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, key = _a[0], a = _a[1];
        m.set(key, f(key, a));
    }
    return m;
};
var partitionMapWithIndex_ = function (fa, f) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var ei = f(k, a);
        if (Either_1.isLeft(ei)) {
            left.set(k, ei.left);
        }
        else {
            right.set(k, ei.right);
        }
    }
    return {
        left: left,
        right: right
    };
};
var partitionWithIndex_ = function (fa, p) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            right.set(k, a);
        }
        else {
            left.set(k, a);
        }
    }
    return {
        left: left,
        right: right
    };
};
var filterMapWithIndex_ = function (fa, f) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var o = f(k, a);
        if (O.isSome(o)) {
            m.set(k, o.value);
        }
    }
    return m;
};
var filterWithIndex_ = function (fa, p) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            m.set(k, a);
        }
    }
    return m;
};
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return mapWithIndex_(fa, function (_, a) { return f(a); }); };
var filter_ = function (fa, p) {
    return filterWithIndex_(fa, function (_, a) { return p(a); });
};
var filterMap_ = function (fa, f) { return filterMapWithIndex_(fa, function (_, a) { return f(a); }); };
var partition_ = function (fa, predicate) { return partitionWithIndex_(fa, function (_, a) { return predicate(a); }); };
var partitionMap_ = function (fa, f) { return partitionMapWithIndex_(fa, function (_, a) { return f(a); }); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Compactable
 * @since 2.5.0
 */
var compact = function (fa) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], oa = _a[1];
        if (O.isSome(oa)) {
            m.set(k, oa.value);
        }
    }
    return m;
};
exports.compact = compact;
/**
 * @category Filterable
 * @since 2.5.0
 */
var filter = function (predicate) { return function (fa) { return filter_(fa, predicate); }; };
exports.filter = filter;
/**
 * @category Filterable
 * @since 2.5.0
 */
var filterMap = function (f) { return function (fa) { return filterMap_(fa, f); }; };
exports.filterMap = filterMap;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
var map = function (f) { return function (fa) { return map_(fa, f); }; };
exports.map = map;
/**
 * @category FunctorWithIndex
 * @since 2.7.1
 */
var mapWithIndex = function (f) { return function (fa) { return mapWithIndex_(fa, f); }; };
exports.mapWithIndex = mapWithIndex;
/**
 * @category Filterable
 * @since 2.5.0
 */
var partition = function (predicate) { return function (fa) { return partition_(fa, predicate); }; };
exports.partition = partition;
/**
 * @category Filterable
 * @since 2.5.0
 */
var partitionMap = function (f) { return function (fa) { return partitionMap_(fa, f); }; };
exports.partitionMap = partitionMap;
/**
 * @category Compactable
 * @since 2.5.0
 */
var separate = function (fa) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], ei = _a[1];
        if (Either_1.isLeft(ei)) {
            left.set(k, ei.left);
        }
        else {
            right.set(k, ei.right);
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
exports.URI = 'ReadonlyMap';
/**
 * @category instances
 * @since 2.5.0
 */
function getFilterableWithIndex() {
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        mapWithIndex: mapWithIndex_,
        compact: exports.compact,
        separate: exports.separate,
        filter: filter_,
        filterMap: filterMap_,
        partition: partition_,
        partitionMap: partitionMap_,
        partitionMapWithIndex: partitionMapWithIndex_,
        partitionWithIndex: partitionWithIndex_,
        filterMapWithIndex: filterMapWithIndex_,
        filterWithIndex: filterWithIndex_
    };
}
exports.getFilterableWithIndex = getFilterableWithIndex;
/**
 * @category instances
 * @since 2.5.0
 */
function getWitherable(O) {
    var keysO = keys(O);
    var reduceWithIndex = function (fa, b, f) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = f(k, out, fa.get(k));
        }
        return out;
    };
    var foldMapWithIndex = function (M) { return function (fa, f) {
        var out = M.empty;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = M.concat(out, f(k, fa.get(k)));
        }
        return out;
    }; };
    var reduceRightWithIndex = function (fa, b, f) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = ks[i];
            out = f(k, fa.get(k), out);
        }
        return out;
    };
    var traverseWithIndex = function (F) {
        return function (ta, f) {
            var fm = F.of(exports.empty);
            var ks = keysO(ta);
            var len = ks.length;
            var _loop_1 = function (i) {
                var key = ks[i];
                var a = ta.get(key);
                fm = F.ap(F.map(fm, function (m) { return function (b) { return new Map(m).set(key, b); }; }), f(key, a));
            };
            for (var i = 0; i < len; i++) {
                _loop_1(i);
            }
            return fm;
        };
    };
    var traverse = function (F) {
        var traverseWithIndexF = traverseWithIndex(F);
        return function (ta, f) { return traverseWithIndexF(ta, function (_, a) { return f(a); }); };
    };
    var sequence = function (F) {
        var traverseWithIndexF = traverseWithIndex(F);
        return function (ta) { return traverseWithIndexF(ta, function (_, a) { return a; }); };
    };
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        compact: exports.compact,
        separate: exports.separate,
        filter: filter_,
        filterMap: filterMap_,
        partition: partition_,
        partitionMap: partitionMap_,
        reduce: function (fa, b, f) { return reduceWithIndex(fa, b, function (_, b, a) { return f(b, a); }); },
        foldMap: function (M) {
            var foldMapWithIndexM = foldMapWithIndex(M);
            return function (fa, f) { return foldMapWithIndexM(fa, function (_, a) { return f(a); }); };
        },
        reduceRight: function (fa, b, f) { return reduceRightWithIndex(fa, b, function (_, a, b) { return f(a, b); }); },
        traverse: traverse,
        sequence: sequence,
        mapWithIndex: mapWithIndex_,
        reduceWithIndex: reduceWithIndex,
        foldMapWithIndex: foldMapWithIndex,
        reduceRightWithIndex: reduceRightWithIndex,
        traverseWithIndex: traverseWithIndex,
        wilt: function (F) {
            var traverseF = traverse(F);
            return function (wa, f) { return F.map(traverseF(wa, f), exports.separate); };
        },
        wither: function (F) {
            var traverseF = traverse(F);
            return function (wa, f) { return F.map(traverseF(wa, f), exports.compact); };
        }
    };
}
exports.getWitherable = getWitherable;
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
// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
exports.readonlyMap = {
    URI: exports.URI,
    map: map_,
    compact: exports.compact,
    separate: exports.separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
