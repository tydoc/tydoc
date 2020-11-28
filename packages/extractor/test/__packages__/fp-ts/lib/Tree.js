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
exports.apS = exports.bind = exports.bindTo = exports.Do = exports.tree = exports.Comonad = exports.Traversable = exports.Foldable = exports.Monad = exports.Applicative = exports.Functor = exports.URI = exports.of = exports.sequence = exports.traverse = exports.extract = exports.reduceRight = exports.foldMap = exports.reduce = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.fold = exports.elem = exports.unfoldForestM = exports.unfoldTreeM = exports.unfoldForest = exports.unfoldTree = exports.drawTree = exports.drawForest = exports.getEq = exports.getShow = exports.make = void 0;
var A = __importStar(require("./Array"));
var Eq_1 = require("./Eq");
var function_1 = require("./function");
/**
 * @category constructors
 * @since 2.0.0
 */
function make(value, forest) {
    if (forest === void 0) { forest = A.empty; }
    return {
        value: value,
        forest: forest
    };
}
exports.make = make;
/**
 * @category instances
 * @since 2.0.0
 */
function getShow(S) {
    var show = function (t) {
        return t.forest === A.empty || t.forest.length === 0
            ? "make(" + S.show(t.value) + ")"
            : "make(" + S.show(t.value) + ", [" + t.forest.map(show).join(', ') + "])";
    };
    return {
        show: show
    };
}
exports.getShow = getShow;
/**
 * @category instances
 * @since 2.0.0
 */
function getEq(E) {
    var SA;
    var R = Eq_1.fromEquals(function (x, y) { return E.equals(x.value, y.value) && SA.equals(x.forest, y.forest); });
    SA = A.getEq(R);
    return R;
}
exports.getEq = getEq;
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
function drawForest(forest) {
    return draw('\n', forest);
}
exports.drawForest = drawForest;
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
function drawTree(tree) {
    return tree.value + drawForest(tree.forest);
}
exports.drawTree = drawTree;
/**
 * Build a tree from a seed value
 *
 * @category constructors
 * @since 2.0.0
 */
function unfoldTree(b, f) {
    var _a = f(b), a = _a[0], bs = _a[1];
    return { value: a, forest: unfoldForest(bs, f) };
}
exports.unfoldTree = unfoldTree;
/**
 * Build a tree from a seed value
 *
 * @category constructors
 * @since 2.0.0
 */
function unfoldForest(bs, f) {
    return bs.map(function (b) { return unfoldTree(b, f); });
}
exports.unfoldForest = unfoldForest;
function unfoldTreeM(M) {
    var unfoldForestMM = unfoldForestM(M);
    return function (b, f) { return M.chain(f(b), function (_a) {
        var a = _a[0], bs = _a[1];
        return M.chain(unfoldForestMM(bs, f), function (ts) { return M.of({ value: a, forest: ts }); });
    }); };
}
exports.unfoldTreeM = unfoldTreeM;
function unfoldForestM(M) {
    var traverseM = A.traverse(M);
    return function (bs, f) {
        return function_1.pipe(bs, traverseM(function (b) { return unfoldTreeM(M)(b, f); }));
    };
}
exports.unfoldForestM = unfoldForestM;
// TODO: curry in v3
/**
 * @since 2.0.0
 */
function elem(E) {
    var go = function (a, fa) {
        if (E.equals(a, fa.value)) {
            return true;
        }
        return fa.forest.some(function (tree) { return go(a, tree); });
    };
    return go;
}
exports.elem = elem;
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
function fold(f) {
    var go = function (tree) { return f(tree.value, tree.forest.map(go)); };
    return go;
}
exports.fold = fold;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
var ap_ = function (fab, fa) {
    return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
};
/* istanbul ignore next */
var chain_ = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
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
var extend_ = function (wa, f) { return function_1.pipe(wa, exports.extend(f)); };
/* istanbul ignore next */
var traverse_ = function (F) {
    var traverseF = exports.traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
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
var ap = function (fa) { return function (fab) { return ap_(fab, fa); }; };
exports.ap = ap;
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
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = function (f) { return function (ma) {
    var _a = f(ma.value), value = _a.value, forest = _a.forest;
    var concat = A.getMonoid().concat;
    return {
        value: value,
        forest: concat(forest, ma.forest.map(exports.chain(f)))
    };
}; };
exports.chain = chain;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
var chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
exports.chainFirst = chainFirst;
/**
 * @category Extend
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) { return ({
    value: f(wa),
    forest: wa.forest.map(exports.extend(f))
}); }; };
exports.extend = extend;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
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
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function (f) { return function (fa) { return ({
    value: f(fa.value),
    forest: fa.forest.map(exports.map(f))
}); }; };
exports.map = map;
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    var r = f(b, fa.value);
    var len = fa.forest.length;
    for (var i = 0; i < len; i++) {
        r = function_1.pipe(fa.forest[i], exports.reduce(r, f));
    }
    return r;
}; };
exports.reduce = reduce;
/**
 * @category Foldable
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) {
    return exports.reduce(M.empty, function (acc, a) { return M.concat(acc, f(a)); });
}; };
exports.foldMap = foldMap;
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    var r = b;
    var len = fa.forest.length;
    for (var i = len - 1; i >= 0; i--) {
        r = function_1.pipe(fa.forest[i], exports.reduceRight(r, f));
    }
    return f(fa.value, r);
}; };
exports.reduceRight = reduceRight;
/**
 * @category Extract
 * @since 2.6.2
 */
var extract = function (wa) { return wa.value; };
exports.extract = extract;
/**
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseF = A.traverse(F);
    var out = function (f) { return function (ta) {
        return F.ap(F.map(f(ta.value), function (value) { return function (forest) { return ({
            value: value,
            forest: forest
        }); }; }), function_1.pipe(ta.forest, traverseF(out(f))));
    }; };
    return out;
};
exports.traverse = traverse;
/**
 * @since 2.6.3
 */
var sequence = function (F) { return exports.traverse(F)(function_1.identity); };
exports.sequence = sequence;
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.7.0
 */
var of = function (a) { return ({
    value: a,
    forest: A.empty
}); };
exports.of = of;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Tree';
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
exports.Comonad = {
    URI: exports.URI,
    map: map_,
    extend: extend_,
    extract: exports.extract
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
exports.tree = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: exports.sequence,
    extract: exports.extract,
    extend: extend_
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
