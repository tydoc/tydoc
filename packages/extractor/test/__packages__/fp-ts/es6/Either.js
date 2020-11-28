import { tailRec } from './ChainRec';
import { identity, pipe, bind_, bindTo_, flow } from './function';
// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category guards
 * @since 2.0.0
 */
export var isLeft = function (ma) { return ma._tag === 'Left'; };
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category guards
 * @since 2.0.0
 */
export var isRight = function (ma) { return ma._tag === 'Right'; };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 2.0.0
 */
export var left = function (e) { return ({ _tag: 'Left', left: e }); };
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
export var right = function (a) { return ({ _tag: 'Right', right: a }); };
// TODO: make lazy in v3
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/Either'
 *
 * const parse = fromNullable('nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @category constructors
 * @since 2.0.0
 */
export function fromNullable(e) {
    return function (a) { return (a == null ? left(e) : right(a)); };
}
// TODO: `onError => Lazy<A> => Either` in v3
/**
 * Constructs a new `Either` from a function that might throw.
 *
 * @example
 * import { Either, left, right, tryCatch } from 'fp-ts/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @category constructors
 * @since 2.0.0
 */
export function tryCatch(f, onError) {
    try {
        return right(f());
    }
    catch (e) {
        return left(onError(e));
    }
}
// TODO curry in v3
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError, right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
 * assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @category constructors
 * @since 2.0.0
 */
export function parseJSON(s, onError) {
    return tryCatch(function () { return JSON.parse(s); }, onError);
}
// TODO curry in v3
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(E.stringifyJSON({ a: 1 }, E.toError), E.right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(
 *   pipe(
 *     E.stringifyJSON(circular, E.toError),
 *     E.mapLeft(e => e.message.includes('Converting circular structure to JSON'))
 *   ),
 *   E.left(true)
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
export function stringifyJSON(u, onError) {
    return tryCatch(function () { return JSON.stringify(u); }, onError);
}
/**
 * Derivable from `MonadThrow`.
 *
 * @example
 * import { fromOption, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     some(1),
 *     fromOption(() => 'error')
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     none,
 *     fromOption(() => 'error')
 *   ),
 *   left('error')
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? left(onNone()) : right(ma.value);
}; };
/**
 * Derivable from `MonadThrow`.
 *
 * @example
 * import { fromPredicate, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('error')
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
export var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }; };
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { fold, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     fold(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     fold(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export function fold(onLeft, onRight) {
    return function (ma) { return (isLeft(ma) ? onLeft(ma.left) : onRight(ma.right)); };
}
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export var getOrElseW = function (onLeft) { return function (ma) {
    return isLeft(ma) ? onLeft(ma.left) : ma.right;
}; };
/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import { getOrElse, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     right(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     left('error'),
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.9.0
 */
export function fromNullableK(e) {
    var from = fromNullable(e);
    return function (f) { return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return from(f.apply(void 0, a));
    }; };
}
/**
 * @category combinators
 * @since 2.9.0
 */
export function chainNullableK(e) {
    var from = fromNullableK(e);
    return function (f) { return chain(from(f)); };
}
/**
 * Returns a `Right` if is a `Left` (and vice versa).
 *
 * @category combinators
 * @since 2.0.0
 */
export function swap(ma) {
    return isLeft(ma) ? right(ma.left) : left(ma.right);
}
/**
 * Useful for recovering from errors.
 *
 * @category combinators
 * @since 2.0.0
 */
export function orElse(onLeft) {
    return function (ma) { return (isLeft(ma) ? onLeft(ma.left) : ma); };
}
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
 * @example
 * import { filterOrElse, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     right(1),
 *     filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     right(-1),
 *     filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('error')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     left('a'),
 *     filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('a')
 * )
 *
 * @category combinators
 * @since 2.0.0
 */
export var filterOrElse = filterOrElseW;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return pipe(fa, map(f)); };
var ap_ = function (fab, fa) { return pipe(fab, ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return pipe(ma, chain(f)); };
/* istanbul ignore next */
var reduce_ = function (fa, b, f) { return pipe(fa, reduce(b, f)); };
/* istanbul ignore next */
var foldMap_ = function (M) { return function (fa, f) {
    var foldMapM = foldMap(M);
    return pipe(fa, foldMapM(f));
}; };
/* istanbul ignore next */
var reduceRight_ = function (fa, b, f) { return pipe(fa, reduceRight(b, f)); };
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return pipe(ta, traverseF(f)); };
};
var bimap_ = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
var mapLeft_ = function (fa, f) { return pipe(fa, mapLeft(f)); };
/* istanbul ignore next */
var alt_ = function (fa, that) { return pipe(fa, alt(that)); };
/* istanbul ignore next */
var extend_ = function (wa, f) { return pipe(wa, extend(f)); };
var chainRec_ = function (a, f) {
    return tailRec(f(a), function (e) {
        return isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right));
    });
};
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
export var map = function (f) { return function (fa) {
    return isLeft(fa) ? fa : right(f(fa.right));
}; };
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export var bimap = function (f, g) { return function (fa) { return (isLeft(fa) ? left(f(fa.left)) : right(g(fa.right))); }; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export var mapLeft = function (f) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : fa;
}; };
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export var apW = function (fa) { return function (fab) {
    return isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right));
}; };
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
 * Equivalent to [`right`](#right).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.of('a'), E.right('a'))
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
export var chainW = function (f) { return function (ma) {
    return isLeft(ma) ? ma : f(ma.right);
}; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export var chain = chainW;
/**
 * Less strict version of [`chainFirst`](#chainFirst)
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export var chainFirstW = function (f) { return function (ma) {
    return pipe(ma, chainW(function (a) {
        return pipe(f(a), map(function () { return a; }));
    }));
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
export var chainFirst = chainFirstW;
/**
 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
 *
 * Derivable from `Monad`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
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
export var altW = function (that) { return function (fa) { return (isLeft(fa) ? that() : fa); }; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export var alt = altW;
/**
 * @category Extend
 * @since 2.0.0
 */
export var extend = function (f) { return function (wa) {
    return isLeft(wa) ? wa : right(f(wa));
}; };
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
 * Left-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'prefix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduce(startWith, concat)),
 *   'prefix:a',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduce(startWith, concat)),
 *   'prefix',
 * )
 *
 * @category Foldable
 * @since 2.0.0
 */
