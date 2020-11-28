import * as A from './Array';
import { fromEquals } from './Eq';
import { identity, pipe, bind_, bindTo_, flow } from './function';
/**
 * @category constructors
 * @since 2.0.0
 */
export function make(value, forest) {
    if (forest === void 0) { forest = A.empty; }
    return {
        value: value,
        forest: forest
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getShow(S) {
    var show = function (t) {
        return t.forest === A.empty || t.forest.length === 0
            ? "make(" + S.show(t.value) + ")"
            : "make(" + S.show(t.value) + ", [" + t.forest.map(show).join(', ') + "])";
    };
    return {
        show: show
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getEq(E) {
    var SA;
    var R = fromEquals(function (x, y) { return E.equals(x.value, y.value) && SA.equals(x.forest, y.forest); });
    SA = A.getEq(R);
    return R;
}
var draw = function (indentation, forest) {
    var r = '';
    var len = forest.length;
    var tree;
    for (var i = 0; i < len; i++) {
        tree = forest[i];
        var isLast = i === len - 1;
        r += indentation + (isLast ? '└' : '├') + '─ ' + tree.value;
        r += draw(indentation + (len > 1 && !isLast ? '│  ' : '   '), tree.forest);
    }
    return r;
};
/**
 * Neat 2-dimensional drawing of a forest
 *
 * @since 2.0.0
 */
export function drawForest(forest) {
    return draw('\n', forest);
}
/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { make, drawTree, tree } from 'fp-ts/Tree'
 *
 * const fa = make('a', [
 *   tree.of('b'),
 *   tree.of('c'),
 *   make('d', [tree.of('e'), tree.of('f')])
 * ])
 *
 * assert.strictEqual(drawTree(fa), `a
 * ├─ b
 * ├─ c
 * └─ d
 *    ├─ e
 *    └─ f`)
 *
 *
 * @since 2.0.0
 */
export function drawTree(tree) {
    return tree.value + drawForest(tree.forest);
}
/**
 * Build a tree from a seed value
 *
 * @category constructors
 * @since 2.0.0
 */
export function unfoldTree(b, f) {
    var _a = f(b), a = _a[0], bs = _a[1];
    return { value: a, forest: unfoldForest(bs, f) };
}
/**
 * Build a tree from a seed value
 *
 * @category constructors
 * @since 2.0.0
 */
export function unfoldForest(bs, f) {
    return bs.map(function (b) { return unfoldTree(b, f); });
}
export function unfoldTreeM(M) {
    var unfoldForestMM = unfoldForestM(M);
    return function (b, f) { return M.chain(f(b), function (_a) {
        var a = _a[0], bs = _a[1];
        return M.chain(unfoldForestMM(bs, f), function (ts) { return M.of({ value: a, forest: ts }); });
    }); };
}
export function unfoldForestM(M) {
    var traverseM = A.traverse(M);
    return function (bs, f) {
        return pipe(bs, traverseM(function (b) { return unfoldTreeM(M)(b, f); }));
    };
}
// TODO: curry in v3
/**
 * @since 2.0.0
 */
export function elem(E) {
    var go = function (a, fa) {
        if (E.equals(a, fa.value)) {
            return true;
        }
        return fa.forest.some(function (tree) { return go(a, tree); });
    };
    return go;
}
/**
 * Fold a tree into a "summary" value in depth-first order.
 *
 * For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.
 *
 * This is also known as the catamorphism on trees.
 *
 * @example
 * import { fold, make } from 'fp-ts/Tree'
 *
 * const t = make(1, [make(2), make(3)])
 *
 * const sum = (as: Array<number>) => as.reduce((a, acc) => a + acc, 0)
 *
 * // Sum the values in a tree:
 * assert.deepStrictEqual(fold((a: number, bs: Array<number>) => a + sum(bs))(t), 6)
 *
 * // Find the maximum value in the tree:
 * assert.deepStrictEqual(fold((a: number, bs: Array<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t), 3)
 *
 * // Count the number of leaves in the tree:
 * assert.deepStrictEqual(fold((_: number, bs: Array<number>) => (bs.length === 0 ? 1 : sum(bs)))(t), 2)
 *
 * @category destructors
 * @since 2.6.0
 */
export function fold(f) {
    var go = function (tree) { return f(tree.value, tree.forest.map(go)); };
    return go;
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return pipe(fa, map(f)); };
var ap_ = function (fab, fa) {
    return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
};
/* istanbul ignore next */
var chain_ = function (ma, f) { return pipe(ma, chain(f)); };
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
var extend_ = function (wa, f) { return pipe(wa, extend(f)); };
/* istanbul ignore next */
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return pipe(ta, traverseF(f)); };
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export var ap = function (fa) { return function (fab) { return ap_(fab, fa); }; };
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
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = function (f) { return function (ma) {
    var _a = f(ma.value), value = _a.value, forest = _a.forest;
    var concat = A.getMonoid().concat;
    return {
        value: value,
        forest: concat(forest, ma.forest.map(chain(f)))
    };
}; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var chainFirst = function (f) {
    return chain(function (a) {
        return pipe(f(a), map(function () { return a; }));
    });
};
/**
 * @category Extend
 * @since 2.0.0
 */
export var extend = function (f) { return function (wa) { return ({
    value: f(wa),
    forest: wa.forest.map(extend(f))
}); }; };
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export var duplicate = 
/*#__PURE__*/
extend(identity);
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
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return ({
    value: f(fa.value),
    forest: fa.forest.map(map(f))
}); }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduce = function (b, f) { return function (fa) {
    var r = f(b, fa.value);
    var len = fa.forest.length;
    for (var i = 0; i < len; i++) {
        r = pipe(fa.forest[i], reduce(r, f));
    }
    return r;
}; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var foldMap = function (M) { return function (f) {
    return reduce(M.empty, function (acc, a) { return M.concat(acc, f(a)); });
}; };
/**
 * @category Foldable
 * @since 2.0.0
 */
export var reduceRight = function (b, f) { return function (fa) {
    var r = b;
    var len = fa.forest.length;
    for (var i = len - 1; i >= 0; i--) {
        r = pipe(fa.forest[i], reduceRight(r, f));
    }
    return f(fa.value, r);
}; };
/**
 * @category Extract
 * @since 2.6.2
 */
export var extract = function (wa) { return wa.value; };
/**
 * @since 2.6.3
 */
export var traverse = function (F) {
    var traverseF = A.traverse(F);
    var out = function (f) { return function (ta) {
        return F.ap(F.map(f(ta.value), function (value) { return function (forest) { return ({
            value: value,
            forest: forest
        }); }; }), pipe(ta.forest, traverseF(out(f))));
    }; };
    return out;
};
/**
 * @since 2.6.3
 */
export var sequence = function (F) { return traverse(F)(identity); };
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.7.0
 */
export var of = function (a) { return ({
    value: a,
    forest: A.empty
}); };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Tree';
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
export var Monad = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_
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
export var Comonad = {
    URI: URI,
    map: map_,
    extend: extend_,
    extract: extract
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export var tree = {
    URI: URI,
    map: map_,
    of: of,
    ap: ap_,
    chain: chain_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    extract: extract,
    extend: extend_
};
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
export var bind = function (name, f) {
    return chain(function (a) {
        return pipe(f(a), map(function (b) { return bind_(a, name, b); }));
    });
};
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
export var apS = function (name, fb) {
    return flow(map(function (a) { return function (b) { return bind_(a, name, b); }; }), ap(fb));
};
