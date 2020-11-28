"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMap = exports.separate = exports.compact = exports.fromArray = exports.remove = exports.insert = exports.singleton = exports.foldMap = exports.reduce = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.difference = exports.partitionMap = exports.intersection = exports.union = exports.elem = exports.partition = exports.filter = exports.isSubset = exports.chain = exports.every = exports.map = exports.some = exports.getEq = exports.toReadonlyArray = exports.empty = exports.getShow = exports.toSet = exports.fromSet = void 0;
var Eq_1 = require("./Eq");
var function_1 = require("./function");
/**
 * @category constructors
 * @since 2.5.0
 */
function fromSet(s) {
    return new Set(s);
}
exports.fromSet = fromSet;
/**
 * @category destructors
 * @since 2.5.0
 */
function toSet(s) {
    return new Set(s);
}
exports.toSet = toSet;
/**
 * @category instances
 * @since 2.5.0
 */
function getShow(S) {
    return {
        show: function (s) {
            var elements = '';
            s.forEach(function (a) {
                elements += S.show(a) + ', ';
            });
            if (elements !== '') {
                elements = elements.substring(0, elements.length - 2);
            }
            return "new Set([" + elements + "])";
        }
    };
}
exports.getShow = getShow;
/**
 * @since 2.5.0
 */
exports.empty = new Set();
/**
 * @category destructors
 * @since 2.5.0
 */
function toReadonlyArray(O) {
    return function (x) {
        // tslint:disable-next-line: readonly-array
        var r = [];
        x.forEach(function (e) { return r.push(e); });
        return r.sort(O.compare);
    };
}
exports.toReadonlyArray = toReadonlyArray;
/**
 * @category instances
 * @since 2.5.0
 */
function getEq(E) {
    var subsetE = isSubset(E);
    return Eq_1.fromEquals(function (x, y) { return subsetE(x, y) && subsetE(y, x); });
}
exports.getEq = getEq;
/**
 * @since 2.5.0
 */
function some(predicate) {
    return function (set) {
        var values = set.values();
        var e;
        var found = false;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!found && !(e = values.next()).done) {
            found = predicate(e.value);
        }
        return found;
    };
}
exports.some = some;
/**
 * Projects a Set through a function
 *
 * @category combinators
 * @since 2.5.0
 */
function map(E) {
    var elemE = elem(E);
    return function (f) { return function (set) {
        var r = new Set();
        set.forEach(function (e) {
            var v = f(e);
            if (!elemE(v, r)) {
                r.add(v);
            }
        });
        return r;
    }; };
}
exports.map = map;
/**
 * @since 2.5.0
 */
function every(predicate) {
    return function_1.not(some(function_1.not(predicate)));
}
exports.every = every;
/**
 * @category combinators
 * @since 2.5.0
 */
function chain(E) {
    var elemE = elem(E);
    return function (f) { return function (set) {
        var r = new Set();
        set.forEach(function (e) {
            f(e).forEach(function (e) {
                if (!elemE(e, r)) {
                    r.add(e);
                }
            });
        });
        return r;
    }; };
}
exports.chain = chain;
function isSubset(E) {
    var elemE = elem(E);
    return function (me, that) {
        if (that === undefined) {
            var isSubsetE_1 = isSubset(E);
            return function (that) { return isSubsetE_1(that, me); };
        }
        return every(function (a) { return elemE(a, that); })(me);
    };
}
exports.isSubset = isSubset;
function filter(predicate) {
    return function (set) {
        var values = set.values();
        var e;
        var r = new Set();
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = values.next()).done) {
            var value = e.value;
            if (predicate(value)) {
                r.add(value);
            }
        }
        return r;
    };
}
exports.filter = filter;
function partition(predicate) {
    return function (set) {
        var values = set.values();
        var e;
        var right = new Set();
        var left = new Set();
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = values.next()).done) {
            var value = e.value;
            if (predicate(value)) {
                right.add(value);
            }
            else {
                left.add(value);
            }
        }
        return { left: left, right: right };
    };
}
exports.partition = partition;
function elem(E) {
    return function (a, set) {
        if (set === undefined) {
            var elemE_1 = elem(E);
            return function (set) { return elemE_1(a, set); };
        }
        var values = set.values();
        var e;
        var found = false;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!found && !(e = values.next()).done) {
            found = E.equals(a, e.value);
        }
        return found;
    };
}
exports.elem = elem;
function union(E) {
    var elemE = elem(E);
    return function (me, that) {
        if (that === undefined) {
            var unionE_1 = union(E);
            return function (that) { return unionE_1(me, that); };
        }
        if (me === exports.empty) {
            return that;
        }
        if (that === exports.empty) {
            return me;
        }
        var r = new Set(me);
        that.forEach(function (e) {
            if (!elemE(e, r)) {
                r.add(e);
            }
        });
        return r;
    };
}
exports.union = union;
function intersection(E) {
    var elemE = elem(E);
    return function (me, that) {
        if (that === undefined) {
            var intersectionE_1 = intersection(E);
            return function (that) { return intersectionE_1(that, me); };
        }
        if (me === exports.empty || that === exports.empty) {
            return exports.empty;
        }
        var r = new Set();
        me.forEach(function (e) {
            if (elemE(e, that)) {
                r.add(e);
            }
        });
        return r;
    };
}
exports.intersection = intersection;
/**
 * @since 2.5.0
 */