export var reduce = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : f(b, fa.right);
}; };
/**
 * Map each element of the structure to a monoid, and combine the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function';
 * import * as E from 'fp-ts/Either'
 * import { monoidString } from 'fp-ts/Monoid'
 *
 * const yell = (a: string) => `${a}!`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.foldMap(monoidString)(yell)),
 *   'a!',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.foldMap(monoidString)(yell)),
 *   monoidString.empty,
 * )
 *
 * @category Foldable
 * @since 2.0.0
 */
export var foldMap = function (M) { return function (f) { return function (fa) {
    return isLeft(fa) ? M.empty : f(fa.right);
}; }; };
/**
 * Right-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'postfix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduceRight(startWith, concat)),
 *   'a:postfix',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduceRight(startWith, concat)),
 *   'postfix',
 * )
 *
 * @category Foldable
 * @since 2.0.0
 */
export var reduceRight = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : f(fa.right, b);
}; };
/**
 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as A from 'fp-ts/Array'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(['a']), E.traverse(O.option)(A.head)),
 *   O.some(E.right('a')),
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right([]), E.traverse(O.option)(A.head)),
 *   O.none,
 * )
 *
 * @category Traversable
 * @since 2.6.3
 */
export var traverse = function (F) { return function (f) { return function (ta) { return (isLeft(ta) ? F.of(left(ta.left)) : F.map(f(ta.right), right)); }; }; };
/**
 * Evaluate each monadic action in the structure from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.some('a')), E.sequence(O.option)),
 *   O.some(E.right('a')),
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.none), E.sequence(O.option)),
 *   O.none
 * )
 *
 * @category Traversable
 * @since 2.6.3
 */
