import { fromEquals } from './Eq';
import { not, identity } from './function';
/**
 * @category constructors
 * @since 2.5.0
 */
export function fromSet(s) {
    return new Set(s);
}
/**
 * @category destructors
 * @since 2.5.0
 */
export function toSet(s) {
    return new Set(s);
}
/**
 * @category instances
 * @since 2.5.0
 */
export function getShow(S) {
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
/**
 * @since 2.5.0
 */
export var empty = new Set();
/**
 * @category destructors
 * @since 2.5.0
 */
export function toReadonlyArray(O) {
    return function (x) {
        // tslint:disable-next-line: readonly-array
        var r = [];
        x.forEach(function (e) { return r.push(e); });
        return r.sort(O.compare);
    };
}
/**
 * @category instances
 * @since 2.5.0
 */
export function getEq(E) {
    var subsetE = isSubset(E);
    return fromEquals(function (x, y) { return subsetE(x, y) && subsetE(y, x); });
}
/**
 * @since 2.5.0
 */
export function some(predicate) {
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
/**
 * Projects a Set through a function
 *
 * @category combinators
 * @since 2.5.0
 */
export function map(E) {
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
/**
 * @since 2.5.0
 */
export function every(predicate) {
    return not(some(not(predicate)));
}
/**
 * @category combinators
 * @since 2.5.0
 */
export function chain(E) {
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
export function isSubset(E) {
    var elemE = elem(E);
    return function (me, that) {
        if (that === undefined) {
            var isSubsetE_1 = isSubset(E);
            return function (that) { return isSubsetE_1(that, me); };
        }
        return every(function (a) { return elemE(a, that); })(me);
    };
}
export function filter(predicate) {
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
export function partition(predicate) {
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
export function elem(E) {
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
export function union(E) {
    var elemE = elem(E);
    return function (me, that) {
        if (that === undefined) {
            var unionE_1 = union(E);
            return function (that) { return unionE_1(me, that); };
        }
        if (me === empty) {
            return that;
        }
        if (that === empty) {
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
export function intersection(E) {
    var elemE = elem(E);
    return function (me, that) {
        if (that === undefined) {
            var intersectionE_1 = intersection(E);
            return function (that) { return intersectionE_1(that, me); };
        }
        if (me === empty || that === empty) {
            return empty;
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
/**
 * @since 2.5.0
 */
export function partitionMap(EB, EC) {
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
export function difference(E) {
    var elemE = elem(E);
    return function (me, that) {
        if (that === undefined) {
            var differenceE_1 = difference(E);
            return function (that) { return differenceE_1(that, me); };
        }
        return filter(function (a) { return !elemE(a, that); })(me);
    };
}
/**
 * @category instances
 * @since 2.5.0
 */
export function getUnionMonoid(E) {
    return {
        concat: union(E),
        empty: empty
    };
}
/**
 * @category instances
 * @since 2.5.0
 */
export function getIntersectionSemigroup(E) {
    return {
        concat: intersection(E)
    };
}
/**
 * @since 2.5.0
 */
export function reduce(O) {
    var toArrayO = toReadonlyArray(O);
    return function (b, f) { return function (fa) { return toArrayO(fa).reduce(f, b); }; };
}
/**
 * @since 2.5.0
 */
export function foldMap(O, M) {
    var toArrayO = toReadonlyArray(O);
    return function (f) { return function (fa) { return toArrayO(fa).reduce(function (b, a) { return M.concat(b, f(a)); }, M.empty); }; };
}
/**
 * Create a set with one element
 *
 * @category constructors
 * @since 2.5.0
 */
export function singleton(a) {
    return new Set([a]);
}
/**
 * Insert a value into a set
 *
 * @category combinators
 * @since 2.5.0
 */
export function insert(E) {
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
/**
 * Delete a value from a set
 *
 * @category combinators
 * @since 2.5.0
 */
export function remove(E) {
    return function (a) { return function (set) { return filter(function (ax) { return !E.equals(a, ax); })(set); }; };
}
/**
 * Create a set from an array
 *
 * @category constructors
 * @since 2.5.0
 */
export function fromArray(E) {
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
/**
 * @category combinators
 * @since 2.5.0
 */
export function compact(E) {
    return filterMap(E)(identity);
}
/**
 * @since 2.5.0
 */
export function separate(EE, EA) {
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
/**
 * @category combinators
 * @since 2.5.0
 */
export function filterMap(E) {
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