function partitionMap(EB, EC) {
    return function (f) { return function (set) {
        var values = set.values();
        var e;
        var left = new Set();
        var right = new Set();
        var hasB = elem(EB);
        var hasC = elem(EC);
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = values.next()).done) {
            var v = f(e.value);
            switch (v._tag) {
                case 'Left':
                    if (!hasB(v.left, left)) {
                        left.add(v.left);
                    }
                    break;
                case 'Right':
                    if (!hasC(v.right, right)) {
                        right.add(v.right);
                    }
                    break;
            }
        }
        return { left: left, right: right };
    }; };
}
exports.partitionMap = partitionMap;
function difference(E) {
    var elemE = elem(E);
    return function (me, that) {
        if (that === undefined) {
            var differenceE_1 = difference(E);
            return function (that) { return differenceE_1(that, me); };
        }
        return filter(function (a) { return !elemE(a, that); })(me);
    };
}
exports.difference = difference;
/**
 * @category instances
 * @since 2.5.0
 */
function getUnionMonoid(E) {
    return {
        concat: union(E),
        empty: exports.empty
    };
}
exports.getUnionMonoid = getUnionMonoid;
/**
 * @category instances
 * @since 2.5.0
 */
function getIntersectionSemigroup(E) {
    return {
        concat: intersection(E)
    };
}
exports.getIntersectionSemigroup = getIntersectionSemigroup;
/**
 * @since 2.5.0
 */
function reduce(O) {
    var toArrayO = toReadonlyArray(O);
    return function (b, f) { return function (fa) { return toArrayO(fa).reduce(f, b); }; };
}
exports.reduce = reduce;
/**
 * @since 2.5.0
 */
function foldMap(O, M) {
    var toArrayO = toReadonlyArray(O);
    return function (f) { return function (fa) { return toArrayO(fa).reduce(function (b, a) { return M.concat(b, f(a)); }, M.empty); }; };
}
exports.foldMap = foldMap;
/**
 * Create a set with one element
 *
 * @category constructors
 * @since 2.5.0
 */
function singleton(a) {
    return new Set([a]);
}
exports.singleton = singleton;
/**
 * Insert a value into a set
 *
 * @category combinators
 * @since 2.5.0
 */
function insert(E) {
    var elemE = elem(E);
    return function (a) { return function (set) {
        if (!elemE(a)(set)) {
            var r = new Set(set);
            r.add(a);
            return r;
        }
        else {
            return set;
        }
    }; };
}
exports.insert = insert;
/**
 * Delete a value from a set
 *
 * @category combinators
 * @since 2.5.0
 */
function remove(E) {
    return function (a) { return function (set) { return filter(function (ax) { return !E.equals(a, ax); })(set); }; };
}
exports.remove = remove;
/**
 * Create a set from an array
 *
 * @category constructors
 * @since 2.5.0
 */
function fromArray(E) {
    return function (as) {
        var len = as.length;
        var r = new Set();
        var has = elem(E);
        for (var i = 0; i < len; i++) {
            var a = as[i];
            if (!has(a, r)) {
                r.add(a);
            }
        }
        return r;
    };
}
exports.fromArray = fromArray;
/**
 * @category combinators
 * @since 2.5.0
 */
function compact(E) {
    return filterMap(E)(function_1.identity);
}
exports.compact = compact;
/**
 * @since 2.5.0
 */
function separate(EE, EA) {
    return function (fa) {
        var elemEE = elem(EE);
        var elemEA = elem(EA);
        var left = new Set();
        var right = new Set();
        fa.forEach(function (e) {
            switch (e._tag) {
                case 'Left':
                    if (!elemEE(e.left, left)) {
                        left.add(e.left);
                    }
                    break;
                case 'Right':
                    if (!elemEA(e.right, right)) {
                        right.add(e.right);
                    }
                    break;
            }
        });
        return { left: left, right: right };
    };
}
exports.separate = separate;
/**
 * @category combinators
 * @since 2.5.0
 */
function filterMap(E) {
    var elemE = elem(E);
    return function (f) { return function (fa) {
        var r = new Set();
        fa.forEach(function (a) {
            var ob = f(a);
            if (ob._tag === 'Some' && !elemE(ob.value, r)) {
                r.add(ob.value);
            }
        });
        return r;
    }; };
}
exports.filterMap = filterMap;