export var sequence = function (F) { return function (ma) {
    return isLeft(ma) ? F.of(left(ma.left)) : F.map(ma.right, right);
}; };
/**
 * @category MonadThrow
 * @since 2.6.3
 */
export var throwError = left;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Either';
/**
 * @category instances
 * @since 2.0.0
 */
export function getShow(SE, SA) {
    return {
        show: function (ma) { return (isLeft(ma) ? "left(" + SE.show(ma.left) + ")" : "right(" + SA.show(ma.right) + ")"); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getEq(EL, EA) {
    return {
        equals: function (x, y) {
            return x === y || (isLeft(x) ? isLeft(y) && EL.equals(x.left, y.left) : isRight(y) && EA.equals(x.right, y.right));
        }
    };
}
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/Either'
 * import { semigroupSum } from 'fp-ts/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup(S) {
    return {
        concat: function (x, y) { return (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right))); }
    };
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/Either'
 * import { semigroupSum } from 'fp-ts/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
export function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (isLeft(x) ? x : isLeft(y) ? y : right(S.concat(x.right, y.right))); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: right(M.empty)
    };
}
/**
 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 3.0.0
 */
export function getFilterable(M) {
    var empty = left(M.empty);
    var compact = function (ma) {
        return isLeft(ma) ? ma : ma.right._tag === 'None' ? empty : right(ma.right.value);
    };
    var separate = function (ma) {
        return isLeft(ma)
            ? { left: ma, right: ma }
            : isLeft(ma.right)
                ? { left: right(ma.right.left), right: empty }
                : { left: empty, right: right(ma.right.right) };
    };
    var partitionMap = function (ma, f) {
        if (isLeft(ma)) {
            return { left: ma, right: ma };
        }
        var e = f(ma.right);
        return isLeft(e) ? { left: right(e.left), right: empty } : { left: empty, right: right(e.right) };
    };
    var partition = function (ma, p) {
        return isLeft(ma)
            ? { left: ma, right: ma }
            : p(ma.right)
                ? { left: empty, right: right(ma.right) }
                : { left: right(ma.right), right: empty };
    };
    var filterMap = function (ma, f) {
        if (isLeft(ma)) {
            return ma;
        }
        var ob = f(ma.right);
        return ob._tag === 'None' ? empty : right(ob.value);
    };
    var filter = function (ma, predicate) {
        return isLeft(ma) ? ma : predicate(ma.right) ? ma : empty;
    };
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: filterMap,
        partition: partition,
        partitionMap: partitionMap
    };
}
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 2.0.0
 */
export function getWitherable(M) {
    var F_ = getFilterable(M);
    var wither = function (F) {
        var traverseF = traverse_(F);
        return function (ma, f) { return F.map(traverseF(ma, f), F_.compact); };
    };
    var wilt = function (F) {
        var traverseF = traverse_(F);
        return function (ma, f) { return F.map(traverseF(ma, f), F_.separate); };
    };
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: traverse_,
        sequence: sequence,
        reduce: reduce_,
        foldMap: foldMap_,
        reduceRight: reduceRight_,
        wither: wither,
        wilt: wilt
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicativeValidation(SE) {
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) {
            return isLeft(fab)
                ? isLeft(fa)
                    ? left(SE.concat(fab.left, fa.left))
                    : fab
                : isLeft(fa)
                    ? fa
                    : right(fab.right(fa.right));
        },
        of: of
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export function getAltValidation(SE) {
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        alt: function (me, that) {
            if (isRight(me)) {
                return me;
            }
            var ea = that();
            return isLeft(ea) ? left(SE.concat(me.left, ea.left)) : ea;
        }
    };
}
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export function getValidation(SE) {
    var applicativeValidation = getApplicativeValidation(SE);
    var altValidation = getAltValidation(SE);
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        of: of,
        chain: chain_,
        bimap: bimap_,
        mapLeft: mapLeft_,
        reduce: reduce_,
        foldMap: foldMap_,
        reduceRight: reduceRight_,
        extend: extend_,
        traverse: traverse_,
        sequence: sequence,
        chainRec: chainRec_,
        throwError: throwError,
        ap: applicativeValidation.ap,
        alt: altValidation.alt
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getValidationSemigroup(SE, SA) {
    return {
        concat: function (x, y) {
            return isLeft(x) ? (isLeft(y) ? left(SE.concat(x.left, y.left)) : x) : isLeft(y) ? y : right(SA.concat(x.right, y.right));
        }
    };
}
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
/**
 * @category instances
 * @since 2.7.0
 */
export var Extend = {
    URI: URI,
    map: map_,
    extend: extend_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var ChainRec = {
    URI: URI,
    map: map_,
    ap: ap_,
    chain: chain_,
    chainRec: chainRec_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var MonadThrow = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    throwError: throwError
};
/**
 * @category instances
 * @since 2.0.0
 */
export function getValidationMonoid(SE, SA) {
    return {
        concat: getValidationSemigroup(SE, SA).concat,
        empty: right(SA.empty)
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export var either = {
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
    bimap: bimap_,
    mapLeft: mapLeft_,
    alt: alt_,
    extend: extend_,
    chainRec: chainRec_,
    throwError: throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
export function toError(e) {
    return e instanceof Error ? e : new Error(String(e));
}
/**
 * @since 2.0.0
 */
export function elem(E) {
    return function (a, ma) { return (isLeft(ma) ? false : E.equals(a, ma.right)); };
}
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import { exists, left, right } from 'fp-ts/Either'
 *
 * const gt2 = exists((n: number) => n > 2)
 *
 * assert.strictEqual(gt2(left('a')), false)
 * assert.strictEqual(gt2(right(1)), false)
 * assert.strictEqual(gt2(right(3)), true)
 *
 * @since 2.0.0
 */
export function exists(predicate) {
    return function (ma) { return (isLeft(ma) ? false : predicate(ma.right)); };
}
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
 *
 * @since 2.9.0
 */
export var traverseArrayWithIndex = function (f) { return function (arr) {
    // tslint:disable-next-line: readonly-array
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var e = f(i, arr[i]);
        if (e._tag === 'Left') {
            return e;
        }
        result.push(e.right);
    }
    return right(result);
}; };
/**
 * map an array using provided function to Either then transform to Either of the array
 * this function have the same behavior of `A.traverse(E.either)` but it's optimized and perform better
 *
 * @example
 *
 *
 * import { traverseArray, left, right, fromPredicate } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as A from 'fp-ts/Array'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(
 *   pipe(
 *     arr,
 *     traverseArray((x) => right(x))
 *   ),
 *   right(arr)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     arr,
 *     traverseArray(
 *       fromPredicate(
 *         (x) => x > 5,
 *         () => 'a'
 *       )
 *     )
 *   ),
 *   left('a')
 * )
 * @since 2.9.0
 */
export var traverseArray = function (f) { return traverseArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * convert an array of either to an either of array
 * this function have the same behavior of `A.sequence(E.either)` but it's optimized and perform better
 *
 * @example
 *
 * import { sequenceArray, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as A from 'fp-ts/Array'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(pipe(arr, A.map(right), sequenceArray), right(arr))
 * assert.deepStrictEqual(pipe(arr, A.map(right), A.cons(left('Error')), sequenceArray), left('Error'))
 *
 * @since 2.9.0
 */
export var sequenceArray = traverseArray(identity);
