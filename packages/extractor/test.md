### `/src/Alt`

The `Alt` type class identifies an associative operation on a type constructor. It is similar to `Semigroup`, except
that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than concrete types like `string` or
`number`.

`Alt` instances are required to satisfy the following laws:

1. Associativity: `A.alt(A.alt(fa, ga), ha) <-> A.alt(fa, A.alt(ga, ha))`
2. Distributivity: `A.map(A.alt(fa, ga), ab) <-> A.alt(A.map(fa, ab), A.map(ga, ab))`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Alt`

```ts
typeIndexRef
```

##### `I` `Alt1`

```ts
typeIndexRef
```

##### `I` `Alt2`

```ts
typeIndexRef
```

##### `I` `Alt2C`

```ts
typeIndexRef
```

##### `I` `Alt3`

```ts
typeIndexRef
```

##### `I` `Alt3C`

```ts
typeIndexRef
```

##### `I` `Alt4`

```ts
typeIndexRef
```

### `/src/Alternative`

The `Alternative` type class extends the `Alt` type class with a value that should be the left and right identity for `alt`.

It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
concrete types like `string` or `number`.

`Alternative` instances should satisfy the following laws:

1. Left identity: `A.alt(zero, fa) <-> fa`
2. Right identity: `A.alt(fa, zero) <-> fa`
3. Annihilation: `A.map(zero, f) <-> zero`
4. Distributivity: `A.ap(A.alt(fab, gab), fa) <-> A.alt(A.ap(fab, fa), A.ap(gab, fa))`
5. Annihilation: `A.ap(zero, fa) <-> zero`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Alternative`

```ts
typeIndexRef
```

##### `I` `Alternative1`

```ts
typeIndexRef
```

##### `I` `Alternative2`

```ts
typeIndexRef
```

##### `I` `Alternative2C`

```ts
typeIndexRef
```

##### `I` `Alternative3`

```ts
typeIndexRef
```

### `/src/Applicative`

The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
of type `f a` from values of type `a`.

Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
any number of function arguments.

Instances must satisfy the following laws in addition to the `Apply` laws:

1. Identity: `A.ap(A.of(a => a), fa) <-> fa`
2. Homomorphism: `A.ap(A.of(ab), A.of(a)) <-> A.of(ab(a))`
3. Interchange: `A.ap(fab, A.of(a)) <-> A.ap(A.of(ab => ab(a)), fab)`

Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`

@since 2.0.0

#### Exported Terms

##### `getApplicativeComposition`

<!-- prettier-ignore -->
```ts
{ <F extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer", G extends "Either" | ... 14 more ... | "Writer", E>(F: Applicative2<...>, G: Applicative2C<...>): ApplicativeCom...
```

#### Exported Types

##### `I` `Applicative`

```ts
typeIndexRef
```

##### `I` `Applicative1`

```ts
typeIndexRef
```

##### `I` `Applicative2`

```ts
typeIndexRef
```

##### `I` `Applicative2C`

```ts
typeIndexRef
```

##### `I` `Applicative3`

```ts
typeIndexRef
```

##### `I` `Applicative3C`

```ts
typeIndexRef
```

##### `I` `Applicative4`

```ts
typeIndexRef
```

##### `I` `ApplicativeComposition`

```ts
typeIndexRef
```

##### `I` `ApplicativeCompositionHKT1`

```ts
typeIndexRef
```

##### `I` `ApplicativeCompositionHKT2`

```ts
typeIndexRef
```

##### `I` `ApplicativeCompositionHKT2C`

```ts
typeIndexRef
```

##### `I` `ApplicativeComposition11`

```ts
typeIndexRef
```

##### `I` `ApplicativeComposition12`

```ts
typeIndexRef
```

##### `I` `ApplicativeComposition12C`

```ts
typeIndexRef
```

##### `I` `ApplicativeComposition21`

```ts
typeIndexRef
```

##### `I` `ApplicativeComposition2C1`

```ts
typeIndexRef
```

##### `I` `ApplicativeComposition22`

```ts
typeIndexRef
```

##### `I` `ApplicativeComposition22C`

```ts
typeIndexRef
```

### `/src/Apply`

The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.

`Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
`f`.

Instances must satisfy the following law in addition to the `Functor` laws:

1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) <-> F.ap(fbc, F.ap(fab, fa))`

Formally, `Apply` represents a strong lax semi-monoidal endofunctor.

#### Example

import \* as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

const f = (a: string) => (b: number) => (c: boolean) => a + String(b) + (c ? 'true' : 'false')
const fa: O.Option<string> = O.some('s')
const fb: O.Option<number> = O.some(1)
const fc: O.Option<boolean> = O.some(true)

assert.deepStrictEqual(
pipe(
// lift a function
O.some(f),
// apply the first argument
O.ap(fa),
// apply the second argument
O.ap(fb),
// apply the third argument
O.ap(fc)
),
O.some('s1true')
)

@since 2.0.0

#### Exported Terms

##### `sequenceT`

<!-- prettier-ignore -->
```ts
{ <F extends "StateReaderTaskEither">(F: Apply4<F>): <S, R, E, T extends Kind4<F, S, R, E, any>[]>(...t: T & { readonly 0: Kind4<F, S, R, E, any>; }) => Kind4<F, S, R, E, { [K in keyof T]: [...] extends [...] ? A : never; }>; <F extends "ReaderEither" | "ReaderTaskEither">(F: Apply3<...>): <R, E, T extends Kind3<......
```

##### `sequenceS`

<!-- prettier-ignore -->
```ts
{ <F extends "StateReaderTaskEither">(F: Apply4<F>): <S, R, E, NER extends Record<string, Kind4<F, S, R, E, any>>>(r: EnforceNonEmptyRecord<NER> & Record<...>) => Kind4<...>; <F extends "ReaderEither" | "ReaderTaskEither">(F: Apply3<...>): <R, E, NER extends Record<...>>(r: EnforceNonEmptyRecord<...> & Record<...>) ...
```

#### Exported Types

##### `I` `Apply`

```ts
typeIndexRef
```

##### `I` `Apply1`

```ts
typeIndexRef
```

##### `I` `Apply2`

```ts
typeIndexRef
```

##### `I` `Apply2C`

```ts
typeIndexRef
```

##### `I` `Apply3`

```ts
typeIndexRef
```

##### `I` `Apply3C`

```ts
typeIndexRef
```

##### `I` `Apply4`

```ts
typeIndexRef
```

### `/src/Array`

@since 2.0.0

#### Exported Terms

##### `takeLeftWhile`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (as: A[]) => B[]; <A>(predicate: Predicate<A>): (as: A[]) => A[]; }
```

##### `spanLeft`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (as: A[]) => { init: B[]; rest: A[]; }; <A>(predicate: Predicate<A>): (as: A[]) => { init: A[]; rest: A[]; }; }
```

##### `findFirst`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (as: A[]) => Option<B>; <A>(predicate: Predicate<A>): (as: A[]) => Option<A>; }
```

##### `findLast`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (as: A[]) => Option<B>; <A>(predicate: Predicate<A>): (as: A[]) => Option<A>; }
```

##### `comprehension`

<!-- prettier-ignore -->
```ts
{ <A, B, C, D, R>(input: [A[], B[], C[], D[]], f: (a: A, b: B, c: C, d: D) => R, g?: ((a: A, b: B, c: C, d: D) => boolean) | undefined): R[]; <A, B, C, R>(input: [A[], B[], C[]], f: (a: A, b: B, c: C) => R, g?: ((a: A, b: B, c: C) => boolean) | undefined): R[]; <A, R>(input: [...], f: (a: A) => R, g?: ((a: A) => boo...
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<A[]>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<A = never>() => Monoid<A[]>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Eq<A[]>
```

##### `getOrd`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => Ord<A[]>
```

##### `makeBy`

<!-- prettier-ignore -->
```ts
<A>(n: number, f: (i: number) => A) => A[]
```

##### `range`

<!-- prettier-ignore -->
```ts
(start: number, end: number) => number[]
```

##### `replicate`

<!-- prettier-ignore -->
```ts
<A>(n: number, a: A) => A[]
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<A>(mma: A[][]) => A[]
```

##### `foldLeft`

<!-- prettier-ignore -->
```ts
<A, B>(onEmpty: Lazy<B>, onCons: (head: A, tail: A[]) => B) => (as: A[]) => B
```

##### `foldRight`

<!-- prettier-ignore -->
```ts
<A, B>(onEmpty: Lazy<B>, onCons: (init: A[], last: A) => B) => (as: A[]) => B
```

##### `scanLeft`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (as: A[]) => B[]
```

##### `scanRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (as: A[]) => B[]
```

##### `isEmpty`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => boolean
```

##### `isNonEmpty`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => as is NonEmptyArray<A>
```

##### `isOutOfBound`

<!-- prettier-ignore -->
```ts
<A>(i: number, as: A[]) => boolean
```

##### `lookup`

<!-- prettier-ignore -->
```ts
{ (i: number): <A>(as: A[]) => Option<A>; <A>(i: number, as: A[]): Option<A>; }
```

##### `cons`

<!-- prettier-ignore -->
```ts
{ <A>(head: A): (tail: A[]) => NonEmptyArray<A>; <A>(head: A, tail: A[]): NonEmptyArray<A>; }
```

##### `snoc`

<!-- prettier-ignore -->
```ts
<A>(init: A[], end: A) => NonEmptyArray<A>
```

##### `head`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => Option<A>
```

##### `last`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => Option<A>
```

##### `tail`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => Option<A[]>
```

##### `init`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => Option<A[]>
```

##### `takeLeft`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: A[]) => A[]
```

##### `takeRight`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: A[]) => A[]
```

##### `dropLeft`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: A[]) => A[]
```

##### `dropRight`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: A[]) => A[]
```

##### `dropLeftWhile`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: A[]) => A[]
```

##### `findIndex`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: A[]) => Option<number>
```

##### `findFirstMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (as: A[]) => Option<B>
```

##### `findLastMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (as: A[]) => Option<B>
```

##### `findLastIndex`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: A[]) => Option<number>
```

##### `copy`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => A[]
```

##### `insertAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A) => (as: A[]) => Option<A[]>
```

##### `updateAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A) => (as: A[]) => Option<A[]>
```

##### `deleteAt`

<!-- prettier-ignore -->
```ts
(i: number) => <A>(as: A[]) => Option<A[]>
```

##### `modifyAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, f: (a: A) => A) => (as: A[]) => Option<A[]>
```

##### `reverse`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => A[]
```

##### `rights`

<!-- prettier-ignore -->
```ts
<E, A>(as: Either<E, A>[]) => A[]
```

##### `lefts`

<!-- prettier-ignore -->
```ts
<E, A>(as: Either<E, A>[]) => E[]
```

##### `sort`

<!-- prettier-ignore -->
```ts
<B>(O: Ord<B>) => <A extends B>(as: A[]) => A[]
```

##### `zipWith`

<!-- prettier-ignore -->
```ts
<A, B, C>(fa: A[], fb: B[], f: (a: A, b: B) => C) => C[]
```

##### `zip`

<!-- prettier-ignore -->
```ts
{ <B>(bs: B[]): <A>(as: A[]) => [A, B][]; <A, B>(as: A[], bs: B[]): [A, B][]; }
```

##### `unzip`

<!-- prettier-ignore -->
```ts
<A, B>(as: [A, B][]) => [A[], B[]]
```

##### `prependToAll`

<!-- prettier-ignore -->
```ts
<A>(e: A) => (xs: A[]) => A[]
```

##### `intersperse`

<!-- prettier-ignore -->
```ts
<A>(e: A) => (as: A[]) => A[]
```

##### `rotate`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: A[]) => A[]
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (a: A): (as: A[]) => boolean; (a: A, as: A[]): boolean; }
```

##### `uniq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (as: A[]) => A[]
```

##### `sortBy`

<!-- prettier-ignore -->
```ts
<B>(ords: Ord<B>[]) => <A extends B>(as: A[]) => A[]
```

##### `chop`

<!-- prettier-ignore -->
```ts
<A, B>(f: (as: NonEmptyArray<A>) => [B, A[]]) => (as: A[]) => B[]
```

##### `splitAt`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: A[]) => [A[], A[]]
```

##### `chunksOf`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: A[]) => A[][]
```

##### `union`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (xs: A[]): (ys: A[]) => A[]; (xs: A[], ys: A[]): A[]; }
```

##### `intersection`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (xs: A[]): (ys: A[]) => A[]; (xs: A[], ys: A[]): A[]; }
```

##### `difference`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (xs: A[]): (ys: A[]) => A[]; (xs: A[], ys: A[]): A[]; }
```

##### `of`

<!-- prettier-ignore -->
```ts
<A>(a: A) => A[]
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (fa: A[]) => B[]
```

##### `ap`

<!-- prettier-ignore -->
```ts
<A>(fa: A[]) => <B>(fab: ((a: A) => B)[]) => B[]
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<B>(fb: B[]) => <A>(fa: A[]) => A[]
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<B>(fb: B[]) => <A>(fa: A[]) => B[]
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B[]) => (ma: A[]) => B[]
```

##### `chainWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (index: number, a: A) => B[]) => (ma: A[]) => B[]
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B[]) => (ma: A[]) => A[]
```

##### `mapWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (i: number, a: A) => B) => (fa: A[]) => B[]
```

##### `compact`

<!-- prettier-ignore -->
```ts
<A>(fa: Option<A>[]) => A[]
```

##### `separate`

<!-- prettier-ignore -->
```ts
<A, B>(fa: Either<A, B>[]) => Separated<A[], B[]>
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: A[]) => B[]; <A>(predicate: Predicate<A>): (fa: A[]) => A[]; }
```

##### `filterMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (fa: A[]) => B[]
```

##### `partition`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: A[]) => Separated<A[], B[]>; <A>(predicate: Predicate<A>): (fa: A[]) => Separated<A[], A[]>; }
```

##### `partitionWithIndex`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: A[]) => Separated<A[], B[]>; <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: A[]) => Separated<...>; }
```

##### `partitionMap`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: A[]) => Separated<B[], C[]>
```

##### `partitionMapWithIndex`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (i: number, a: A) => Either<B, C>) => (fa: A[]) => Separated<B[], C[]>
```

##### `altW`

<!-- prettier-ignore -->
```ts
<B>(that: Lazy<B[]>) => <A>(fa: A[]) => (B | A)[]
```

##### `alt`

<!-- prettier-ignore -->
```ts
<A>(that: Lazy<A[]>) => (fa: A[]) => A[]
```

##### `filterMapWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (i: number, a: A) => Option<B>) => (fa: A[]) => B[]
```

##### `filterWithIndex`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: A[]) => B[]; <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: A[]) => A[]; }
```

##### `extend`

<!-- prettier-ignore -->
```ts
<A, B>(f: (fa: A[]) => B) => (wa: A[]) => B[]
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<A>(wa: A[]) => A[][]
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A[]) => M
```

##### `foldMapWithIndex`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: A[]) => M
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (fa: A[]) => B
```

##### `reduceWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: A[]) => B
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (fa: A[]) => B
```

##### `reduceRightWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: A[]) => B
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse1<"Array">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence1<"Array">
```

##### `traverseWithIndex`

<!-- prettier-ignore -->
```ts
PipeableTraverseWithIndex1<"Array", number>
```

##### `wither`

<!-- prettier-ignore -->
```ts
PipeableWither1<"Array">
```

##### `wilt`

<!-- prettier-ignore -->
```ts
PipeableWilt1<"Array">
```

##### `unfold`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B) => Option<[A, B]>) => A[]
```

##### `zero`

<!-- prettier-ignore -->
```ts
<A>() => A[]
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"Array">
```

##### `FunctorWithIndex`

```ts
FunctorWithIndex1<"Array", number>
```

##### `Applicative`

```ts
Applicative1<"Array">
```

##### `Monad`

```ts
Monad1<"Array">
```

##### `Unfoldable`

```ts
Unfoldable1<"Array">
```

##### `Alt`

```ts
Alt1<"Array">
```

##### `Alternative`

```ts
Alternative1<"Array">
```

##### `Extend`

```ts
Extend1<"Array">
```

##### `Compactable`

```ts
Compactable1<"Array">
```

##### `Filterable`

```ts
Filterable1<"Array">
```

##### `FilterableWithIndex`

```ts
FilterableWithIndex1<"Array", number>
```

##### `Foldable`

```ts
Foldable1<"Array">
```

##### `FoldableWithIndex`

```ts
FoldableWithIndex1<"Array", number>
```

##### `Traversable`

```ts
Traversable1<"Array">
```

##### `TraversableWithIndex`

```ts
TraversableWithIndex1<"Array", number>
```

##### `Witherable`

```ts
Witherable1<"Array">
```

##### `array`

```ts
FunctorWithIndex1<"Array", number> & Monad1<"Array"> & Unfoldable1<"Array"> & Alternative1<"Array"> & Extend1<"Array"> & FilterableWithIndex1<...> & FoldableWithIndex1<...> & TraversableWithIndex1<...> & Witherable1<...>
```

##### `unsafeInsertAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A, as: A[]) => A[]
```

##### `unsafeUpdateAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A, as: A[]) => A[]
```

##### `unsafeDeleteAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, as: A[]) => A[]
```

##### `empty`

```ts

```

##### `every`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: A[]) => boolean
```

##### `some`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: A[]) => boolean
```

##### `Do`

```ts

```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <A>(fa: A[]) => { [K in N]: A; }[]
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => B[]) => (fa: A[]) => { [K in N | keyof A]: K extends keyof A ? A[K] : B; }[]
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(name: Exclude<N, keyof A>, fb: B[]) => (fa: A[]) => { [K in N | keyof A]: K extends keyof A ? A[K] : B; }[]
```

#### Exported Types

### `/src/Bifunctor`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Bifunctor`

```ts
typeIndexRef
```

##### `I` `Bifunctor2`

```ts
typeIndexRef
```

##### `I` `Bifunctor2C`

```ts
typeIndexRef
```

##### `I` `Bifunctor3`

```ts
typeIndexRef
```

##### `I` `Bifunctor3C`

```ts
typeIndexRef
```

##### `I` `Bifunctor4`

```ts
typeIndexRef
```

### `/src/boolean`

@since 2.2.0

#### Exported Terms

##### `fold`

<!-- prettier-ignore -->
```ts
<A>(onFalse: Lazy<A>, onTrue: Lazy<A>) => (value: boolean) => A
```

#### Exported Types

### `/src/BooleanAlgebra`

Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
(equivalently, double-negation is true).

Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:

- Excluded middle: `a ∨ ¬a <-> 1`

Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".

@since 2.0.0

#### Exported Terms

##### `getFunctionBooleanAlgebra`

<!-- prettier-ignore -->
```ts
<B>(B: BooleanAlgebra<B>) => <A = never>() => BooleanAlgebra<(a: A) => B>
```

##### `getDualBooleanAlgebra`

<!-- prettier-ignore -->
```ts
<A>(B: BooleanAlgebra<A>) => BooleanAlgebra<A>
```

##### `booleanAlgebraBoolean`

```ts
BooleanAlgebra<boolean>
```

##### `booleanAlgebraVoid`

```ts
BooleanAlgebra<void>
```

#### Exported Types

##### `I` `BooleanAlgebra`

```ts
typeIndexRef
```

### `/src/Bounded`

The `Bounded` type class represents totally ordered types that have an upper and lower boundary.

Instances should satisfy the following law in addition to the `Ord` laws:

- Bounded: `bottom <= a <= top`

@since 2.0.0

#### Exported Terms

##### `boundedNumber`

```ts
Bounded<number>
```

#### Exported Types

##### `I` `Bounded`

```ts
typeIndexRef
```

### `/src/BoundedDistributiveLattice`

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

@since 2.0.0

#### Exported Terms

##### `getMinMaxBoundedDistributiveLattice`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (min: A, max: A) => BoundedDistributiveLattice<A>
```

#### Exported Types

##### `I` `BoundedDistributiveLattice`

```ts
typeIndexRef
```

### `/src/BoundedJoinSemilattice`

A `BoundedJoinSemilattice` must satisfy the following laws in addition to `JoinSemilattice` laws:

- `a ∨ 0 <-> a`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `BoundedJoinSemilattice`

```ts
typeIndexRef
```

### `/src/BoundedLattice`

A `BoundedLattice` must satisfy the following in addition to `BoundedMeetSemilattice` and `BoundedJoinSemilattice` laws:

- Absorption law for meet: `a ∧ (a ∨ b) <-> a`
- Absorption law for join: `a ∨ (a ∧ b) <-> a`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `BoundedLattice`

```ts
typeIndexRef
```

### `/src/BoundedMeetSemilattice`

A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:

- `a ∧ 1 <-> a`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `BoundedMeetSemilattice`

```ts
typeIndexRef
```

### `/src/Category`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Category`

```ts
typeIndexRef
```

##### `I` `Category2`

```ts
typeIndexRef
```

##### `I` `Category3`

```ts
typeIndexRef
```

##### `I` `Category4`

```ts
typeIndexRef
```

### `/src/Chain`

The `Chain` type class extends the `Apply` type class with a `chain` operation which composes computations in
sequence, using the return value of one computation to determine the next computation.

Instances must satisfy the following law in addition to the `Apply` laws:

1. Associativity: `F.chain(F.chain(fa, afb), bfc) <-> F.chain(fa, a => F.chain(afb(a), bfc))`

Note. `Apply`'s `ap` can be derived: `(fab, fa) => F.chain(fab, f => F.map(fa, f))`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Chain`

```ts
typeIndexRef
```

##### `I` `Chain1`

```ts
typeIndexRef
```

##### `I` `Chain2`

```ts
typeIndexRef
```

##### `I` `Chain2C`

```ts
typeIndexRef
```

##### `I` `Chain3`

```ts
typeIndexRef
```

##### `I` `Chain3C`

```ts
typeIndexRef
```

##### `I` `Chain4`

```ts
typeIndexRef
```

### `/src/ChainRec`

@since 2.0.0

#### Exported Terms

##### `tailRec`

<!-- prettier-ignore -->
```ts
<A, B>(a: A, f: (a: A) => Either<A, B>) => B
```

#### Exported Types

##### `I` `ChainRec`

```ts
typeIndexRef
```

##### `I` `ChainRec1`

```ts
typeIndexRef
```

##### `I` `ChainRec2`

```ts
typeIndexRef
```

##### `I` `ChainRec2C`

```ts
typeIndexRef
```

##### `I` `ChainRec3`

```ts
typeIndexRef
```

### `/src/Choice`

The `Choice` class extends `Profunctor` with combinators for working with
sum types.

`left` and `right` lift values in a `Profunctor` to act on the `Left` and
`Right` components of a sum, respectively.

Looking at `Choice` through the intuition of inputs and outputs
yields the following type signature:

```purescript
left ::  forall input output a. p input output -> p (Either input a) (Either output a)
right :: forall input output a. p input output -> p (Either a input) (Either a output)
```

If we specialize the profunctor `p` to the `function` arrow, we get the following type
signatures:

```purescript
left ::  forall input output a. (input -> output) -> (Either input a) -> (Either output a)
right :: forall input output a. (input -> output) -> (Either a input) -> (Either a output)
```

When the `profunctor` is `Function` application, `left` allows you to map a function over the
left side of an `Either`, and `right` maps it over the right side (same as `map` would do).

Adapted from https://github.com/purescript/purescript-profunctor/blob/master/src/Data/Profunctor/Choice.purs

@since 2.0.0

#### Exported Terms

##### `splitChoice`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither">(F: Category3<F> & Choice3<F>): <R, A, B, C, D>(pab: Kind3<F, R, A, B>, pcd: Kind3<F, R, C, D>) => Kind3<...>; <F extends "Either" | ... 14 more ... | "Writer">(F: Category2<...> & Choice2<...>): <A, B, C, D>(pab: Kind2<...>, pcd: Kind2<...>) => Kind2<...>; <F>(F: Cat...
```

##### `fanin`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither">(F: Category3<F> & Choice3<F>): <R, A, B, C>(pac: Kind3<F, R, A, C>, pbc: Kind3<F, R, B, C>) => Kind3<...>; <F extends "Either" | ... 14 more ... | "Writer">(F: Category2<...> & Choice2<...>): <A, B, C>(pac: Kind2<...>, pbc: Kind2<...>) => Kind2<...>; <F>(F: Category<...
```

#### Exported Types

##### `I` `Choice`

```ts
typeIndexRef
```

##### `I` `Choice2`

```ts
typeIndexRef
```

##### `I` `Choice3`

```ts
typeIndexRef
```

##### `I` `Choice4`

```ts
typeIndexRef
```

### `/src/Comonad`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Comonad`

```ts
typeIndexRef
```

##### `I` `Comonad1`

```ts
typeIndexRef
```

##### `I` `Comonad2`

```ts
typeIndexRef
```

##### `I` `Comonad2C`

```ts
typeIndexRef
```

##### `I` `Comonad3`

```ts
typeIndexRef
```

### `/src/Compactable`

`Compactable` represents data structures which can be _compacted_/_filtered_. This is a generalization of
`catOptions` as a new function `compact`. `compact` has relations with `Functor`, `Applicative`,
`Monad`, `Alternative`, and `Traversable` in that we can use these classes to provide the ability to
operate on a data type by eliminating intermediate `None`s. This is useful for representing the filtering out of
values, or failure.

Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Compactable.purs

@since 2.0.0

#### Exported Terms

##### `getCompactableComposition`

<!-- prettier-ignore -->
```ts
{ <F extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer", G extends "ReaderEither" | "ReaderTaskEither", E>(F: Functor2<...>, G: Compactable3C<...> & Functor3C<...>): Com...
```

#### Exported Types

##### `I` `Separated`

```ts
typeIndexRef
```

##### `I` `Compactable`

```ts
typeIndexRef
```

##### `I` `Compactable1`

```ts
typeIndexRef
```

##### `I` `Compactable2`

```ts
typeIndexRef
```

##### `I` `Compactable2C`

```ts
typeIndexRef
```

##### `I` `Compactable3`

```ts
typeIndexRef
```

##### `I` `Compactable3C`

```ts
typeIndexRef
```

##### `I` `Compactable4`

```ts
typeIndexRef
```

##### `I` `CompactableComposition`

```ts
typeIndexRef
```

##### `I` `CompactableComposition11`

```ts
typeIndexRef
```

##### `I` `CompactableComposition12`

```ts
typeIndexRef
```

##### `I` `CompactableComposition12C`

```ts
typeIndexRef
```

##### `I` `CompactableComposition21`

```ts
typeIndexRef
```

##### `I` `CompactableComposition2C1`

```ts
typeIndexRef
```

##### `I` `CompactableComposition22`

```ts
typeIndexRef
```

##### `I` `CompactableComposition22C`

```ts
typeIndexRef
```

##### `I` `CompactableComposition23`

```ts
typeIndexRef
```

##### `I` `CompactableComposition23C`

```ts
typeIndexRef
```

### `/src/Console`

@since 2.0.0

#### Exported Terms

##### `log`

<!-- prettier-ignore -->
```ts
(s: unknown) => IO<void>
```

##### `warn`

<!-- prettier-ignore -->
```ts
(s: unknown) => IO<void>
```

##### `error`

<!-- prettier-ignore -->
```ts
(s: unknown) => IO<void>
```

##### `info`

<!-- prettier-ignore -->
```ts
(s: unknown) => IO<void>
```

#### Exported Types

### `/src/Const`

The `Const` type constructor, which wraps its first type argument and ignores its second.
That is, `Const<E, A>` is isomorphic to `E` for any `A`.

`Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
while ignoring return values.

@since 2.0.0

#### Exported Terms

##### `getShow`

<!-- prettier-ignore -->
```ts
<E, A>(S: Show<E>) => Show<Const<E, A>>
```

##### `getApply`

<!-- prettier-ignore -->
```ts
<E>(S: Semigroup<E>) => Apply2C<"Const", E>
```

##### `getApplicative`

<!-- prettier-ignore -->
```ts
<E>(M: Monoid<E>) => Applicative2C<"Const", E>
```

##### `make`

<!-- prettier-ignore -->
```ts
<E, A = never>(e: E) => Const<E, A>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<E, A>(E: Eq<E>) => Eq<Const<E, A>>
```

##### `getOrd`

<!-- prettier-ignore -->
```ts
<E, A>(O: Ord<E>) => Ord<Const<E, A>>
```

##### `getBounded`

<!-- prettier-ignore -->
```ts
<E, A>(B: Bounded<E>) => Bounded<Const<E, A>>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(S: Semigroup<E>) => Semigroup<Const<E, A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<E, A>(M: Monoid<E>) => Monoid<Const<E, A>>
```

##### `getSemiring`

<!-- prettier-ignore -->
```ts
<E, A>(S: Semiring<E>) => Semiring<Const<E, A>>
```

##### `getRing`

<!-- prettier-ignore -->
```ts
<E, A>(S: Ring<E>) => Ring<Const<E, A>>
```

##### `getHeytingAlgebra`

<!-- prettier-ignore -->
```ts
<E, A>(H: HeytingAlgebra<E>) => HeytingAlgebra<Const<E, A>>
```

##### `getBooleanAlgebra`

<!-- prettier-ignore -->
```ts
<E, A>(H: BooleanAlgebra<E>) => BooleanAlgebra<Const<E, A>>
```

##### `contramap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Const<E, A>) => Const<G, B>
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <A>(fa: Const<E, A>) => Const<G, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"Const">
```

##### `Contravariant`

```ts
Contravariant2<"Const">
```

##### `Bifunctor`

```ts
Bifunctor2<"Const">
```

##### `const_`

```ts
Functor2<"Const"> & Contravariant2<"Const"> & Bifunctor2<"Const">
```

#### Exported Types

##### `&` `Const`

```ts
typeIndexRef
```

### `/src/Contravariant`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Contravariant`

```ts
typeIndexRef
```

##### `I` `Contravariant1`

```ts
typeIndexRef
```

##### `I` `Contravariant2`

```ts
typeIndexRef
```

##### `I` `Contravariant2C`

```ts
typeIndexRef
```

##### `I` `Contravariant3`

```ts
typeIndexRef
```

##### `I` `Contravariant3C`

```ts
typeIndexRef
```

##### `I` `Contravariant4`

```ts
typeIndexRef
```

### `/src/Date`

@since 2.0.0

#### Exported Terms

##### `create`

<!-- prettier-ignore -->
```ts
IO<Date>
```

##### `now`

<!-- prettier-ignore -->
```ts
IO<number>
```

##### `eqDate`

```ts
Eq<Date>
```

##### `eqMonth`

```ts
Eq<Date>
```

##### `eqYear`

```ts
Eq<Date>
```

#### Exported Types

### `/src/DistributiveLattice`

A `DistributiveLattice` must satisfy the following laws in addition to `Lattice` laws:

- Distributivity for meet: `a ∨ (b ∧ c) <-> (a ∨ b) ∧ (a ∨ c)`
- Distributivity for join: `a ∧ (b ∨ c) <-> (a ∧ b) ∨ (a ∧ c)`

@since 2.0.0

#### Exported Terms

##### `getMinMaxDistributiveLattice`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => DistributiveLattice<A>
```

#### Exported Types

##### `I` `DistributiveLattice`

```ts
typeIndexRef
```

### `/src/Either`

```ts
type Either<E, A> = Left<E> | Right<A>
```

Represents a value of one of two possible types (a disjoint union).

An instance of `Either` is either an instance of `Left` or `Right`.

A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
`None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
dictates that `Left` is used for failure and `Right` is used for success.

@since 2.0.0

#### Exported Terms

##### `fromNullable`

<!-- prettier-ignore -->
```ts
<E>(e: E) => <A>(a: A) => Either<E, NonNullable<A>>
```

##### `tryCatch`

<!-- prettier-ignore -->
```ts
<E, A>(f: Lazy<A>, onError: (e: unknown) => E) => Either<E, A>
```

##### `parseJSON`

<!-- prettier-ignore -->
```ts
<E>(s: string, onError: (reason: unknown) => E) => Either<E, Json>
```

##### `stringifyJSON`

<!-- prettier-ignore -->
```ts
<E>(u: unknown, onError: (reason: unknown) => E) => Either<E, string>
```

##### `fold`

<!-- prettier-ignore -->
```ts
<E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Either<E, A>) => B
```

##### `fromNullableK`

<!-- prettier-ignore -->
```ts
<E>(e: E) => <A extends readonly unknown[], B>(f: (...a: A) => B | null | undefined) => (...a: A) => Either<E, NonNullable<B>>
```

##### `chainNullableK`

<!-- prettier-ignore -->
```ts
<E>(e: E) => <A, B>(f: (a: A) => B | null | undefined) => (ma: Either<E, A>) => Either<E, NonNullable<B>>
```

##### `swap`

<!-- prettier-ignore -->
```ts
<E, A>(ma: Either<E, A>) => Either<A, E>
```

##### `orElse`

<!-- prettier-ignore -->
```ts
<E, A, M>(onLeft: (e: E) => Either<M, A>) => (ma: Either<E, A>) => Either<M, A>
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<E, A>(SE: Show<E>, SA: Show<A>) => Show<Either<E, A>>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<E, A>(EL: Eq<E>, EA: Eq<A>) => Eq<Either<E, A>>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(S: Semigroup<A>) => Semigroup<Either<E, A>>
```

##### `getApplySemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(S: Semigroup<A>) => Semigroup<Either<E, A>>
```

##### `getApplyMonoid`

<!-- prettier-ignore -->
```ts
<E, A>(M: Monoid<A>) => Monoid<Either<E, A>>
```

##### `getFilterable`

<!-- prettier-ignore -->
```ts
<E>(M: Monoid<E>) => Filterable2C<"Either", E>
```

##### `getWitherable`

<!-- prettier-ignore -->
```ts
<E>(M: Monoid<E>) => Witherable2C<"Either", E>
```

##### `getApplicativeValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Applicative2C<"Either", E>
```

##### `getAltValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Alt2C<"Either", E>
```

##### `getValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Monad2C<"Either", E> & Foldable2<"Either"> & Traversable2<"Either"> & Bifunctor2<"Either"> & Alt2C<...> & Extend2<...> & ChainRec2C<...> & MonadThrow2C<...>
```

##### `getValidationSemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(SE: Semigroup<E>, SA: Semigroup<A>) => Semigroup<Either<E, A>>
```

##### `getValidationMonoid`

<!-- prettier-ignore -->
```ts
<E, A>(SE: Semigroup<E>, SA: Monoid<A>) => Monoid<Either<E, A>>
```

##### `toError`

<!-- prettier-ignore -->
```ts
(e: unknown) => Error
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => <E>(a: A, ma: Either<E, A>) => boolean
```

##### `exists`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => <E>(ma: Either<E, A>) => boolean
```

##### `isLeft`

<!-- prettier-ignore -->
```ts
<E, A>(ma: Either<E, A>) => ma is Left<E>
```

##### `isRight`

<!-- prettier-ignore -->
```ts
<E, A>(ma: Either<E, A>) => ma is Right<A>
```

##### `left`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(e: E) => Either<E, A>
```

##### `right`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(a: A) => Either<E, A>
```

##### `fromOption`

<!-- prettier-ignore -->
```ts
<E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Either<E, A>
```

##### `fromPredicate`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Either<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<...>; }
```

##### `getOrElseW`

<!-- prettier-ignore -->
```ts
<E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>) => B | A
```

##### `getOrElse`

<!-- prettier-ignore -->
```ts
<E, A>(onLeft: (e: E) => A) => (ma: Either<E, A>) => A
```

##### `filterOrElse`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<...>) => Either<...>; }
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Either<E, A>) => Either<G, B>
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <A>(fa: Either<E, A>) => Either<G, A>
```

##### `apW`

<!-- prettier-ignore -->
```ts
<D, A>(fa: Either<D, A>) => <E, B>(fab: Either<E, (a: A) => B>) => Either<D | E, B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<E, A>(a: A) => Either<E, A>
```

##### `chainW`

<!-- prettier-ignore -->
```ts
<D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: Either<E, A>) => Either<D | E, B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B>
```

##### `chainFirstW`

<!-- prettier-ignore -->
```ts
<D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: Either<E, A>) => Either<D | E, A>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<E, A>(mma: Either<E, Either<E, A>>) => Either<E, A>
```

##### `altW`

<!-- prettier-ignore -->
```ts
<E2, B>(that: Lazy<Either<E2, B>>) => <E1, A>(fa: Either<E1, A>) => Either<E2 | E1, B | A>
```

##### `alt`

<!-- prettier-ignore -->
```ts
<E, A>(that: Lazy<Either<E, A>>) => (fa: Either<E, A>) => Either<E, A>
```

##### `extend`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B>
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<E, A>(ma: Either<E, A>) => Either<E, Either<E, A>>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Either<E, A>) => M
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse2<"Either">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence2<"Either">
```

##### `throwError`

<!-- prettier-ignore -->
```ts
<E, A>(e: E) => Either<E, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"Either">
```

##### `Applicative`

```ts
Applicative2<"Either">
```

##### `Monad`

```ts
Monad2<"Either">
```

##### `Foldable`

```ts
Foldable2<"Either">
```

##### `Traversable`

```ts
Traversable2<"Either">
```

##### `Bifunctor`

```ts
Bifunctor2<"Either">
```

##### `Alt`

```ts
Alt2<"Either">
```

##### `Extend`

```ts
Extend2<"Either">
```

##### `ChainRec`

```ts
ChainRec2<"Either">
```

##### `MonadThrow`

```ts
MonadThrow2<"Either">
```

##### `either`

```ts
Monad2<"Either"> & Foldable2<"Either"> & Traversable2<"Either"> & Bifunctor2<"Either"> & Alt2<"Either"> & Extend2<"Either"> & ChainRec2<...> & MonadThrow2<...>
```

##### `Do`

Of type [`Either`](#either)

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <E, A>(fa: Either<E, A>) => Either<E, { [K in N]: A; }>
```

##### `bindW`

<!-- prettier-ignore -->
```ts
<N extends string, A, D, B>(name: Exclude<N, keyof A>, f: (a: A) => Either<D, B>) => <E>(fa: Either<E, A>) => Either<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, E, B>(name: Exclude<N, keyof A>, f: (a: A) => Either<E, B>) => (fa: Either<E, A>) => Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apSW`

<!-- prettier-ignore -->
```ts
<A, N extends string, D, B>(name: Exclude<N, keyof A>, fb: Either<D, B>) => <E>(fa: Either<E, A>) => Either<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, E, B>(name: Exclude<N, keyof A>, fb: Either<E, B>) => (fa: Either<E, A>) => Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (index: number, a: A) => Either<E, B>) => (arr: readonly A[]) => Either<E, readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => (arr: readonly A[]) => Either<E, readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<E, A>(arr: readonly Either<E, A>[]) => Either<E, readonly A[]>
```

#### Exported Types

##### `I` `Left`

```ts
typeIndexRef
```

##### `I` `Right`

```ts
typeIndexRef
```

##### `|` `Either`

```ts
typeIndexRef
```

##### `|` `Json`

```ts
typeIndexRef
```

##### `I` `JsonRecord`

```ts
typeIndexRef
```

##### `I` `JsonArray`

```ts
typeIndexRef
```

### `/src/EitherT`

@since 2.0.0

#### Exported Terms

##### `getEitherM`

<!-- prettier-ignore -->
```ts
{ <M extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer">(M: Monad2<...>): EitherM2<...>; <M extends "Option" | ... 11 more ... | "Tree">(M: Monad1<...>): EitherM1<...>; ...
```

#### Exported Types

##### `I` `EitherT`

```ts
typeIndexRef
```

##### `I` `EitherM`

```ts
typeIndexRef
```

##### `` `EitherT1`

```ts
unsupported
```

##### `I` `EitherM1`

```ts
typeIndexRef
```

##### `` `EitherT2`

```ts
unsupported
```

##### `I` `EitherM2`

```ts
typeIndexRef
```

### `/src/Extend`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Extend`

```ts
typeIndexRef
```

##### `I` `Extend1`

```ts
typeIndexRef
```

##### `I` `Extend2`

```ts
typeIndexRef
```

##### `I` `Extend2C`

```ts
typeIndexRef
```

##### `I` `Extend3`

```ts
typeIndexRef
```

##### `I` `Extend3C`

```ts
typeIndexRef
```

##### `I` `Extend4`

```ts
typeIndexRef
```

### `/src/Field`

Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs

@since 2.0.0

#### Exported Terms

##### `gcd`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>, field: Field<A>) => (x: A, y: A) => A
```

##### `lcm`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>, F: Field<A>) => (x: A, y: A) => A
```

##### `fieldNumber`

```ts
Field<number>
```

#### Exported Types

##### `I` `Field`

```ts
typeIndexRef
```

### `/src/Filterable`

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs

@since 2.0.0

#### Exported Terms

##### `getFilterableComposition`

<!-- prettier-ignore -->
```ts
{ <F extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer", G extends "ReaderEither" | "ReaderTaskEither", E>(F: Functor2<...>, G: Filterable3C<...>): FilterableComposition...
```

#### Exported Types

##### `F` `Filter`

```ts
typeIndexRef
```

##### `F` `Partition`

```ts
typeIndexRef
```

##### `I` `Filterable`

```ts
typeIndexRef
```

##### `F` `Filter1`

```ts
typeIndexRef
```

##### `F` `Partition1`

```ts
typeIndexRef
```

##### `I` `Filterable1`

```ts
typeIndexRef
```

##### `F` `Filter2`

```ts
typeIndexRef
```

##### `F` `Partition2`

```ts
typeIndexRef
```

##### `I` `Filterable2`

```ts
typeIndexRef
```

##### `F` `Filter2C`

```ts
typeIndexRef
```

##### `F` `Partition2C`

```ts
typeIndexRef
```

##### `I` `Filterable2C`

```ts
typeIndexRef
```

##### `F` `Filter3`

```ts
typeIndexRef
```

##### `F` `Partition3`

```ts
typeIndexRef
```

##### `I` `Filterable3`

```ts
typeIndexRef
```

##### `F` `Filter3C`

```ts
typeIndexRef
```

##### `F` `Partition3C`

```ts
typeIndexRef
```

##### `I` `Filterable3C`

```ts
typeIndexRef
```

##### `F` `Filter4`

```ts
typeIndexRef
```

##### `F` `Partition4`

```ts
typeIndexRef
```

##### `I` `Filterable4`

```ts
typeIndexRef
```

##### `I` `FilterableComposition`

```ts
typeIndexRef
```

##### `I` `FilterableComposition11`

```ts
typeIndexRef
```

##### `I` `FilterableComposition12`

```ts
typeIndexRef
```

##### `I` `FilterableComposition12C`

```ts
typeIndexRef
```

##### `I` `FilterableComposition21`

```ts
typeIndexRef
```

##### `I` `FilterableComposition2C1`

```ts
typeIndexRef
```

##### `I` `FilterableComposition22`

```ts
typeIndexRef
```

##### `I` `FilterableComposition22C`

```ts
typeIndexRef
```

##### `I` `FilterableComposition23C`

```ts
typeIndexRef
```

### `/src/FilterableWithIndex`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `F` `RefinementWithIndex`

```ts
typeIndexRef
```

##### `F` `PredicateWithIndex`

```ts
typeIndexRef
```

##### `F` `FilterWithIndex`

```ts
typeIndexRef
```

##### `F` `PartitionWithIndex`

```ts
typeIndexRef
```

##### `I` `FilterableWithIndex`

```ts
typeIndexRef
```

##### `F` `FilterWithIndex1`

```ts
typeIndexRef
```

##### `F` `PartitionWithIndex1`

```ts
typeIndexRef
```

##### `I` `FilterableWithIndex1`

```ts
typeIndexRef
```

##### `F` `FilterWithIndex2`

```ts
typeIndexRef
```

##### `F` `PartitionWithIndex2`

```ts
typeIndexRef
```

##### `I` `FilterableWithIndex2`

```ts
typeIndexRef
```

##### `F` `FilterWithIndex2C`

```ts
typeIndexRef
```

##### `F` `PartitionWithIndex2C`

```ts
typeIndexRef
```

##### `I` `FilterableWithIndex2C`

```ts
typeIndexRef
```

##### `F` `FilterWithIndex3`

```ts
typeIndexRef
```

##### `F` `FilterWithIndex3C`

```ts
typeIndexRef
```

##### `I` `FilterableWithIndex3C`

```ts
typeIndexRef
```

##### `F` `PartitionWithIndex3`

```ts
typeIndexRef
```

##### `F` `PartitionWithIndex3C`

```ts
typeIndexRef
```

##### `I` `FilterableWithIndex3`

```ts
typeIndexRef
```

##### `F` `FilterWithIndex4`

```ts
typeIndexRef
```

##### `F` `PartitionWithIndex4`

```ts
typeIndexRef
```

##### `I` `FilterableWithIndex4`

```ts
typeIndexRef
```

### `/src/Foldable`

@since 2.0.0

#### Exported Terms

##### `getFoldableComposition`

<!-- prettier-ignore -->
```ts
{ <F extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer", G extends "Either" | ... 14 more ... | "Writer", E>(F: Foldable2<...>, G: Foldable2C<...>): FoldableComposition2...
```

##### `foldM`

<!-- prettier-ignore -->
```ts
{ <M extends "ReaderEither" | "ReaderTaskEither", F extends "Option" | "ReadonlyRecord" | "Ord" | "Eq" | "ReadonlyArray" | "ReadonlyNonEmptyArray" | "NonEmptyArray" | "Array" | "IO" | "Identity" | "Task" | "Record" | "Tree">(M: Monad3<...>, F: Foldable1<...>): <R, E, A, B>(fa: Kind<...>, b: B, f: (b: B, a: A) => Kin...
```

##### `reduceM`

<!-- prettier-ignore -->
```ts
{ <M extends "ReaderEither" | "ReaderTaskEither", F extends "Option" | "ReadonlyRecord" | "Ord" | "Eq" | "ReadonlyArray" | "ReadonlyNonEmptyArray" | "NonEmptyArray" | "Array" | "IO" | "Identity" | "Task" | "Record" | "Tree">(M: Monad3<...>, F: Foldable1<...>): <B, A, R, E>(b: B, f: (b: B, a: A) => Kind3<...>) => (fa...
```

##### `intercalate`

<!-- prettier-ignore -->
```ts
{ <M, F extends "ReaderEither" | "ReaderTaskEither">(M: Monoid<M>, F: Foldable3<F>): <R, E>(sep: M, fm: Kind3<F, R, E, M>) => M; <M, F extends "Either" | ... 14 more ... | "Writer">(M: Monoid<...>, F: Foldable2<...>): <E>(sep: M, fm: Kind2<...>) => M; <M, F extends "Either" | ... 14 more ... | "Writer", E>(M: Monoid...
```

##### `toArray`

<!-- prettier-ignore -->
```ts
{ <F extends "StateReaderTaskEither">(F: Foldable4<F>): <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => readonly A[]; <F extends "ReaderEither" | "ReaderTaskEither">(F: Foldable3<F>): <R, E, A>(fa: Kind3<...>) => readonly A[]; <F extends "ReaderEither" | "ReaderTaskEither", E>(F: Foldable3C<...>): <R, A>(fa: Kind3<...>) =...
```

##### `traverse_`

<!-- prettier-ignore -->
```ts
{ <M extends "ReaderEither" | "ReaderTaskEither", F extends "Option" | "ReadonlyRecord" | "Ord" | "Eq" | "ReadonlyArray" | "ReadonlyNonEmptyArray" | "NonEmptyArray" | "Array" | "IO" | "Identity" | "Task" | "Record" | "Tree">(M: Applicative3<...>, F: Foldable1<...>): <R, E, A, B>(fa: Kind<...>, f: (a: A) => Kind3<......
```

#### Exported Types

##### `I` `Foldable`

```ts
typeIndexRef
```

##### `I` `Foldable1`

```ts
typeIndexRef
```

##### `I` `Foldable2`

```ts
typeIndexRef
```

##### `I` `Foldable2C`

```ts
typeIndexRef
```

##### `I` `Foldable3`

```ts
typeIndexRef
```

##### `I` `Foldable3C`

```ts
typeIndexRef
```

##### `I` `Foldable4`

```ts
typeIndexRef
```

##### `I` `FoldableComposition`

```ts
typeIndexRef
```

##### `I` `FoldableComposition11`

```ts
typeIndexRef
```

##### `I` `FoldableComposition12`

```ts
typeIndexRef
```

##### `I` `FoldableComposition12C`

```ts
typeIndexRef
```

##### `I` `FoldableComposition21`

```ts
typeIndexRef
```

##### `I` `FoldableComposition2C1`

```ts
typeIndexRef
```

##### `I` `FoldableComposition22`

```ts
typeIndexRef
```

##### `I` `FoldableComposition22C`

```ts
typeIndexRef
```

### `/src/FoldableWithIndex`

A `Foldable` with an additional index.
A `FoldableWithIndex` instance must be compatible with its `Foldable` instance

```ts
reduce(fa, b, f) = reduceWithIndex(fa, b, (_, b, a) => f(b, a))
foldMap(M)(fa, f) = foldMapWithIndex(M)(fa, (_, a) => f(a))
reduceRight(fa, b, f) = reduceRightWithIndex(fa, b, (_, a, b) => f(a, b))
```

@since 2.0.0

#### Exported Terms

##### `getFoldableWithIndexComposition`

<!-- prettier-ignore -->
```ts
{ <F extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer", FI, G extends "Either" | ... 14 more ... | "Writer", GI, E>(F: FoldableWithIndex2<...>, G: FoldableWithIndex2C<....
```

#### Exported Types

##### `I` `FoldableWithIndex`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndex1`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndex2`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndex2C`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndex3`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndex3C`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndex4`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndexComposition`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndexComposition11`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndexComposition12`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndexComposition12C`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndexComposition21`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndexComposition2C1`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndexComposition22`

```ts
typeIndexRef
```

##### `I` `FoldableWithIndexComposition22C`

```ts
typeIndexRef
```

### `/src/function`

@since 2.0.0

#### Exported Terms

##### `identity`

<!-- prettier-ignore -->
```ts
<A>(a: A) => A
```

##### `not`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => Predicate<A>
```

##### `constant`

<!-- prettier-ignore -->
```ts
<A>(a: A) => Lazy<A>
```

##### `flip`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (a: A, b: B) => C) => (b: B, a: A) => C
```

##### `flow`

<!-- prettier-ignore -->
```ts
{ <A extends readonly unknown[], B>(ab: (...a: A) => B): (...a: A) => B; <A extends readonly unknown[], B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C; <A extends readonly unknown[], B, C, D>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (...a: A) => D; <A extends readonly unknown[], B, C, D, E>...
```

##### `tuple`

<!-- prettier-ignore -->
```ts
<T extends readonly any[]>(...t: T) => T
```

##### `increment`

<!-- prettier-ignore -->
```ts
(n: number) => number
```

##### `decrement`

<!-- prettier-ignore -->
```ts
(n: number) => number
```

##### `absurd`

<!-- prettier-ignore -->
```ts
<A>(_: never) => A
```

##### `tupled`

<!-- prettier-ignore -->
```ts
<A extends readonly unknown[], B>(f: (...a: A) => B) => (a: A) => B
```

##### `untupled`

<!-- prettier-ignore -->
```ts
<A extends readonly unknown[], B>(f: (a: A) => B) => (...a: A) => B
```

##### `pipe`

<!-- prettier-ignore -->
```ts
{ <A>(a: A): A; <A, B>(a: A, ab: (a: A) => B): B; <A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C; <A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D; <A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E; <A, B, C, D, E, F>(a: A, ab: (a: A) => B, bc:...
```

##### `unsafeCoerce`

<!-- prettier-ignore -->
```ts
<A, B>(a: A) => B
```

##### `constTrue`

<!-- prettier-ignore -->
```ts
Lazy<boolean>
```

##### `constFalse`

<!-- prettier-ignore -->
```ts
Lazy<boolean>
```

##### `constNull`

<!-- prettier-ignore -->
```ts
Lazy<null>
```

##### `constUndefined`

<!-- prettier-ignore -->
```ts
Lazy<undefined>
```

##### `constVoid`

<!-- prettier-ignore -->
```ts
Lazy<void>
```

##### `hole`

<!-- prettier-ignore -->
```ts
<T>() => T
```

##### `bind_`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(a: A, name: Exclude<N, keyof A>, b: B) => { [K in N | keyof A]: K extends keyof A ? A[K] : B; }
```

##### `bindTo_`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <B>(b: B) => { [K in N]: B; }
```

#### Exported Types

##### `F` `Lazy`

```ts
typeIndexRef
```

##### `F` `Predicate`

```ts
typeIndexRef
```

##### `F` `Refinement`

```ts
typeIndexRef
```

##### `F` `Endomorphism`

```ts
typeIndexRef
```

##### `F` `FunctionN`

```ts
typeIndexRef
```

### `/src/Functor`

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.map(fa, a => a) <-> fa`
2. Composition: `F.map(fa, a => bc(ab(a))) <-> F.map(F.map(fa, ab), bc)`

@since 2.0.0

#### Exported Terms

##### `getFunctorComposition`

<!-- prettier-ignore -->
```ts
{ <F extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer", G extends "ReaderEither" | "ReaderTaskEither", E>(F: Functor2<...>, G: Functor3C<...>): FunctorComposition23C<.....
```

#### Exported Types

##### `I` `Functor`

```ts
typeIndexRef
```

##### `I` `Functor1`

```ts
typeIndexRef
```

##### `I` `Functor2`

```ts
typeIndexRef
```

##### `I` `Functor2C`

```ts
typeIndexRef
```

##### `I` `Functor3`

```ts
typeIndexRef
```

##### `I` `Functor3C`

```ts
typeIndexRef
```

##### `I` `Functor4`

```ts
typeIndexRef
```

##### `I` `FunctorComposition`

```ts
typeIndexRef
```

##### `I` `FunctorCompositionHKT1`

```ts
typeIndexRef
```

##### `I` `FunctorCompositionHKT2`

```ts
typeIndexRef
```

##### `I` `FunctorCompositionHKT2C`

```ts
typeIndexRef
```

##### `I` `FunctorComposition11`

```ts
typeIndexRef
```

##### `I` `FunctorComposition12`

```ts
typeIndexRef
```

##### `I` `FunctorComposition12C`

```ts
typeIndexRef
```

##### `I` `FunctorComposition21`

```ts
typeIndexRef
```

##### `I` `FunctorComposition2C1`

```ts
typeIndexRef
```

##### `I` `FunctorComposition22`

```ts
typeIndexRef
```

##### `I` `FunctorComposition22C`

```ts
typeIndexRef
```

##### `I` `FunctorComposition23`

```ts
typeIndexRef
```

##### `I` `FunctorComposition23C`

```ts
typeIndexRef
```

### `/src/FunctorWithIndex`

A `FunctorWithIndex` is a type constructor which supports a mapping operation `mapWithIndex`.

`mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.mapWithIndex(fa, (_i, a) => a) <-> fa`
2. Composition: `F.mapWithIndex(fa, (_i, a) => bc(ab(a))) <-> F.mapWithIndex(F.mapWithIndex(fa, ab), bc)`

@since 2.0.0

#### Exported Terms

##### `getFunctorWithIndexComposition`

<!-- prettier-ignore -->
```ts
{ <F extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer", FI, G extends "Either" | ... 14 more ... | "Writer", GI, E>(F: FunctorWithIndex2<...>, G: FunctorWithIndex2C<......
```

#### Exported Types

##### `I` `FunctorWithIndex`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndex1`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndex2`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndex2C`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndex3`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndex3C`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndex4`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndexComposition`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndexComposition11`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndexComposition12`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndexComposition12C`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndexComposition21`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndexComposition2C1`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndexComposition22`

```ts
typeIndexRef
```

##### `I` `FunctorWithIndexComposition22C`

```ts
typeIndexRef
```

### `/src/Group`

A `Group` is a `Monoid` with inverses. Instances must satisfy the following law in addition to the monoid laws:

- Inverse: `concat(inverse(a), a) <-> empty = concat(a, inverse(a))`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Group`

```ts
typeIndexRef
```

### `/src/HeytingAlgebra`

Heyting algebras are bounded (distributive) lattices that are also equipped with an additional binary operation
`implies` (also written as `→`). Heyting algebras also define a complement operation `not` (sometimes written as
`¬a`)

However, in Heyting algebras this operation is only a pseudo-complement, since Heyting algebras do not necessarily
provide the law of the excluded middle. This means that there is no guarantee that `a ∨ ¬a = 1`.

Heyting algebras model intuitionistic logic. For a model of classical logic, see the boolean algebra type class
implemented as `BooleanAlgebra`.

A `HeytingAlgebra` must satisfy the following laws in addition to `BoundedDistributiveLattice` laws:

- Implication:
  - `a → a <-> 1`
  - `a ∧ (a → b) <-> a ∧ b`
  - `b ∧ (a → b) <-> b`
  - `a → (b ∧ c) <-> (a → b) ∧ (a → c)`
- Complemented
  - `¬a <-> a → 0`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `HeytingAlgebra`

```ts
typeIndexRef
```

### `/src/HKT`

Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `HKT`

```ts
typeIndexRef
```

##### `I` `HKT2`

```ts
typeIndexRef
```

##### `I` `HKT3`

```ts
typeIndexRef
```

##### `I` `HKT4`

```ts
typeIndexRef
```

##### `I` `URItoKind`

```ts
typeIndexRef
```

##### `I` `URItoKind2`

```ts
typeIndexRef
```

##### `I` `URItoKind3`

```ts
typeIndexRef
```

##### `I` `URItoKind4`

```ts
typeIndexRef
```

##### `|` `URIS`

```ts
typeIndexRef
```

##### `|` `URIS2`

```ts
typeIndexRef
```

##### `|` `URIS3`

```ts
typeIndexRef
```

##### `` `URIS4`

```ts
typeIndexRef
```

##### `` `Kind`

```ts
unsupported
```

##### `` `Kind2`

```ts
unsupported
```

##### `F` `Kind3`

```ts
typeIndexRef
```

##### `F` `Kind4`

```ts
typeIndexRef
```

### `/src/Identity`

@since 2.0.0

#### Exported Terms

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (fa: A) => B
```

##### `ap`

<!-- prettier-ignore -->
```ts
<A>(fa: A) => <B>(fab: (a: A) => B) => B
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<B>(fb: B) => <A>(fa: A) => A
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<B>(fb: B) => <A>(fa: A) => B
```

##### `of`

<!-- prettier-ignore -->
```ts
<A>(a: A) => A
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (ma: A) => B
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (ma: A) => A
```

##### `extend`

<!-- prettier-ignore -->
```ts
<A, B>(f: (wa: A) => B) => (wa: A) => B
```

##### `extract`

<!-- prettier-ignore -->
```ts
<A>(wa: A) => A
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<A>(ma: A) => A
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<A>(mma: A) => A
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (fa: A) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A) => M
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (fa: A) => B
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse1<"Identity">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence1<"Identity">
```

##### `altW`

<!-- prettier-ignore -->
```ts
<B>(that: () => B) => <A>(fa: A) => B | A
```

##### `alt`

<!-- prettier-ignore -->
```ts
<A>(that: () => A) => (fa: A) => A
```

##### `URI`

```ts

```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<A>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Eq<A>
```

##### `Functor`

```ts
Functor1<"Identity">
```

##### `Applicative`

```ts
Applicative1<"Identity">
```

##### `Monad`

```ts
Monad1<"Identity">
```

##### `Foldable`

```ts
Foldable1<"Identity">
```

##### `Traversable`

```ts
Traversable1<"Identity">
```

##### `Alt`

```ts
Alt1<"Identity">
```

##### `Comonad`

```ts
Comonad1<"Identity">
```

##### `ChainRec`

```ts
ChainRec1<"Identity">
```

##### `identity`

```ts
Monad1<"Identity"> & Foldable1<"Identity"> & Traversable1<"Identity"> & Alt1<"Identity"> & Comonad1<"Identity"> & ChainRec1<"Identity">
```

##### `Do`

```ts
{
}
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <A>(fa: A) => { [K in N]: A; }
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => B) => (fa: A) => { [K in N | keyof A]: K extends keyof A ? A[K] : B; }
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(name: Exclude<N, keyof A>, fb: B) => (fa: A) => { [K in N | keyof A]: K extends keyof A ? A[K] : B; }
```

#### Exported Types

##### `` `Identity`

```ts
typeIndexRef
```

### `/src/Invariant`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Invariant`

```ts
typeIndexRef
```

##### `I` `Invariant1`

```ts
typeIndexRef
```

##### `I` `Invariant2`

```ts
typeIndexRef
```

##### `I` `Invariant2C`

```ts
typeIndexRef
```

##### `I` `Invariant3`

```ts
typeIndexRef
```

##### `I` `Invariant3C`

```ts
typeIndexRef
```

##### `I` `Invariant4`

```ts
typeIndexRef
```

### `/src/IO`

```ts
interface IO<A> {
  (): A
}
```

`IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
`IOEither`.

@since 2.0.0

#### Exported Terms

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<A>(S: Semigroup<A>) => Semigroup<IO<A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<A>(M: Monoid<A>) => Monoid<IO<A>>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<A>(a: A) => IO<A>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<A>(mma: IO<IO<A>>) => IO<A>
```

##### `fromIO`

<!-- prettier-ignore -->
```ts
<A>(fa: IO<A>) => IO<A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"IO">
```

##### `Applicative`

```ts
Applicative1<"IO">
```

##### `Monad`

```ts
Monad1<"IO">
```

##### `MonadIO`

```ts
MonadIO1<"IO">
```

##### `ChainRec`

```ts
ChainRec1<"IO">
```

##### `io`

```ts
Monad1<"IO"> & MonadIO1<"IO"> & ChainRec1<"IO">
```

##### `Do`

<!-- prettier-ignore -->
```ts
IO<{}>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <A>(fa: IO<A>) => IO<{ [K in N]: A; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => IO<B>) => (fa: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(name: Exclude<N, keyof A>, fb: IO<B>) => (fa: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (index: number, a: A) => IO<B>) => (arr: readonly A[]) => IO<readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => IO<B>) => (arr: readonly A[]) => IO<readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<A>(arr: readonly IO<A>[]) => IO<readonly A[]>
```

#### Exported Types

##### `F` `IO`

```ts
typeIndexRef
```

### `/src/IOEither`

`IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.

@since 2.0.0

#### Exported Terms

##### `tryCatch`

<!-- prettier-ignore -->
```ts
<E, A>(f: Lazy<A>, onError: (reason: unknown) => E) => IOEither<E, A>
```

##### `fromEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => Either<E, B>) => (...a: A) => IOEither<E, B>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(S: Semigroup<A>) => Semigroup<IOEither<E, A>>
```

##### `getApplySemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(S: Semigroup<A>) => Semigroup<IOEither<E, A>>
```

##### `getApplyMonoid`

<!-- prettier-ignore -->
```ts
<E, A>(M: Monoid<A>) => Monoid<IOEither<E, A>>
```

##### `getApplicativeIOValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Applicative2C<"IOEither", E>
```

##### `getAltIOValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Alt2C<"IOEither", E>
```

##### `getIOValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Monad2C<"IOEither", E> & Bifunctor2<"IOEither"> & Alt2C<"IOEither", E> & MonadIO2C<"IOEither", E> & MonadThrow2C<...>
```

##### `getFilterable`

<!-- prettier-ignore -->
```ts
<E>(M: Monoid<E>) => Filterable2C<"IOEither", E>
```

##### `left`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(l: E) => IOEither<E, A>
```

##### `right`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(a: A) => IOEither<E, A>
```

##### `rightIO`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(ma: IO<A>) => IOEither<E, A>
```

##### `leftIO`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(me: IO<E>) => IOEither<E, A>
```

##### `fromEither`

<!-- prettier-ignore -->
```ts
<E, A>(ma: Either<E, A>) => IOEither<E, A>
```

##### `fromOption`

<!-- prettier-ignore -->
```ts
<E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => IOEither<E, A>
```

##### `fromPredicate`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<...>; }
```

##### `fold`

<!-- prettier-ignore -->
```ts
<E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>) => (ma: IOEither<E, A>) => IO<B>
```

##### `getOrElseW`

<!-- prettier-ignore -->
```ts
<E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>) => IO<B | A>
```

##### `getOrElse`

<!-- prettier-ignore -->
```ts
<E, A>(onLeft: (e: E) => IO<A>) => (ma: IOEither<E, A>) => IO<A>
```

##### `orElse`

<!-- prettier-ignore -->
```ts
<E, A, M>(onLeft: (e: E) => IOEither<M, A>) => (ma: IOEither<E, A>) => IOEither<M, A>
```

##### `swap`

<!-- prettier-ignore -->
```ts
<E, A>(ma: IOEither<E, A>) => IOEither<A, E>
```

##### `filterOrElse`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<...>) => IOEither<...>; }
```

##### `chainEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => <D>(ma: IOEither<D, A>) => IOEither<E | D, B>
```

##### `chainEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B>
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A>
```

##### `apW`

<!-- prettier-ignore -->
```ts
<D, A>(fa: IOEither<D, A>) => <E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<D | E, B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<E, A>(a: A) => IOEither<E, A>
```

##### `chainW`

<!-- prettier-ignore -->
```ts
<D, A, B>(f: (a: A) => IOEither<D, B>) => <E>(ma: IOEither<E, A>) => IOEither<D | E, B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

##### `chainFirstW`

<!-- prettier-ignore -->
```ts
<D, A, B>(f: (a: A) => IOEither<D, B>) => <E>(ma: IOEither<E, A>) => IOEither<D | E, A>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>
```

##### `altW`

<!-- prettier-ignore -->
```ts
<E2, B>(that: Lazy<IOEither<E2, B>>) => <E1, A>(fa: IOEither<E1, A>) => IOEither<E2 | E1, B | A>
```

##### `alt`

<!-- prettier-ignore -->
```ts
<E, A>(that: Lazy<IOEither<E, A>>) => (fa: IOEither<E, A>) => IOEither<E, A>
```

##### `fromIO`

<!-- prettier-ignore -->
```ts
<E, A>(fa: IO<A>) => IOEither<E, A>
```

##### `throwError`

<!-- prettier-ignore -->
```ts
<E, A>(e: E) => IOEither<E, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"IOEither">
```

##### `Bifunctor`

```ts
Bifunctor2<"IOEither">
```

##### `ApplicativePar`

```ts
Applicative2<"IOEither">
```

##### `ApplicativeSeq`

```ts
Applicative2<"IOEither">
```

##### `Applicative`

```ts
Applicative2<"IOEither">
```

##### `Monad`

```ts
Monad2<"IOEither">
```

##### `Alt`

```ts
Alt2<"IOEither">
```

##### `MonadIO`

```ts
MonadIO2<"IOEither">
```

##### `MonadThrow`

```ts
MonadThrow2<"IOEither">
```

##### `ioEither`

```ts
Monad2<"IOEither"> & Bifunctor2<"IOEither"> & Alt2<"IOEither"> & MonadIO2<"IOEither"> & MonadThrow2<"IOEither">
```

##### `bracket`

<!-- prettier-ignore -->
```ts
<E, A, B>(acquire: IOEither<E, A>, use: (a: A) => IOEither<E, B>, release: (a: A, e: Either<E, B>) => IOEither<E, void>) => IOEither<...>
```

##### `Do`

<!-- prettier-ignore -->
```ts
IOEither<never, {}>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <E, A>(fa: IOEither<E, A>) => IOEither<E, { [K in N]: A; }>
```

##### `bindW`

<!-- prettier-ignore -->
```ts
<N extends string, A, D, B>(name: Exclude<N, keyof A>, f: (a: A) => IOEither<D, B>) => <E>(fa: IOEither<E, A>) => IOEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, E, B>(name: Exclude<N, keyof A>, f: (a: A) => IOEither<E, B>) => (fa: IOEither<E, A>) => IOEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apSW`

<!-- prettier-ignore -->
```ts
<A, N extends string, D, B>(name: Exclude<N, keyof A>, fb: IOEither<D, B>) => <E>(fa: IOEither<E, A>) => IOEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, E, B>(name: Exclude<N, keyof A>, fb: IOEither<E, B>) => (fa: IOEither<E, A>) => IOEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<A, E, B>(f: (index: number, a: A) => IOEither<E, B>) => (arr: readonly A[]) => IOEither<E, readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<A, E, B>(f: (a: A) => IOEither<E, B>) => (arr: readonly A[]) => IOEither<E, readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<E, A>(arr: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

##### `traverseSeqArrayWithIndex`

<!-- prettier-ignore -->
```ts
<A, E, B>(f: (index: number, a: A) => IOEither<E, B>) => (arr: readonly A[]) => IOEither<E, readonly B[]>
```

##### `traverseSeqArray`

<!-- prettier-ignore -->
```ts
<A, E, B>(f: (a: A) => IOEither<E, B>) => (arr: readonly A[]) => IOEither<E, readonly B[]>
```

##### `sequenceSeqArray`

<!-- prettier-ignore -->
```ts
<E, A>(arr: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

#### Exported Types

##### `F` `IOEither`

```ts
typeIndexRef
```

### `/src/IORef`

Mutable references in the `IO` monad

@since 2.0.0

#### Exported Terms

##### `newIORef`

<!-- prettier-ignore -->
```ts
<A>(a: A) => IO<IORef<A>>
```

##### `IORef`

```ts
IORef<A>
```

#### Exported Types

### `/src/JoinSemilattice`

A join-semilattice (or upper semilattice) is a semilattice whose operation is called `join`, and which can be thought
of as a least upper bound.

A `JoinSemilattice` must satisfy the following laws:

- Associativity: `a ∨ (b ∨ c) <-> (a ∨ b) ∨ c`
- Commutativity: `a ∨ b <-> b ∨ a`
- Idempotency: `a ∨ a <-> a`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `JoinSemilattice`

```ts
typeIndexRef
```

### `/src/Lattice`

A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) <-> a`
- Absorbtion law for join: `a ∨ (a ∧ b) <-> a`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Lattice`

```ts
typeIndexRef
```

### `/src/Magma`

#### Exported Terms

#### Exported Types

##### `I` `Magma`

```ts
typeIndexRef
```

### `/src/Map`

@since 2.0.0

#### Exported Terms

##### `toUnfoldable`

<!-- prettier-ignore -->
```ts
{ <K, F extends "Option" | "ReadonlyRecord" | "Ord" | "Eq" | "ReadonlyArray" | "ReadonlyNonEmptyArray" | "NonEmptyArray" | "Array" | "IO" | "Identity" | "Task" | "Record" | "Tree">(O: Ord<K>, U: Unfoldable1<...>): <A>(d: Map<...>) => Kind<...>; <K, F>(O: Ord<...>, U: Unfoldable<...>): <A>(d: Map<...>) => HKT<...>; }
```

##### `fromFoldable`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither", K, A>(E: Eq<K>, M: Magma<A>, F: Foldable3<F>): <R, E>(fka: Kind3<F, R, E, [K, A]>) => Map<K, A>; <F extends "Either" | ... 14 more ... | "Writer", K, A>(E: Eq<...>, M: Magma<...>, F: Foldable2<...>): <E>(fka: Kind2<...>) => Map<...>; <F extends "Option" | ... 11 more...
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<K, A>(SK: Show<K>, SA: Show<A>) => Show<Map<K, A>>
```

##### `size`

<!-- prettier-ignore -->
```ts
<K, A>(d: Map<K, A>) => number
```

##### `isEmpty`

<!-- prettier-ignore -->
```ts
<K, A>(d: Map<K, A>) => boolean
```

##### `member`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => { (k: K): <A>(m: Map<K, A>) => boolean; <A>(k: K, m: Map<K, A>): boolean; }
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (a: A): <K>(m: Map<K, A>) => boolean; <K>(a: A, m: Map<K, A>): boolean; }
```

##### `keys`

<!-- prettier-ignore -->
```ts
<K>(O: Ord<K>) => <A>(m: Map<K, A>) => K[]
```

##### `values`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => <K>(m: Map<K, A>) => A[]
```

##### `collect`

<!-- prettier-ignore -->
```ts
<K>(O: Ord<K>) => <A, B>(f: (k: K, a: A) => B) => (m: Map<K, A>) => B[]
```

##### `toArray`

<!-- prettier-ignore -->
```ts
<K>(O: Ord<K>) => <A>(m: Map<K, A>) => [K, A][]
```

##### `insertAt`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => <A>(k: K, a: A) => (m: Map<K, A>) => Map<K, A>
```

##### `deleteAt`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => (k: K) => <A>(m: Map<K, A>) => Map<K, A>
```

##### `updateAt`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => <A>(k: K, a: A) => (m: Map<K, A>) => Option<Map<K, A>>
```

##### `modifyAt`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => <A>(k: K, f: (a: A) => A) => (m: Map<K, A>) => Option<Map<K, A>>
```

##### `pop`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => (k: K) => <A>(m: Map<K, A>) => Option<[A, Map<K, A>]>
```

##### `lookupWithKey`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => { (k: K): <A>(m: Map<K, A>) => Option<[K, A]>; <A>(k: K, m: Map<K, A>): Option<[K, A]>; }
```

##### `lookup`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => { (k: K): <A>(m: Map<K, A>) => Option<A>; <A>(k: K, m: Map<K, A>): Option<A>; }
```

##### `isSubmap`

<!-- prettier-ignore -->
```ts
<K, A>(SK: Eq<K>, SA: Eq<A>) => { (that: Map<K, A>): (me: Map<K, A>) => boolean; (me: Map<K, A>, that: Map<K, A>): boolean; }
```

##### `empty`

```ts
Map<never, never>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<K, A>(SK: Eq<K>, SA: Eq<A>) => Eq<Map<K, A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<K, A>(SK: Eq<K>, SA: Semigroup<A>) => Monoid<Map<K, A>>
```

##### `singleton`

<!-- prettier-ignore -->
```ts
<K, A>(k: K, a: A) => Map<K, A>
```

##### `compact`

<!-- prettier-ignore -->
```ts
<K, A>(fa: Map<K, Option<A>>) => Map<K, A>
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: Map<K, A>) => Map<K, B>; <A>(predicate: Predicate<A>): <K>(fa: Map<K, A>) => Map<...>; }
```

##### `filterMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => <K>(fa: Map<K, A>) => Map<K, B>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <K>(fa: Map<K, A>) => Map<K, B>
```

##### `mapWithIndex`

<!-- prettier-ignore -->
```ts
<K, A, B>(f: (k: K, a: A) => B) => (fa: Map<K, A>) => Map<K, B>
```

##### `partition`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: Map<K, A>) => Separated<Map<K, A>, Map<K, B>>; <A>(predicate: Predicate<A>): <K>(fa: Map<...>) => Separated<...>; }
```

##### `partitionMap`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (a: A) => Either<B, C>) => <K>(fa: Map<K, A>) => Separated<Map<K, B>, Map<K, C>>
```

##### `separate`

<!-- prettier-ignore -->
```ts
<K, A, B>(fa: Map<K, Either<A, B>>) => Separated<Map<K, A>, Map<K, B>>
```

##### `URI`

```ts

```

##### `getFilterableWithIndex`

<!-- prettier-ignore -->
```ts
<K = never>() => FilterableWithIndex2C<"Map", K, K>
```

##### `getWitherable`

<!-- prettier-ignore -->
```ts
<K>(O: Ord<K>) => Witherable2C<"Map", K> & TraversableWithIndex2C<"Map", K, K>
```

##### `Functor`

```ts
Functor2<"Map">
```

##### `Compactable`

```ts
Compactable2<"Map">
```

##### `Filterable`

```ts
Filterable2<"Map">
```

##### `map_`

```ts
Filterable2<"Map">
```

#### Exported Types

### `/src/MeetSemilattice`

A meet-semilattice (or lower semilattice) is a semilattice whose operation is called `meet`, and which can be thought
of as a greatest lower bound.

A `MeetSemilattice` must satisfy the following laws:

- Associativity: `a ∧ (b ∧ c) <-> (a ∧ b) ∧ c`
- Commutativity: `a ∧ b <-> b ∧ a`
- Idempotency: `a ∧ a <-> a`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `MeetSemilattice`

```ts
typeIndexRef
```

### `/src/Monad`

The `Monad` type class combines the operations of the `Chain` and
`Applicative` type classes. Therefore, `Monad` instances represent type
constructors which support sequential composition, and also lifting of
functions of arbitrary arity.

Instances must satisfy the following laws in addition to the `Applicative` and `Chain` laws:

1. Left identity: `M.chain(M.of(a), f) <-> f(a)`
2. Right identity: `M.chain(fa, M.of) <-> fa`

Note. `Functor`'s `map` can be derived: `A.map = (fa, f) => A.chain(fa, a => A.of(f(a)))`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Monad`

```ts
typeIndexRef
```

##### `I` `Monad1`

```ts
typeIndexRef
```

##### `I` `Monad2`

```ts
typeIndexRef
```

##### `I` `Monad2C`

```ts
typeIndexRef
```

##### `I` `Monad3`

```ts
typeIndexRef
```

##### `I` `Monad3C`

```ts
typeIndexRef
```

##### `I` `Monad4`

```ts
typeIndexRef
```

### `/src/MonadIO`

Lift a computation from the `IO` monad

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `MonadIO`

```ts
typeIndexRef
```

##### `I` `MonadIO1`

```ts
typeIndexRef
```

##### `I` `MonadIO2`

```ts
typeIndexRef
```

##### `I` `MonadIO2C`

```ts
typeIndexRef
```

##### `I` `MonadIO3`

```ts
typeIndexRef
```

##### `I` `MonadIO3C`

```ts
typeIndexRef
```

##### `I` `MonadIO4`

```ts
typeIndexRef
```

### `/src/MonadTask`

Lift a computation from the `Task` monad

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `MonadTask`

```ts
typeIndexRef
```

##### `I` `MonadTask1`

```ts
typeIndexRef
```

##### `I` `MonadTask2`

```ts
typeIndexRef
```

##### `I` `MonadTask2C`

```ts
typeIndexRef
```

##### `I` `MonadTask3`

```ts
typeIndexRef
```

##### `I` `MonadTask3C`

```ts
typeIndexRef
```

##### `I` `MonadTask4`

```ts
typeIndexRef
```

### `/src/MonadThrow`

The `MonadThrow` type class represents those monads which support errors via
`throwError`, where `throwError(e)` halts, yielding the error `e`.

Laws:

- Left zero: `M.chain(M.throwError(e), f) = M.throwError(e)`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `MonadThrow`

```ts
typeIndexRef
```

##### `I` `MonadThrow1`

```ts
typeIndexRef
```

##### `I` `MonadThrow2`

```ts
typeIndexRef
```

##### `I` `MonadThrow2C`

```ts
typeIndexRef
```

##### `I` `MonadThrow3`

```ts
typeIndexRef
```

##### `I` `MonadThrow3C`

```ts
typeIndexRef
```

##### `I` `MonadThrow4`

```ts
typeIndexRef
```

### `/src/Monoid`

`Monoid` extends the power of `Semigroup` by providing an additional `empty` value.

```ts
interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}

interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

This `empty` value should be an identity for the `concat` operation, which means the following equalities hold for any choice of `x`.

```ts
concat(x, empty) = concat(empty, x) = x
```

Many types that form a `Semigroup` also form a `Monoid`, such as `number`s (with `0`) and `string`s (with `''`).

```ts
import { Monoid } from 'fp-ts/Monoid'

const monoidString: Monoid<string> = {
  concat: (x, y) => x + y,
  empty: '',
}
```

_Adapted from https://typelevel.org/cats_

@since 2.0.0

#### Exported Terms

##### `fold`

<!-- prettier-ignore -->
```ts
<A>(M: Monoid<A>) => (as: readonly A[]) => A
```

##### `getTupleMonoid`

<!-- prettier-ignore -->
```ts
<T extends readonly Monoid<any>[]>(...monoids: T) => Monoid<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never; }>
```

##### `getDualMonoid`

<!-- prettier-ignore -->
```ts
<A>(M: Monoid<A>) => Monoid<A>
```

##### `getFunctionMonoid`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A = never>() => Monoid<(a: A) => M>
```

##### `getEndomorphismMonoid`

<!-- prettier-ignore -->
```ts
<A = never>() => Monoid<Endomorphism<A>>
```

##### `getStructMonoid`

<!-- prettier-ignore -->
```ts
<O extends Readonly<Record<string, any>>>(monoids: { [K in keyof O]: Monoid<O[K]>; }) => Monoid<O>
```

##### `getMeetMonoid`

<!-- prettier-ignore -->
```ts
<A>(B: Bounded<A>) => Monoid<A>
```

##### `getJoinMonoid`

<!-- prettier-ignore -->
```ts
<A>(B: Bounded<A>) => Monoid<A>
```

##### `monoidAll`

```ts
Monoid<boolean>
```

##### `monoidAny`

```ts
Monoid<boolean>
```

##### `monoidSum`

```ts
Monoid<number>
```

##### `monoidProduct`

```ts
Monoid<number>
```

##### `monoidString`

```ts
Monoid<string>
```

##### `monoidVoid`

```ts
Monoid<void>
```

#### Exported Types

##### `I` `Monoid`

```ts
typeIndexRef
```

### `/src/NonEmptyArray`

Data structure which represents non-empty arrays

@since 2.0.0

#### Exported Terms

##### `group`

<!-- prettier-ignore -->
```ts
<B>(E: Eq<B>) => { <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>; <A extends B>(as: A[]): NonEmptyArray<A>[]; }
```

##### `copy`

<!-- prettier-ignore -->
```ts
<A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>; <A>(predicate: Predicate<A>): (nea: NonEmptyArray<...>) => Option<...>; }
```

##### `concat`

<!-- prettier-ignore -->
```ts
{ <A>(fx: A[], fy: NonEmptyArray<A>): NonEmptyArray<A>; <A>(fx: NonEmptyArray<A>, fy: A[]): NonEmptyArray<A>; }
```

##### `cons`

<!-- prettier-ignore -->
```ts
<A>(head: A, tail: A[]) => NonEmptyArray<A>
```

##### `snoc`

<!-- prettier-ignore -->
```ts
<A>(init: A[], end: A) => NonEmptyArray<A>
```

##### `fromArray`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => Option<NonEmptyArray<A>>
```

##### `uncons`

<!-- prettier-ignore -->
```ts
<A>(nea: NonEmptyArray<A>) => readonly [A, A[]]
```

##### `unsnoc`

<!-- prettier-ignore -->
```ts
<A>(nea: NonEmptyArray<A>) => readonly [A[], A]
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<NonEmptyArray<A>>
```

##### `head`

<!-- prettier-ignore -->
```ts
<A>(nea: NonEmptyArray<A>) => A
```

##### `tail`

<!-- prettier-ignore -->
```ts
<A>(nea: NonEmptyArray<A>) => A[]
```

##### `reverse`

<!-- prettier-ignore -->
```ts
<A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
```

##### `min`

<!-- prettier-ignore -->
```ts
<A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
```

##### `max`

<!-- prettier-ignore -->
```ts
<A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<A = never>() => Semigroup<NonEmptyArray<A>>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Eq<NonEmptyArray<A>>
```

##### `groupSort`

<!-- prettier-ignore -->
```ts
<B>(O: Ord<B>) => { <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>; <A extends B>(as: A[]): NonEmptyArray<A>[]; }
```

##### `groupBy`

<!-- prettier-ignore -->
```ts
<A>(f: (a: A) => string) => (as: A[]) => Record<string, NonEmptyArray<A>>
```

##### `last`

<!-- prettier-ignore -->
```ts
<A>(nea: NonEmptyArray<A>) => A
```

##### `init`

<!-- prettier-ignore -->
```ts
<A>(nea: NonEmptyArray<A>) => A[]
```

##### `sort`

<!-- prettier-ignore -->
```ts
<B>(O: Ord<B>) => <A extends B>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
```

##### `insertAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

##### `updateAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

##### `modifyAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, f: (a: A) => A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

##### `filterWithIndex`

<!-- prettier-ignore -->
```ts
<A>(predicate: (i: number, a: A) => boolean) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

##### `of`

<!-- prettier-ignore -->
```ts
<A>(a: A) => NonEmptyArray<A>
```

##### `fold`

<!-- prettier-ignore -->
```ts
<A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A
```

##### `zipWith`

<!-- prettier-ignore -->
```ts
<A, B, C>(fa: NonEmptyArray<A>, fb: NonEmptyArray<B>, f: (a: A, b: B) => C) => NonEmptyArray<C>
```

##### `zip`

<!-- prettier-ignore -->
```ts
{ <B>(bs: NonEmptyArray<B>): <A>(as: NonEmptyArray<A>) => NonEmptyArray<[A, B]>; <A, B>(as: NonEmptyArray<A>, bs: NonEmptyArray<...>): NonEmptyArray<...>; }
```

##### `unzip`

<!-- prettier-ignore -->
```ts
<A, B>(as: NonEmptyArray<[A, B]>) => [NonEmptyArray<A>, NonEmptyArray<B>]
```

##### `prependToAll`

<!-- prettier-ignore -->
```ts
<A>(e: A) => (xs: NonEmptyArray<A>) => NonEmptyArray<A>
```

##### `intersperse`

<!-- prettier-ignore -->
```ts
<A>(e: A) => (as: NonEmptyArray<A>) => NonEmptyArray<A>
```

##### `foldMapWithIndex`

<!-- prettier-ignore -->
```ts
<S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: NonEmptyArray<A>) => S
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: NonEmptyArray<A>) => S
```

##### `altW`

<!-- prettier-ignore -->
```ts
<B>(that: Lazy<NonEmptyArray<B>>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B | A>
```

##### `alt`

<!-- prettier-ignore -->
```ts
<A>(that: Lazy<NonEmptyArray<A>>) => (fa: NonEmptyArray<A>) => NonEmptyArray<A>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<A>
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
```

##### `extend`

<!-- prettier-ignore -->
```ts
<A, B>(f: (fa: NonEmptyArray<A>) => B) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

##### `mapWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (i: number, a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
```

##### `reduceWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
```

##### `reduceRightWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse1<"NonEmptyArray">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence1<"NonEmptyArray">
```

##### `traverseWithIndex`

<!-- prettier-ignore -->
```ts
PipeableTraverseWithIndex1<"NonEmptyArray", number>
```

##### `extract`

<!-- prettier-ignore -->
```ts
<A>(wa: NonEmptyArray<A>) => A
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"NonEmptyArray">
```

##### `FunctorWithIndex`

```ts
FunctorWithIndex1<"NonEmptyArray", number>
```

##### `Applicative`

```ts
Applicative1<"NonEmptyArray">
```

##### `Monad`

```ts
Monad1<"NonEmptyArray">
```

##### `Foldable`

```ts
Foldable1<"NonEmptyArray">
```

##### `FoldableWithIndex`

```ts
FoldableWithIndex1<"NonEmptyArray", number>
```

##### `Traversable`

```ts
Traversable1<"NonEmptyArray">
```

##### `TraversableWithIndex`

```ts
TraversableWithIndex1<"NonEmptyArray", number>
```

##### `Alt`

```ts
Alt1<"NonEmptyArray">
```

##### `Comonad`

```ts
Comonad1<"NonEmptyArray">
```

##### `nonEmptyArray`

```ts
Monad1<"NonEmptyArray"> & Comonad1<"NonEmptyArray"> & TraversableWithIndex1<"NonEmptyArray", number> & FunctorWithIndex1<"NonEmptyArray", number> & FoldableWithIndex1<...> & Alt1<...>
```

##### `Do`

```ts
NonEmptyArray<{}>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<{ [K in N]: A; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => NonEmptyArray<B>) => (fa: NonEmptyArray<A>) => NonEmptyArray<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(name: Exclude<N, keyof A>, fb: NonEmptyArray<B>) => (fa: NonEmptyArray<A>) => NonEmptyArray<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

#### Exported Types

##### `I` `NonEmptyArray`

```ts
typeIndexRef
```

### `/src/Option`

```ts
type Option<A> = None | Some<A>
```

`Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
instance of `None`.

An option could be looked at as a collection or foldable structure with either one or zero elements.
Another way to look at `Option` is: it represents the effect of a possibly failing computation.

@since 2.0.0

#### Exported Terms

##### `fromNullable`

<!-- prettier-ignore -->
```ts
<A>(a: A) => Option<NonNullable<A>>
```

##### `fromPredicate`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>; <A>(predicate: Predicate<A>): (a: A) => Option<A>; }
```

##### `tryCatch`

<!-- prettier-ignore -->
```ts
<A>(f: Lazy<A>) => Option<A>
```

##### `getLeft`

<!-- prettier-ignore -->
```ts
<E, A>(ma: Either<E, A>) => Option<E>
```

##### `getRight`

<!-- prettier-ignore -->
```ts
<E, A>(ma: Either<E, A>) => Option<A>
```

##### `fold`

<!-- prettier-ignore -->
```ts
<A, B>(onNone: Lazy<B>, onSome: (a: A) => B) => (ma: Option<A>) => B
```

##### `toNullable`

<!-- prettier-ignore -->
```ts
<A>(ma: Option<A>) => A | null
```

##### `toUndefined`

<!-- prettier-ignore -->
```ts
<A>(ma: Option<A>) => A | undefined
```

##### `fromNullableK`

<!-- prettier-ignore -->
```ts
<A extends readonly unknown[], B>(f: (...a: A) => B | null | undefined) => (...a: A) => Option<NonNullable<B>>
```

##### `chainNullableK`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B | null | undefined) => (ma: Option<A>) => Option<B>
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<Option<A>>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Eq<Option<A>>
```

##### `getOrd`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => Ord<Option<A>>
```

##### `getApplySemigroup`

<!-- prettier-ignore -->
```ts
<A>(S: Semigroup<A>) => Semigroup<Option<A>>
```

##### `getApplyMonoid`

<!-- prettier-ignore -->
```ts
<A>(M: Monoid<A>) => Monoid<Option<A>>
```

##### `getFirstMonoid`

<!-- prettier-ignore -->
```ts
<A = never>() => Monoid<Option<A>>
```

##### `getLastMonoid`

<!-- prettier-ignore -->
```ts
<A = never>() => Monoid<Option<A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<A>(S: Semigroup<A>) => Monoid<Option<A>>
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (a: A, ma: Option<A>) => boolean
```

##### `exists`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (ma: Option<A>) => boolean
```

##### `getRefinement`

<!-- prettier-ignore -->
```ts
<A, B extends A>(getOption: (a: A) => Option<B>) => Refinement<A, B>
```

##### `isSome`

<!-- prettier-ignore -->
```ts
<A>(fa: Option<A>) => fa is Some<A>
```

##### `isNone`

<!-- prettier-ignore -->
```ts
<A>(fa: Option<A>) => fa is None
```

##### `none`

Of type [`Option`](#option)

##### `some`

<!-- prettier-ignore -->
```ts
<A>(a: A) => Option<A>
```

##### `fromEither`

<!-- prettier-ignore -->
```ts
<E, A>(ma: Either<E, A>) => Option<A>
```

##### `getOrElseW`

<!-- prettier-ignore -->
```ts
<B>(onNone: Lazy<B>) => <A>(ma: Option<A>) => B | A
```

##### `getOrElse`

<!-- prettier-ignore -->
```ts
<A>(onNone: Lazy<A>) => (ma: Option<A>) => A
```

##### `mapNullable`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B | null | undefined) => (ma: Option<A>) => Option<B>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<B>(fb: Option<B>) => <A>(fa: Option<A>) => Option<A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<B>(fb: Option<B>) => <A>(fa: Option<A>) => Option<B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<A>(a: A) => Option<A>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<B>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<A>(mma: Option<Option<A>>) => Option<A>
```

##### `altW`

<!-- prettier-ignore -->
```ts
<B>(that: Lazy<Option<B>>) => <A>(fa: Option<A>) => Option<B | A>
```

##### `alt`

<!-- prettier-ignore -->
```ts
<A>(that: Lazy<Option<A>>) => (fa: Option<A>) => Option<A>
```

##### `zero`

<!-- prettier-ignore -->
```ts
<A>() => Option<A>
```

##### `throwError`

<!-- prettier-ignore -->
```ts
<E, A>(e: E) => Option<A>
```

##### `extend`

<!-- prettier-ignore -->
```ts
<A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B>
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<A>(ma: Option<A>) => Option<Option<A>>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Option<A>) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Option<A>) => M
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Option<A>) => B
```

##### `compact`

<!-- prettier-ignore -->
```ts
<A>(fa: Option<Option<A>>) => Option<A>
```

##### `separate`

<!-- prettier-ignore -->
```ts
<A, B>(ma: Option<Either<A, B>>) => Separated<Option<A>, Option<B>>
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Option<B>; <A>(predicate: Predicate<A>): (fa: Option<A>) => Option<...>; }
```

##### `filterMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B>
```

##### `partition`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Separated<Option<A>, Option<B>>; <A>(predicate: Predicate<A>): (fa: Option<...>) => Separated<...>; }
```

##### `partitionMap`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: Option<A>) => Separated<Option<B>, Option<C>>
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse1<"Option">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence1<"Option">
```

##### `wither`

<!-- prettier-ignore -->
```ts
PipeableWither1<"Option">
```

##### `wilt`

<!-- prettier-ignore -->
```ts
PipeableWilt1<"Option">
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"Option">
```

##### `Applicative`

```ts
Applicative1<"Option">
```

##### `Monad`

```ts
Monad1<"Option">
```

##### `Foldable`

```ts
Foldable1<"Option">
```

##### `Alt`

```ts
Alt1<"Option">
```

##### `Alternative`

```ts
Alternative1<"Option">
```

##### `Extend`

```ts
Extend1<"Option">
```

##### `Compactable`

```ts
Compactable1<"Option">
```

##### `Filterable`

```ts
Filterable1<"Option">
```

##### `Traversable`

```ts
Traversable1<"Option">
```

##### `Witherable`

```ts
Witherable1<"Option">
```

##### `MonadThrow`

```ts
MonadThrow1<"Option">
```

##### `option`

```ts
Monad1<"Option"> & Foldable1<"Option"> & Alternative1<"Option"> & Extend1<"Option"> & Witherable1<"Option"> & MonadThrow1<...>
```

##### `Do`

Of type [`Option`](#option)

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <A>(fa: Option<A>) => Option<{ [K in N]: A; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => Option<B>) => (fa: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(name: Exclude<N, keyof A>, fb: Option<B>) => (fa: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (index: number, a: A) => Option<B>) => (arr: readonly A[]) => Option<readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (arr: readonly A[]) => Option<readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<A>(arr: readonly Option<A>[]) => Option<readonly A[]>
```

#### Exported Types

##### `I` `None`

```ts
typeIndexRef
```

##### `I` `Some`

```ts
typeIndexRef
```

##### `|` `Option`

```ts
typeIndexRef
```

### `/src/OptionT`

@since 2.0.0

#### Exported Terms

##### `getOptionM`

<!-- prettier-ignore -->
```ts
{ <M extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer">(M: Monad2<...>): OptionM2<...>; <M extends "Either" | ... 14 more ... | "Writer", E>(M: Monad2C<...>): OptionM2C...
```

#### Exported Types

##### `I` `OptionT`

```ts
typeIndexRef
```

##### `I` `OptionM`

```ts
typeIndexRef
```

##### `` `OptionT1`

```ts
unsupported
```

##### `I` `OptionM1`

```ts
typeIndexRef
```

##### `` `OptionT2`

```ts
unsupported
```

##### `I` `OptionM2`

```ts
typeIndexRef
```

##### `I` `OptionM2C`

```ts
typeIndexRef
```

### `/src/Ord`

The `Ord` type class represents types which support comparisons with a _total order_.

Instances should satisfy the laws of total orderings:

1. Reflexivity: `S.compare(a, a) <= 0`
2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`

@since 2.0.0

#### Exported Terms

##### `lt`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (x: A, y: A) => boolean
```

##### `gt`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (x: A, y: A) => boolean
```

##### `leq`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (x: A, y: A) => boolean
```

##### `geq`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (x: A, y: A) => boolean
```

##### `min`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (x: A, y: A) => A
```

##### `max`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (x: A, y: A) => A
```

##### `clamp`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (low: A, hi: A) => (x: A) => A
```

##### `between`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (low: A, hi: A) => (x: A) => boolean
```

##### `fromCompare`

<!-- prettier-ignore -->
```ts
<A>(compare: (x: A, y: A) => Ordering) => Ord<A>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<A = never>() => Semigroup<Ord<A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<A = never>() => Monoid<Ord<A>>
```

##### `getTupleOrd`

<!-- prettier-ignore -->
```ts
<T extends readonly Ord<any>[]>(...ords: T) => Ord<{ [K in keyof T]: T[K] extends Ord<infer A> ? A : never; }>
```

##### `getDualOrd`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => Ord<A>
```

##### `ordString`

```ts
Ord<string>
```

##### `ordNumber`

```ts
Ord<number>
```

##### `ordBoolean`

```ts
Ord<boolean>
```

##### `contramap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B>
```

##### `URI`

```ts

```

##### `ordDate`

```ts
Ord<Date>
```

##### `Contravariant`

```ts
Contravariant1<"Ord">
```

##### `ord`

```ts
Contravariant1<"Ord">
```

#### Exported Types

##### `I` `Ord`

```ts
typeIndexRef
```

### `/src/Ordering`

@since 2.0.0

#### Exported Terms

##### `sign`

<!-- prettier-ignore -->
```ts
(n: number) => Ordering
```

##### `invert`

<!-- prettier-ignore -->
```ts
(O: Ordering) => Ordering
```

##### `eqOrdering`

```ts
Eq<Ordering>
```

##### `semigroupOrdering`

```ts
Semigroup<Ordering>
```

##### `monoidOrdering`

```ts
Monoid<Ordering>
```

#### Exported Types

##### `|` `Ordering`

```ts
typeIndexRef
```

### `/src/pipeable`

@since 2.0.0

#### Exported Terms

##### `pipeable`

<!-- prettier-ignore -->
```ts
{ <F extends "StateReaderTaskEither", I>(I: { readonly URI: F; } & I): (I extends Chain4<F> ? PipeableChain4<F> : I extends Apply4<F> ? PipeableApply4<F> : I extends Functor4<...> ? PipeableFunctor4<...> : {}) & ... 9 more ... & (I extends MonadThrow4<...> ? PipeableMonadThrow4<...> : {}); <F extends "ReaderEither" ...
```

##### `pipe`

<!-- prettier-ignore -->
```ts
{ <A>(a: A): A; <A, B>(a: A, ab: (a: A) => B): B; <A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C; <A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D; <A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E; <A, B, C, D, E, F>(a: A, ab: (a: A) => B, bc:...
```

#### Exported Types

##### `I` `PipeableFunctor`

```ts
typeIndexRef
```

##### `I` `PipeableFunctor1`

```ts
typeIndexRef
```

##### `I` `PipeableFunctor2`

```ts
typeIndexRef
```

##### `I` `PipeableFunctor2C`

```ts
typeIndexRef
```

##### `I` `PipeableFunctor3`

```ts
typeIndexRef
```

##### `I` `PipeableFunctor3C`

```ts
typeIndexRef
```

##### `I` `PipeableFunctor4`

```ts
typeIndexRef
```

##### `I` `PipeableContravariant`

```ts
typeIndexRef
```

##### `I` `PipeableContravariant1`

```ts
typeIndexRef
```

##### `I` `PipeableContravariant2`

```ts
typeIndexRef
```

##### `I` `PipeableContravariant2C`

```ts
typeIndexRef
```

##### `I` `PipeableContravariant3`

```ts
typeIndexRef
```

##### `I` `PipeableContravariant3C`

```ts
typeIndexRef
```

##### `I` `PipeableContravariant4`

```ts
typeIndexRef
```

##### `I` `PipeableFunctorWithIndex`

```ts
typeIndexRef
```

##### `I` `PipeableFunctorWithIndex1`

```ts
typeIndexRef
```

##### `I` `PipeableFunctorWithIndex2`

```ts
typeIndexRef
```

##### `I` `PipeableFunctorWithIndex2C`

```ts
typeIndexRef
```

##### `I` `PipeableFunctorWithIndex3`

```ts
typeIndexRef
```

##### `I` `PipeableFunctorWithIndex3C`

```ts
typeIndexRef
```

##### `I` `PipeableFunctorWithIndex4`

```ts
typeIndexRef
```

##### `I` `PipeableApply`

```ts
typeIndexRef
```

##### `I` `PipeableApply1`

```ts
typeIndexRef
```

##### `I` `PipeableApply2`

```ts
typeIndexRef
```

##### `I` `PipeableApply2C`

```ts
typeIndexRef
```

##### `I` `PipeableApply3`

```ts
typeIndexRef
```

##### `I` `PipeableApply3C`

```ts
typeIndexRef
```

##### `I` `PipeableApply4`

```ts
typeIndexRef
```

##### `I` `PipeableChain`

```ts
typeIndexRef
```

##### `I` `PipeableChain1`

```ts
typeIndexRef
```

##### `I` `PipeableChain2`

```ts
typeIndexRef
```

##### `I` `PipeableChain2C`

```ts
typeIndexRef
```

##### `I` `PipeableChain3`

```ts
typeIndexRef
```

##### `I` `PipeableChain3C`

```ts
typeIndexRef
```

##### `I` `PipeableChain4`

```ts
typeIndexRef
```

##### `I` `PipeableExtend`

```ts
typeIndexRef
```

##### `I` `PipeableExtend1`

```ts
typeIndexRef
```

##### `I` `PipeableExtend2`

```ts
typeIndexRef
```

##### `I` `PipeableExtend2C`

```ts
typeIndexRef
```

##### `I` `PipeableExtend3`

```ts
typeIndexRef
```

##### `I` `PipeableExtend3C`

```ts
typeIndexRef
```

##### `I` `PipeableExtend4`

```ts
typeIndexRef
```

##### `I` `PipeableBifunctor`

```ts
typeIndexRef
```

##### `I` `PipeableBifunctor2`

```ts
typeIndexRef
```

##### `I` `PipeableBifunctor3`

```ts
typeIndexRef
```

##### `I` `PipeableBifunctor3C`

```ts
typeIndexRef
```

##### `I` `PipeableBifunctor4`

```ts
typeIndexRef
```

##### `I` `PipeableFoldable`

```ts
typeIndexRef
```

##### `I` `PipeableFoldable1`

```ts
typeIndexRef
```

##### `I` `PipeableFoldable2`

```ts
typeIndexRef
```

##### `I` `PipeableFoldable2C`

```ts
typeIndexRef
```

##### `I` `PipeableFoldable3`

```ts
typeIndexRef
```

##### `I` `PipeableFoldable3C`

```ts
typeIndexRef
```

##### `I` `PipeableFoldable4`

```ts
typeIndexRef
```

##### `I` `PipeableFoldableWithIndex`

```ts
typeIndexRef
```

##### `I` `PipeableFoldableWithIndex1`

```ts
typeIndexRef
```

##### `I` `PipeableFoldableWithIndex2`

```ts
typeIndexRef
```

##### `I` `PipeableFoldableWithIndex2C`

```ts
typeIndexRef
```

##### `I` `PipeableFoldableWithIndex3`

```ts
typeIndexRef
```

##### `I` `PipeableFoldableWithIndex3C`

```ts
typeIndexRef
```

##### `I` `PipeableFoldableWithIndex4`

```ts
typeIndexRef
```

##### `I` `PipeableAlt`

```ts
typeIndexRef
```

##### `I` `PipeableAlt1`

```ts
typeIndexRef
```

##### `I` `PipeableAlt2`

```ts
typeIndexRef
```

##### `I` `PipeableAlt2C`

```ts
typeIndexRef
```

##### `I` `PipeableAlt3`

```ts
typeIndexRef
```

##### `I` `PipeableAlt3C`

```ts
typeIndexRef
```

##### `I` `PipeableAlt4`

```ts
typeIndexRef
```

##### `I` `PipeableCompactable`

```ts
typeIndexRef
```

##### `I` `PipeableCompactable1`

```ts
typeIndexRef
```

##### `I` `PipeableCompactable2`

```ts
typeIndexRef
```

##### `I` `PipeableCompactable2C`

```ts
typeIndexRef
```

##### `I` `PipeableCompactable3`

```ts
typeIndexRef
```

##### `I` `PipeableCompactable3C`

```ts
typeIndexRef
```

##### `I` `PipeableCompactable4`

```ts
typeIndexRef
```

##### `I` `PipeableFilterable`

```ts
typeIndexRef
```

##### `I` `PipeableFilterable1`

```ts
typeIndexRef
```

##### `I` `PipeableFilterable2`

```ts
typeIndexRef
```

##### `I` `PipeableFilterable2C`

```ts
typeIndexRef
```

##### `I` `PipeableFilterable3`

```ts
typeIndexRef
```

##### `I` `PipeableFilterable3C`

```ts
typeIndexRef
```

##### `I` `PipeableFilterable4`

```ts
typeIndexRef
```

##### `I` `PipeableFilterableWithIndex`

```ts
typeIndexRef
```

##### `I` `PipeableFilterableWithIndex1`

```ts
typeIndexRef
```

##### `I` `PipeableFilterableWithIndex2`

```ts
typeIndexRef
```

##### `I` `PipeableFilterableWithIndex2C`

```ts
typeIndexRef
```

##### `I` `PipeableFilterableWithIndex3`

```ts
typeIndexRef
```

##### `I` `PipeableFilterableWithIndex3C`

```ts
typeIndexRef
```

##### `I` `PipeableFilterableWithIndex4`

```ts
typeIndexRef
```

##### `I` `PipeableProfunctor`

```ts
typeIndexRef
```

##### `I` `PipeableProfunctor2`

```ts
typeIndexRef
```

##### `I` `PipeableProfunctor2C`

```ts
typeIndexRef
```

##### `I` `PipeableProfunctor3`

```ts
typeIndexRef
```

##### `I` `PipeableProfunctor3C`

```ts
typeIndexRef
```

##### `I` `PipeableProfunctor4`

```ts
typeIndexRef
```

##### `I` `PipeableSemigroupoid`

```ts
typeIndexRef
```

##### `I` `PipeableSemigroupoid2`

```ts
typeIndexRef
```

##### `I` `PipeableSemigroupoid2C`

```ts
typeIndexRef
```

##### `I` `PipeableSemigroupoid3`

```ts
typeIndexRef
```

##### `I` `PipeableSemigroupoid3C`

```ts
typeIndexRef
```

##### `I` `PipeableSemigroupoid4`

```ts
typeIndexRef
```

##### `I` `PipeableMonadThrow`

```ts
typeIndexRef
```

##### `I` `PipeableMonadThrow1`

```ts
typeIndexRef
```

##### `I` `PipeableMonadThrow2`

```ts
typeIndexRef
```

##### `I` `PipeableMonadThrow2C`

```ts
typeIndexRef
```

##### `I` `PipeableMonadThrow3`

```ts
typeIndexRef
```

##### `I` `PipeableMonadThrow3C`

```ts
typeIndexRef
```

##### `I` `PipeableMonadThrow4`

```ts
typeIndexRef
```

### `/src/Profunctor`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Profunctor`

```ts
typeIndexRef
```

##### `I` `Profunctor2`

```ts
typeIndexRef
```

##### `I` `Profunctor2C`

```ts
typeIndexRef
```

##### `I` `Profunctor3`

```ts
typeIndexRef
```

##### `I` `Profunctor3C`

```ts
typeIndexRef
```

##### `I` `Profunctor4`

```ts
typeIndexRef
```

### `/src/Random`

@since 2.0.0

#### Exported Terms

##### `randomInt`

<!-- prettier-ignore -->
```ts
(low: number, high: number) => IO<number>
```

##### `randomRange`

<!-- prettier-ignore -->
```ts
(min: number, max: number) => IO<number>
```

##### `random`

<!-- prettier-ignore -->
```ts
IO<number>
```

##### `randomBool`

<!-- prettier-ignore -->
```ts
IO<boolean>
```

#### Exported Types

### `/src/Reader`

@since 2.0.0

#### Exported Terms

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<R, A>(S: Semigroup<A>) => Semigroup<Reader<R, A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<R, A>(M: Monoid<A>) => Monoid<Reader<R, A>>
```

##### `ask`

<!-- prettier-ignore -->
```ts
<R>() => Reader<R, R>
```

##### `asks`

<!-- prettier-ignore -->
```ts
<R, A>(f: (r: R) => A) => Reader<R, A>
```

##### `local`

<!-- prettier-ignore -->
```ts
<Q, R>(f: (d: Q) => R) => <A>(ma: Reader<R, A>) => Reader<Q, A>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B>
```

##### `apW`

<!-- prettier-ignore -->
```ts
<Q, A>(fa: Reader<Q, A>) => <R, B>(fab: Reader<R, (a: A) => B>) => Reader<Q & R, B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<E, A>(a: A) => Reader<E, A>
```

##### `chainW`

<!-- prettier-ignore -->
```ts
<R, A, B>(f: (a: A) => Reader<R, B>) => <Q>(ma: Reader<Q, A>) => Reader<Q & R, B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A>
```

##### `compose`

<!-- prettier-ignore -->
```ts
<A, B>(ab: Reader<A, B>) => <C>(bc: Reader<B, C>) => Reader<A, C>
```

##### `promap`

<!-- prettier-ignore -->
```ts
<E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B>
```

##### `id`

<!-- prettier-ignore -->
```ts
<A>() => Reader<A, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"Reader">
```

##### `Applicative`

```ts
Applicative2<"Reader">
```

##### `Monad`

```ts
Monad2<"Reader">
```

##### `Profunctor`

```ts
Profunctor2<"Reader">
```

##### `Category`

```ts
Category2<"Reader">
```

##### `Strong`

```ts
Strong2<"Reader">
```

##### `Choice`

```ts
Choice2<"Reader">
```

##### `reader`

```ts
Monad2<"Reader"> & Profunctor2<"Reader"> & Category2<"Reader"> & Strong2<"Reader"> & Choice2<"Reader">
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <R, A>(fa: Reader<R, A>) => Reader<R, { [K in N]: A; }>
```

##### `bindW`

<!-- prettier-ignore -->
```ts
<N extends string, A, Q, B>(name: Exclude<N, keyof A>, f: (a: A) => Reader<Q, B>) => <R>(fa: Reader<R, A>) => Reader<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, R, B>(name: Exclude<N, keyof A>, f: (a: A) => Reader<R, B>) => (fa: Reader<R, A>) => Reader<R, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `Do`

<!-- prettier-ignore -->
```ts
Reader<unknown, {}>
```

##### `apSW`

<!-- prettier-ignore -->
```ts
<A, N extends string, Q, B>(name: Exclude<N, keyof A>, fb: Reader<Q, B>) => <R>(fa: Reader<R, A>) => Reader<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, R, B>(name: Exclude<N, keyof A>, fb: Reader<R, B>) => (fa: Reader<R, A>) => Reader<R, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<R, A, B>(f: (index: number, a: A) => Reader<R, B>) => (arr: readonly A[]) => Reader<R, readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<R, A, B>(f: (a: A) => Reader<R, B>) => (arr: readonly A[]) => Reader<R, readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<R, A>(arr: readonly Reader<R, A>[]) => Reader<R, readonly A[]>
```

#### Exported Types

##### `F` `Reader`

```ts
typeIndexRef
```

### `/src/ReaderEither`

@since 2.0.0

#### Exported Terms

##### `local`

<!-- prettier-ignore -->
```ts
<Q, R>(f: (f: Q) => R) => <E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<Q, E, A>
```

##### `fromEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => Either<E, B>) => <R>(...a: A) => ReaderEither<R, E, B>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<R, E, A>(S: Semigroup<A>) => Semigroup<ReaderEither<R, E, A>>
```

##### `getApplySemigroup`

<!-- prettier-ignore -->
```ts
<R, E, A>(S: Semigroup<A>) => Semigroup<ReaderEither<R, E, A>>
```

##### `getApplyMonoid`

<!-- prettier-ignore -->
```ts
<R, E, A>(M: Monoid<A>) => Monoid<ReaderEither<R, E, A>>
```

##### `getApplicativeReaderValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Applicative3C<"ReaderEither", E>
```

##### `getAltReaderValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Alt3C<"ReaderEither", E>
```

##### `getReaderValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Monad3C<"ReaderEither", E> & Bifunctor3<"ReaderEither"> & Alt3C<"ReaderEither", E> & MonadThrow3C<"ReaderEither", E>
```

##### `left`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(e: E) => ReaderEither<R, E, A>
```

##### `right`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(a: A) => ReaderEither<R, E, A>
```

##### `rightReader`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(ma: Reader<R, A>) => ReaderEither<R, E, A>
```

##### `leftReader`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(me: Reader<R, E>) => ReaderEither<R, E, A>
```

##### `ask`

<!-- prettier-ignore -->
```ts
<R, E = never>() => ReaderEither<R, E, R>
```

##### `asks`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(f: (r: R) => A) => ReaderEither<R, E, A>
```

##### `fromEither`

<!-- prettier-ignore -->
```ts
<R, E, A>(ma: Either<E, A>) => ReaderEither<R, E, A>
```

##### `fromOption`

<!-- prettier-ignore -->
```ts
<E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderEither<R, E, A>
```

##### `fromPredicate`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderEither<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderEither<...>; }
```

##### `fold`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(onLeft: (e: E) => Reader<R, B>, onRight: (a: A) => Reader<R, B>) => (ma: ReaderEither<R, E, A>) => Reader<R, B>
```

##### `getOrElseW`

<!-- prettier-ignore -->
```ts
<R, E, B>(onLeft: (e: E) => Reader<R, B>) => <Q, A>(ma: ReaderEither<Q, E, A>) => Reader<Q & R, B | A>
```

##### `getOrElse`

<!-- prettier-ignore -->
```ts
<E, R, A>(onLeft: (e: E) => Reader<R, A>) => (ma: ReaderEither<R, E, A>) => Reader<R, A>
```

##### `orElse`

<!-- prettier-ignore -->
```ts
<E, R, M, A>(onLeft: (e: E) => ReaderEither<R, M, A>) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A>
```

##### `swap`

<!-- prettier-ignore -->
```ts
<R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E>
```

##### `chainEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => <R, D>(ma: ReaderEither<R, D, A>) => ReaderEither<R, E | D, B>
```

##### `chainEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

##### `filterOrElse`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>; <E, A>(predicate: Predicate<...>, onFalse: (a: A) => E): <R>(ma: ReaderEither<...>) => ReaderEither<...>; }
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, B>
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <R, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, A>
```

##### `apW`

<!-- prettier-ignore -->
```ts
<Q, D, A>(fa: ReaderEither<Q, D, A>) => <R, E, B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<Q & R, D | E, B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<R, E, A>(fa: ReaderEither<R, E, A>) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<R, E, B>(fb: ReaderEither<R, E, B>) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<R, E, B>(fb: ReaderEither<R, E, B>) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<R, E, A>(a: A) => ReaderEither<R, E, A>
```

##### `chainW`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderEither<R, E, B>) => <Q, D>(ma: ReaderEither<Q, D, A>) => ReaderEither<Q & R, E | D, B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderEither<R, E, B>) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

##### `chainFirstW`

<!-- prettier-ignore -->
```ts
<R, D, A, B>(f: (a: A) => ReaderEither<R, D, B>) => <Q, E>(ma: ReaderEither<Q, E, A>) => ReaderEither<Q & R, D | E, A>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderEither<R, E, B>) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A>
```

##### `altW`

<!-- prettier-ignore -->
```ts
<R2, E2, B>(that: () => ReaderEither<R2, E2, B>) => <R1, E1, A>(fa: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, B | A>
```

##### `alt`

<!-- prettier-ignore -->
```ts
<R, E, A>(that: () => ReaderEither<R, E, A>) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

##### `throwError`

<!-- prettier-ignore -->
```ts
<R, E, A>(e: E) => ReaderEither<R, E, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor3<"ReaderEither">
```

##### `Applicative`

```ts
Applicative3<"ReaderEither">
```

##### `Monad`

```ts
Monad3<"ReaderEither">
```

##### `Bifunctor`

```ts
Bifunctor3<"ReaderEither">
```

##### `Alt`

```ts
Alt3<"ReaderEither">
```

##### `MonadThrow`

```ts
MonadThrow3<"ReaderEither">
```

##### `readerEither`

```ts
Monad3<"ReaderEither"> & Bifunctor3<"ReaderEither"> & Alt3<"ReaderEither"> & MonadThrow3<"ReaderEither">
```

##### `Do`

<!-- prettier-ignore -->
```ts
ReaderEither<unknown, never, {}>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, { [K in N]: A; }>
```

##### `bindW`

<!-- prettier-ignore -->
```ts
<N extends string, A, Q, D, B>(name: Exclude<N, keyof A>, f: (a: A) => ReaderEither<Q, D, B>) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<Q & R, D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, R, E, B>(name: Exclude<N, keyof A>, f: (a: A) => ReaderEither<R, E, B>) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apSW`

<!-- prettier-ignore -->
```ts
<A, N extends string, Q, D, B>(name: Exclude<N, keyof A>, fb: ReaderEither<Q, D, B>) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<Q & R, D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, R, E, B>(name: Exclude<N, keyof A>, fb: ReaderEither<R, E, B>) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (index: number, a: A) => ReaderEither<R, E, B>) => (arr: readonly A[]) => ReaderEither<R, E, readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderEither<R, E, B>) => (arr: readonly A[]) => ReaderEither<R, E, readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<R, E, A>(arr: readonly ReaderEither<R, E, A>[]) => ReaderEither<R, E, readonly A[]>
```

#### Exported Types

##### `F` `ReaderEither`

```ts
typeIndexRef
```

### `/src/ReaderT`

@since 2.0.0

#### Exported Terms

##### `getReaderM`

<!-- prettier-ignore -->
```ts
{ <M extends "ReaderEither" | "ReaderTaskEither">(M: Monad3<M>): ReaderM3<M>; <M extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | ... 8 more ... | "Writer">(M: Monad2<...>): ReaderM2<...>; <M extends "Either" | ... 14 more ... | "Writer", E>(M: Monad2C<...>): ReaderM2C<...>...
```

#### Exported Types

##### `F` `ReaderT`

```ts
typeIndexRef
```

##### `I` `ReaderM`

```ts
typeIndexRef
```

##### `F` `ReaderT1`

```ts
typeIndexRef
```

##### `I` `ReaderM1`

```ts
typeIndexRef
```

##### `F` `ReaderT2`

```ts
typeIndexRef
```

##### `I` `ReaderM2`

```ts
typeIndexRef
```

##### `I` `ReaderM2C`

```ts
typeIndexRef
```

##### `F` `ReaderT3`

```ts
typeIndexRef
```

##### `I` `ReaderM3`

```ts
typeIndexRef
```

### `/src/ReaderTaskEither`

@since 2.0.0

#### Exported Terms

##### `fold`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(onLeft: (e: E) => ReaderTask<R, B>, onRight: (a: A) => ReaderTask<R, B>) => (ma: ReaderTaskEither<R, E, A>) => ReaderTask<...>
```

##### `orElse`

<!-- prettier-ignore -->
```ts
<R, E, A, M>(onLeft: (e: E) => ReaderTaskEither<R, M, A>) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A>
```

##### `fromEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => Either<E, B>) => <R>(...a: A) => ReaderTaskEither<R, E, B>
```

##### `fromIOEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => IOEither<E, B>) => <R>(...a: A) => ReaderTaskEither<R, E, B>
```

##### `fromTaskEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => TaskEither<E, B>) => <R>(...a: A) => ReaderTaskEither<R, E, B>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<R, E, A>(S: Semigroup<A>) => Semigroup<ReaderTaskEither<R, E, A>>
```

##### `getApplySemigroup`

<!-- prettier-ignore -->
```ts
<R, E, A>(S: Semigroup<A>) => Semigroup<ReaderTaskEither<R, E, A>>
```

##### `getApplyMonoid`

<!-- prettier-ignore -->
```ts
<R, E, A>(M: Monoid<A>) => Monoid<ReaderTaskEither<R, E, A>>
```

##### `getApplicativeReaderTaskValidation`

<!-- prettier-ignore -->
```ts
<E>(A: Apply1<"Task">, SE: Semigroup<E>) => Applicative3C<"ReaderTaskEither", E>
```

##### `getAltReaderTaskValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Alt3C<"ReaderTaskEither", E>
```

##### `getReaderTaskValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Monad3C<"ReaderTaskEither", E> & Bifunctor3<"ReaderTaskEither"> & Alt3C<"ReaderTaskEither", E> & MonadTask3C<...> & MonadThrow3C<...>
```

##### `run`

<!-- prettier-ignore -->
```ts
<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R) => Promise<Either<E, A>>
```

##### `bracket`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(aquire: ReaderTaskEither<R, E, A>, use: (a: A) => ReaderTaskEither<R, E, B>, release: (a: A, e: Either<E, B>) => ReaderTaskEither<...>) => ReaderTaskEither<...>
```

##### `fromTaskEither`

<!-- prettier-ignore -->
```ts
<R, E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<R, E, A>
```

##### `left`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(e: E) => ReaderTaskEither<R, E, A>
```

##### `right`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(a: A) => ReaderTaskEither<R, E, A>
```

##### `rightTask`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(ma: Task<A>) => ReaderTaskEither<R, E, A>
```

##### `leftTask`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(me: Task<E>) => ReaderTaskEither<R, E, A>
```

##### `rightReader`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(ma: Reader<R, A>) => ReaderTaskEither<R, E, A>
```

##### `leftReader`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(me: Reader<R, E>) => ReaderTaskEither<R, E, A>
```

##### `rightReaderTask`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(ma: ReaderTask<R, A>) => ReaderTaskEither<R, E, A>
```

##### `leftReaderTask`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(me: ReaderTask<R, E>) => ReaderTaskEither<R, E, A>
```

##### `fromIOEither`

<!-- prettier-ignore -->
```ts
<R, E, A>(ma: IOEither<E, A>) => ReaderTaskEither<R, E, A>
```

##### `fromReaderEither`

<!-- prettier-ignore -->
```ts
<R, E, A>(ma: ReaderEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

##### `rightIO`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(ma: IO<A>) => ReaderTaskEither<R, E, A>
```

##### `leftIO`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(me: IO<E>) => ReaderTaskEither<R, E, A>
```

##### `ask`

<!-- prettier-ignore -->
```ts
<R, E = never>() => ReaderTaskEither<R, E, R>
```

##### `asks`

<!-- prettier-ignore -->
```ts
<R, E = never, A = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A>
```

##### `fromEither`

<!-- prettier-ignore -->
```ts
<R, E, A>(ma: Either<E, A>) => ReaderTaskEither<R, E, A>
```

##### `fromOption`

<!-- prettier-ignore -->
```ts
<E>(onNone: Lazy<E>) => <R, A>(ma: Option<A>) => ReaderTaskEither<R, E, A>
```

##### `fromPredicate`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderTaskEither<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderTaskEither<...>; }
```

##### `getOrElseW`

<!-- prettier-ignore -->
```ts
<R, E, B>(onLeft: (e: E) => ReaderTask<R, B>) => <Q, A>(ma: ReaderTaskEither<Q, E, A>) => ReaderTask<Q & R, B | A>
```

##### `getOrElse`

<!-- prettier-ignore -->
```ts
<R, E, A>(onLeft: (e: E) => ReaderTask<R, A>) => (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A>
```

##### `swap`

<!-- prettier-ignore -->
```ts
<R, E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, A, E>
```

##### `local`

<!-- prettier-ignore -->
```ts
<Q, R>(f: (f: Q) => R) => <E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<Q, E, A>
```

##### `filterOrElse`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>; <E, A>(predicate: Predicate<...>, onFalse: (a: A) => E): <R>(ma: ReaderTaskEither<...>) => ReaderTaskEither<...>; }
```

##### `chainEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, E | D, B>
```

##### `chainEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

##### `chainIOEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, E | D, B>
```

##### `chainIOEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

##### `chainTaskEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, E | D, B>
```

##### `chainTaskEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B>
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <R, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A>
```

##### `apW`

<!-- prettier-ignore -->
```ts
<Q, D, A>(fa: ReaderTaskEither<Q, D, A>) => <R, E, B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<Q & R, D | E, B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<R, E, A>(fa: ReaderTaskEither<R, E, A>) => <B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<R, E, B>(fb: ReaderTaskEither<R, E, B>) => <A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<R, E, B>(fb: ReaderTaskEither<R, E, B>) => <A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<R, E, A>(a: A) => ReaderTaskEither<R, E, A>
```

##### `chainW`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => <Q, D>(ma: ReaderTaskEither<Q, D, A>) => ReaderTaskEither<Q & R, E | D, B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

##### `chainFirstW`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => <Q, D>(ma: ReaderTaskEither<Q, D, A>) => ReaderTaskEither<Q & R, E | D, A>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<R, E, A>(mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>) => ReaderTaskEither<R, E, A>
```

##### `altW`

<!-- prettier-ignore -->
```ts
<R2, E2, B>(that: () => ReaderTaskEither<R2, E2, B>) => <R1, E1, A>(fa: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, B | A>
```

##### `alt`

<!-- prettier-ignore -->
```ts
<R, E, A>(that: () => ReaderTaskEither<R, E, A>) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

##### `fromIO`

<!-- prettier-ignore -->
```ts
<R, E, A>(fa: IO<A>) => ReaderTaskEither<R, E, A>
```

##### `fromTask`

<!-- prettier-ignore -->
```ts
<R, E, A>(fa: Task<A>) => ReaderTaskEither<R, E, A>
```

##### `throwError`

<!-- prettier-ignore -->
```ts
<R, E, A>(e: E) => ReaderTaskEither<R, E, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor3<"ReaderTaskEither">
```

##### `ApplicativePar`

```ts
Applicative3<"ReaderTaskEither">
```

##### `ApplicativeSeq`

```ts
Applicative3<"ReaderTaskEither">
```

##### `Bifunctor`

```ts
Bifunctor3<"ReaderTaskEither">
```

##### `Alt`

```ts
Alt3<"ReaderTaskEither">
```

##### `readerTaskEither`

```ts
Monad3<"ReaderTaskEither"> & Bifunctor3<"ReaderTaskEither"> & Alt3<"ReaderTaskEither"> & MonadTask3<"ReaderTaskEither"> & MonadThrow3<"ReaderTaskEither">
```

##### `readerTaskEitherSeq`

```ts
Monad3<"ReaderTaskEither"> & Bifunctor3<"ReaderTaskEither"> & Alt3<"ReaderTaskEither"> & MonadTask3<"ReaderTaskEither"> & MonadThrow3<"ReaderTaskEither">
```

##### `Do`

<!-- prettier-ignore -->
```ts
ReaderTaskEither<unknown, never, {}>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <R, E, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, { [K in N]: A; }>
```

##### `bindW`

<!-- prettier-ignore -->
```ts
<N extends string, A, Q, D, B>(name: Exclude<N, keyof A>, f: (a: A) => ReaderTaskEither<Q, D, B>) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<...>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, R, E, B>(name: Exclude<N, keyof A>, f: (a: A) => ReaderTaskEither<R, E, B>) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<...>
```

##### `apSW`

<!-- prettier-ignore -->
```ts
<A, N extends string, Q, D, B>(name: Exclude<N, keyof A>, fb: ReaderTaskEither<Q, D, B>) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<...>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, R, E, B>(name: Exclude<N, keyof A>, fb: ReaderTaskEither<R, E, B>) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<...>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (index: number, a: A) => ReaderTaskEither<R, E, B>) => (arr: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => (arr: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<R, E, A>(arr: readonly ReaderTaskEither<R, E, A>[]) => ReaderTaskEither<R, E, readonly A[]>
```

##### `traverseSeqArrayWithIndex`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (index: number, a: A) => ReaderTaskEither<R, E, B>) => (arr: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

##### `traverseSeqArray`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => (arr: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

##### `sequenceSeqArray`

<!-- prettier-ignore -->
```ts
<R, E, A>(arr: readonly ReaderTaskEither<R, E, A>[]) => ReaderTaskEither<R, E, readonly A[]>
```

#### Exported Types

##### `F` `ReaderTaskEither`

```ts
typeIndexRef
```

### `/src/ReadonlyArray`

@since 2.5.0

#### Exported Terms

##### `fromArray`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => readonly A[]
```

##### `toArray`

<!-- prettier-ignore -->
```ts
<A>(ras: readonly A[]) => A[]
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<readonly A[]>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<A = never>() => Monoid<readonly A[]>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Eq<readonly A[]>
```

##### `getOrd`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => Ord<readonly A[]>
```

##### `makeBy`

<!-- prettier-ignore -->
```ts
<A>(n: number, f: (i: number) => A) => readonly A[]
```

##### `range`

<!-- prettier-ignore -->
```ts
(start: number, end: number) => readonly number[]
```

##### `replicate`

<!-- prettier-ignore -->
```ts
<A>(n: number, a: A) => readonly A[]
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<A>(mma: readonly (readonly A[])[]) => readonly A[]
```

##### `foldLeft`

<!-- prettier-ignore -->
```ts
<A, B>(onEmpty: Lazy<B>, onCons: (head: A, tail: readonly A[]) => B) => (as: readonly A[]) => B
```

##### `foldRight`

<!-- prettier-ignore -->
```ts
<A, B>(onEmpty: Lazy<B>, onCons: (init: readonly A[], last: A) => B) => (as: readonly A[]) => B
```

##### `scanLeft`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (as: readonly A[]) => readonly B[]
```

##### `scanRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (as: readonly A[]) => readonly B[]
```

##### `isEmpty`

<!-- prettier-ignore -->
```ts
<A>(as: readonly A[]) => boolean
```

##### `isNonEmpty`

<!-- prettier-ignore -->
```ts
<A>(as: readonly A[]) => as is ReadonlyNonEmptyArray<A>
```

##### `isOutOfBound`

<!-- prettier-ignore -->
```ts
<A>(i: number, as: readonly A[]) => boolean
```

##### `lookup`

<!-- prettier-ignore -->
```ts
{ (i: number): <A>(as: readonly A[]) => Option<A>; <A>(i: number, as: readonly A[]): Option<A>; }
```

##### `cons`

<!-- prettier-ignore -->
```ts
{ <A>(head: A): (tail: readonly A[]) => ReadonlyNonEmptyArray<A>; <A>(head: A, tail: readonly A[]): ReadonlyNonEmptyArray<A>; }
```

##### `snoc`

<!-- prettier-ignore -->
```ts
<A>(init: readonly A[], end: A) => ReadonlyNonEmptyArray<A>
```

##### `head`

<!-- prettier-ignore -->
```ts
<A>(as: readonly A[]) => Option<A>
```

##### `last`

<!-- prettier-ignore -->
```ts
<A>(as: readonly A[]) => Option<A>
```

##### `tail`

<!-- prettier-ignore -->
```ts
<A>(as: readonly A[]) => Option<readonly A[]>
```

##### `init`

<!-- prettier-ignore -->
```ts
<A>(as: readonly A[]) => Option<readonly A[]>
```

##### `takeLeft`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: readonly A[]) => readonly A[]
```

##### `takeRight`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: readonly A[]) => readonly A[]
```

##### `takeLeftWhile`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (as: readonly A[]) => readonly B[]; <A>(predicate: Predicate<A>): (as: readonly A[]) => readonly A[]; }
```

##### `spanLeft`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (as: readonly A[]) => Spanned<B, A>; <A>(predicate: Predicate<A>): (as: readonly A[]) => Spanned<A, A>; }
```

##### `dropLeft`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: readonly A[]) => readonly A[]
```

##### `dropRight`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: readonly A[]) => readonly A[]
```

##### `dropLeftWhile`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: readonly A[]) => readonly A[]
```

##### `findIndex`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: readonly A[]) => Option<number>
```

##### `findFirst`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (as: readonly A[]) => Option<B>; <A>(predicate: Predicate<A>): (as: readonly A[]) => Option<A>; }
```

##### `findFirstMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (as: readonly A[]) => Option<B>
```

##### `findLast`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (as: readonly A[]) => Option<B>; <A>(predicate: Predicate<A>): (as: readonly A[]) => Option<A>; }
```

##### `findLastMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (as: readonly A[]) => Option<B>
```

##### `findLastIndex`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: readonly A[]) => Option<number>
```

##### `insertAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A) => (as: readonly A[]) => Option<readonly A[]>
```

##### `updateAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A) => (as: readonly A[]) => Option<readonly A[]>
```

##### `deleteAt`

<!-- prettier-ignore -->
```ts
(i: number) => <A>(as: readonly A[]) => Option<readonly A[]>
```

##### `modifyAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, f: (a: A) => A) => (as: readonly A[]) => Option<readonly A[]>
```

##### `reverse`

<!-- prettier-ignore -->
```ts
<A>(as: readonly A[]) => readonly A[]
```

##### `rights`

<!-- prettier-ignore -->
```ts
<E, A>(as: readonly Either<E, A>[]) => readonly A[]
```

##### `lefts`

<!-- prettier-ignore -->
```ts
<E, A>(as: readonly Either<E, A>[]) => readonly E[]
```

##### `zipWith`

<!-- prettier-ignore -->
```ts
<A, B, C>(fa: readonly A[], fb: readonly B[], f: (a: A, b: B) => C) => readonly C[]
```

##### `zip`

<!-- prettier-ignore -->
```ts
{ <B>(bs: readonly B[]): <A>(as: readonly A[]) => readonly (readonly [A, B])[]; <A, B>(as: readonly A[], bs: readonly B[]): readonly (readonly [A, B])[]; }
```

##### `unzip`

<!-- prettier-ignore -->
```ts
<A, B>(as: readonly (readonly [A, B])[]) => readonly [readonly A[], readonly B[]]
```

##### `intersperse`

<!-- prettier-ignore -->
```ts
<A>(e: A) => (as: readonly A[]) => readonly A[]
```

##### `rotate`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: readonly A[]) => readonly A[]
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (a: A): (as: readonly A[]) => boolean; (a: A, as: readonly A[]): boolean; }
```

##### `uniq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (as: readonly A[]) => readonly A[]
```

##### `sortBy`

<!-- prettier-ignore -->
```ts
<B>(ords: readonly Ord<B>[]) => <A extends B>(as: readonly A[]) => readonly A[]
```

##### `splitAt`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: readonly A[]) => readonly [readonly A[], readonly A[]]
```

##### `chunksOf`

<!-- prettier-ignore -->
```ts
(n: number) => <A>(as: readonly A[]) => readonly (readonly A[])[]
```

##### `comprehension`

<!-- prettier-ignore -->
```ts
{ <A, B, C, D, R>(input: readonly [readonly A[], readonly B[], readonly C[], readonly D[]], f: (a: A, b: B, c: C, d: D) => R, g?: ((a: A, b: B, c: C, d: D) => boolean) | undefined): readonly R[]; <A, B, C, R>(input: readonly [readonly A[], readonly B[], readonly C[]], f: (a: A, b: B, c: C) => R, g?: ((a: A, b: B, c:...
```

##### `union`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (xs: readonly A[]): (ys: readonly A[]) => readonly A[]; (xs: readonly A[], ys: readonly A[]): readonly A[]; }
```

##### `intersection`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (xs: readonly A[]): (ys: readonly A[]) => readonly A[]; (xs: readonly A[], ys: readonly A[]): readonly A[]; }
```

##### `difference`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (xs: readonly A[]): (ys: readonly A[]) => readonly A[]; (xs: readonly A[], ys: readonly A[]): readonly A[]; }
```

##### `unsafeInsertAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A, as: readonly A[]) => readonly A[]
```

##### `unsafeUpdateAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A, as: readonly A[]) => readonly A[]
```

##### `unsafeDeleteAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, as: readonly A[]) => readonly A[]
```

##### `sort`

<!-- prettier-ignore -->
```ts
<B>(O: Ord<B>) => <A extends B>(as: readonly A[]) => readonly A[]
```

##### `prependToAll`

<!-- prettier-ignore -->
```ts
<A>(e: A) => (xs: readonly A[]) => readonly A[]
```

##### `chop`

<!-- prettier-ignore -->
```ts
<A, B>(f: (as: ReadonlyNonEmptyArray<A>) => readonly [B, readonly A[]]) => (as: readonly A[]) => readonly B[]
```

##### `of`

<!-- prettier-ignore -->
```ts
<A>(a: A) => readonly A[]
```

##### `zero`

<!-- prettier-ignore -->
```ts
<A>() => readonly A[]
```

##### `altW`

<!-- prettier-ignore -->
```ts
<B>(that: Lazy<readonly B[]>) => <A>(fa: readonly A[]) => readonly (B | A)[]
```

##### `alt`

<!-- prettier-ignore -->
```ts
<A>(that: Lazy<readonly A[]>) => (fa: readonly A[]) => readonly A[]
```

##### `ap`

<!-- prettier-ignore -->
```ts
<A>(fa: readonly A[]) => <B>(fab: readonly ((a: A) => B)[]) => readonly B[]
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<B>(fb: readonly B[]) => <A>(fa: readonly A[]) => readonly A[]
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<B>(fb: readonly B[]) => <A>(fa: readonly A[]) => readonly B[]
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => readonly B[]) => (ma: readonly A[]) => readonly B[]
```

##### `chainWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (i: number, a: A) => readonly B[]) => (ma: readonly A[]) => readonly B[]
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => readonly B[]) => (ma: readonly A[]) => readonly A[]
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (fa: readonly A[]) => readonly B[]
```

##### `mapWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (i: number, a: A) => B) => (fa: readonly A[]) => readonly B[]
```

##### `separate`

<!-- prettier-ignore -->
```ts
<A, B>(fa: readonly Either<A, B>[]) => Separated<readonly A[], readonly B[]>
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: readonly A[]) => readonly B[]; <A>(predicate: Predicate<A>): (fa: readonly A[]) => readonly A[]; }
```

##### `filterMapWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (i: number, a: A) => Option<B>) => (fa: readonly A[]) => readonly B[]
```

##### `filterMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (fa: readonly A[]) => readonly B[]
```

##### `compact`

<!-- prettier-ignore -->
```ts
<A>(fa: readonly Option<A>[]) => readonly A[]
```

##### `partition`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: readonly A[]) => Separated<readonly A[], readonly B[]>; <A>(predicate: Predicate<A>): (fa: readonly A[]) => Separated<readonly A[], readonly A[]>; }
```

##### `partitionWithIndex`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: readonly A[]) => Separated<readonly A[], readonly B[]>; <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: readonly A[]) => Separated<...>; }
```

##### `partitionMap`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: readonly A[]) => Separated<readonly B[], readonly C[]>
```

##### `partitionMapWithIndex`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (i: number, a: A) => Either<B, C>) => (fa: readonly A[]) => Separated<readonly B[], readonly C[]>
```

##### `filterWithIndex`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: readonly A[]) => readonly B[]; <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: readonly A[]) => readonly A[]; }
```

##### `extend`

<!-- prettier-ignore -->
```ts
<A, B>(f: (fa: readonly A[]) => B) => (wa: readonly A[]) => readonly B[]
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<A>(wa: readonly A[]) => readonly (readonly A[])[]
```

##### `foldMapWithIndex`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: readonly A[]) => M
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (fa: readonly A[]) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: readonly A[]) => M
```

##### `reduceWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: readonly A[]) => B
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (fa: readonly A[]) => B
```

##### `reduceRightWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: readonly A[]) => B
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse1<"ReadonlyArray">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence1<"ReadonlyArray">
```

##### `traverseWithIndex`

<!-- prettier-ignore -->
```ts
PipeableTraverseWithIndex1<"ReadonlyArray", number>
```

##### `wither`

<!-- prettier-ignore -->
```ts
PipeableWither1<"ReadonlyArray">
```

##### `wilt`

<!-- prettier-ignore -->
```ts
PipeableWilt1<"ReadonlyArray">
```

##### `unfold`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B) => Option<readonly [A, B]>) => readonly A[]
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"ReadonlyArray">
```

##### `FunctorWithIndex`

```ts
FunctorWithIndex1<"ReadonlyArray", number>
```

##### `Applicative`

```ts
Applicative1<"ReadonlyArray">
```

##### `Monad`

```ts
Monad1<"ReadonlyArray">
```

##### `Unfoldable`

```ts
Unfoldable1<"ReadonlyArray">
```

##### `Alt`

```ts
Alt1<"ReadonlyArray">
```

##### `Alternative`

```ts
Alternative1<"ReadonlyArray">
```

##### `Extend`

```ts
Extend1<"ReadonlyArray">
```

##### `Compactable`

```ts
Compactable1<"ReadonlyArray">
```

##### `Filterable`

```ts
Filterable1<"ReadonlyArray">
```

##### `FilterableWithIndex`

```ts
FilterableWithIndex1<"ReadonlyArray", number>
```

##### `Foldable`

```ts
Foldable1<"ReadonlyArray">
```

##### `FoldableWithIndex`

```ts
FoldableWithIndex1<"ReadonlyArray", number>
```

##### `Traversable`

```ts
Traversable1<"ReadonlyArray">
```

##### `TraversableWithIndex`

```ts
TraversableWithIndex1<"ReadonlyArray", number>
```

##### `Witherable`

```ts
Witherable1<"ReadonlyArray">
```

##### `readonlyArray`

```ts
FunctorWithIndex1<"ReadonlyArray", number> & Monad1<"ReadonlyArray"> & Unfoldable1<"ReadonlyArray"> & Alternative1<"ReadonlyArray"> & ... 4 more ... & Witherable1<...>
```

##### `empty`

```ts
readonly never[]
```

##### `every`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: readonly A[]) => boolean
```

##### `some`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (as: readonly A[]) => boolean
```

##### `Do`

```ts
readonly {}[]
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <A>(fa: readonly A[]) => readonly { [K in N]: A; }[]
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => readonly B[]) => (fa: readonly A[]) => readonly { [K in N | keyof A]: K extends keyof A ? A[K] : B; }[]
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(name: Exclude<N, keyof A>, fb: readonly B[]) => (fa: readonly A[]) => readonly { [K in N | keyof A]: K extends keyof A ? A[K] : B; }[]
```

#### Exported Types

##### `I` `Spanned`

```ts
typeIndexRef
```

### `/src/ReadonlyMap`

@since 2.5.0

#### Exported Terms

##### `fromMap`

<!-- prettier-ignore -->
```ts
<K, A>(m: Map<K, A>) => ReadonlyMap<K, A>
```

##### `toMap`

<!-- prettier-ignore -->
```ts
<K, A>(m: ReadonlyMap<K, A>) => Map<K, A>
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<K, A>(SK: Show<K>, SA: Show<A>) => Show<ReadonlyMap<K, A>>
```

##### `size`

<!-- prettier-ignore -->
```ts
<K, A>(d: ReadonlyMap<K, A>) => number
```

##### `isEmpty`

<!-- prettier-ignore -->
```ts
<K, A>(d: ReadonlyMap<K, A>) => boolean
```

##### `member`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => { (k: K): <A>(m: ReadonlyMap<K, A>) => boolean; <A>(k: K, m: ReadonlyMap<K, A>): boolean; }
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (a: A): <K>(m: ReadonlyMap<K, A>) => boolean; <K>(a: A, m: ReadonlyMap<K, A>): boolean; }
```

##### `keys`

<!-- prettier-ignore -->
```ts
<K>(O: Ord<K>) => <A>(m: ReadonlyMap<K, A>) => readonly K[]
```

##### `values`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => <K>(m: ReadonlyMap<K, A>) => readonly A[]
```

##### `collect`

<!-- prettier-ignore -->
```ts
<K>(O: Ord<K>) => <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => readonly B[]
```

##### `toReadonlyArray`

<!-- prettier-ignore -->
```ts
<K>(O: Ord<K>) => <A>(m: ReadonlyMap<K, A>) => readonly (readonly [K, A])[]
```

##### `toUnfoldable`

<!-- prettier-ignore -->
```ts
{ <K, F extends "Option" | "ReadonlyRecord" | "Ord" | "Eq" | "ReadonlyArray" | "ReadonlyNonEmptyArray" | "NonEmptyArray" | "Array" | "IO" | "Identity" | "Task" | "Record" | "Tree">(ord: Ord<K>, U: Unfoldable1<...>): <A>(d: ReadonlyMap<...>) => Kind<...>; <K, F>(ord: Ord<...>, U: Unfoldable<...>): <A>(d: ReadonlyMap<...
```

##### `insertAt`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

##### `deleteAt`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => (k: K) => <A>(m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

##### `updateAt`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>
```

##### `modifyAt`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => <A>(k: K, f: (a: A) => A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>
```

##### `pop`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => (k: K) => <A>(m: ReadonlyMap<K, A>) => Option<readonly [A, ReadonlyMap<K, A>]>
```

##### `lookupWithKey`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => { (k: K): <A>(m: ReadonlyMap<K, A>) => Option<readonly [K, A]>; <A>(k: K, m: ReadonlyMap<K, A>): Option<readonly [K, A]>; }
```

##### `lookup`

<!-- prettier-ignore -->
```ts
<K>(E: Eq<K>) => { (k: K): <A>(m: ReadonlyMap<K, A>) => Option<A>; <A>(k: K, m: ReadonlyMap<K, A>): Option<A>; }
```

##### `isSubmap`

<!-- prettier-ignore -->
```ts
<K, A>(SK: Eq<K>, SA: Eq<A>) => { (that: ReadonlyMap<K, A>): (me: ReadonlyMap<K, A>) => boolean; (me: ReadonlyMap<K, A>, that: ReadonlyMap<...>): boolean; }
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<K, A>(SK: Eq<K>, SA: Eq<A>) => Eq<ReadonlyMap<K, A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<K, A>(SK: Eq<K>, SA: Semigroup<A>) => Monoid<ReadonlyMap<K, A>>
```

##### `singleton`

<!-- prettier-ignore -->
```ts
<K, A>(k: K, a: A) => ReadonlyMap<K, A>
```

##### `fromFoldable`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither", K, A>(E: Eq<K>, M: Magma<A>, F: Foldable3<F>): <R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => ReadonlyMap<K, A>; <F extends "Either" | ... 14 more ... | "Writer", K, A>(E: Eq<...>, M: Magma<...>, F: Foldable2<...>): <E>(fka: Kind2<...>) => ReadonlyMap<...>; <F exten...
```

##### `getFilterableWithIndex`

<!-- prettier-ignore -->
```ts
<K = never>() => FilterableWithIndex2C<"ReadonlyMap", K, K>
```

##### `getWitherable`

<!-- prettier-ignore -->
```ts
<K>(O: Ord<K>) => Witherable2C<"ReadonlyMap", K> & TraversableWithIndex2C<"ReadonlyMap", K, K>
```

##### `empty`

```ts
ReadonlyMap<never, never>
```

##### `compact`

<!-- prettier-ignore -->
```ts
<K, A>(fa: ReadonlyMap<K, Option<A>>) => ReadonlyMap<K, A>
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>; <A>(predicate: Predicate<A>): <K>(fa: ReadonlyMap<...>) => ReadonlyMap<...>; }
```

##### `filterMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

##### `mapWithIndex`

<!-- prettier-ignore -->
```ts
<K, A, B>(f: (k: K, a: A) => B) => (fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

##### `partition`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>; <A>(predicate: Predicate<...>): <K>(fa: ReadonlyMap<...>) => Separated<...>; }
```

##### `partitionMap`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (a: A) => Either<B, C>) => <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>>
```

##### `separate`

<!-- prettier-ignore -->
```ts
<K, A, B>(fa: ReadonlyMap<K, Either<A, B>>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"ReadonlyMap">
```

##### `Compactable`

```ts
Compactable2<"ReadonlyMap">
```

##### `Filterable`

```ts
Filterable2<"ReadonlyMap">
```

##### `readonlyMap`

```ts
Filterable2<"ReadonlyMap">
```

#### Exported Types

### `/src/ReadonlyNonEmptyArray`

Data structure which represents non-empty arrays

@since 2.5.0

#### Exported Terms

##### `fromReadonlyArray`

<!-- prettier-ignore -->
```ts
<A>(as: readonly A[]) => Option<ReadonlyNonEmptyArray<A>>
```

##### `fromArray`

<!-- prettier-ignore -->
```ts
<A>(as: A[]) => Option<ReadonlyNonEmptyArray<A>>
```

##### `uncons`

<!-- prettier-ignore -->
```ts
<A>(nea: ReadonlyNonEmptyArray<A>) => readonly [A, readonly A[]]
```

##### `unsnoc`

<!-- prettier-ignore -->
```ts
<A>(nea: ReadonlyNonEmptyArray<A>) => readonly [readonly A[], A]
```

##### `head`

<!-- prettier-ignore -->
```ts
<A>(nea: ReadonlyNonEmptyArray<A>) => A
```

##### `tail`

<!-- prettier-ignore -->
```ts
<A>(nea: ReadonlyNonEmptyArray<A>) => readonly A[]
```

##### `min`

<!-- prettier-ignore -->
```ts
<A>(ord: Ord<A>) => (nea: ReadonlyNonEmptyArray<A>) => A
```

##### `max`

<!-- prettier-ignore -->
```ts
<A>(ord: Ord<A>) => (nea: ReadonlyNonEmptyArray<A>) => A
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<A = never>() => Semigroup<ReadonlyNonEmptyArray<A>>
```

##### `group`

<!-- prettier-ignore -->
```ts
<B>(E: Eq<B>) => { <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>; <A extends B>(as: readonly A[]): readonly ReadonlyNonEmptyArray<...>[]; }
```

##### `groupSort`

<!-- prettier-ignore -->
```ts
<B>(O: Ord<B>) => { <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>; <A extends B>(as: readonly A[]): readonly ReadonlyNonEmptyArray<...>[]; }
```

##### `groupBy`

<!-- prettier-ignore -->
```ts
<A>(f: (a: A) => string) => (as: readonly A[]) => Readonly<Record<string, ReadonlyNonEmptyArray<A>>>
```

##### `last`

<!-- prettier-ignore -->
```ts
<A>(nea: ReadonlyNonEmptyArray<A>) => A
```

##### `init`

<!-- prettier-ignore -->
```ts
<A>(nea: ReadonlyNonEmptyArray<A>) => readonly A[]
```

##### `sort`

<!-- prettier-ignore -->
```ts
<B>(O: Ord<B>) => <A extends B>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

##### `insertAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A) => (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

##### `updateAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, a: A) => (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

##### `modifyAt`

<!-- prettier-ignore -->
```ts
<A>(i: number, f: (a: A) => A) => (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>; <A>(predicate: Predicate<...>): (nea: ReadonlyNonEmptyArray<...>) => Option<...>; }
```

##### `filterWithIndex`

<!-- prettier-ignore -->
```ts
<A>(predicate: (i: number, a: A) => boolean) => (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

##### `concat`

<!-- prettier-ignore -->
```ts
{ <A>(fx: readonly A[], fy: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>; <A>(fx: ReadonlyNonEmptyArray<A>, fy: readonly A[]): ReadonlyNonEmptyArray<...>; }
```

##### `fold`

<!-- prettier-ignore -->
```ts
<A>(S: Semigroup<A>) => (fa: ReadonlyNonEmptyArray<A>) => A
```

##### `cons`

<!-- prettier-ignore -->
```ts
<A>(head: A, tail: readonly A[]) => ReadonlyNonEmptyArray<A>
```

##### `snoc`

<!-- prettier-ignore -->
```ts
<A>(init: readonly A[], end: A) => ReadonlyNonEmptyArray<A>
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<ReadonlyNonEmptyArray<A>>
```

##### `reverse`

<!-- prettier-ignore -->
```ts
<A>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Eq<ReadonlyNonEmptyArray<A>>
```

##### `of`

<!-- prettier-ignore -->
```ts
<A>(a: A) => ReadonlyNonEmptyArray<A>
```

##### `zipWith`

<!-- prettier-ignore -->
```ts
<A, B, C>(fa: ReadonlyNonEmptyArray<A>, fb: ReadonlyNonEmptyArray<B>, f: (a: A, b: B) => C) => ReadonlyNonEmptyArray<C>
```

##### `zip`

<!-- prettier-ignore -->
```ts
{ <B>(bs: ReadonlyNonEmptyArray<B>): <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<readonly [A, B]>; <A, B>(as: ReadonlyNonEmptyArray<...>, bs: ReadonlyNonEmptyArray<...>): ReadonlyNonEmptyArray<...>; }
```

##### `unzip`

<!-- prettier-ignore -->
```ts
<A, B>(as: ReadonlyNonEmptyArray<readonly [A, B]>) => readonly [ReadonlyNonEmptyArray<A>, ReadonlyNonEmptyArray<B>]
```

##### `prependToAll`

<!-- prettier-ignore -->
```ts
<A>(e: A) => (xs: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

##### `intersperse`

<!-- prettier-ignore -->
```ts
<A>(e: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

##### `foldMapWithIndex`

<!-- prettier-ignore -->
```ts
<S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
```

##### `altW`

<!-- prettier-ignore -->
```ts
<B>(that: Lazy<ReadonlyNonEmptyArray<B>>) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B | A>
```

##### `alt`

<!-- prettier-ignore -->
```ts
<A>(that: Lazy<ReadonlyNonEmptyArray<A>>) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<A>(fa: ReadonlyNonEmptyArray<A>) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<B>(fb: ReadonlyNonEmptyArray<B>) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<B>(fb: ReadonlyNonEmptyArray<B>) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => ReadonlyNonEmptyArray<B>) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => ReadonlyNonEmptyArray<B>) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<A>(ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
```

##### `extend`

<!-- prettier-ignore -->
```ts
<A, B>(f: (fa: ReadonlyNonEmptyArray<A>) => B) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<A>(mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => ReadonlyNonEmptyArray<A>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

##### `mapWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (i: number, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

##### `reduceWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

##### `reduceRightWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse1<"ReadonlyNonEmptyArray">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence1<"ReadonlyNonEmptyArray">
```

##### `traverseWithIndex`

<!-- prettier-ignore -->
```ts
PipeableTraverseWithIndex1<"ReadonlyNonEmptyArray", number>
```

##### `extract`

<!-- prettier-ignore -->
```ts
<A>(wa: ReadonlyNonEmptyArray<A>) => A
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"ReadonlyNonEmptyArray">
```

##### `FunctorWithIndex`

```ts
FunctorWithIndex1<"ReadonlyNonEmptyArray", number>
```

##### `Applicative`

```ts
Applicative1<"ReadonlyNonEmptyArray">
```

##### `Monad`

```ts
Monad1<"ReadonlyNonEmptyArray">
```

##### `Foldable`

```ts
Foldable1<"ReadonlyNonEmptyArray">
```

##### `FoldableWithIndex`

```ts
FoldableWithIndex1<"ReadonlyNonEmptyArray", number>
```

##### `Traversable`

```ts
Traversable1<"ReadonlyNonEmptyArray">
```

##### `TraversableWithIndex`

```ts
TraversableWithIndex1<"ReadonlyNonEmptyArray", number>
```

##### `Alt`

```ts
Alt1<"ReadonlyNonEmptyArray">
```

##### `Comonad`

```ts
Comonad1<"ReadonlyNonEmptyArray">
```

##### `readonlyNonEmptyArray`

```ts
Monad1<"ReadonlyNonEmptyArray"> & Comonad1<"ReadonlyNonEmptyArray"> & TraversableWithIndex1<"ReadonlyNonEmptyArray", number> & FunctorWithIndex1<...> & FoldableWithIndex1<...> & Alt1<...>
```

##### `Do`

Of type [`ReadonlyNonEmptyArray`](#readonlynonemptyarray)

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<{ [K in N]: A; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => ReadonlyNonEmptyArray<B>) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<...>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(name: Exclude<N, keyof A>, fb: ReadonlyNonEmptyArray<B>) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

#### Exported Types

##### `&` `ReadonlyNonEmptyArray`

```ts
typeIndexRef
```

### `/src/ReadonlyRecord`

@since 2.5.0

#### Exported Terms

##### `fromRecord`

<!-- prettier-ignore -->
```ts
<K extends string, A>(r: Record<K, A>) => Readonly<Record<K, A>>
```

##### `toRecord`

<!-- prettier-ignore -->
```ts
<K extends string, A>(r: Readonly<Record<K, A>>) => Record<K, A>
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<Readonly<Record<string, A>>>
```

##### `size`

<!-- prettier-ignore -->
```ts
(r: Readonly<Record<string, unknown>>) => number
```

##### `isEmpty`

<!-- prettier-ignore -->
```ts
(r: Readonly<Record<string, unknown>>) => boolean
```

##### `keys`

<!-- prettier-ignore -->
```ts
<K extends string>(r: Readonly<Record<K, unknown>>) => readonly K[]
```

##### `collect`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(f: (k: K, a: A) => B) => (r: Readonly<Record<K, A>>) => readonly B[]
```

##### `toUnfoldable`

<!-- prettier-ignore -->
```ts
{ <F extends "Option" | "ReadonlyRecord" | "Ord" | "Eq" | "ReadonlyArray" | "ReadonlyNonEmptyArray" | "NonEmptyArray" | "Array" | "IO" | "Identity" | "Task" | "Record" | "Tree">(U: Unfoldable1<F>): <K extends string, A>(r: Readonly<...>) => Kind<...>; <F>(U: Unfoldable<...>): <K extends string, A>(r: Readonly<...>) ...
```

##### `insertAt`

<!-- prettier-ignore -->
```ts
<K extends string, A>(k: K, a: A) => <KS extends string>(r: Readonly<Record<KS, A>>) => Readonly<Record<K | KS, A>>
```

##### `hasOwnProperty`

<!-- prettier-ignore -->
```ts
<K extends string>(k: string, r: Readonly<Record<K, unknown>>) => k is K
```

##### `deleteAt`

<!-- prettier-ignore -->
```ts
<K extends string>(k: K) => <KS extends string, A>(r: Readonly<Record<KS, A>>) => Readonly<Record<string extends K ? string : Exclude<KS, K>, A>>
```

##### `updateAt`

<!-- prettier-ignore -->
```ts
<A>(k: string, a: A) => <K extends string>(r: Readonly<Record<K, A>>) => Option<Readonly<Record<K, A>>>
```

##### `modifyAt`

<!-- prettier-ignore -->
```ts
<A>(k: string, f: (a: A) => A) => <K extends string>(r: Readonly<Record<K, A>>) => Option<Readonly<Record<K, A>>>
```

##### `pop`

<!-- prettier-ignore -->
```ts
<K extends string>(k: K) => <KS extends string, A>(r: Readonly<Record<KS, A>>) => Option<readonly [A, Readonly<Record<string extends K ? string : Exclude<KS, K>, A>>]>
```

##### `isSubrecord`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: Readonly<Record<string, A>>): (me: Readonly<Record<string, A>>) => boolean; (me: Readonly<Record<string, A>>, that: Readonly<...>): boolean; }
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<K extends string, A>(E: Eq<A>) => Eq<Readonly<Record<K, A>>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<K extends string, A>(S: Semigroup<A>) => Monoid<Readonly<Record<K, A>>>
```

##### `lookup`

<!-- prettier-ignore -->
```ts
{ (k: string): <A>(r: Readonly<Record<string, A>>) => Option<A>; <A>(k: string, r: Readonly<Record<string, A>>): Option<A>; }
```

##### `mapWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(f: (k: K, a: A) => B) => (fa: Readonly<Record<K, A>>) => Readonly<Record<K, B>>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <K extends string>(fa: Readonly<Record<K, A>>) => Readonly<Record<K, B>>
```

##### `reduceWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B) => (fa: Readonly<Record<K, A>>) => B
```

##### `foldMapWithIndex`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <K extends string, A>(f: (k: K, a: A) => M) => (fa: Readonly<Record<K, A>>) => M
```

##### `reduceRightWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B) => (fa: Readonly<Record<K, A>>) => B
```

##### `singleton`

<!-- prettier-ignore -->
```ts
<K extends string, A>(k: K, a: A) => Readonly<Record<K, A>>
```

##### `traverseWithIndex`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither">(F: Applicative3<F>): <K extends string, R, E, A, B>(f: (k: K, a: A) => Kind3<F, R, E, B>) => (ta: Readonly<Record<K, A>>) => Kind3<...>; <F extends "ReaderEither" | "ReaderTaskEither", E>(F: Applicative3C<...>): <K extends string, R, A, B>(f: (k: K, a: A) => Kind3<.....
```

##### `traverse`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither">(F: Applicative3<F>): <R, E, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Readonly<Record<K, A>>) => Kind3<...>; <F extends "ReaderEither" | "ReaderTaskEither", E>(F: Applicative3C<...>): <R, A, B>(f: (a: A) => Kind3<...>) => <K extends string>(ta: ...
```

##### `sequence`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither">(F: Applicative3<F>): <K extends string, R, E, A>(ta: Readonly<Record<K, Kind3<F, R, E, A>>>) => Kind3<...>; <F extends "ReaderEither" | "ReaderTaskEither", E>(F: Applicative3C<...>): <K extends string, R, A>(ta: Readonly<...>) => Kind3<...>; <F extends "Either" | ......
```

##### `partitionMapWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B, C>(f: (key: K, a: A) => Either<B, C>) => (fa: Readonly<Record<K, A>>) => Separated<Readonly<Record<string, B>>, Readonly<Record<...>>>
```

##### `partitionWithIndex`

<!-- prettier-ignore -->
```ts
{ <K extends string, A, B extends A>(refinementWithIndex: RefinementWithIndex<K, A, B>): (fa: Readonly<Record<K, A>>) => Separated<Readonly<Record<string, A>>, Readonly<...>>; <K extends string, A>(predicateWithIndex: PredicateWithIndex<...>): (fa: Readonly<...>) => Separated<...>; }
```

##### `filterMapWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(f: (key: K, a: A) => Option<B>) => (fa: Readonly<Record<K, A>>) => Readonly<Record<string, B>>
```

##### `filterWithIndex`

<!-- prettier-ignore -->
```ts
{ <K extends string, A, B extends A>(refinementWithIndex: RefinementWithIndex<K, A, B>): (fa: Readonly<Record<K, A>>) => Readonly<Record<string, B>>; <K extends string, A>(predicateWithIndex: PredicateWithIndex<...>): (fa: Readonly<...>) => Readonly<...>; }
```

##### `fromFoldable`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither", A>(M: Magma<A>, F: Foldable3<F>): <K extends string, R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => Readonly<Record<K, A>>; <F extends "Either" | ... 14 more ... | "Writer", A>(M: Magma<...>, F: Foldable2<...>): <K extends string, E>(fka: Kind2<...>) => Readonly<...>...
```

##### `fromFoldableMap`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither", B>(M: Magma<B>, F: Foldable3<F>): <R, E, A, K extends string>(fa: Kind3<F, R, E, A>, f: (a: A) => readonly [K, B]) => Readonly<...>; <F extends "Either" | ... 14 more ... | "Writer", B>(M: Magma<...>, F: Foldable2<...>): <E, A, K extends string>(fa: Kind2<...>, f: (a...
```

##### `every`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (r: Readonly<Record<string, A>>) => boolean
```

##### `some`

<!-- prettier-ignore -->
```ts
<A>(predicate: (a: A) => boolean) => (r: Readonly<Record<string, A>>) => boolean
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (a: A): (fa: Readonly<Record<string, A>>) => boolean; (a: A, fa: Readonly<Record<string, A>>): boolean; }
```

##### `toReadonlyArray`

<!-- prettier-ignore -->
```ts
<K extends string, A>(r: Readonly<Record<K, A>>) => readonly (readonly [K, A])[]
```

##### `empty`

```ts
Readonly<Record<string, never>>
```

##### `wither`

<!-- prettier-ignore -->
```ts
PipeableWither1<"ReadonlyRecord">
```

##### `wilt`

<!-- prettier-ignore -->
```ts
PipeableWilt1<"ReadonlyRecord">
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>; <A>(predicate: Predicate<A>): (fa: Readonly<...>) => Readonly<...>; }
```

##### `filterMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>
```

##### `partition`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>; <A>(predicate: Predicate<...>): (fa: Readonly<...>) => Separated<...>; }
```

##### `partitionMap`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, B>>, Readonly<Record<string, C>>>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Readonly<Record<string, A>>) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Readonly<Record<string, A>>) => M
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Readonly<Record<string, A>>) => B
```

##### `compact`

<!-- prettier-ignore -->
```ts
<A>(fa: Readonly<Record<string, Option<A>>>) => Readonly<Record<string, A>>
```

##### `separate`

<!-- prettier-ignore -->
```ts
<A, B>(fa: Readonly<Record<string, Either<A, B>>>) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"ReadonlyRecord">
```

##### `FunctorWithIndex`

```ts
FunctorWithIndex1<"ReadonlyRecord", string>
```

##### `Foldable`

```ts
Foldable1<"ReadonlyRecord">
```

##### `FoldableWithIndex`

```ts
FoldableWithIndex1<"ReadonlyRecord", string>
```

##### `Compactable`

```ts
Compactable1<"ReadonlyRecord">
```

##### `Filterable`

```ts
Filterable1<"ReadonlyRecord">
```

##### `FilterableWithIndex`

```ts
FilterableWithIndex1<"ReadonlyRecord", string>
```

##### `Traversable`

```ts
Traversable1<"ReadonlyRecord">
```

##### `TraversableWithIndex`

```ts
TraversableWithIndex1<"ReadonlyRecord", string>
```

##### `Witherable`

```ts
Witherable1<"ReadonlyRecord">
```

##### `readonlyRecord`

```ts
FunctorWithIndex1<"ReadonlyRecord", string> & FoldableWithIndex1<"ReadonlyRecord", string> & FilterableWithIndex1<"ReadonlyRecord", string> & TraversableWithIndex1<...> & Witherable1<...>
```

#### Exported Types

##### `` `ReadonlyRecord`

```ts
unsupported
```

### `/src/ReadonlySet`

@since 2.5.0

#### Exported Terms

##### `fromSet`

<!-- prettier-ignore -->
```ts
<A>(s: Set<A>) => ReadonlySet<A>
```

##### `toSet`

<!-- prettier-ignore -->
```ts
<A>(s: ReadonlySet<A>) => Set<A>
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<ReadonlySet<A>>
```

##### `toReadonlyArray`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (set: ReadonlySet<A>) => readonly A[]
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Eq<ReadonlySet<A>>
```

##### `some`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (set: ReadonlySet<A>) => boolean
```

##### `map`

<!-- prettier-ignore -->
```ts
<B>(E: Eq<B>) => <A>(f: (x: A) => B) => (set: ReadonlySet<A>) => ReadonlySet<B>
```

##### `every`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (set: ReadonlySet<A>) => boolean
```

##### `chain`

<!-- prettier-ignore -->
```ts
<B>(E: Eq<B>) => <A>(f: (x: A) => ReadonlySet<B>) => (set: ReadonlySet<A>) => ReadonlySet<B>
```

##### `isSubset`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: ReadonlySet<A>): (me: ReadonlySet<A>) => boolean; (me: ReadonlySet<A>, that: ReadonlySet<A>): boolean; }
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (set: ReadonlySet<A>) => ReadonlySet<B>; <A>(predicate: Predicate<A>): (set: ReadonlySet<...>) => ReadonlySet<...>; }
```

##### `partition`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (set: ReadonlySet<A>) => Separated<ReadonlySet<A>, ReadonlySet<B>>; <A>(predicate: Predicate<...>): (set: ReadonlySet<...>) => Separated<...>; }
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (a: A): (set: ReadonlySet<A>) => boolean; (a: A, set: ReadonlySet<A>): boolean; }
```

##### `union`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>; (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<...>; }
```

##### `intersection`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>; (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<...>; }
```

##### `partitionMap`

<!-- prettier-ignore -->
```ts
<B, C>(EB: Eq<B>, EC: Eq<C>) => <A>(f: (a: A) => Either<B, C>) => (set: ReadonlySet<A>) => Separated<ReadonlySet<B>, ReadonlySet<C>>
```

##### `difference`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>; (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<...>; }
```

##### `getUnionMonoid`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Monoid<ReadonlySet<A>>
```

##### `getIntersectionSemigroup`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Semigroup<ReadonlySet<A>>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => <B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlySet<A>) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<A, M>(O: Ord<A>, M: Monoid<M>) => (f: (a: A) => M) => (fa: ReadonlySet<A>) => M
```

##### `singleton`

<!-- prettier-ignore -->
```ts
<A>(a: A) => ReadonlySet<A>
```

##### `insert`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
```

##### `remove`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
```

##### `fromArray`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (as: readonly A[]) => ReadonlySet<A>
```

##### `compact`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (fa: ReadonlySet<Option<A>>) => ReadonlySet<A>
```

##### `separate`

<!-- prettier-ignore -->
```ts
<E, A>(EE: Eq<E>, EA: Eq<A>) => (fa: ReadonlySet<Either<E, A>>) => Separated<ReadonlySet<E>, ReadonlySet<A>>
```

##### `filterMap`

<!-- prettier-ignore -->
```ts
<B>(E: Eq<B>) => <A>(f: (a: A) => Option<B>) => (fa: ReadonlySet<A>) => ReadonlySet<B>
```

##### `empty`

```ts
ReadonlySet<never>
```

#### Exported Types

### `/src/ReadonlyTuple`

@since 2.5.0

#### Exported Terms

##### `fst`

<!-- prettier-ignore -->
```ts
<A, E>(ea: readonly [A, E]) => A
```

##### `snd`

<!-- prettier-ignore -->
```ts
<A, E>(ea: readonly [A, E]) => E
```

##### `swap`

<!-- prettier-ignore -->
```ts
<A, E>(ea: readonly [A, E]) => readonly [E, A]
```

##### `getApply`

<!-- prettier-ignore -->
```ts
<S>(S: Semigroup<S>) => Apply2C<"ReadonlyTuple", S>
```

##### `getApplicative`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => Applicative2C<"ReadonlyTuple", M>
```

##### `getChain`

<!-- prettier-ignore -->
```ts
<S>(S: Semigroup<S>) => Chain2C<"ReadonlyTuple", S>
```

##### `getMonad`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => Monad2C<"ReadonlyTuple", M>
```

##### `getChainRec`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => ChainRec2C<"ReadonlyTuple", M>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: readonly [A, E]) => readonly [B, G]
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <A>(fa: readonly [A, E]) => readonly [A, G]
```

##### `compose`

<!-- prettier-ignore -->
```ts
<A, B>(ab: readonly [B, A]) => <C>(bc: readonly [C, B]) => readonly [C, A]
```

##### `extend`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (wa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E]
```

##### `extract`

<!-- prettier-ignore -->
```ts
<E, A>(wa: readonly [A, E]) => A
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<E, A>(wa: readonly [A, E]) => readonly [readonly [A, E], E]
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E]
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse2<"ReadonlyTuple">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence2<"ReadonlyTuple">
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"ReadonlyTuple">
```

##### `Bifunctor`

```ts
Bifunctor2<"ReadonlyTuple">
```

##### `Semigroupoid`

```ts
Semigroupoid2<"ReadonlyTuple">
```

##### `Comonad`

```ts
Comonad2<"ReadonlyTuple">
```

##### `Foldable`

```ts
Foldable2<"ReadonlyTuple">
```

##### `Traversable`

```ts
Traversable2<"ReadonlyTuple">
```

##### `readonlyTuple`

```ts
Semigroupoid2<"ReadonlyTuple"> & Bifunctor2<"ReadonlyTuple"> & Comonad2<"ReadonlyTuple"> & Foldable2<"ReadonlyTuple"> & Traversable2<...>
```

#### Exported Types

### `/src/ReaderTask`

@since 2.3.0

#### Exported Terms

##### `fromIOK`

<!-- prettier-ignore -->
```ts
<A extends readonly unknown[], B>(f: (...a: A) => IO<B>) => <R>(...a: A) => ReaderTask<R, B>
```

##### `fromTaskK`

<!-- prettier-ignore -->
```ts
<A extends readonly unknown[], B>(f: (...a: A) => Task<B>) => <R>(...a: A) => ReaderTask<R, B>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<R, A>(S: Semigroup<A>) => Semigroup<ReaderTask<R, A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<R, A>(M: Monoid<A>) => Monoid<ReaderTask<R, A>>
```

##### `run`

<!-- prettier-ignore -->
```ts
<R, A>(ma: ReaderTask<R, A>, r: R) => Promise<A>
```

##### `fromTask`

<!-- prettier-ignore -->
```ts
<R, A>(ma: Task<A>) => ReaderTask<R, A>
```

##### `fromReader`

<!-- prettier-ignore -->
```ts
<R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A>
```

##### `fromIO`

<!-- prettier-ignore -->
```ts
<R, A>(ma: IO<A>) => ReaderTask<R, A>
```

##### `ask`

<!-- prettier-ignore -->
```ts
<R>() => ReaderTask<R, R>
```

##### `asks`

<!-- prettier-ignore -->
```ts
<R, A = never>(f: (r: R) => A) => ReaderTask<R, A>
```

##### `local`

<!-- prettier-ignore -->
```ts
<Q, R>(f: (f: Q) => R) => <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A>
```

##### `chainIOK`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

##### `chainTaskK`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

##### `apW`

<!-- prettier-ignore -->
```ts
<Q, A>(fa: ReaderTask<Q, A>) => <R, B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<Q & R, B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<E, A>(a: A) => ReaderTask<E, A>
```

##### `chainW`

<!-- prettier-ignore -->
```ts
<R, A, B>(f: (a: A) => ReaderTask<R, B>) => <Q>(ma: ReaderTask<Q, A>) => ReaderTask<Q & R, B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"ReaderTask">
```

##### `ApplicativePar`

```ts
Applicative2<"ReaderTask">
```

##### `ApplicativeSeq`

```ts
Applicative2<"ReaderTask">
```

##### `Monad`

```ts
Monad2<"ReaderTask">
```

##### `readerTask`

```ts
MonadTask2<"ReaderTask">
```

##### `readerTaskSeq`

```ts
MonadTask2<"ReaderTask">
```

##### `Do`

<!-- prettier-ignore -->
```ts
ReaderTask<unknown, {}>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <R, A>(fa: ReaderTask<R, A>) => ReaderTask<R, { [K in N]: A; }>
```

##### `bindW`

<!-- prettier-ignore -->
```ts
<N extends string, A, Q, B>(name: Exclude<N, keyof A>, f: (a: A) => ReaderTask<Q, B>) => <R>(fa: ReaderTask<R, A>) => ReaderTask<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, R, B>(name: Exclude<N, keyof A>, f: (a: A) => ReaderTask<R, B>) => (fa: ReaderTask<R, A>) => ReaderTask<R, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apSW`

<!-- prettier-ignore -->
```ts
<A, N extends string, Q, B>(name: Exclude<N, keyof A>, fb: ReaderTask<Q, B>) => <R>(fa: ReaderTask<R, A>) => ReaderTask<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, R, B>(name: Exclude<N, keyof A>, fb: ReaderTask<R, B>) => (fa: ReaderTask<R, A>) => ReaderTask<R, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<R, A, B>(f: (index: number, a: A) => ReaderTask<R, B>) => (arr: readonly A[]) => ReaderTask<R, readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<R, A, B>(f: (a: A) => ReaderTask<R, B>) => (arr: readonly A[]) => ReaderTask<R, readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<R, A>(arr: readonly ReaderTask<R, A>[]) => ReaderTask<R, readonly A[]>
```

#### Exported Types

##### `F` `ReaderTask`

```ts
typeIndexRef
```

### `/src/Record`

@since 2.0.0

#### Exported Terms

##### `toUnfoldable`

<!-- prettier-ignore -->
```ts
{ <F extends "Option" | "ReadonlyRecord" | "Ord" | "Eq" | "ReadonlyArray" | "ReadonlyNonEmptyArray" | "NonEmptyArray" | "Array" | "IO" | "Identity" | "Task" | "Record" | "Tree">(U: Unfoldable1<F>): <K extends string, A>(r: Record<...>) => Kind<...>; <F>(U: Unfoldable<...>): <K extends string, A>(r: Record<...>) => H...
```

##### `insertAt`

<!-- prettier-ignore -->
```ts
<K extends string, A>(k: K, a: A) => <KS extends string>(r: Record<KS, A>) => Record<K | KS, A>
```

##### `deleteAt`

<!-- prettier-ignore -->
```ts
<K extends string>(k: K) => <KS extends string, A>(r: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A>
```

##### `pop`

<!-- prettier-ignore -->
```ts
<K extends string>(k: K) => <KS extends string, A>(r: Record<KS, A>) => Option<[A, Record<string extends K ? string : Exclude<KS, K>, A>]>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<K extends string, A>(E: Eq<A>) => Eq<Record<K, A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<K extends string, A>(S: Semigroup<A>) => Monoid<Record<K, A>>
```

##### `mapWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(f: (k: K, a: A) => B) => (fa: Record<K, A>) => Record<K, B>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <K extends string>(fa: Record<K, A>) => Record<K, B>
```

##### `reduceWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B) => (fa: Record<K, A>) => B
```

##### `foldMapWithIndex`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M
```

##### `reduceRightWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B) => (fa: Record<K, A>) => B
```

##### `traverseWithIndex`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither">(F: Applicative3<F>): <K extends string, R, E, A, B>(f: (k: K, a: A) => Kind3<F, R, E, B>) => (ta: Record<K, A>) => Kind3<...>; <F extends "ReaderEither" | "ReaderTaskEither", E>(F: Applicative3C<...>): <K extends string, R, A, B>(f: (k: K, a: A) => Kind3<...>) => (ta...
```

##### `traverse`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither">(F: Applicative3<F>): <R, E, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, R, E, Record<...>>; <F extends "ReaderEither" | "ReaderTaskEither", E>(F: Applicative3C<...>): <R, A, B>(f: (a: A) => Kind3<...>) => <K extends strin...
```

##### `sequence`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither">(F: Applicative3<F>): <K extends string, R, E, A>(ta: Record<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, Record<...>>; <F extends "ReaderEither" | "ReaderTaskEither", E>(F: Applicative3C<...>): <K extends string, R, A>(ta: Record<...>) => Kind3<...>; <F extends "Either" ...
```

##### `partitionMapWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B, C>(f: (key: K, a: A) => Either<B, C>) => (fa: Record<K, A>) => Separated<Record<string, B>, Record<string, C>>
```

##### `partitionWithIndex`

<!-- prettier-ignore -->
```ts
{ <K extends string, A, B extends A>(refinementWithIndex: RefinementWithIndex<K, A, B>): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, B>>; <K extends string, A>(predicateWithIndex: PredicateWithIndex<...>): (fa: Record<...>) => Separated<...>; }
```

##### `filterMapWithIndex`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(f: (key: K, a: A) => Option<B>) => (fa: Record<K, A>) => Record<string, B>
```

##### `filterWithIndex`

<!-- prettier-ignore -->
```ts
{ <K extends string, A, B extends A>(refinementWithIndex: RefinementWithIndex<K, A, B>): (fa: Record<K, A>) => Record<string, B>; <K extends string, A>(predicateWithIndex: PredicateWithIndex<...>): (fa: Record<...>) => Record<...>; }
```

##### `fromFoldable`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither", A>(M: Magma<A>, F: Foldable3<F>): <K extends string, R, E>(fka: Kind3<F, R, E, [K, A]>) => Record<K, A>; <F extends "Either" | ... 14 more ... | "Writer", A>(M: Magma<...>, F: Foldable2<...>): <K extends string, E>(fka: Kind2<...>) => Record<...>; <F extends "Option"...
```

##### `fromFoldableMap`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither", B>(M: Magma<B>, F: Foldable3<F>): <R, E, A, K extends string>(fa: Kind3<F, R, E, A>, f: (a: A) => [K, B]) => Record<...>; <F extends "Either" | ... 14 more ... | "Writer", B>(M: Magma<...>, F: Foldable2<...>): <E, A, K extends string>(fa: Kind2<...>, f: (a: A) => [.....
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<Record<string, A>>
```

##### `size`

<!-- prettier-ignore -->
```ts
(r: Record<string, unknown>) => number
```

##### `isEmpty`

<!-- prettier-ignore -->
```ts
(r: Record<string, unknown>) => boolean
```

##### `keys`

<!-- prettier-ignore -->
```ts
<K extends string>(r: Record<K, unknown>) => K[]
```

##### `collect`

<!-- prettier-ignore -->
```ts
<K extends string, A, B>(f: (k: K, a: A) => B) => (r: Record<K, A>) => B[]
```

##### `toArray`

<!-- prettier-ignore -->
```ts
<K extends string, A>(r: Record<K, A>) => [K, A][]
```

##### `hasOwnProperty`

<!-- prettier-ignore -->
```ts
<K extends string>(k: string, r: Record<K, unknown>) => k is K
```

##### `updateAt`

<!-- prettier-ignore -->
```ts
<A>(k: string, a: A) => <K extends string>(r: Record<K, A>) => Option<Record<K, A>>
```

##### `modifyAt`

<!-- prettier-ignore -->
```ts
<A>(k: string, f: (a: A) => A) => <K extends string>(r: Record<K, A>) => Option<Record<K, A>>
```

##### `isSubrecord`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: Record<string, A>): (me: Record<string, A>) => boolean; (me: Record<string, A>, that: Record<string, A>): boolean; }
```

##### `lookup`

<!-- prettier-ignore -->
```ts
{ (k: string): <A>(r: Record<string, A>) => Option<A>; <A>(k: string, r: Record<string, A>): Option<A>; }
```

##### `empty`

```ts
Record<string, never>
```

##### `singleton`

<!-- prettier-ignore -->
```ts
<K extends string, A>(k: K, a: A) => Record<K, A>
```

##### `wither`

<!-- prettier-ignore -->
```ts
PipeableWither1<"Record">
```

##### `wilt`

<!-- prettier-ignore -->
```ts
PipeableWilt1<"Record">
```

##### `every`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (r: Record<string, A>) => boolean
```

##### `some`

<!-- prettier-ignore -->
```ts
<A>(predicate: (a: A) => boolean) => (r: Record<string, A>) => boolean
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (a: A): (fa: Record<string, A>) => boolean; (a: A, fa: Record<string, A>): boolean; }
```

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Record<string, B>; <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Record<...>; }
```

##### `filterMap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Option<B>) => (fa: Record<string, A>) => Record<string, B>
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Record<string, A>) => M
```

##### `partition`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, B>>; <A>(predicate: Predicate<...>): (fa: Record<...>) => Separated<...>; }
```

##### `partitionMap`

<!-- prettier-ignore -->
```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: Record<string, A>) => Separated<Record<string, B>, Record<string, C>>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Record<string, A>) => B
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Record<string, A>) => B
```

##### `compact`

<!-- prettier-ignore -->
```ts
<A>(fa: Record<string, Option<A>>) => Record<string, A>
```

##### `separate`

<!-- prettier-ignore -->
```ts
<A, B>(fa: Record<string, Either<A, B>>) => Separated<Record<string, A>, Record<string, B>>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"Record">
```

##### `FunctorWithIndex`

```ts
FunctorWithIndex1<"Record", string>
```

##### `Foldable`

```ts
Foldable1<"Record">
```

##### `FoldableWithIndex`

```ts
FoldableWithIndex1<"Record", string>
```

##### `Compactable`

```ts
Compactable1<"Record">
```

##### `Filterable`

```ts
Filterable1<"Record">
```

##### `FilterableWithIndex`

```ts
FilterableWithIndex1<"Record", string>
```

##### `Traversable`

```ts
Traversable1<"Record">
```

##### `TraversableWithIndex`

```ts
TraversableWithIndex1<"Record", string>
```

##### `Witherable`

```ts
Witherable1<"Record">
```

##### `record`

```ts
FunctorWithIndex1<"Record", string> & FoldableWithIndex1<"Record", string> & FilterableWithIndex1<"Record", string> & TraversableWithIndex1<...> & Witherable1<...>
```

#### Exported Types

### `/src/Ring`

The `Ring` class is for types that support addition, multiplication, and subtraction operations.

Instances must satisfy the following law in addition to the `Semiring` laws:

- Additive inverse: `a - a <-> (zero - a) + a <-> zero`

Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Ring.purs

@since 2.0.0

#### Exported Terms

##### `getFunctionRing`

<!-- prettier-ignore -->
```ts
<A, B>(ring: Ring<B>) => Ring<(a: A) => B>
```

##### `negate`

<!-- prettier-ignore -->
```ts
<A>(ring: Ring<A>) => (a: A) => A
```

##### `getTupleRing`

<!-- prettier-ignore -->
```ts
<T extends readonly Ring<any>[]>(...rings: T) => Ring<{ [K in keyof T]: T[K] extends Ring<infer A> ? A : never; }>
```

#### Exported Types

##### `I` `Ring`

```ts
typeIndexRef
```

### `/src/Semigroup`

If a type `A` can form a `Semigroup` it has an **associative** binary operation.

```ts
interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}
```

Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.

```ts
concat(x, concat(y, z)) = concat(concat(x, y), z)
```

A common example of a semigroup is the type `string` with the operation `+`.

```ts
import { Semigroup } from 'fp-ts/Semigroup'

const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y,
}

const x = 'x'
const y = 'y'
const z = 'z'

semigroupString.concat(x, y) // 'xy'

semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'

semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
```

_Adapted from https://typelevel.org/cats_

@since 2.0.0

#### Exported Terms

##### `fold`

<!-- prettier-ignore -->
```ts
<A>(S: Semigroup<A>) => { (startWith: A): (as: readonly A[]) => A; (startWith: A, as: readonly A[]): A; }
```

##### `getFirstSemigroup`

<!-- prettier-ignore -->
```ts
<A = never>() => Semigroup<A>
```

##### `getLastSemigroup`

<!-- prettier-ignore -->
```ts
<A = never>() => Semigroup<A>
```

##### `getTupleSemigroup`

<!-- prettier-ignore -->
```ts
<T extends readonly Semigroup<any>[]>(...semigroups: T) => Semigroup<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never; }>
```

##### `getDualSemigroup`

<!-- prettier-ignore -->
```ts
<A>(S: Semigroup<A>) => Semigroup<A>
```

##### `getFunctionSemigroup`

<!-- prettier-ignore -->
```ts
<S>(S: Semigroup<S>) => <A = never>() => Semigroup<(a: A) => S>
```

##### `getStructSemigroup`

<!-- prettier-ignore -->
```ts
<O extends Readonly<Record<string, any>>>(semigroups: { [K in keyof O]: Semigroup<O[K]>; }) => Semigroup<O>
```

##### `getMeetSemigroup`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => Semigroup<A>
```

##### `getJoinSemigroup`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => Semigroup<A>
```

##### `getObjectSemigroup`

<!-- prettier-ignore -->
```ts
<A extends object = never>() => Semigroup<A>
```

##### `getIntercalateSemigroup`

<!-- prettier-ignore -->
```ts
<A>(a: A) => (S: Semigroup<A>) => Semigroup<A>
```

##### `semigroupAll`

```ts
Semigroup<boolean>
```

##### `semigroupAny`

```ts
Semigroup<boolean>
```

##### `semigroupSum`

```ts
Semigroup<number>
```

##### `semigroupProduct`

```ts
Semigroup<number>
```

##### `semigroupString`

```ts
Semigroup<string>
```

##### `semigroupVoid`

```ts
Semigroup<void>
```

#### Exported Types

##### `I` `Semigroup`

```ts
typeIndexRef
```

### `/src/Semigroupoid`

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Semigroupoid`

```ts
typeIndexRef
```

##### `I` `Semigroupoid2`

```ts
typeIndexRef
```

##### `I` `Semigroupoid2C`

```ts
typeIndexRef
```

##### `I` `Semigroupoid3`

```ts
typeIndexRef
```

##### `I` `Semigroupoid3C`

```ts
typeIndexRef
```

##### `I` `Semigroupoid4`

```ts
typeIndexRef
```

### `/src/Semiring`

The `Semiring` class is for types that support an addition and multiplication operation.

Instances must satisfy the following laws:

- Commutative monoid under addition:
  - Associativity: `(a + b) + c <-> a + (b + c)`
  - Identity: `zero + a = a + zero <-> a`
  - Commutative: `a + b <-> b + a`
- Monoid under multiplication:
  - Associativity: `(a * b) * c <-> a * (b * c)`
  - Identity: `one * a <-> a * one <-> a`
- Multiplication distributes over addition:
  - Left distributivity: `a * (b + c) <-> (a * b) + (a * c)`
  - Right distributivity: `(a + b) * c <-> (a * c) + (b * c)`
- Annihilation: `zero * a <-> a * zero <-> zero`

**Note:** The `number` type is not fully law abiding members of this class hierarchy due to the potential
for arithmetic overflows, and the presence of `NaN` and `Infinity` values. The behaviour is
unspecified in these cases.

@since 2.0.0

#### Exported Terms

##### `getFunctionSemiring`

<!-- prettier-ignore -->
```ts
<A, B>(S: Semiring<B>) => Semiring<(a: A) => B>
```

#### Exported Types

##### `I` `Semiring`

```ts
typeIndexRef
```

### `/src/Set`

@since 2.0.0

#### Exported Terms

##### `filter`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Set<B>; <A>(predicate: Predicate<A>): (set: Set<A>) => Set<A>; }
```

##### `partition`

<!-- prettier-ignore -->
```ts
{ <A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Separated<Set<A>, Set<B>>; <A>(predicate: Predicate<A>): (set: Set<...>) => Separated<...>; }
```

##### `toggle`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A>
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<Set<A>>
```

##### `empty`

```ts
Set<never>
```

##### `toArray`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => (set: Set<A>) => A[]
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Eq<Set<A>>
```

##### `some`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (set: Set<A>) => boolean
```

##### `map`

<!-- prettier-ignore -->
```ts
<B>(E: Eq<B>) => <A>(f: (x: A) => B) => (set: Set<A>) => Set<B>
```

##### `every`

<!-- prettier-ignore -->
```ts
<A>(predicate: Predicate<A>) => (set: Set<A>) => boolean
```

##### `chain`

<!-- prettier-ignore -->
```ts
<B>(E: Eq<B>) => <A>(f: (x: A) => Set<B>) => (set: Set<A>) => Set<B>
```

##### `subset`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: Set<A>): (me: Set<A>) => boolean; (me: Set<A>, that: Set<A>): boolean; }
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (a: A): (set: Set<A>) => boolean; (a: A, set: Set<A>): boolean; }
```

##### `union`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: Set<A>): (me: Set<A>) => Set<A>; (me: Set<A>, that: Set<A>): Set<A>; }
```

##### `intersection`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: Set<A>): (me: Set<A>) => Set<A>; (me: Set<A>, that: Set<A>): Set<A>; }
```

##### `partitionMap`

<!-- prettier-ignore -->
```ts
<B, C>(EB: Eq<B>, EC: Eq<C>) => <A>(f: (a: A) => Either<B, C>) => (set: Set<A>) => Separated<Set<B>, Set<C>>
```

##### `difference`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => { (that: Set<A>): (me: Set<A>) => Set<A>; (me: Set<A>, that: Set<A>): Set<A>; }
```

##### `getUnionMonoid`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Monoid<Set<A>>
```

##### `getIntersectionSemigroup`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Semigroup<Set<A>>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A>(O: Ord<A>) => <B>(b: B, f: (b: B, a: A) => B) => (fa: Set<A>) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<A, M>(O: Ord<A>, M: Monoid<M>) => (f: (a: A) => M) => (fa: Set<A>) => M
```

##### `singleton`

<!-- prettier-ignore -->
```ts
<A>(a: A) => Set<A>
```

##### `insert`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A>
```

##### `remove`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A>
```

##### `fromArray`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (as: A[]) => Set<A>
```

##### `compact`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (fa: Set<Option<A>>) => Set<A>
```

##### `separate`

<!-- prettier-ignore -->
```ts
<E, A>(EE: Eq<E>, EA: Eq<A>) => (fa: Set<Either<E, A>>) => Separated<Set<E>, Set<A>>
```

##### `filterMap`

<!-- prettier-ignore -->
```ts
<B>(E: Eq<B>) => <A>(f: (a: A) => Option<B>) => (fa: Set<A>) => Set<B>
```

#### Exported Types

### `/src/Eq`

The `Eq` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `E.equals(a, a) === true`
2. Symmetry: `E.equals(a, b) === E.equals(b, a)`
3. Transitivity: if `E.equals(a, b) === true` and `E.equals(b, c) === true`, then `E.equals(a, c) === true`

@since 2.0.0

#### Exported Terms

##### `fromEquals`

<!-- prettier-ignore -->
```ts
<A>(equals: (x: A, y: A) => boolean) => Eq<A>
```

##### `strictEqual`

<!-- prettier-ignore -->
```ts
<A>(a: A, b: A) => boolean
```

##### `getStructEq`

<!-- prettier-ignore -->
```ts
<O extends Readonly<Record<string, any>>>(eqs: { [K in keyof O]: Eq<O[K]>; }) => Eq<O>
```

##### `getTupleEq`

<!-- prettier-ignore -->
```ts
<T extends readonly Eq<any>[]>(...eqs: T) => Eq<{ [K in keyof T]: T[K] extends Eq<infer A> ? A : never; }>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<A>() => Monoid<Eq<A>>
```

##### `contramap`

<!-- prettier-ignore -->
```ts
<A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
```

##### `URI`

```ts

```

##### `eqStrict`

```ts
Eq<unknown>
```

##### `eqString`

```ts
Eq<string>
```

##### `eqNumber`

```ts
Eq<number>
```

##### `eqBoolean`

```ts
Eq<boolean>
```

##### `eqDate`

```ts
Eq<Date>
```

##### `Contravariant`

```ts
Contravariant1<"Eq">
```

##### `eq`

```ts
Contravariant1<"Eq">
```

#### Exported Types

##### `I` `Eq`

```ts
typeIndexRef
```

### `/src/Show`

@since 2.0.0

#### Exported Terms

##### `getStructShow`

<!-- prettier-ignore -->
```ts
<O extends Readonly<Record<string, any>>>(shows: { [K in keyof O]: Show<O[K]>; }) => Show<O>
```

##### `getTupleShow`

<!-- prettier-ignore -->
```ts
<T extends readonly Show<any>[]>(...shows: T) => Show<{ [K in keyof T]: T[K] extends Show<infer A> ? A : never; }>
```

##### `showString`

```ts
Show<string>
```

##### `showNumber`

```ts
Show<number>
```

##### `showBoolean`

```ts
Show<boolean>
```

#### Exported Types

##### `I` `Show`

```ts
typeIndexRef
```

### `/src/State`

@since 2.0.0

#### Exported Terms

##### `get`

<!-- prettier-ignore -->
```ts
<S>() => State<S, S>
```

##### `put`

<!-- prettier-ignore -->
```ts
<S>(s: S) => State<S, void>
```

##### `modify`

<!-- prettier-ignore -->
```ts
<S>(f: (s: S) => S) => State<S, void>
```

##### `gets`

<!-- prettier-ignore -->
```ts
<S, A>(f: (s: S) => A) => State<S, A>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<E, A>(a: A) => State<E, A>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<E, A>(mma: State<E, State<E, A>>) => State<E, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"State">
```

##### `Applicative`

```ts
Applicative2<"State">
```

##### `Monad`

```ts
Monad2<"State">
```

##### `state`

```ts
Monad2<"State">
```

##### `evalState`

<!-- prettier-ignore -->
```ts
<S, A>(ma: State<S, A>, s: S) => A
```

##### `execState`

<!-- prettier-ignore -->
```ts
<S, A>(ma: State<S, A>, s: S) => S
```

##### `evaluate`

<!-- prettier-ignore -->
```ts
<S>(s: S) => <A>(ma: State<S, A>) => A
```

##### `execute`

<!-- prettier-ignore -->
```ts
<S>(s: S) => <A>(ma: State<S, A>) => S
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <S, A>(fa: State<S, A>) => State<S, { [K in N]: A; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, S, B>(name: Exclude<N, keyof A>, f: (a: A) => State<S, B>) => (fa: State<S, A>) => State<S, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, S, B>(name: Exclude<N, keyof A>, fb: State<S, B>) => (fa: State<S, A>) => State<S, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<A, S, B>(f: (index: number, a: A) => State<S, B>) => (arr: readonly A[]) => State<S, readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<A, S, B>(f: (a: A) => State<S, B>) => (arr: readonly A[]) => State<S, readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<S, A>(arr: readonly State<S, A>[]) => State<S, readonly A[]>
```

#### Exported Types

##### `F` `State`

```ts
typeIndexRef
```

### `/src/StateReaderTaskEither`

@since 2.0.0

#### Exported Terms

##### `rightTask`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(ma: Task<A>) => StateReaderTaskEither<S, R, E, A>
```

##### `leftTask`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(me: Task<E>) => StateReaderTaskEither<S, R, E, A>
```

##### `fromTaskEither`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(ma: TaskEither<E, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `rightReader`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(ma: Reader<R, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `leftReader`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(me: Reader<R, E>) => StateReaderTaskEither<S, R, E, A>
```

##### `fromIOEither`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(ma: IOEither<E, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `fromReaderEither`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(ma: ReaderEither<R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `rightIO`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(ma: IO<A>) => StateReaderTaskEither<S, R, E, A>
```

##### `leftIO`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(me: IO<E>) => StateReaderTaskEither<S, R, E, A>
```

##### `fromEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => Either<E, B>) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

##### `fromIOEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => IOEither<E, B>) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

##### `fromTaskEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => TaskEither<E, B>) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

##### `fromReaderTaskEitherK`

<!-- prettier-ignore -->
```ts
<R, E, A extends readonly unknown[], B>(f: (...a: A) => ReaderTaskEither<R, E, B>) => <S>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

##### `run`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R) => Promise<Either<E, [A, S]>>
```

##### `left`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(e: E) => StateReaderTaskEither<S, R, E, A>
```

##### `right`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A>
```

##### `rightState`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `leftState`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(me: State<S, E>) => StateReaderTaskEither<S, R, E, A>
```

##### `fromReaderTaskEither`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(ma: ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `get`

<!-- prettier-ignore -->
```ts
<S, R, E = never>() => StateReaderTaskEither<S, R, E, S>
```

##### `put`

<!-- prettier-ignore -->
```ts
<S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void>
```

##### `modify`

<!-- prettier-ignore -->
```ts
<S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void>
```

##### `gets`

<!-- prettier-ignore -->
```ts
<S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A>
```

##### `fromEither`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(ma: Either<E, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `fromOption`

<!-- prettier-ignore -->
```ts
<E>(onNone: Lazy<E>) => <S, R, A>(ma: Option<A>) => StateReaderTaskEither<S, R, E, A>
```

##### `fromPredicate`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<S, R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<...>; }
```

##### `chainEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => <S, R, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
```

##### `chainEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

##### `chainIOEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => <S, R, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
```

##### `chainIOEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

##### `chainTaskEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => <S, R, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
```

##### `chainTaskEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

##### `chainReaderTaskEitherKW`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => <S, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
```

##### `chainReaderTaskEitherK`

<!-- prettier-ignore -->
```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

##### `filterOrElse`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>; <E, A>(predicate: Predicate<...>, onFalse: (a: A) => E): <S, R>(ma: StateReaderTaskEither<...>) => StateReaderTaskEither<...>; }
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <S, R>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B>
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <S, R, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A>
```

##### `apW`

<!-- prettier-ignore -->
```ts
<S, Q, D, A>(fa: StateReaderTaskEither<S, Q, D, A>) => <R, E, B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, Q & R, D | E, B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(a: A) => StateReaderTaskEither<S, R, E, A>
```

##### `chainW`

<!-- prettier-ignore -->
```ts
<S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => <Q, D>(ma: StateReaderTaskEither<S, Q, D, A>) => StateReaderTaskEither<S, Q & R, E | D, B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

##### `chainFirstW`

<!-- prettier-ignore -->
```ts
<S, R, D, A, B>(f: (a: A) => StateReaderTaskEither<S, R, D, B>) => <Q, E>(ma: StateReaderTaskEither<S, Q, E, A>) => StateReaderTaskEither<S, Q & R, D | E, A>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>) => StateReaderTaskEither<S, R, E, A>
```

##### `altW`

<!-- prettier-ignore -->
```ts
<S, R2, E2, B>(that: () => StateReaderTaskEither<S, R2, E2, B>) => <R1, E1, A>(fa: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B | A>
```

##### `alt`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(that: Lazy<StateReaderTaskEither<S, R, E, A>>) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

##### `fromIO`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(fa: IO<A>) => StateReaderTaskEither<S, R, E, A>
```

##### `fromTask`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(fa: Task<A>) => StateReaderTaskEither<S, R, E, A>
```

##### `throwError`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(e: E) => StateReaderTaskEither<S, R, E, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor4<"StateReaderTaskEither">
```

##### `Applicative`

```ts
Applicative4<"StateReaderTaskEither">
```

##### `Bifunctor`

```ts
Bifunctor4<"StateReaderTaskEither">
```

##### `Alt`

```ts
Alt4<"StateReaderTaskEither">
```

##### `stateReaderTaskEither`

```ts
Monad4<"StateReaderTaskEither"> & Bifunctor4<"StateReaderTaskEither"> & Alt4<"StateReaderTaskEither"> & MonadTask4<"StateReaderTaskEither"> & MonadThrow4<...>
```

##### `stateReaderTaskEitherSeq`

```ts
Monad4<"StateReaderTaskEither"> & Bifunctor4<"StateReaderTaskEither"> & Alt4<"StateReaderTaskEither"> & MonadTask4<"StateReaderTaskEither"> & MonadThrow4<...>
```

##### `evalState`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, A>
```

##### `execState`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, S>
```

##### `evaluate`

<!-- prettier-ignore -->
```ts
<S>(s: S) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, A>
```

##### `execute`

<!-- prettier-ignore -->
```ts
<S>(s: S) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, S>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, { [K in N]: A; }>
```

##### `bindW`

<!-- prettier-ignore -->
```ts
<N extends string, A, S, Q, D, B>(name: Exclude<N, keyof A>, f: (a: A) => StateReaderTaskEither<S, Q, D, B>) => <R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<...>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, S, R, E, B>(name: Exclude<N, keyof A>, f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<...>
```

##### `apSW`

<!-- prettier-ignore -->
```ts
<A, N extends string, S, Q, D, B>(name: Exclude<N, keyof A>, fb: StateReaderTaskEither<S, Q, D, B>) => <R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<...>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, S, R, E, B>(name: Exclude<N, keyof A>, fb: StateReaderTaskEither<S, R, E, B>) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<...>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<S, R, E, A, B>(f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>) => (arr: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (arr: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<S, R, E, A>(arr: readonly StateReaderTaskEither<S, R, E, A>[]) => StateReaderTaskEither<S, R, E, readonly A[]>
```

#### Exported Types

##### `F` `StateReaderTaskEither`

```ts
typeIndexRef
```

### `/src/StateT`

@since 2.0.0

#### Exported Terms

##### `getStateM`

<!-- prettier-ignore -->
```ts
{ <M extends "ReaderEither" | "ReaderTaskEither">(M: Monad3<M>): StateM3<M>; <M extends "ReaderEither" | "ReaderTaskEither", E>(M: Monad3C<M, E>): StateM3C<M, E>; <M extends "Either" | ... 14 more ... | "Writer">(M: Monad2<...>): StateM2<...>; <M extends "Either" | ... 14 more ... | "Writer", E>(M: Monad2C<...>): St...
```

#### Exported Types

##### `F` `StateT`

```ts
typeIndexRef
```

##### `I` `StateM`

```ts
typeIndexRef
```

##### `F` `StateT1`

```ts
typeIndexRef
```

##### `I` `StateM1`

```ts
typeIndexRef
```

##### `F` `StateT2`

```ts
typeIndexRef
```

##### `I` `StateM2`

```ts
typeIndexRef
```

##### `I` `StateM2C`

```ts
typeIndexRef
```

##### `F` `StateT3`

```ts
typeIndexRef
```

##### `I` `StateM3`

```ts
typeIndexRef
```

##### `I` `StateM3C`

```ts
typeIndexRef
```

### `/src/Store`

@since 2.0.0

#### Exported Terms

##### `seek`

<!-- prettier-ignore -->
```ts
<S>(s: S) => <A>(wa: Store<S, A>) => Store<S, A>
```

##### `seeks`

<!-- prettier-ignore -->
```ts
<S>(f: Endomorphism<S>) => <A>(wa: Store<S, A>) => Store<S, A>
```

##### `peeks`

<!-- prettier-ignore -->
```ts
<S>(f: Endomorphism<S>) => <A>(wa: Store<S, A>) => A
```

##### `experiment`

<!-- prettier-ignore -->
```ts
{ <F extends "ReaderEither" | "ReaderTaskEither">(F: Functor3<F>): <R, E, S>(f: (s: S) => Kind3<F, R, E, S>) => <A>(wa: Store<S, A>) => Kind3<F, R, E, A>; <F extends "ReaderEither" | "ReaderTaskEither", E>(F: Functor3C<...>): <R, S>(f: (s: S) => Kind3<...>) => <A>(wa: Store<...>) => Kind3<...>; <F extends "Either" |...
```

##### `extend`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (wa: Store<E, A>) => B) => (wa: Store<E, A>) => Store<E, B>
```

##### `extract`

<!-- prettier-ignore -->
```ts
<E, A>(wa: Store<E, A>) => A
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<E, A>(wa: Store<E, A>) => Store<E, Store<E, A>>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: Store<E, A>) => Store<E, B>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"Store">
```

##### `Comonad`

```ts
Comonad2<"Store">
```

##### `store`

```ts
Comonad2<"Store">
```

#### Exported Types

##### `I` `Store`

```ts
typeIndexRef
```

### `/src/Strong`

The `Strong` class extends `Profunctor` with combinators for working with product types.

`first` and `second` lift values in a `Profunctor` to act on the first and second components of a tuple,
respectively.

Another way to think about Strong is to piggyback on the intuition of
inputs and outputs. Rewriting the type signature in this light then yields:

```purescript
first ::  forall input output a. p input output -> p (Tuple input a) (Tuple output a)
second :: forall input output a. p input output -> p (Tuple a input) (Tuple a output)
```

If we specialize the profunctor p to the function arrow, we get the following type
signatures, which may look a bit more familiar:

```purescript
first ::  forall input output a. (input -> output) -> (Tuple input a) -> (Tuple output a)
second :: forall input output a. (input -> output) -> (Tuple a input) -> (Tuple a output)
```

So, when the `profunctor` is `Function` application, `first` essentially applies your function
to the first element of a tuple, and `second` applies it to the second element (same as `map` would do).

Adapted from https://github.com/purescript/purescript-profunctor/blob/master/src/Data/Profunctor/Strong.purs

@since 2.0.0

#### Exported Terms

##### `splitStrong`

<!-- prettier-ignore -->
```ts
{ <F extends "StateReaderTaskEither">(F: Category4<F> & Strong4<F>): <S, R, A, B, C, D>(pab: Kind4<F, S, R, A, B>, pcd: Kind4<F, S, R, C, D>) => Kind4<...>; <F extends "ReaderEither" | "ReaderTaskEither">(F: Category3<...> & Strong3<...>): <R, A, B, C, D>(pab: Kind3<...>, pcd: Kind3<...>) => Kind3<...>; <F extends "...
```

##### `fanout`

<!-- prettier-ignore -->
```ts
{ <F extends "StateReaderTaskEither">(F: Category4<F> & Strong4<F>): <S, R, A, B, C>(pab: Kind4<F, S, R, A, B>, pac: Kind4<F, S, R, A, C>) => Kind4<...>; <F extends "ReaderEither" | "ReaderTaskEither">(F: Category3<...> & Strong3<...>): <R, A, B, C>(pab: Kind3<...>, pac: Kind3<...>) => Kind3<...>; <F extends "Either...
```

#### Exported Types

##### `I` `Strong`

```ts
typeIndexRef
```

##### `I` `Strong2`

```ts
typeIndexRef
```

##### `I` `Strong3`

```ts
typeIndexRef
```

##### `I` `Strong4`

```ts
typeIndexRef
```

### `/src/Task`

```ts
interface Task<A> {
  (): Promise<A>
}
```

`Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
If you want to represent an asynchronous computation that may fail, please see `TaskEither`.

@since 2.0.0

#### Exported Terms

##### `delay`

<!-- prettier-ignore -->
```ts
(millis: number) => <A>(ma: Task<A>) => Task<A>
```

##### `fromIOK`

<!-- prettier-ignore -->
```ts
<A extends readonly unknown[], B>(f: (...a: A) => IO<B>) => (...a: A) => Task<B>
```

##### `chainIOK`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => IO<B>) => (ma: Task<A>) => Task<B>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<A>(S: Semigroup<A>) => Semigroup<Task<A>>
```

##### `getMonoid`

<!-- prettier-ignore -->
```ts
<A>(M: Monoid<A>) => Monoid<Task<A>>
```

##### `getRaceMonoid`

<!-- prettier-ignore -->
```ts
<A = never>() => Monoid<Task<A>>
```

##### `fromIO`

<!-- prettier-ignore -->
```ts
<A>(ma: IO<A>) => Task<A>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<B>
```

##### `of`

<!-- prettier-ignore -->
```ts
<A>(a: A) => Task<A>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<A>(mma: Task<Task<A>>) => Task<A>
```

##### `fromTask`

<!-- prettier-ignore -->
```ts
<A>(fa: Task<A>) => Task<A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"Task">
```

##### `ApplicativePar`

```ts
Applicative1<"Task">
```

##### `ApplicativeSeq`

```ts
Applicative1<"Task">
```

##### `Monad`

```ts
Monad1<"Task">
```

##### `task`

```ts
Monad1<"Task"> & MonadTask1<"Task">
```

##### `taskSeq`

```ts
Monad1<"Task"> & MonadTask1<"Task">
```

##### `never`

<!-- prettier-ignore -->
```ts
Task<never>
```

##### `Do`

<!-- prettier-ignore -->
```ts
Task<{}>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <A>(fa: Task<A>) => Task<{ [K in N]: A; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => Task<B>) => (fa: Task<A>) => Task<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(name: Exclude<N, keyof A>, fb: Task<B>) => (fa: Task<A>) => Task<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (index: number, a: A) => Task<B>) => (arr: readonly A[]) => Task<readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Task<B>) => (arr: readonly A[]) => Task<readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<A>(arr: readonly Task<A>[]) => Task<readonly A[]>
```

##### `traverseSeqArrayWithIndex`

<!-- prettier-ignore -->
```ts
<A, B>(f: (index: number, a: A) => Task<B>) => (arr: readonly A[]) => Task<readonly B[]>
```

##### `traverseSeqArray`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Task<B>) => (arr: readonly A[]) => Task<readonly B[]>
```

##### `sequenceSeqArray`

<!-- prettier-ignore -->
```ts
<A>(arr: readonly Task<A>[]) => Task<readonly A[]>
```

#### Exported Types

##### `F` `Task`

```ts
typeIndexRef
```

### `/src/TaskEither`

```ts
interface TaskEither<E, A> extends Task<Either<E, A>> {}
```

`TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.

@since 2.0.0

#### Exported Terms

##### `tryCatch`

<!-- prettier-ignore -->
```ts
<E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E) => TaskEither<E, A>
```

##### `tryCatchK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => Promise<B>, onRejected: (reason: unknown) => E) => (...a: A) => TaskEither<E, B>
```

##### `fromEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => Either<E, B>) => (...a: A) => TaskEither<E, B>
```

##### `fromIOEitherK`

<!-- prettier-ignore -->
```ts
<E, A extends readonly unknown[], B>(f: (...a: A) => IOEither<E, B>) => (...a: A) => TaskEither<E, B>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(S: Semigroup<A>) => Semigroup<TaskEither<E, A>>
```

##### `getApplySemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(S: Semigroup<A>) => Semigroup<TaskEither<E, A>>
```

##### `getApplyMonoid`

<!-- prettier-ignore -->
```ts
<E, A>(M: Monoid<A>) => Monoid<TaskEither<E, A>>
```

##### `getApplicativeTaskValidation`

<!-- prettier-ignore -->
```ts
<E>(A: Apply1<"Task">, SE: Semigroup<E>) => Applicative2C<"TaskEither", E>
```

##### `getAltTaskValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Alt2C<"TaskEither", E>
```

##### `getTaskValidation`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Monad2C<"TaskEither", E> & Bifunctor2<"TaskEither"> & Alt2C<"TaskEither", E> & MonadTask2C<"TaskEither", E> & MonadThrow2C<...>
```

##### `getFilterable`

<!-- prettier-ignore -->
```ts
<E>(M: Monoid<E>) => Filterable2C<"TaskEither", E>
```

##### `taskify`

<!-- prettier-ignore -->
```ts
{ <L, R>(f: (cb: (e: L | null | undefined, r?: R | undefined) => void) => void): () => TaskEither<L, R>; <A, L, R>(f: (a: A, cb: (e: L | null | undefined, r?: R | undefined) => void) => void): (a: A) => TaskEither<...>; <A, B, L, R>(f: (a: A, b: B, cb: (e: L | ... 1 more ... | undefined, r?: R | undefined) => void) ...
```

##### `left`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(e: E) => TaskEither<E, A>
```

##### `right`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(a: A) => TaskEither<E, A>
```

##### `rightTask`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(ma: Task<A>) => TaskEither<E, A>
```

##### `leftTask`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(me: Task<E>) => TaskEither<E, A>
```

##### `rightIO`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(ma: IO<A>) => TaskEither<E, A>
```

##### `leftIO`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(me: IO<E>) => TaskEither<E, A>
```

##### `fromIOEither`

<!-- prettier-ignore -->
```ts
<E, A>(fa: IOEither<E, A>) => TaskEither<E, A>
```

##### `fromEither`

<!-- prettier-ignore -->
```ts
<E, A>(ma: Either<E, A>) => TaskEither<E, A>
```

##### `fromOption`

<!-- prettier-ignore -->
```ts
<E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => TaskEither<E, A>
```

##### `fromPredicate`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskEither<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<...>; }
```

##### `fold`

<!-- prettier-ignore -->
```ts
<E, A, B>(onLeft: (e: E) => Task<B>, onRight: (a: A) => Task<B>) => (ma: TaskEither<E, A>) => Task<B>
```

##### `getOrElseW`

<!-- prettier-ignore -->
```ts
<E, B>(onLeft: (e: E) => Task<B>) => <A>(ma: TaskEither<E, A>) => Task<B | A>
```

##### `getOrElse`

<!-- prettier-ignore -->
```ts
<E, A>(onLeft: (e: E) => Task<A>) => (ma: TaskEither<E, A>) => Task<A>
```

##### `orElse`

<!-- prettier-ignore -->
```ts
<E, A, M>(onLeft: (e: E) => TaskEither<M, A>) => (ma: TaskEither<E, A>) => TaskEither<M, A>
```

##### `swap`

<!-- prettier-ignore -->
```ts
<E, A>(ma: TaskEither<E, A>) => TaskEither<A, E>
```

##### `filterOrElse`

<!-- prettier-ignore -->
```ts
{ <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: TaskEither<...>) => TaskEither<...>; }
```

##### `chainEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => <D>(ma: TaskEither<D, A>) => TaskEither<E | D, B>
```

##### `chainEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => Either<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

##### `chainIOEitherKW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => <D>(ma: TaskEither<D, A>) => TaskEither<E | D, B>
```

##### `chainIOEitherK`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskEither<E, A>) => TaskEither<G, B>
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <A>(fa: TaskEither<E, A>) => TaskEither<G, A>
```

##### `apW`

<!-- prettier-ignore -->
```ts
<D, A>(fa: TaskEither<D, A>) => <E, B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<D | E, B>
```

##### `ap`

<!-- prettier-ignore -->
```ts
<E, A>(fa: TaskEither<E, A>) => <B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

##### `chainW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => <D>(ma: TaskEither<D, A>) => TaskEither<E | D, B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

##### `chainFirstW`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => <D>(ma: TaskEither<D, A>) => TaskEither<E | D, A>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, A>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<E, A>(mma: TaskEither<E, TaskEither<E, A>>) => TaskEither<E, A>
```

##### `altW`

<!-- prettier-ignore -->
```ts
<E2, B>(that: Lazy<TaskEither<E2, B>>) => <E1, A>(fa: TaskEither<E1, A>) => TaskEither<E2 | E1, B | A>
```

##### `alt`

<!-- prettier-ignore -->
```ts
<E, A>(that: Lazy<TaskEither<E, A>>) => (fa: TaskEither<E, A>) => TaskEither<E, A>
```

##### `of`

<!-- prettier-ignore -->
```ts
<E, A>(a: A) => TaskEither<E, A>
```

##### `fromIO`

<!-- prettier-ignore -->
```ts
<E, A>(fa: IO<A>) => TaskEither<E, A>
```

##### `fromTask`

<!-- prettier-ignore -->
```ts
<E, A>(fa: Task<A>) => TaskEither<E, A>
```

##### `throwError`

<!-- prettier-ignore -->
```ts
<E, A>(e: E) => TaskEither<E, A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"TaskEither">
```

##### `ApplicativePar`

```ts
Applicative2<"TaskEither">
```

##### `ApplicativeSeq`

```ts
Applicative2<"TaskEither">
```

##### `Bifunctor`

```ts
Bifunctor2<"TaskEither">
```

##### `Alt`

```ts
Alt2<"TaskEither">
```

##### `taskEither`

```ts
Monad2<"TaskEither"> & Bifunctor2<"TaskEither"> & Alt2<"TaskEither"> & MonadTask2<"TaskEither"> & MonadThrow2<"TaskEither">
```

##### `taskEitherSeq`

```ts
Monad2<"TaskEither"> & Bifunctor2<"TaskEither"> & Alt2<"TaskEither"> & MonadTask2<"TaskEither"> & MonadThrow2<"TaskEither">
```

##### `bracket`

<!-- prettier-ignore -->
```ts
<E, A, B>(acquire: TaskEither<E, A>, use: (a: A) => TaskEither<E, B>, release: (a: A, e: Either<E, B>) => TaskEither<E, void>) => TaskEither<...>
```

##### `Do`

<!-- prettier-ignore -->
```ts
TaskEither<never, {}>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <E, A>(fa: TaskEither<E, A>) => TaskEither<E, { [K in N]: A; }>
```

##### `bindW`

<!-- prettier-ignore -->
```ts
<N extends string, A, D, B>(name: Exclude<N, keyof A>, f: (a: A) => TaskEither<D, B>) => <E>(fa: TaskEither<E, A>) => TaskEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, E, B>(name: Exclude<N, keyof A>, f: (a: A) => TaskEither<E, B>) => (fa: TaskEither<E, A>) => TaskEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apSW`

<!-- prettier-ignore -->
```ts
<A, N extends string, D, B>(name: Exclude<N, keyof A>, fb: TaskEither<D, B>) => <E>(fa: TaskEither<E, A>) => TaskEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, E, B>(name: Exclude<N, keyof A>, fb: TaskEither<E, B>) => (fa: TaskEither<E, A>) => TaskEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `traverseArrayWithIndex`

<!-- prettier-ignore -->
```ts
<A, B, E>(f: (index: number, a: A) => TaskEither<E, B>) => (arr: readonly A[]) => TaskEither<E, readonly B[]>
```

##### `traverseArray`

<!-- prettier-ignore -->
```ts
<A, B, E>(f: (a: A) => TaskEither<E, B>) => (arr: readonly A[]) => TaskEither<E, readonly B[]>
```

##### `sequenceArray`

<!-- prettier-ignore -->
```ts
<A, E>(arr: readonly TaskEither<E, A>[]) => TaskEither<E, readonly A[]>
```

##### `traverseSeqArrayWithIndex`

<!-- prettier-ignore -->
```ts
<A, B, E>(f: (index: number, a: A) => TaskEither<E, B>) => (arr: readonly A[]) => TaskEither<E, readonly B[]>
```

##### `traverseSeqArray`

<!-- prettier-ignore -->
```ts
<A, B, E>(f: (a: A) => TaskEither<E, B>) => (arr: readonly A[]) => TaskEither<E, readonly B[]>
```

##### `sequenceSeqArray`

<!-- prettier-ignore -->
```ts
<A, E>(arr: readonly TaskEither<E, A>[]) => TaskEither<E, readonly A[]>
```

#### Exported Types

##### `F` `TaskEither`

```ts
typeIndexRef
```

### `/src/TaskThese`

@since 2.4.0

#### Exported Terms

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(SE: Semigroup<E>, SA: Semigroup<A>) => Semigroup<TaskThese<E, A>>
```

##### `getApplicative`

<!-- prettier-ignore -->
```ts
<E>(A: Apply1<"Task">, SE: Semigroup<E>) => Applicative2C<"TaskThese", E>
```

##### `getMonad`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Monad2C<"TaskThese", E> & MonadTask2C<"TaskThese", E>
```

##### `left`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(e: E) => TaskThese<E, A>
```

##### `right`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(a: A) => TaskThese<E, A>
```

##### `both`

<!-- prettier-ignore -->
```ts
<E, A>(e: E, a: A) => TaskThese<E, A>
```

##### `rightTask`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(ma: Task<A>) => TaskThese<E, A>
```

##### `leftTask`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(me: Task<E>) => TaskThese<E, A>
```

##### `rightIO`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(ma: IO<A>) => TaskThese<E, A>
```

##### `leftIO`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(me: IO<E>) => TaskThese<E, A>
```

##### `fromIOEither`

<!-- prettier-ignore -->
```ts
<E, A>(fa: IOEither<E, A>) => TaskThese<E, A>
```

##### `fold`

<!-- prettier-ignore -->
```ts
<E, B, A>(onLeft: (e: E) => Task<B>, onRight: (a: A) => Task<B>, onBoth: (e: E, a: A) => Task<B>) => (fa: TaskThese<E, A>) => Task<B>
```

##### `toTuple`

<!-- prettier-ignore -->
```ts
<E, A>(e: E, a: A) => (fa: TaskThese<E, A>) => Task<[E, A]>
```

##### `swap`

<!-- prettier-ignore -->
```ts
<E, A>(fa: TaskThese<E, A>) => TaskThese<A, E>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B>
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A>
```

##### `of`

<!-- prettier-ignore -->
```ts
<E, A>(a: A) => TaskThese<E, A>
```

##### `fromIO`

<!-- prettier-ignore -->
```ts
<E, A>(fa: IO<A>) => TaskThese<E, A>
```

##### `fromTask`

<!-- prettier-ignore -->
```ts
<E, A>(fa: Task<A>) => TaskThese<E, A>
```

##### `URI`

```ts

```

##### `functorTaskThese`

```ts
Functor2<"TaskThese">
```

##### `bifunctorTaskThese`

```ts
Bifunctor2<"TaskThese">
```

##### `taskThese`

```ts
Functor2<"TaskThese"> & Bifunctor2<"TaskThese">
```

#### Exported Types

##### `F` `TaskThese`

```ts
typeIndexRef
```

### `/src/These`

A data structure providing "inclusive-or" as opposed to `Either`'s "exclusive-or".

If you interpret `Either<E, A>` as suggesting the computation may either fail or succeed (exclusively), then
`These<E, A>` may fail, succeed, or do both at the same time.

There are a few ways to interpret the both case:

- You can think of a computation that has a non-fatal error.
- You can think of a computation that went as far as it could before erroring.
- You can think of a computation that keeps track of errors as it completes.

Another way you can think of `These<E, A>` is saying that we want to handle `E` kind of data, `A` kind of data, or
both `E` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.

(description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)

Adapted from https://github.com/purescript-contrib/purescript-these

@since 2.0.0

#### Exported Terms

##### `left`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(left: E) => These<E, A>
```

##### `right`

<!-- prettier-ignore -->
```ts
<E = never, A = never>(right: A) => These<E, A>
```

##### `both`

<!-- prettier-ignore -->
```ts
<E, A>(left: E, right: A) => These<E, A>
```

##### `fold`

<!-- prettier-ignore -->
```ts
<E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B, onBoth: (e: E, a: A) => B) => (fa: These<E, A>) => B
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<E, A>(SE: Show<E>, SA: Show<A>) => Show<These<E, A>>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<E, A>(EE: Eq<E>, EA: Eq<A>) => Eq<These<E, A>>
```

##### `getSemigroup`

<!-- prettier-ignore -->
```ts
<E, A>(SE: Semigroup<E>, SA: Semigroup<A>) => Semigroup<These<E, A>>
```

##### `getApplicative`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Applicative2C<"These", E>
```

##### `getMonad`

<!-- prettier-ignore -->
```ts
<E>(SE: Semigroup<E>) => Monad2C<"These", E> & MonadThrow2C<"These", E>
```

##### `toTuple`

<!-- prettier-ignore -->
```ts
<E, A>(e: E, a: A) => (fa: These<E, A>) => [E, A]
```

##### `getLeft`

<!-- prettier-ignore -->
```ts
<E, A>(fa: These<E, A>) => Option<E>
```

##### `getRight`

<!-- prettier-ignore -->
```ts
<E, A>(fa: These<E, A>) => Option<A>
```

##### `isLeft`

<!-- prettier-ignore -->
```ts
<E, A>(fa: These<E, A>) => fa is Left<E>
```

##### `isRight`

<!-- prettier-ignore -->
```ts
<E, A>(fa: These<E, A>) => fa is Right<A>
```

##### `isBoth`

<!-- prettier-ignore -->
```ts
<E, A>(fa: These<E, A>) => fa is Both<E, A>
```

##### `leftOrBoth`

<!-- prettier-ignore -->
```ts
<E>(e: E) => <A>(ma: Option<A>) => These<E, A>
```

##### `rightOrBoth`

<!-- prettier-ignore -->
```ts
<A>(a: A) => <E>(me: Option<E>) => These<E, A>
```

##### `getLeftOnly`

<!-- prettier-ignore -->
```ts
<E, A>(fa: These<E, A>) => Option<E>
```

##### `getRightOnly`

<!-- prettier-ignore -->
```ts
<E, A>(fa: These<E, A>) => Option<A>
```

##### `fromOptions`

<!-- prettier-ignore -->
```ts
<E, A>(fe: Option<E>, fa: Option<A>) => Option<These<E, A>>
```

##### `swap`

<!-- prettier-ignore -->
```ts
<E, A>(fa: These<E, A>) => These<A, E>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: These<E, A>) => These<G, B>
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <A>(fa: These<E, A>) => These<G, A>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: These<E, A>) => These<E, B>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: These<E, A>) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: These<E, A>) => M
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: These<E, A>) => B
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse2<"These">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence2<"These">
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"These">
```

##### `Bifunctor`

```ts
Bifunctor2<"These">
```

##### `Foldable`

```ts
Foldable2<"These">
```

##### `Traversable`

```ts
Traversable2<"These">
```

##### `these`

```ts
Functor2<"These"> & Bifunctor2<"These"> & Foldable2<"These"> & Traversable2<"These">
```

#### Exported Types

##### `I` `Both`

```ts
typeIndexRef
```

##### `|` `These`

```ts
typeIndexRef
```

### `/src/TheseT`

@since 2.4.0

#### Exported Terms

##### `getTheseM`

<!-- prettier-ignore -->
```ts
{ <M extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer">(M: Monad2<...>): TheseM2<...>; <M extends "Option" | ... 11 more ... | "Tree">(M: Monad1<...>): TheseM1<...>; <M...
```

#### Exported Types

##### `I` `TheseT`

```ts
typeIndexRef
```

##### `I` `TheseM`

```ts
typeIndexRef
```

##### `` `TheseT1`

```ts
unsupported
```

##### `I` `TheseM1`

```ts
typeIndexRef
```

##### `` `TheseT2`

```ts
unsupported
```

##### `I` `TheseM2`

```ts
typeIndexRef
```

### `/src/Traced`

@since 2.0.0

#### Exported Terms

##### `tracks`

<!-- prettier-ignore -->
```ts
<P, A>(M: Monoid<P>, f: (a: A) => P) => (wa: Traced<P, A>) => A
```

##### `listen`

<!-- prettier-ignore -->
```ts
<P, A>(wa: Traced<P, A>) => Traced<P, [A, P]>
```

##### `listens`

<!-- prettier-ignore -->
```ts
<P, B>(f: (p: P) => B) => <A>(wa: Traced<P, A>) => Traced<P, [A, B]>
```

##### `censor`

<!-- prettier-ignore -->
```ts
<P>(f: (p: P) => P) => <A>(wa: Traced<P, A>) => Traced<P, A>
```

##### `getComonad`

<!-- prettier-ignore -->
```ts
<P>(monoid: Monoid<P>) => Comonad2C<"Traced", P>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: Traced<E, A>) => Traced<E, B>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"Traced">
```

##### `traced`

```ts
Functor2<"Traced">
```

#### Exported Types

##### `F` `Traced`

```ts
typeIndexRef
```

### `/src/Traversable`

`Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
`Applicative` functor.

- `traverse` runs an action for every element in a data structure, and accumulates the results.
- `sequence` runs the actions _contained_ in a data structure, and accumulates the results.

The `traverse` and `sequence` functions should be compatible in the following sense:

- `traverse(A)(xs, f) <-> sequence(A)(A.map(xs, f))`
- `sequence(A)(xs) <-> traverse(A)(xs, identity)`

where `A` is an `Applicative` instance

`Traversable` instances should also be compatible with the corresponding `Foldable` instances, in the following sense:

```ts
import { getApplicative, make } from 'fp-ts/Const'

const A = getApplicative(M)

foldMap(M)(xs, f) = traverse(A)(xs, (a) => make(f(a)))
```

where `M` is a `Monoid` instance

@since 2.0.0

#### Exported Terms

##### `getTraversableComposition`

<!-- prettier-ignore -->
```ts
{ <F extends "Option" | "ReadonlyRecord" | "Ord" | "Eq" | "ReadonlyArray" | "ReadonlyNonEmptyArray" | "NonEmptyArray" | "Array" | "IO" | "Identity" | "Task" | "Record" | "Tree", G extends "Option" | ... 11 more ... | "Tree">(F: Traversable1<...>, G: Traversable1<...>): TraversableComposition11<...>; <F, G>(F: Traver...
```

#### Exported Types

##### `I` `Traversable`

```ts
typeIndexRef
```

##### `I` `Traversable1`

```ts
typeIndexRef
```

##### `I` `Traversable2`

```ts
typeIndexRef
```

##### `I` `Traversable2C`

```ts
typeIndexRef
```

##### `I` `Traversable3`

```ts
typeIndexRef
```

##### `F` `Traverse`

```ts
typeIndexRef
```

##### `F` `Traverse1`

```ts
typeIndexRef
```

##### `F` `Traverse2`

```ts
typeIndexRef
```

##### `F` `Traverse2C`

```ts
typeIndexRef
```

##### `F` `Traverse3`

```ts
typeIndexRef
```

##### `F` `Sequence`

```ts
typeIndexRef
```

##### `F` `Sequence1`

```ts
typeIndexRef
```

##### `F` `Sequence2`

```ts
typeIndexRef
```

##### `F` `Sequence2C`

```ts
typeIndexRef
```

##### `F` `Sequence3`

```ts
typeIndexRef
```

##### `I` `TraversableComposition`

```ts
typeIndexRef
```

##### `F` `TraverseComposition11`

```ts
typeIndexRef
```

##### `F` `SequenceComposition11`

```ts
typeIndexRef
```

##### `I` `TraversableComposition11`

```ts
typeIndexRef
```

##### `F` `PipeableTraverse1`

```ts
typeIndexRef
```

##### `F` `PipeableTraverse2`

```ts
typeIndexRef
```

### `/src/TraversableWithIndex`

A `Traversable` with an additional index.
A `TraversableWithIndex` instance must be compatible with its `Traversable` instance

```ts
traverse(F)(ta, f) = traverseWithIndex(F)(ta, (_, a) => f(a))
```

with its `FoldableWithIndex` instance

```ts
foldMapWithIndex(M)(ta, f) = traverseWithIndex(getApplicative(M))(
  ta,
  (i, a) => new Const(f(i, a))
).value
```

and with its `FunctorWithIndex` instance

```purescript
mapWithIndex(ta, f) = traverseWithIndex(identity)(ta, (i, a) => new Identity(f(i, a))).value
```

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `TraversableWithIndex`

```ts
typeIndexRef
```

##### `I` `TraversableWithIndex1`

```ts
typeIndexRef
```

##### `I` `TraversableWithIndex2`

```ts
typeIndexRef
```

##### `I` `TraversableWithIndex2C`

```ts
typeIndexRef
```

##### `F` `TraverseWithIndex`

```ts
typeIndexRef
```

##### `F` `TraverseWithIndex1`

```ts
typeIndexRef
```

##### `F` `TraverseWithIndex2`

```ts
typeIndexRef
```

##### `F` `TraverseWithIndex2C`

```ts
typeIndexRef
```

##### `F` `PipeableTraverseWithIndex1`

```ts
typeIndexRef
```

##### `F` `PipeableTraverseWithIndex2`

```ts
typeIndexRef
```

### `/src/Tree`

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = Array<Tree<A>>
```

@since 2.0.0

#### Exported Terms

##### `make`

<!-- prettier-ignore -->
```ts
<A>(value: A, forest?: Forest<A>) => Tree<A>
```

##### `getShow`

<!-- prettier-ignore -->
```ts
<A>(S: Show<A>) => Show<Tree<A>>
```

##### `getEq`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => Eq<Tree<A>>
```

##### `drawForest`

<!-- prettier-ignore -->
```ts
(forest: Forest<string>) => string
```

##### `drawTree`

<!-- prettier-ignore -->
```ts
(tree: Tree<string>) => string
```

##### `unfoldTree`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B) => [A, B[]]) => Tree<A>
```

##### `unfoldForest`

<!-- prettier-ignore -->
```ts
<A, B>(bs: B[], f: (b: B) => [A, B[]]) => Forest<A>
```

##### `unfoldTreeM`

<!-- prettier-ignore -->
```ts
{ <M extends "ReaderEither" | "ReaderTaskEither">(M: Monad3<M>): <R, E, A, B>(b: B, f: (b: B) => Kind3<M, R, E, [A, B[]]>) => Kind3<M, R, E, Tree<A>>; <M extends "ReaderEither" | "ReaderTaskEither", E>(M: Monad3C<...>): <R, A, B>(b: B, f: (b: B) => Kind3<...>) => Kind3<...>; <M extends "Either" | ... 14 more ... | "...
```

##### `unfoldForestM`

<!-- prettier-ignore -->
```ts
{ <M extends "ReaderEither" | "ReaderTaskEither">(M: Monad3<M>): <R, E, A, B>(bs: B[], f: (b: B) => Kind3<M, R, E, [A, B[]]>) => Kind3<M, R, E, Forest<A>>; <M extends "ReaderEither" | "ReaderTaskEither", E>(M: Monad3C<...>): <R, A, B>(bs: B[], f: (b: B) => Kind3<...>) => Kind3<...>; <M extends "Either" | ... 14 more...
```

##### `elem`

<!-- prettier-ignore -->
```ts
<A>(E: Eq<A>) => (a: A, fa: Tree<A>) => boolean
```

##### `fold`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A, bs: B[]) => B) => (tree: Tree<A>) => B
```

##### `ap`

<!-- prettier-ignore -->
```ts
<A>(fa: Tree<A>) => <B>(fab: Tree<(a: A) => B>) => Tree<B>
```

##### `apFirst`

<!-- prettier-ignore -->
```ts
<B>(fb: Tree<B>) => <A>(fa: Tree<A>) => Tree<A>
```

##### `apSecond`

<!-- prettier-ignore -->
```ts
<B>(fb: Tree<B>) => <A>(fa: Tree<A>) => Tree<B>
```

##### `chain`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<B>
```

##### `chainFirst`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<A>
```

##### `extend`

<!-- prettier-ignore -->
```ts
<A, B>(f: (wa: Tree<A>) => B) => (wa: Tree<A>) => Tree<B>
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<A>(wa: Tree<A>) => Tree<Tree<A>>
```

##### `flatten`

<!-- prettier-ignore -->
```ts
<A>(mma: Tree<Tree<A>>) => Tree<A>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B>
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>) => B
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Tree<A>) => M
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>) => B
```

##### `extract`

<!-- prettier-ignore -->
```ts
<A>(wa: Tree<A>) => A
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse1<"Tree">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence1<"Tree">
```

##### `of`

<!-- prettier-ignore -->
```ts
<A>(a: A) => Tree<A>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor1<"Tree">
```

##### `Applicative`

```ts
Applicative1<"Tree">
```

##### `Monad`

```ts
Monad1<"Tree">
```

##### `Foldable`

```ts
Foldable1<"Tree">
```

##### `Traversable`

```ts
Traversable1<"Tree">
```

##### `Comonad`

```ts
Comonad1<"Tree">
```

##### `tree`

```ts
Monad1<"Tree"> & Foldable1<"Tree"> & Traversable1<"Tree"> & Comonad1<"Tree">
```

##### `Do`

```ts
Tree<{}>
```

##### `bindTo`

<!-- prettier-ignore -->
```ts
<N extends string>(name: N) => <A>(fa: Tree<A>) => Tree<{ [K in N]: A; }>
```

##### `bind`

<!-- prettier-ignore -->
```ts
<N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => Tree<B>) => (fa: Tree<A>) => Tree<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

##### `apS`

<!-- prettier-ignore -->
```ts
<A, N extends string, B>(name: Exclude<N, keyof A>, fb: Tree<B>) => (fa: Tree<A>) => Tree<{ [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
```

#### Exported Types

##### `` `Forest`

```ts
typeIndexRef
```

##### `I` `Tree`

```ts
typeIndexRef
```

### `/src/Tuple`

@since 2.0.0

#### Exported Terms

##### `fst`

<!-- prettier-ignore -->
```ts
<A, E>(ea: [A, E]) => A
```

##### `snd`

<!-- prettier-ignore -->
```ts
<A, E>(ea: [A, E]) => E
```

##### `swap`

<!-- prettier-ignore -->
```ts
<A, E>(sa: [A, E]) => [E, A]
```

##### `getApply`

<!-- prettier-ignore -->
```ts
<S>(S: Semigroup<S>) => Apply2C<"Tuple", S>
```

##### `getApplicative`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => Applicative2C<"Tuple", M>
```

##### `getChain`

<!-- prettier-ignore -->
```ts
<S>(S: Semigroup<S>) => Chain2C<"Tuple", S>
```

##### `getMonad`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => Monad2C<"Tuple", M>
```

##### `getChainRec`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => ChainRec2C<"Tuple", M>
```

##### `bimap`

<!-- prettier-ignore -->
```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G]
```

##### `mapLeft`

<!-- prettier-ignore -->
```ts
<E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G]
```

##### `compose`

<!-- prettier-ignore -->
```ts
<A, B>(ab: [B, A]) => <C>(bc: [C, B]) => [C, A]
```

##### `duplicate`

<!-- prettier-ignore -->
```ts
<E, A>(wa: [A, E]) => [[A, E], E]
```

##### `extend`

<!-- prettier-ignore -->
```ts
<E, A, B>(f: (wa: [A, E]) => B) => (wa: [A, E]) => [B, E]
```

##### `extract`

<!-- prettier-ignore -->
```ts
<E, A>(wa: [A, E]) => A
```

##### `foldMap`

<!-- prettier-ignore -->
```ts
<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E]
```

##### `reduce`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B
```

##### `reduceRight`

<!-- prettier-ignore -->
```ts
<A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B
```

##### `traverse`

<!-- prettier-ignore -->
```ts
PipeableTraverse2<"Tuple">
```

##### `sequence`

<!-- prettier-ignore -->
```ts
Sequence2<"Tuple">
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"Tuple">
```

##### `Bifunctor`

```ts
Bifunctor2<"Tuple">
```

##### `Semigroupoid`

```ts
Semigroupoid2<"Tuple">
```

##### `Comonad`

```ts
Comonad2<"Tuple">
```

##### `Foldable`

```ts
Foldable2<"Tuple">
```

##### `Traversable`

```ts
Traversable2<"Tuple">
```

##### `tuple`

```ts
Semigroupoid2<"Tuple"> & Bifunctor2<"Tuple"> & Comonad2<"Tuple"> & Foldable2<"Tuple"> & Traversable2<"Tuple">
```

#### Exported Types

### `/src/Unfoldable`

This class identifies data structures which can be _unfolded_, generalizing `unfold` on arrays.

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Unfoldable`

```ts
typeIndexRef
```

##### `I` `Unfoldable1`

```ts
typeIndexRef
```

##### `I` `Unfoldable2`

```ts
typeIndexRef
```

##### `I` `Unfoldable2C`

```ts
typeIndexRef
```

##### `I` `Unfoldable3`

```ts
typeIndexRef
```

### `/src/ValidationT`

@since 2.0.0

#### Exported Terms

##### `getValidationM`

<!-- prettier-ignore -->
```ts
{ <E, M extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | "TaskEither" | "ReadonlyTuple" | "State" | "Store" | "These" | "TaskThese" | "Traced" | "Tuple" | "Writer">(S: Semigroup<...>, M: Monad2<...>): ValidationM2<...>; <E, M extends "Option" | ... 11 more ... | "Tree">(S: ...
```

#### Exported Types

##### `I` `ValidationT`

```ts
typeIndexRef
```

##### `I` `ValidationM`

```ts
typeIndexRef
```

##### `` `ValidationT1`

```ts
unsupported
```

##### `I` `ValidationM1`

```ts
typeIndexRef
```

##### `` `ValidationT2`

```ts
unsupported
```

##### `I` `ValidationM2`

```ts
typeIndexRef
```

### `/src/Witherable`

`Witherable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.

Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Witherable.purs

@since 2.0.0

#### Exported Terms

#### Exported Types

##### `I` `Witherable`

```ts
typeIndexRef
```

##### `I` `Witherable1`

```ts
typeIndexRef
```

##### `I` `Witherable2`

```ts
typeIndexRef
```

##### `I` `Witherable2C`

```ts
typeIndexRef
```

##### `I` `Witherable3`

```ts
typeIndexRef
```

##### `F` `Wither`

```ts
typeIndexRef
```

##### `F` `Wither1`

```ts
typeIndexRef
```

##### `F` `Wither2`

```ts
typeIndexRef
```

##### `F` `Wither2C`

```ts
typeIndexRef
```

##### `F` `Wither3`

```ts
typeIndexRef
```

##### `F` `Wilt`

```ts
typeIndexRef
```

##### `F` `Wilt1`

```ts
typeIndexRef
```

##### `F` `Wilt2`

```ts
typeIndexRef
```

##### `F` `Wilt2C`

```ts
typeIndexRef
```

##### `F` `Wilt3`

```ts
typeIndexRef
```

##### `F` `PipeableWither`

```ts
typeIndexRef
```

##### `F` `PipeableWither1`

```ts
typeIndexRef
```

##### `F` `PipeableWither2`

```ts
typeIndexRef
```

##### `F` `PipeableWither2C`

```ts
typeIndexRef
```

##### `F` `PipeableWither3`

```ts
typeIndexRef
```

##### `F` `PipeableWilt`

```ts
typeIndexRef
```

##### `F` `PipeableWilt1`

```ts
typeIndexRef
```

##### `F` `PipeableWilt2`

```ts
typeIndexRef
```

##### `F` `PipeableWilt2C`

```ts
typeIndexRef
```

##### `F` `PipeableWilt3`

```ts
typeIndexRef
```

### `/src/Writer`

@since 2.0.0

#### Exported Terms

##### `getMonad`

<!-- prettier-ignore -->
```ts
<W>(M: Monoid<W>) => Monad2C<"Writer", W>
```

##### `tell`

<!-- prettier-ignore -->
```ts
<W>(w: W) => Writer<W, void>
```

##### `listen`

<!-- prettier-ignore -->
```ts
<W, A>(fa: Writer<W, A>) => Writer<W, [A, W]>
```

##### `pass`

<!-- prettier-ignore -->
```ts
<W, A>(fa: Writer<W, [A, (w: W) => W]>) => Writer<W, A>
```

##### `listens`

<!-- prettier-ignore -->
```ts
<W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, [A, B]>
```

##### `censor`

<!-- prettier-ignore -->
```ts
<W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A>
```

##### `map`

<!-- prettier-ignore -->
```ts
<A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B>
```

##### `URI`

```ts

```

##### `Functor`

```ts
Functor2<"Writer">
```

##### `writer`

```ts
Functor2<"Writer">
```

##### `evalWriter`

<!-- prettier-ignore -->
```ts
<W, A>(fa: Writer<W, A>) => A
```

##### `execWriter`

<!-- prettier-ignore -->
```ts
<W, A>(fa: Writer<W, A>) => W
```

##### `evaluate`

<!-- prettier-ignore -->
```ts
<W, A>(fa: Writer<W, A>) => A
```

##### `execute`

<!-- prettier-ignore -->
```ts
<W, A>(fa: Writer<W, A>) => W
```

#### Exported Types

##### `F` `Writer`

```ts
typeIndexRef
```

### `/src/WriterT`

@since 2.4.0

#### Exported Terms

##### `getWriterM`

<!-- prettier-ignore -->
```ts
{ <M extends "ReaderEither" | "ReaderTaskEither">(M: Monad3<M>): WriterM3<M>; <M extends "Either" | "Const" | "IOEither" | "ReadonlyMap" | "Map" | "Reader" | "ReaderTask" | ... 8 more ... | "Writer">(M: Monad2<...>): WriterM2<...>; <M extends "Either" | ... 14 more ... | "Writer", E>(M: Monad2C<...>): WriterM2C<...>...
```

#### Exported Types

##### `F` `WriterT`

```ts
typeIndexRef
```

##### `I` `WriterM`

```ts
typeIndexRef
```

##### `F` `WriterT1`

```ts
typeIndexRef
```

##### `I` `WriterM1`

```ts
typeIndexRef
```

##### `F` `WriterT2`

```ts
typeIndexRef
```

##### `I` `WriterM2`

```ts
typeIndexRef
```

##### `I` `WriterM2C`

```ts
typeIndexRef
```

##### `F` `WriterT3`

```ts
typeIndexRef
```

##### `I` `WriterM3`

```ts
typeIndexRef
```

### `/src/index`

@since 2.0.0

#### Exported Terms

#### Exported Types

### Type Index

#### `I` `Alt`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt<F> extends Functor<F> {
  readonly alt: <A>(fa: HKT<F, A>, that: Lazy<HKT<F, A>>) => HKT<F, A>
}
```

#### `I` `Alt1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A>(fa: Kind<F, A>, that: Lazy<Kind<F, A>>) => Kind<F, A>
}
```

#### `I` `Alt2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt2<F extends URIS2> extends Functor2<F> {
  readonly alt: <E, A>(
    fa: Kind2<F, E, A>,
    that: Lazy<Kind2<F, E, A>>
  ) => Kind2<F, E, A>
}
```

#### `I` `Alt2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly alt: <A>(
    fa: Kind2<F, E, A>,
    that: Lazy<Kind2<F, E, A>>
  ) => Kind2<F, E, A>
}
```

#### `I` `Alt3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt3<F extends URIS3> extends Functor3<F> {
  readonly alt: <R, E, A>(
    fa: Kind3<F, R, E, A>,
    that: Lazy<Kind3<F, R, E, A>>
  ) => Kind3<F, R, E, A>
}
```

#### `F` `Kind3`

<!-- prettier-ignore -->
```ts
/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type Kind3<URI extends URIS3, R, E, A> = URI extends URIS3 ? URItoKind3<R, E, A>[URI] : any
```

#### `I` `Alt3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Alt3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly alt: <R, A>(
    fa: Kind3<F, R, E, A>,
    that: Lazy<Kind3<F, R, E, A>>
  ) => Kind3<F, R, E, A>
}
```

#### `I` `Alt4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt4<F extends URIS4> extends Functor4<F> {
  readonly alt: <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>,
    that: Lazy<Kind4<F, S, R, E, A>>
  ) => Kind4<F, S, R, E, A>
}
```

#### `F` `Kind4`

<!-- prettier-ignore -->
```ts
/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type Kind4<URI extends URIS4, S, R, E, A> = URI extends URIS4 ? URItoKind4<S, R, E, A>[URI] : any
```

#### `I` `Alternative`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alternative<F> extends Applicative<F>, Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}
```

#### `I` `Alternative1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alternative1<F extends URIS> extends Applicative1<F>, Alt1<F> {
  readonly zero: <A>() => Kind<F, A>
}
```

#### `I` `Alternative2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alternative2<F extends URIS2>
  extends Applicative2<F>,
    Alt2<F> {
  readonly zero: <E, A>() => Kind2<F, E, A>
}
```

#### `I` `Alternative2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alternative2C<F extends URIS2, E>
  extends Applicative2C<F, E>,
    Alt2C<F, E> {
  readonly zero: <A>() => Kind2<F, E, A>
}
```

#### `I` `Alternative3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alternative3<F extends URIS3>
  extends Applicative3<F>,
    Alt3<F> {
  readonly zero: <R, E, A>() => Kind3<F, R, E, A>
}
```

#### `I` `Applicative`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative<F> extends Apply<F> {
  readonly of: <A>(a: A) => HKT<F, A>
}
```

#### `I` `Applicative1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative1<F extends URIS> extends Apply1<F> {
  readonly of: <A>(a: A) => Kind<F, A>
}
```

#### `I` `Applicative2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative2<F extends URIS2> extends Apply2<F> {
  readonly of: <E, A>(a: A) => Kind2<F, E, A>
}
```

#### `I` `Applicative2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative2C<F extends URIS2, E> extends Apply2C<F, E> {
  readonly of: <A>(a: A) => Kind2<F, E, A>
}
```

#### `I` `Applicative3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative3<F extends URIS3> extends Apply3<F> {
  readonly of: <R, E, A>(a: A) => Kind3<F, R, E, A>
}
```

#### `I` `Applicative3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Applicative3C<F extends URIS3, E> extends Apply3C<F, E> {
  readonly of: <R, A>(a: A) => Kind3<F, R, E, A>
}
```

#### `I` `Applicative4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative4<F extends URIS4> extends Apply4<F> {
  readonly of: <S, R, E, A>(a: A) => Kind4<F, S, R, E, A>
}
```

#### `I` `ApplicativeComposition`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeComposition<F, G> extends FunctorComposition<F, G> {
  readonly of: <A>(a: A) => HKT<F, HKT<G, A>>
  readonly ap: <A, B>(
    fgab: HKT<F, HKT<G, (a: A) => B>>,
    fga: HKT<F, HKT<G, A>>
  ) => HKT<F, HKT<G, B>>
}
```

#### `I` `ApplicativeCompositionHKT1`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeCompositionHKT1<F, G extends URIS>
  extends FunctorCompositionHKT1<F, G> {
  readonly of: <A>(a: A) => HKT<F, Kind<G, A>>
  readonly ap: <A, B>(
    fgab: HKT<F, Kind<G, (a: A) => B>>,
    fga: HKT<F, Kind<G, A>>
  ) => HKT<F, Kind<G, B>>
}
```

#### `I` `ApplicativeCompositionHKT2`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeCompositionHKT2<F, G extends URIS2>
  extends FunctorCompositionHKT2<F, G> {
  readonly of: <E, A>(a: A) => HKT<F, Kind2<G, E, A>>
  readonly ap: <E, A, B>(
    fgab: HKT<F, Kind2<G, E, (a: A) => B>>,
    fga: HKT<F, Kind2<G, E, A>>
  ) => HKT<F, Kind2<G, E, B>>
}
```

#### `I` `ApplicativeCompositionHKT2C`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeCompositionHKT2C<F, G extends URIS2, E>
  extends FunctorCompositionHKT2C<F, G, E> {
  readonly of: <A>(a: A) => HKT<F, Kind2<G, E, A>>
  readonly ap: <A, B>(
    fgab: HKT<F, Kind2<G, E, (a: A) => B>>,
    fga: HKT<F, Kind2<G, E, A>>
  ) => HKT<F, Kind2<G, E, B>>
}
```

#### `I` `ApplicativeComposition11`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeComposition11<F extends URIS, G extends URIS>
  extends FunctorComposition11<F, G> {
  readonly of: <A>(a: A) => Kind<F, Kind<G, A>>
  readonly ap: <A, B>(
    fgab: Kind<F, Kind<G, (a: A) => B>>,
    fga: Kind<F, Kind<G, A>>
  ) => Kind<F, Kind<G, B>>
}
```

#### `I` `ApplicativeComposition12`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeComposition12<F extends URIS, G extends URIS2>
  extends FunctorComposition12<F, G> {
  readonly of: <E, A>(a: A) => Kind<F, Kind2<G, E, A>>
  readonly ap: <E, A, B>(
    fgab: Kind<F, Kind2<G, E, (a: A) => B>>,
    fga: Kind<F, Kind2<G, E, A>>
  ) => Kind<F, Kind2<G, E, B>>
}
```

#### `I` `ApplicativeComposition12C`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeComposition12C<F extends URIS, G extends URIS2, E>
  extends FunctorComposition12C<F, G, E> {
  readonly of: <A>(a: A) => Kind<F, Kind2<G, E, A>>
  readonly ap: <A, B>(
    fgab: Kind<F, Kind2<G, E, (a: A) => B>>,
    fga: Kind<F, Kind2<G, E, A>>
  ) => Kind<F, Kind2<G, E, B>>
}
```

#### `I` `ApplicativeComposition21`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeComposition21<F extends URIS2, G extends URIS>
  extends FunctorComposition21<F, G> {
  readonly of: <E, A>(a: A) => Kind2<F, E, Kind<G, A>>
  readonly ap: <E, A, B>(
    fgab: Kind2<F, E, Kind<G, (a: A) => B>>,
    fga: Kind2<F, E, Kind<G, A>>
  ) => Kind2<F, E, Kind<G, B>>
}
```

#### `I` `ApplicativeComposition2C1`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeComposition2C1<F extends URIS2, G extends URIS, E>
  extends FunctorComposition2C1<F, G, E> {
  readonly of: <A>(a: A) => Kind2<F, E, Kind<G, A>>
  readonly ap: <A, B>(
    fgab: Kind2<F, E, Kind<G, (a: A) => B>>,
    fga: Kind2<F, E, Kind<G, A>>
  ) => Kind2<F, E, Kind<G, B>>
}
```

#### `I` `ApplicativeComposition22`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeComposition22<F extends URIS2, G extends URIS2>
  extends FunctorComposition22<F, G> {
  readonly of: <FE, GE, A>(a: A) => Kind2<F, FE, Kind2<G, GE, A>>
  readonly ap: <FE, GE, A, B>(
    fgab: Kind2<F, FE, Kind2<G, GE, (a: A) => B>>,
    fga: Kind2<F, FE, Kind2<G, GE, A>>
  ) => Kind2<F, FE, Kind2<G, GE, B>>
}
```

#### `I` `ApplicativeComposition22C`

```ts
/**
 * @since 2.0.0
 */
export interface ApplicativeComposition22C<F extends URIS2, G extends URIS2, E>
  extends FunctorComposition22C<F, G, E> {
  readonly of: <FE, A>(a: A) => Kind2<F, FE, Kind2<G, E, A>>
  readonly ap: <FE, A, B>(
    fgab: Kind2<F, FE, Kind2<G, E, (a: A) => B>>,
    fga: Kind2<F, FE, Kind2<G, E, A>>
  ) => Kind2<F, FE, Kind2<G, E, B>>
}
```

#### `I` `Apply`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Apply<F> extends Functor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}
```

#### `I` `Apply1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A, B>(fab: Kind<F, (a: A) => B>, fa: Kind<F, A>) => Kind<F, B>
}
```

#### `I` `Apply2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Apply2<F extends URIS2> extends Functor2<F> {
  readonly ap: <E, A, B>(
    fab: Kind2<F, E, (a: A) => B>,
    fa: Kind2<F, E, A>
  ) => Kind2<F, E, B>
}
```

#### `I` `Apply2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Apply2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly ap: <A, B>(
    fab: Kind2<F, E, (a: A) => B>,
    fa: Kind2<F, E, A>
  ) => Kind2<F, E, B>
}
```

#### `I` `Apply3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Apply3<F extends URIS3> extends Functor3<F> {
  readonly ap: <R, E, A, B>(
    fab: Kind3<F, R, E, (a: A) => B>,
    fa: Kind3<F, R, E, A>
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Apply3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Apply3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly ap: <R, A, B>(
    fab: Kind3<F, R, E, (a: A) => B>,
    fa: Kind3<F, R, E, A>
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Apply4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Apply4<F extends URIS4> extends Functor4<F> {
  readonly ap: <S, R, E, A, B>(
    fab: Kind4<F, S, R, E, (a: A) => B>,
    fa: Kind4<F, S, R, E, A>
  ) => Kind4<F, S, R, E, B>
}
```

#### `|` `Option`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export type Option<A> = None | Some<A>
```

#### `I` `None`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface None {
  readonly _tag: 'None'
}
```

#### `|` `Ordering`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export type Ordering = -1 | 0 | 1
```

#### `|` `Either`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export type Either<E, A> = Left<E> | Right<A>
```

#### `F` `RefinementWithIndex`

<!-- prettier-ignore -->
```ts
/**
 * @since 2.0.0
 */
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B
```

#### `F` `PredicateWithIndex`

<!-- prettier-ignore -->
```ts
/**
 * @since 2.0.0
 */
export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean
```

#### `I` `Bifunctor`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor<F> {
  readonly URI: F
  readonly bimap: <E, A, G, B>(
    fea: HKT2<F, E, A>,
    f: (e: E) => G,
    g: (a: A) => B
  ) => HKT2<F, G, B>
  readonly mapLeft: <E, A, G>(
    fea: HKT2<F, E, A>,
    f: (e: E) => G
  ) => HKT2<F, G, A>
}
```

#### `I` `Bifunctor2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor2<F extends URIS2> {
  readonly URI: F
  readonly bimap: <E, A, G, B>(
    fea: Kind2<F, E, A>,
    f: (e: E) => G,
    g: (a: A) => B
  ) => Kind2<F, G, B>
  readonly mapLeft: <E, A, G>(
    fea: Kind2<F, E, A>,
    f: (e: E) => G
  ) => Kind2<F, G, A>
}
```

#### `I` `Bifunctor2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly bimap: <A, G, B>(
    fea: Kind2<F, E, A>,
    f: (e: E) => G,
    g: (a: A) => B
  ) => Kind2<F, G, B>
  readonly mapLeft: <A, M>(
    fea: Kind2<F, E, A>,
    f: (e: E) => M
  ) => Kind2<F, M, A>
}
```

#### `I` `Bifunctor3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor3<F extends URIS3> {
  readonly URI: F
  readonly bimap: <R, E, A, G, B>(
    fea: Kind3<F, R, E, A>,
    f: (e: E) => G,
    g: (a: A) => B
  ) => Kind3<F, R, G, B>
  readonly mapLeft: <R, E, A, G>(
    fea: Kind3<F, R, E, A>,
    f: (e: E) => G
  ) => Kind3<F, R, G, A>
}
```

#### `I` `Bifunctor3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Bifunctor3C<F extends URIS3, E> {
  readonly URI: F
  readonly bimap: <R, A, G, B>(
    fea: Kind3<F, R, E, A>,
    f: (e: E) => G,
    g: (a: A) => B
  ) => Kind3<F, R, G, B>
  readonly mapLeft: <R, A, G>(
    fea: Kind3<F, R, E, A>,
    f: (e: E) => G
  ) => Kind3<F, R, G, A>
}
```

#### `I` `Bifunctor4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor4<F extends URIS4> {
  readonly URI: F
  readonly bimap: <S, R, E, A, G, B>(
    fea: Kind4<F, S, R, E, A>,
    f: (e: E) => G,
    g: (a: A) => B
  ) => Kind4<F, S, R, G, B>
  readonly mapLeft: <S, R, E, A, G>(
    fea: Kind4<F, S, R, E, A>,
    f: (e: E) => G
  ) => Kind4<F, S, R, G, A>
}
```

#### `I` `BooleanAlgebra`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}
```

#### `I` `Bounded`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bounded<A> extends Ord<A> {
  readonly top: A
  readonly bottom: A
}
```

#### `I` `BoundedDistributiveLattice`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface BoundedDistributiveLattice<A>
  extends BoundedLattice<A>,
    DistributiveLattice<A> {}
```

#### `I` `BoundedJoinSemilattice`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  readonly zero: A
}
```

#### `I` `BoundedLattice`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface BoundedLattice<A>
  extends BoundedJoinSemilattice<A>,
    BoundedMeetSemilattice<A> {}
```

#### `I` `BoundedMeetSemilattice`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  readonly one: A
}
```

#### `I` `Category`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}
```

#### `I` `Category2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Category2<F extends URIS2> extends Semigroupoid2<F> {
  readonly id: <A>() => Kind2<F, A, A>
}
```

#### `I` `Category3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Category3<F extends URIS3> extends Semigroupoid3<F> {
  readonly id: <R, A>() => Kind3<F, R, A, A>
}
```

#### `I` `Category4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Category4<F extends URIS4> extends Semigroupoid4<F> {
  readonly id: <S, R, A>() => Kind4<F, S, R, A, A>
}
```

#### `I` `Chain`

```ts
// TODO: remove module in v3

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}
```

#### `I` `Chain1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain1<F extends URIS> extends Apply1<F> {
  readonly chain: <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<F, B>) => Kind<F, B>
}
```

#### `I` `Chain2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain2<F extends URIS2> extends Apply2<F> {
  readonly chain: <E, A, B>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, B>
}
```

#### `I` `Chain2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain2C<F extends URIS2, E> extends Apply2C<F, E> {
  readonly chain: <A, B>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, B>
}
```

#### `I` `Chain3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain3<F extends URIS3> extends Apply3<F> {
  readonly chain: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Chain3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Chain3C<F extends URIS3, E> extends Apply3C<F, E> {
  readonly chain: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Chain4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain4<F extends URIS4> extends Apply4<F> {
  readonly chain: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => Kind4<F, S, R, E, B>
}
```

#### `I` `ChainRec`

```ts
// TODO: remove module in v3

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec<F> extends Chain<F> {
  readonly chainRec: <A, B>(
    a: A,
    f: (a: A) => HKT<F, Either<A, B>>
  ) => HKT<F, B>
}
```

#### `I` `ChainRec1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec1<F extends URIS> extends Chain1<F> {
  readonly chainRec: <A, B>(
    a: A,
    f: (a: A) => Kind<F, Either<A, B>>
  ) => Kind<F, B>
}
```

#### `I` `ChainRec2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec2<F extends URIS2> extends Chain2<F> {
  readonly chainRec: <E, A, B>(
    a: A,
    f: (a: A) => Kind2<F, E, Either<A, B>>
  ) => Kind2<F, E, B>
}
```

#### `I` `ChainRec2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec2C<F extends URIS2, E> extends Chain2C<F, E> {
  readonly chainRec: <A, B>(
    a: A,
    f: (a: A) => Kind2<F, E, Either<A, B>>
  ) => Kind2<F, E, B>
}
```

#### `I` `ChainRec3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec3<F extends URIS3> extends Chain3<F> {
  readonly chainRec: <R, E, A, B>(
    a: A,
    f: (a: A) => Kind3<F, R, E, Either<A, B>>
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Choice`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Choice<F> extends Profunctor<F> {
  readonly left: <A, B, C>(
    pab: HKT2<F, A, B>
  ) => HKT2<F, Either<A, C>, Either<B, C>>
  readonly right: <A, B, C>(
    pbc: HKT2<F, B, C>
  ) => HKT2<F, Either<A, B>, Either<A, C>>
}
```

#### `I` `Choice2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Choice2<F extends URIS2> extends Profunctor2<F> {
  readonly left: <A, B, C>(
    pab: Kind2<F, A, B>
  ) => Kind2<F, Either<A, C>, Either<B, C>>
  readonly right: <A, B, C>(
    pbc: Kind2<F, B, C>
  ) => Kind2<F, Either<A, B>, Either<A, C>>
}
```

#### `I` `Choice3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Choice3<F extends URIS3> extends Profunctor3<F> {
  readonly left: <R, A, B, C>(
    pab: Kind3<F, R, A, B>
  ) => Kind3<F, R, Either<A, C>, Either<B, C>>
  readonly right: <R, A, B, C>(
    pbc: Kind3<F, R, B, C>
  ) => Kind3<F, R, Either<A, B>, Either<A, C>>
}
```

#### `I` `Choice4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Choice4<F extends URIS4> extends Profunctor4<F> {
  readonly left: <S, R, A, B, C>(
    pab: Kind4<F, S, R, A, B>
  ) => Kind4<F, S, R, Either<A, C>, Either<B, C>>
  readonly right: <S, R, A, B, C>(
    pbc: Kind4<F, S, R, B, C>
  ) => Kind4<F, S, R, Either<A, B>, Either<A, C>>
}
```

#### `I` `Comonad`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad<W> extends Extend<W> {
  readonly extract: <A>(wa: HKT<W, A>) => A
}
```

#### `I` `Comonad1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad1<W extends URIS> extends Extend1<W> {
  readonly extract: <A>(wa: Kind<W, A>) => A
}
```

#### `I` `Comonad2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad2<W extends URIS2> extends Extend2<W> {
  readonly extract: <E, A>(wa: Kind2<W, E, A>) => A
}
```

#### `I` `Comonad2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad2C<W extends URIS2, E> extends Extend2C<W, E> {
  readonly extract: <A>(wa: Kind2<W, E, A>) => A
}
```

#### `I` `Comonad3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Comonad3<W extends URIS3> extends Extend3<W> {
  readonly extract: <R, E, A>(wa: Kind3<W, R, E, A>) => A
}
```

#### `I` `Separated`

```ts
/**
 * A `Separated` type which holds `left` and `right` parts.
 *
 * @since 2.0.0
 */
export interface Separated<A, B> {
  readonly left: A
  readonly right: B
}
```

#### `I` `Compactable`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable<F> {
  readonly URI: F
  /**
   * Compacts a data structure unwrapping inner Option
   */
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  /**
   * Separates a data structure moving inner Left to the left side and inner Right to the right side of Separated
   */
  readonly separate: <A, B>(
    fa: HKT<F, Either<A, B>>
  ) => Separated<HKT<F, A>, HKT<F, B>>
}
```

#### `I` `Compactable1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable1<F extends URIS> {
  readonly URI: F
  readonly compact: <A>(fa: Kind<F, Option<A>>) => Kind<F, A>
  readonly separate: <A, B>(
    fa: Kind<F, Either<A, B>>
  ) => Separated<Kind<F, A>, Kind<F, B>>
}
```

#### `I` `Compactable2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable2<F extends URIS2> {
  readonly URI: F
  readonly compact: <E, A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <E, A, B>(
    fa: Kind2<F, E, Either<A, B>>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}
```

#### `I` `Compactable2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly compact: <A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <A, B>(
    fa: Kind2<F, E, Either<A, B>>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}
```

#### `I` `Compactable3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable3<F extends URIS3> {
  readonly URI: F
  readonly compact: <R, E, A>(
    fa: Kind3<F, R, E, Option<A>>
  ) => Kind3<F, R, E, A>
  readonly separate: <R, E, A, B>(
    fa: Kind3<F, R, E, Either<A, B>>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}
```

#### `I` `Compactable3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Compactable3C<F extends URIS3, E> {
  readonly URI: F
  readonly compact: <R, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, A, B>(
    fa: Kind3<F, R, E, Either<A, B>>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}
```

#### `I` `Compactable4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable4<F extends URIS4> {
  readonly URI: F
  readonly compact: <S, R, E, A>(
    fa: Kind4<F, S, R, E, Option<A>>
  ) => Kind4<F, S, R, E, A>
  readonly separate: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, Either<A, B>>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
}
```

#### `I` `CompactableComposition`

```ts
/**
 * @since 2.0.0
 */
export interface CompactableComposition<F, G> extends FunctorComposition<F, G> {
  readonly compact: <A>(fga: HKT<F, HKT<G, Option<A>>>) => HKT<F, HKT<G, A>>
  readonly separate: <A, B>(
    fge: HKT<F, HKT<G, Either<A, B>>>
  ) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, B>>>
}
```

#### `I` `CompactableComposition11`

```ts
/**
 * @since 2.0.0
 */
export interface CompactableComposition11<F extends URIS, G extends URIS>
  extends FunctorComposition11<F, G> {
  readonly compact: <A>(fga: Kind<F, Kind<G, Option<A>>>) => Kind<F, Kind<G, A>>
  readonly separate: <A, B>(
    fge: Kind<F, Kind<G, Either<A, B>>>
  ) => Separated<Kind<F, Kind<G, A>>, Kind<F, Kind<G, B>>>
}
```

#### `I` `CompactableComposition12`

```ts
/**
 * @since 2.0.0
 */
export interface CompactableComposition12<F extends URIS, G extends URIS2>
  extends FunctorComposition12<F, G> {
  readonly compact: <E, A>(
    fga: Kind<F, Kind2<G, E, Option<A>>>
  ) => Kind<F, Kind2<G, E, A>>
  readonly separate: <E, A, B>(
    fge: Kind<F, Kind2<G, E, Either<A, B>>>
  ) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, B>>>
}
```

#### `I` `CompactableComposition12C`

```ts
/**
 * @since 2.0.0
 */
export interface CompactableComposition12C<F extends URIS, G extends URIS2, E>
  extends FunctorComposition12C<F, G, E> {
  readonly compact: <A>(
    fga: Kind<F, Kind2<G, E, Option<A>>>
  ) => Kind<F, Kind2<G, E, A>>
  readonly separate: <A, B>(
    fge: Kind<F, Kind2<G, E, Either<A, B>>>
  ) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, B>>>
}
```

#### `I` `CompactableComposition21`

```ts
/**
 * @since 2.0.0
 */
export interface CompactableComposition21<F extends URIS2, G extends URIS>
  extends FunctorComposition21<F, G> {
  readonly compact: <FE, A>(
    fga: Kind2<F, FE, Kind<G, Option<A>>>
  ) => Kind2<F, FE, Kind<G, A>>
  readonly separate: <FE, A, B>(
    fge: Kind2<F, FE, Kind<G, Either<A, B>>>
  ) => Separated<Kind2<F, FE, Kind<G, A>>, Kind2<F, FE, Kind<G, B>>>
}
```

#### `I` `CompactableComposition2C1`

```ts
/**
 * @since 2.0.0
 */
export interface CompactableComposition2C1<F extends URIS2, G extends URIS, E>
  extends FunctorComposition2C1<F, G, E> {
  readonly compact: <A>(
    fga: Kind2<F, E, Kind<G, Option<A>>>
  ) => Kind2<F, E, Kind<G, A>>
  readonly separate: <A, B>(
    fge: Kind2<F, E, Kind<G, Either<A, B>>>
  ) => Separated<Kind2<F, E, Kind<G, A>>, Kind2<F, E, Kind<G, B>>>
}
```

#### `I` `CompactableComposition22`

```ts
/**
 * @since 2.0.0
 */
export interface CompactableComposition22<F extends URIS2, G extends URIS2>
  extends FunctorComposition22<F, G> {
  readonly compact: <FE, GE, A>(
    fga: Kind2<F, FE, Kind2<G, GE, Option<A>>>
  ) => Kind2<F, FE, Kind2<G, GE, A>>
  readonly separate: <FE, GE, A, B>(
    fge: Kind2<F, FE, Kind2<G, GE, Either<A, B>>>
  ) => Separated<Kind2<F, FE, Kind2<G, GE, A>>, Kind2<F, FE, Kind2<G, GE, B>>>
}
```

#### `I` `CompactableComposition22C`

```ts
/**
 * @since 2.0.0
 */
export interface CompactableComposition22C<F extends URIS2, G extends URIS2, E>
  extends FunctorComposition22C<F, G, E> {
  readonly compact: <FE, A>(
    fga: Kind2<F, FE, Kind2<G, E, Option<A>>>
  ) => Kind2<F, FE, Kind2<G, E, A>>
  readonly separate: <FE, A, B>(
    fge: Kind2<F, FE, Kind2<G, E, Either<A, B>>>
  ) => Separated<Kind2<F, FE, Kind2<G, E, A>>, Kind2<F, FE, Kind2<G, E, B>>>
}
```

#### `I` `CompactableComposition23`

```ts
/**
 * @since 2.2.0
 */
export interface CompactableComposition23<F extends URIS2, G extends URIS3>
  extends FunctorComposition23<F, G> {
  readonly compact: <R, FE, GE, A>(
    fga: Kind2<F, FE, Kind3<G, R, GE, Option<A>>>
  ) => Kind2<F, FE, Kind3<G, R, GE, A>>
  readonly separate: <R, FE, GE, A, B>(
    fge: Kind2<F, FE, Kind3<G, R, GE, Either<A, B>>>
  ) => Separated<
    Kind2<F, FE, Kind3<G, R, GE, A>>,
    Kind2<F, FE, Kind3<G, R, GE, B>>
  >
}
```

#### `I` `CompactableComposition23C`

```ts
/**
 * @since 2.2.0
 */
export interface CompactableComposition23C<F extends URIS2, G extends URIS3, E>
  extends FunctorComposition23C<F, G, E> {
  readonly compact: <FE, R, A>(
    fga: Kind2<F, FE, Kind3<G, R, E, Option<A>>>
  ) => Kind2<F, FE, Kind3<G, R, E, A>>
  readonly separate: <FE, R, A, B>(
    fge: Kind2<F, FE, Kind3<G, R, E, Either<A, B>>>
  ) => Separated<
    Kind2<F, FE, Kind3<G, R, E, A>>,
    Kind2<F, FE, Kind3<G, R, E, B>>
  >
}
```

#### `&` `Const`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export type Const<E, A> = E & { readonly _A: A }
```

#### `I` `Contravariant`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}
```

#### `I` `Contravariant1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant1<F extends URIS> {
  readonly URI: F
  readonly contramap: <A, B>(fa: Kind<F, A>, f: (b: B) => A) => Kind<F, B>
}
```

#### `I` `Contravariant2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant2<F extends URIS2> {
  readonly URI: F
  readonly contramap: <E, A, B>(
    fa: Kind2<F, E, A>,
    f: (b: B) => A
  ) => Kind2<F, E, B>
}
```

#### `I` `Contravariant2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly contramap: <A, B>(
    fa: Kind2<F, E, A>,
    f: (b: B) => A
  ) => Kind2<F, E, B>
}
```

#### `I` `Contravariant3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant3<F extends URIS3> {
  readonly URI: F
  readonly contramap: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (b: B) => A
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Contravariant3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Contravariant3C<F extends URIS3, E> {
  readonly URI: F
  readonly contramap: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (b: B) => A
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Contravariant4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant4<F extends URIS4> {
  readonly URI: F
  readonly contramap: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    f: (b: B) => A
  ) => Kind4<F, S, R, E, B>
}
```

#### `I` `DistributiveLattice`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface DistributiveLattice<A> extends Lattice<A> {}
```

#### `I` `Left`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}
```

#### `I` `Right`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
```

#### `|` `Json`

```ts
/**
 * Copied from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
 *
 * @since 2.6.7
 */
export type Json = boolean | number | string | null | JsonArray | JsonRecord
```

#### `I` `JsonArray`

```ts
/**
 * @since 2.6.7
 */
export interface JsonArray extends ReadonlyArray<Json> {}
```

#### `I` `JsonRecord`

```ts
/**
 * @since 2.6.7
 */
export interface JsonRecord {
  readonly [key: string]: Json
}
```

#### `I` `EitherT`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface EitherT<M, E, A> extends HKT<M, Either<E, A>> {}
```

#### `I` `EitherM`

```ts
/**
 * @since 2.0.0
 */
export interface EitherM<M> extends ApplicativeCompositionHKT2<M, URI> {
  readonly chain: <E, A, B>(
    ma: EitherT<M, E, A>,
    f: (a: A) => EitherT<M, E, B>
  ) => EitherT<M, E, B>
  readonly alt: <E, A>(
    fa: EitherT<M, E, A>,
    that: Lazy<EitherT<M, E, A>>
  ) => EitherT<M, E, A>
  readonly bimap: <E, A, N, B>(
    ma: EitherT<M, E, A>,
    f: (e: E) => N,
    g: (a: A) => B
  ) => EitherT<M, N, B>
  readonly mapLeft: <E, A, N>(
    ma: EitherT<M, E, A>,
    f: (e: E) => N
  ) => EitherT<M, N, A>
  readonly fold: <E, A, R>(
    ma: EitherT<M, E, A>,
    onLeft: (e: E) => HKT<M, R>,
    onRight: (a: A) => HKT<M, R>
  ) => HKT<M, R>
  readonly getOrElse: <E, A>(
    ma: EitherT<M, E, A>,
    onLeft: (e: E) => HKT<M, A>
  ) => HKT<M, A>
  readonly orElse: <E, A, N>(
    ma: EitherT<M, E, A>,
    onLeft: (e: E) => EitherT<M, N, A>
  ) => EitherT<M, N, A>
  readonly swap: <E, A>(ma: EitherT<M, E, A>) => EitherT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => EitherT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => EitherT<M, E, A>
  readonly left: <E, A>(e: E) => EitherT<M, E, A>
}
```

#### `I` `EitherM1`

```ts
/**
 * @since 2.0.0
 */
export interface EitherM1<M extends URIS>
  extends ApplicativeComposition12<M, URI> {
  readonly chain: <E, A, B>(
    ma: EitherT1<M, E, A>,
    f: (a: A) => EitherT1<M, E, B>
  ) => EitherT1<M, E, B>
  readonly alt: <E, A>(
    fa: EitherT1<M, E, A>,
    that: Lazy<EitherT1<M, E, A>>
  ) => EitherT1<M, E, A>
  readonly bimap: <E, A, N, B>(
    ma: EitherT1<M, E, A>,
    f: (e: E) => N,
    g: (a: A) => B
  ) => EitherT1<M, N, B>
  readonly mapLeft: <E, A, N>(
    ma: EitherT1<M, E, A>,
    f: (e: E) => N
  ) => EitherT1<M, N, A>
  readonly fold: <E, A, R>(
    ma: EitherT1<M, E, A>,
    onLeft: (e: E) => Kind<M, R>,
    onRight: (a: A) => Kind<M, R>
  ) => Kind<M, R>
  readonly getOrElse: <E, A>(
    ma: EitherT1<M, E, A>,
    onLeft: (e: E) => Kind<M, A>
  ) => Kind<M, A>
  readonly orElse: <E, A, N>(
    ma: EitherT1<M, E, A>,
    onLeft: (e: E) => EitherT1<M, N, A>
  ) => EitherT1<M, N, A>
  readonly swap: <E, A>(ma: EitherT1<M, E, A>) => EitherT1<M, A, E>
  readonly rightM: <E, A>(ma: Kind<M, A>) => EitherT1<M, E, A>
  readonly leftM: <E, A>(me: Kind<M, E>) => EitherT1<M, E, A>
  readonly left: <E, A>(e: E) => EitherT1<M, E, A>
}
```

#### `I` `EitherM2`

```ts
/**
 * @since 2.0.0
 */
export interface EitherM2<M extends URIS2>
  extends ApplicativeComposition22<M, URI> {
  readonly chain: <R, E, A, B>(
    ma: EitherT2<M, R, E, A>,
    f: (a: A) => EitherT2<M, R, E, B>
  ) => EitherT2<M, R, E, B>
  readonly alt: <R, E, A>(
    fa: EitherT2<M, R, E, A>,
    that: Lazy<EitherT2<M, R, E, A>>
  ) => EitherT2<M, R, E, A>
  readonly bimap: <R, E, A, N, B>(
    ma: EitherT2<M, R, E, A>,
    f: (e: E) => N,
    g: (a: A) => B
  ) => EitherT2<M, R, N, B>
  readonly mapLeft: <R, E, A, N>(
    ma: EitherT2<M, R, E, A>,
    f: (e: E) => N
  ) => EitherT2<M, R, N, A>
  readonly fold: <R, E, A, B>(
    ma: EitherT2<M, R, E, A>,
    onLeft: (e: E) => Kind2<M, R, B>,
    onRight: (a: A) => Kind2<M, R, B>
  ) => Kind2<M, R, B>
  readonly getOrElse: <R, E, A>(
    ma: EitherT2<M, R, E, A>,
    onLeft: (e: E) => Kind2<M, R, A>
  ) => Kind2<M, R, A>
  readonly orElse: <R, E, A, F>(
    ma: EitherT2<M, R, E, A>,
    onLeft: (e: E) => EitherT2<M, R, F, A>
  ) => EitherT2<M, R, F, A>
  readonly swap: <R, E, A>(ma: EitherT2<M, R, E, A>) => EitherT2<M, R, A, E>
  readonly rightM: <R, E, A>(ma: Kind2<M, R, A>) => EitherT2<M, R, E, A>
  readonly leftM: <R, E, A>(me: Kind2<M, R, E>) => EitherT2<M, R, E, A>
  readonly left: <R, E, A>(e: E) => EitherT2<M, R, E, A>
}
```

#### `I` `Extend`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Extend<W> extends Functor<W> {
  readonly extend: <A, B>(wa: HKT<W, A>, f: (wa: HKT<W, A>) => B) => HKT<W, B>
}
```

#### `I` `Extend1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Extend1<W extends URIS> extends Functor1<W> {
  readonly extend: <A, B>(
    wa: Kind<W, A>,
    f: (wa: Kind<W, A>) => B
  ) => Kind<W, B>
}
```

#### `I` `Extend2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Extend2<W extends URIS2> extends Functor2<W> {
  readonly extend: <E, A, B>(
    wa: Kind2<W, E, A>,
    f: (wa: Kind2<W, E, A>) => B
  ) => Kind2<W, E, B>
}
```

#### `I` `Extend2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Extend2C<W extends URIS2, E> extends Functor2C<W, E> {
  readonly extend: <A, B>(
    wa: Kind2<W, E, A>,
    f: (wa: Kind2<W, E, A>) => B
  ) => Kind2<W, E, B>
}
```

#### `I` `Extend3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Extend3<W extends URIS3> extends Functor3<W> {
  readonly extend: <R, E, A, B>(
    wa: Kind3<W, R, E, A>,
    f: (wa: Kind3<W, R, E, A>) => B
  ) => Kind3<W, R, E, B>
}
```

#### `I` `Extend3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Extend3C<W extends URIS3, E> extends Functor3C<W, E> {
  readonly extend: <R, A, B>(
    wa: Kind3<W, R, E, A>,
    f: (wa: Kind3<W, R, E, A>) => B
  ) => Kind3<W, R, E, B>
}
```

#### `I` `Extend4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Extend4<W extends URIS4> extends Functor4<W> {
  readonly extend: <S, R, E, A, B>(
    wa: Kind4<W, S, R, E, A>,
    f: (wa: Kind4<W, S, R, E, A>) => B
  ) => Kind4<W, S, R, E, B>
}
```

#### `I` `Field`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Filter<F> {
  <A, B extends A>(fa: HKT<F, A>, refinement: Refinement<A, B>): HKT<F, B>
  <A>(fa: HKT<F, A>, predicate: Predicate<A>): HKT<F, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Partition<F> {
  <A, B extends A>(fa: HKT<F, A>, refinement: Refinement<A, B>): Separated<
    HKT<F, A>,
    HKT<F, B>
  >
  <A>(fa: HKT<F, A>, predicate: Predicate<A>): Separated<HKT<F, A>, HKT<F, A>>
}
```

#### `I` `Filterable`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   */
  readonly partitionMap: <A, B, C>(
    fa: HKT<F, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<HKT<F, B>, HKT<F, C>>
  /**
   * Partition a data structure based on a boolean predicate.
   */
  readonly partition: Partition<F>
  /**
   * Map over a data structure and filter based on an option predicate.
   */
  readonly filterMap: <A, B>(fa: HKT<F, A>, f: (a: A) => Option<B>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean predicate.
   */
  readonly filter: Filter<F>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Filter1<F extends URIS> {
  <A, B extends A>(fa: Kind<F, A>, refinement: Refinement<A, B>): Kind<F, B>
  <A>(fa: Kind<F, A>, predicate: Predicate<A>): Kind<F, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Partition1<F extends URIS> {
  <A, B extends A>(fa: Kind<F, A>, refinement: Refinement<A, B>): Separated<
    Kind<F, A>,
    Kind<F, B>
  >
  <A>(fa: Kind<F, A>, predicate: Predicate<A>): Separated<
    Kind<F, A>,
    Kind<F, A>
  >
}
```

#### `I` `Filterable1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable1<F extends URIS>
  extends Functor1<F>,
    Compactable1<F> {
  readonly partitionMap: <A, B, C>(
    fa: Kind<F, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partition: Partition1<F>
  readonly filterMap: <A, B>(
    fa: Kind<F, A>,
    f: (a: A) => Option<B>
  ) => Kind<F, B>
  readonly filter: Filter1<F>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Filter2<F extends URIS2> {
  <E, A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Kind2<
    F,
    E,
    B
  >
  <E, A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Kind2<F, E, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Partition2<F extends URIS2> {
  <E, A, B extends A>(
    fa: Kind2<F, E, A>,
    refinement: Refinement<A, B>
  ): Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <E, A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Separated<
    Kind2<F, E, A>,
    Kind2<F, E, A>
  >
}
```

#### `I` `Filterable2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable2<F extends URIS2>
  extends Functor2<F>,
    Compactable2<F> {
  readonly partitionMap: <E, A, B, C>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2<F>
  readonly filterMap: <E, A, B>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Option<B>
  ) => Kind2<F, E, B>
  readonly filter: Filter2<F>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Filter2C<F extends URIS2, E> {
  <A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Kind2<
    F,
    E,
    B
  >
  <A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Kind2<F, E, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Partition2C<F extends URIS2, E> {
  <A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Separated<
    Kind2<F, E, A>,
    Kind2<F, E, B>
  >
  <A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Separated<
    Kind2<F, E, A>,
    Kind2<F, E, A>
  >
}
```

#### `I` `Filterable2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable2C<F extends URIS2, E>
  extends Functor2C<F, E>,
    Compactable2C<F, E> {
  readonly partitionMap: <A, B, C>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2C<F, E>
  readonly filterMap: <A, B>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Option<B>
  ) => Kind2<F, E, B>
  readonly filter: Filter2C<F, E>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Filter3<F extends URIS3> {
  <R, E, A, B extends A>(
    fa: Kind3<F, R, E, A>,
    refinement: Refinement<A, B>
  ): Kind3<F, R, E, B>
  <R, E, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Kind3<F, R, E, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Partition3<F extends URIS3> {
  <R, E, A, B extends A>(
    fa: Kind3<F, R, E, A>,
    refinement: Refinement<A, B>
  ): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <R, E, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Separated<
    Kind3<F, R, E, A>,
    Kind3<F, R, E, A>
  >
}
```

#### `I` `Filterable3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable3<F extends URIS3>
  extends Functor3<F>,
    Compactable3<F> {
  readonly partitionMap: <R, E, A, B, C>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3<F>
  readonly filterMap: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Option<B>
  ) => Kind3<F, R, E, B>
  readonly filter: Filter3<F>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.2.0
 */
export interface Filter3C<F extends URIS3, E> {
  <R, A, B extends A>(
    fa: Kind3<F, R, E, A>,
    refinement: Refinement<A, B>
  ): Kind3<F, R, E, B>
  <R, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Kind3<F, R, E, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.2.0
 */
export interface Partition3C<F extends URIS3, E> {
  <R, A, B extends A>(
    fa: Kind3<F, R, E, A>,
    refinement: Refinement<A, B>
  ): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <R, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Separated<
    Kind3<F, R, E, A>,
    Kind3<F, R, E, A>
  >
}
```

#### `I` `Filterable3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Filterable3C<F extends URIS3, E>
  extends Functor3C<F, E>,
    Compactable3C<F, E> {
  readonly partitionMap: <R, A, B, C>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3C<F, E>
  readonly filterMap: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Option<B>
  ) => Kind3<F, R, E, B>
  readonly filter: Filter3C<F, E>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Filter4<F extends URIS4> {
  <S, R, E, A, B extends A>(
    fa: Kind4<F, S, R, E, A>,
    refinement: Refinement<A, B>
  ): Kind4<F, S, R, E, B>
  <S, R, E, A>(fa: Kind4<F, S, R, E, A>, predicate: Predicate<A>): Kind4<
    F,
    S,
    R,
    E,
    A
  >
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Partition4<F extends URIS4> {
  <S, R, E, A, B extends A>(
    fa: Kind4<F, S, R, E, A>,
    refinement: Refinement<A, B>
  ): Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  <S, R, E, A>(fa: Kind4<F, S, R, E, A>, predicate: Predicate<A>): Separated<
    Kind4<F, S, R, E, A>,
    Kind4<F, S, R, E, A>
  >
}
```

#### `I` `Filterable4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable4<F extends URIS4>
  extends Functor4<F>,
    Compactable4<F> {
  readonly partitionMap: <S, R, E, A, B, C>(
    fa: Kind4<F, S, R, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partition: Partition4<F>
  readonly filterMap: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    f: (a: A) => Option<B>
  ) => Kind4<F, S, R, E, B>
  readonly filter: Filter4<F>
}
```

#### `I` `FilterableComposition`

```ts
/**
 * @since 2.0.0
 */
export interface FilterableComposition<F, G>
  extends FunctorComposition<F, G>,
    CompactableComposition<F, G> {
  readonly partitionMap: <A, B, C>(
    fa: HKT<F, HKT<G, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<HKT<F, HKT<G, B>>, HKT<F, HKT<G, C>>>
  readonly partition: <A>(
    fa: HKT<F, HKT<G, A>>,
    predicate: Predicate<A>
  ) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, A>>>
  readonly filterMap: <A, B>(
    fa: HKT<F, HKT<G, A>>,
    f: (a: A) => Option<B>
  ) => HKT<F, HKT<G, B>>
  readonly filter: <A>(
    fa: HKT<F, HKT<G, A>>,
    predicate: Predicate<A>
  ) => HKT<F, HKT<G, A>>
}
```

#### `I` `FilterableComposition11`

```ts
/**
 * @since 2.0.0
 */
export interface FilterableComposition11<F extends URIS, G extends URIS>
  extends FunctorComposition11<F, G>,
    CompactableComposition11<F, G> {
  readonly partitionMap: <A, B, C>(
    fa: Kind<F, Kind<G, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind<F, Kind<G, B>>, Kind<F, Kind<G, C>>>
  readonly partition: <A>(
    fa: Kind<F, Kind<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind<F, Kind<G, A>>, Kind<F, Kind<G, A>>>
  readonly filterMap: <A, B>(
    fa: Kind<F, Kind<G, A>>,
    f: (a: A) => Option<B>
  ) => Kind<F, Kind<G, B>>
  readonly filter: <A>(
    fa: Kind<F, Kind<G, A>>,
    predicate: Predicate<A>
  ) => Kind<F, Kind<G, A>>
}
```

#### `I` `FilterableComposition12`

```ts
/**
 * @since 2.0.0
 */
export interface FilterableComposition12<F extends URIS, G extends URIS2>
  extends FunctorComposition12<F, G>,
    CompactableComposition12<F, G> {
  readonly partitionMap: <E, A, B, C>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind<F, Kind2<G, E, B>>, Kind<F, Kind2<G, E, C>>>
  readonly partition: <E, A>(
    fa: Kind<F, Kind2<G, E, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, A>>>
  readonly filterMap: <E, A, B>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (a: A) => Option<B>
  ) => Kind<F, Kind2<G, E, B>>
  readonly filter: <E, A>(
    fa: Kind<F, Kind2<G, E, A>>,
    predicate: Predicate<A>
  ) => Kind<F, Kind2<G, E, A>>
}
```

#### `I` `FilterableComposition12C`

```ts
/**
 * @since 2.0.0
 */
export interface FilterableComposition12C<F extends URIS, G extends URIS2, E>
  extends FunctorComposition12C<F, G, E>,
    CompactableComposition12C<F, G, E> {
  readonly partitionMap: <A, B, C>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind<F, Kind2<G, E, B>>, Kind<F, Kind2<G, E, C>>>
  readonly partition: <A>(
    fa: Kind<F, Kind2<G, E, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, A>>>
  readonly filterMap: <A, B>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (a: A) => Option<B>
  ) => Kind<F, Kind2<G, E, B>>
  readonly filter: <A>(
    fa: Kind<F, Kind2<G, E, A>>,
    predicate: Predicate<A>
  ) => Kind<F, Kind2<G, E, A>>
}
```

#### `I` `FilterableComposition21`

```ts
/**
 * @since 2.0.0
 */
export interface FilterableComposition21<F extends URIS2, G extends URIS>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <E, A, B, C>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, Kind<G, B>>, Kind2<F, E, Kind<G, C>>>
  readonly partition: <E, A>(
    fa: Kind2<F, E, Kind<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind2<F, E, Kind<G, A>>, Kind2<F, E, Kind<G, A>>>
  readonly filterMap: <E, A, B>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (a: A) => Option<B>
  ) => Kind2<F, E, Kind<G, B>>
  readonly filter: <E, A>(
    fa: Kind2<F, E, Kind<G, A>>,
    predicate: Predicate<A>
  ) => Kind2<F, E, Kind<G, A>>
}
```

#### `I` `FilterableComposition2C1`

```ts
/**
 * @since 2.0.0
 */
export interface FilterableComposition2C1<F extends URIS2, G extends URIS, E>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <A, B, C>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, Kind<G, B>>, Kind2<F, E, Kind<G, C>>>
  readonly partition: <A>(
    fa: Kind2<F, E, Kind<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind2<F, E, Kind<G, A>>, Kind2<F, E, Kind<G, A>>>
  readonly filterMap: <A, B>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (a: A) => Option<B>
  ) => Kind2<F, E, Kind<G, B>>
  readonly filter: <A>(
    fa: Kind2<F, E, Kind<G, A>>,
    predicate: Predicate<A>
  ) => Kind2<F, E, Kind<G, A>>
}
```

#### `I` `FilterableComposition22`

```ts
/**
 * @since 2.0.0
 */
export interface FilterableComposition22<F extends URIS2, G extends URIS2>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <FE, GE, A, B, C>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, FE, Kind2<G, GE, B>>, Kind2<F, FE, Kind2<G, GE, C>>>
  readonly partition: <FE, GE, A>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind2<F, FE, Kind2<G, GE, A>>, Kind2<F, FE, Kind2<G, GE, A>>>
  readonly filterMap: <FE, GE, A, B>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    f: (a: A) => Option<B>
  ) => Kind2<F, FE, Kind2<G, GE, B>>
  readonly filter: <FE, GE, A>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    predicate: Predicate<A>
  ) => Kind2<F, FE, Kind2<G, GE, A>>
}
```

#### `I` `FilterableComposition22C`

```ts
/**
 * @since 2.0.0
 */
export interface FilterableComposition22C<F extends URIS2, G extends URIS2, E>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <FE, A, B, C>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, FE, Kind2<G, E, B>>, Kind2<F, FE, Kind2<G, E, C>>>
  readonly partition: <FE, A>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind2<F, FE, Kind2<G, E, A>>, Kind2<F, FE, Kind2<G, E, A>>>
  readonly filterMap: <FE, A, B>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    f: (a: A) => Option<B>
  ) => Kind2<F, FE, Kind2<G, E, B>>
  readonly filter: <FE, A>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    predicate: Predicate<A>
  ) => Kind2<F, FE, Kind2<G, E, A>>
}
```

#### `I` `FilterableComposition23C`

```ts
/**
 * @since 2.2.0
 */
export interface FilterableComposition23C<F extends URIS2, G extends URIS3, E>
  extends FunctorComposition23<F, G>,
    CompactableComposition23<F, G> {
  readonly partitionMap: <R, FE, A, B, C>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<
    Kind2<F, FE, Kind3<G, R, E, B>>,
    Kind2<F, FE, Kind3<G, R, E, C>>
  >
  readonly partition: <R, FE, A>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    predicate: Predicate<A>
  ) => Separated<
    Kind2<F, FE, Kind3<G, R, E, A>>,
    Kind2<F, FE, Kind3<G, R, E, A>>
  >
  readonly filterMap: <R, FE, A, B>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    f: (a: A) => Option<B>
  ) => Kind2<F, FE, Kind3<G, R, E, B>>
  readonly filter: <R, FE, A>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    predicate: Predicate<A>
  ) => Kind2<F, FE, Kind3<G, R, E, A>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface FilterWithIndex<F, I> {
  <A, B extends A>(
    fa: HKT<F, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): HKT<F, B>
  <A>(fa: HKT<F, A>, predicateWithIndex: PredicateWithIndex<I, A>): HKT<F, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface PartitionWithIndex<F, I> {
  <A, B extends A>(
    fa: HKT<F, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Separated<HKT<F, A>, HKT<F, B>>
  <A>(fa: HKT<F, A>, predicateWithIndex: PredicateWithIndex<I, A>): Separated<
    HKT<F, A>,
    HKT<F, A>
  >
}
```

#### `I` `FilterableWithIndex`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex<F, I>
  extends FunctorWithIndex<F, I>,
    Filterable<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    fa: HKT<F, A>,
    f: (i: I, a: A) => Either<B, C>
  ) => Separated<HKT<F, B>, HKT<F, C>>
  readonly partitionWithIndex: PartitionWithIndex<F, I>
  readonly filterMapWithIndex: <A, B>(
    fa: HKT<F, A>,
    f: (i: I, a: A) => Option<B>
  ) => HKT<F, B>
  readonly filterWithIndex: FilterWithIndex<F, I>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface FilterWithIndex1<F extends URIS, I> {
  <A, B extends A>(
    fa: Kind<F, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Kind<F, B>
  <A>(fa: Kind<F, A>, predicateWithIndex: PredicateWithIndex<I, A>): Kind<F, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface PartitionWithIndex1<F extends URIS, I> {
  <A, B extends A>(
    fa: Kind<F, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Separated<Kind<F, A>, Kind<F, B>>
  <A>(fa: Kind<F, A>, predicateWithIndex: PredicateWithIndex<I, A>): Separated<
    Kind<F, A>,
    Kind<F, A>
  >
}
```

#### `I` `FilterableWithIndex1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex1<F extends URIS, I>
  extends FunctorWithIndex1<F, I>,
    Filterable1<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    fa: Kind<F, A>,
    f: (i: I, a: A) => Either<B, C>
  ) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partitionWithIndex: PartitionWithIndex1<F, I>
  readonly filterMapWithIndex: <A, B>(
    fa: Kind<F, A>,
    f: (i: I, a: A) => Option<B>
  ) => Kind<F, B>
  readonly filterWithIndex: FilterWithIndex1<F, I>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface FilterWithIndex2<F extends URIS2, I> {
  <E, A, B extends A>(
    fa: Kind2<F, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Kind2<F, E, B>
  <E, A>(
    fa: Kind2<F, E, A>,
    predicateWithIndex: PredicateWithIndex<I, A>
  ): Kind2<F, E, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface PartitionWithIndex2<F extends URIS2, I> {
  <E, A, B extends A>(
    fa: Kind2<F, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <E, A>(
    fa: Kind2<F, E, A>,
    predicateWithIndex: PredicateWithIndex<I, A>
  ): Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

#### `I` `FilterableWithIndex2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex2<F extends URIS2, I>
  extends FunctorWithIndex2<F, I>,
    Filterable2<F> {
  readonly partitionMapWithIndex: <E, A, B, C>(
    fa: Kind2<F, E, A>,
    f: (i: I, a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partitionWithIndex: PartitionWithIndex2<F, I>
  readonly filterMapWithIndex: <E, A, B>(
    fa: Kind2<F, E, A>,
    f: (i: I, a: A) => Option<B>
  ) => Kind2<F, E, B>
  readonly filterWithIndex: FilterWithIndex2<F, I>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface FilterWithIndex2C<F extends URIS2, I, E> {
  <A, B extends A>(
    fa: Kind2<F, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Kind2<F, E, B>
  <A>(fa: Kind2<F, E, A>, predicateWithIndex: PredicateWithIndex<I, A>): Kind2<
    F,
    E,
    A
  >
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface PartitionWithIndex2C<F extends URIS2, I, E> {
  <A, B extends A>(
    fa: Kind2<F, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(
    fa: Kind2<F, E, A>,
    predicateWithIndex: PredicateWithIndex<I, A>
  ): Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

#### `I` `FilterableWithIndex2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex2C<F extends URIS2, I, E>
  extends FunctorWithIndex2C<F, I, E>,
    Filterable2C<F, E> {
  readonly partitionMapWithIndex: <A, B, C>(
    fa: Kind2<F, E, A>,
    f: (i: I, a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partitionWithIndex: PartitionWithIndex2C<F, I, E>
  readonly filterMapWithIndex: <A, B>(
    fa: Kind2<F, E, A>,
    f: (i: I, a: A) => Option<B>
  ) => Kind2<F, E, B>
  readonly filterWithIndex: FilterWithIndex2C<F, I, E>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface FilterWithIndex3<F extends URIS3, I> {
  <R, E, A, B extends A>(
    fa: Kind3<F, R, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Kind3<F, R, E, B>
  <R, E, A>(
    fa: Kind3<F, R, E, A>,
    predicateWithIndex: PredicateWithIndex<I, A>
  ): Kind3<F, R, E, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.2.0
 */
export interface FilterWithIndex3C<F extends URIS3, I, E> {
  <R, A, B extends A>(
    fa: Kind3<F, R, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Kind3<F, R, E, B>
  <R, A>(
    fa: Kind3<F, R, E, A>,
    predicateWithIndex: PredicateWithIndex<I, A>
  ): Kind3<F, R, E, A>
}
```

#### `I` `FilterableWithIndex3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface FilterableWithIndex3C<F extends URIS3, I, E>
  extends FunctorWithIndex3C<F, I, E>,
    Filterable3C<F, E> {
  readonly partitionMapWithIndex: <R, A, B, C>(
    fa: Kind3<F, R, E, A>,
    f: (i: I, a: A) => Either<B, C>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partitionWithIndex: PartitionWithIndex3C<F, I, E>
  readonly filterMapWithIndex: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (i: I, a: A) => Option<B>
  ) => Kind3<F, R, E, B>
  readonly filterWithIndex: FilterWithIndex3C<F, I, E>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface PartitionWithIndex3<F extends URIS3, I> {
  <R, E, A, B extends A>(
    fa: Kind3<F, R, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <R, E, A>(
    fa: Kind3<F, R, E, A>,
    predicateWithIndex: PredicateWithIndex<I, A>
  ): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.2.0
 */
export interface PartitionWithIndex3C<F extends URIS3, I, E> {
  <R, A, B extends A>(
    fa: Kind3<F, R, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <R, A>(
    fa: Kind3<F, R, E, A>,
    predicateWithIndex: PredicateWithIndex<I, A>
  ): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

#### `I` `FilterableWithIndex3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex3<F extends URIS3, I>
  extends FunctorWithIndex3<F, I>,
    Filterable3<F> {
  readonly partitionMapWithIndex: <R, E, A, B, C>(
    fa: Kind3<F, R, E, A>,
    f: (i: I, a: A) => Either<B, C>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partitionWithIndex: PartitionWithIndex3<F, I>
  readonly filterMapWithIndex: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (i: I, a: A) => Option<B>
  ) => Kind3<F, R, E, B>
  readonly filterWithIndex: FilterWithIndex3<F, I>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface FilterWithIndex4<F extends URIS4, I> {
  <S, R, E, A, B extends A>(
    fa: Kind4<F, S, R, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Kind4<F, S, R, E, B>
  <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>,
    predicateWithIndex: PredicateWithIndex<I, A>
  ): Kind4<F, S, R, E, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface PartitionWithIndex4<F extends URIS4, I> {
  <S, R, E, A, B extends A>(
    fa: Kind4<F, S, R, E, A>,
    refinementWithIndex: RefinementWithIndex<I, A, B>
  ): Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>,
    predicateWithIndex: PredicateWithIndex<I, A>
  ): Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
}
```

#### `I` `FilterableWithIndex4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex4<F extends URIS4, I>
  extends FunctorWithIndex4<F, I>,
    Filterable4<F> {
  readonly partitionMapWithIndex: <S, R, E, A, B, C>(
    fa: Kind4<F, S, R, E, A>,
    f: (i: I, a: A) => Either<B, C>
  ) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partitionWithIndex: PartitionWithIndex4<F, I>
  readonly filterMapWithIndex: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    f: (i: I, a: A) => Option<B>
  ) => Kind4<F, S, R, E, B>
  readonly filterWithIndex: FilterWithIndex4<F, I>
}
```

#### `I` `Foldable`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
}
```

#### `I` `Foldable1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(fa: Kind<F, A>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(fa: Kind<F, A>, b: B, f: (a: A, b: B) => B) => B
}
```

#### `I` `Foldable2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Foldable2<F extends URIS2> {
  readonly URI: F
  readonly reduce: <E, A, B>(
    fa: Kind2<F, E, A>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <E, A>(fa: Kind2<F, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <E, A, B>(
    fa: Kind2<F, E, A>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `Foldable2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Foldable2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly reduce: <A, B>(fa: Kind2<F, E, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(fa: Kind2<F, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(
    fa: Kind2<F, E, A>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `Foldable3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Foldable3<F extends URIS3> {
  readonly URI: F
  readonly reduce: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <R, E, A>(fa: Kind3<F, R, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `Foldable3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Foldable3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly reduce: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <R, A>(fa: Kind3<F, R, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `Foldable4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Foldable4<F extends URIS4> {
  readonly URI: F
  readonly reduce: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableComposition`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableComposition<F, G> {
  readonly reduce: <A, B>(
    fga: HKT<F, HKT<G, A>>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(fa: HKT<F, HKT<G, A>>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(
    fa: HKT<F, HKT<G, A>>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableComposition11`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableComposition11<F extends URIS, G extends URIS> {
  readonly reduce: <A, B>(
    fga: Kind<F, Kind<G, A>>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(fa: Kind<F, Kind<G, A>>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(
    fa: Kind<F, Kind<G, A>>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableComposition12`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableComposition12<F extends URIS, G extends URIS2> {
  readonly reduce: <E, A, B>(
    fga: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <E, A>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => M) => M
  readonly reduceRight: <E, A, B>(
    fa: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableComposition12C`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableComposition12C<F extends URIS, G extends URIS2, E> {
  readonly reduce: <A, B>(
    fga: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(
    fa: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableComposition21`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableComposition21<F extends URIS2, G extends URIS> {
  readonly reduce: <E, A, B>(
    fga: Kind2<F, E, Kind<G, A>>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <E, A>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => M) => M
  readonly reduceRight: <E, A, B>(
    fa: Kind2<F, E, Kind<G, A>>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableComposition2C1`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableComposition2C1<F extends URIS2, G extends URIS, E> {
  readonly reduce: <A, B>(
    fga: Kind2<F, E, Kind<G, A>>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(
    fa: Kind2<F, E, Kind<G, A>>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableComposition22`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableComposition22<F extends URIS2, G extends URIS2> {
  readonly reduce: <FE, GE, A, B>(
    fga: Kind2<F, FE, Kind2<G, GE, A>>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <FE, GE, A>(fa: Kind2<F, FE, Kind2<G, GE, A>>, f: (a: A) => M) => M
  readonly reduceRight: <FE, GE, A, B>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableComposition22C`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableComposition22C<F extends URIS2, G extends URIS2, E> {
  readonly reduce: <FE, A, B>(
    fga: Kind2<F, FE, Kind2<G, E, A>>,
    b: B,
    f: (b: B, a: A) => B
  ) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <FE, A>(fa: Kind2<F, FE, Kind2<G, E, A>>, f: (a: A) => M) => M
  readonly reduceRight: <FE, A, B>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    b: B,
    f: (a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndex`

```ts
/* tslint:disable:readonly-array */

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex<F, I> extends Foldable<F> {
  readonly reduceWithIndex: <A, B>(
    fa: HKT<F, A>,
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fa: HKT<F, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(
    fa: HKT<F, A>,
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndex1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex1<F extends URIS, I> extends Foldable1<F> {
  readonly reduceWithIndex: <A, B>(
    fa: Kind<F, A>,
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fa: Kind<F, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(
    fa: Kind<F, A>,
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndex2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex2<F extends URIS2, I> extends Foldable2<F> {
  readonly reduceWithIndex: <E, A, B>(
    fa: Kind2<F, E, A>,
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <E, A>(fa: Kind2<F, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <E, A, B>(
    fa: Kind2<F, E, A>,
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndex2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex2C<F extends URIS2, I, E>
  extends Foldable2C<F, E> {
  readonly reduceWithIndex: <A, B>(
    fa: Kind2<F, E, A>,
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fa: Kind2<F, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(
    fa: Kind2<F, E, A>,
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndex3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex3<F extends URIS3, I> extends Foldable3<F> {
  readonly reduceWithIndex: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <R, E, A>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndex3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface FoldableWithIndex3C<F extends URIS3, I, E>
  extends Foldable3C<F, E> {
  readonly reduceWithIndex: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <R, A>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndex4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FoldableWithIndex4<F extends URIS4, I> extends Foldable4<F> {
  readonly reduceWithIndex: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndexComposition`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition<F, FI, G, GI>
  extends FoldableComposition<F, G> {
  readonly reduceWithIndex: <A, B>(
    fga: HKT<F, HKT<G, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fga: HKT<F, HKT<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(
    fga: HKT<F, HKT<G, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndexComposition11`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition11<
  F extends URIS,
  FI,
  G extends URIS,
  GI
> extends FoldableComposition11<F, G> {
  readonly reduceWithIndex: <A, B>(
    fga: Kind<F, Kind<G, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fga: Kind<F, Kind<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(
    fga: Kind<F, Kind<G, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndexComposition12`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition12<
  F extends URIS,
  FI,
  G extends URIS2,
  GI
> extends FoldableComposition12<F, G> {
  readonly reduceWithIndex: <E, A, B>(
    fga: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <E, A>(fga: Kind<F, Kind2<G, E, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <E, A, B>(
    fga: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndexComposition12C`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition12C<
  F extends URIS,
  FI,
  G extends URIS2,
  GI,
  E
> extends FoldableComposition12C<F, G, E> {
  readonly reduceWithIndex: <A, B>(
    fga: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fga: Kind<F, Kind2<G, E, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(
    fga: Kind<F, Kind2<G, E, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndexComposition21`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition21<
  F extends URIS2,
  FI,
  G extends URIS,
  GI
> extends FoldableComposition21<F, G> {
  readonly reduceWithIndex: <FE, A, B>(
    fga: Kind2<F, FE, Kind<G, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <FE, A>(fga: Kind2<F, FE, Kind<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <FE, A, B>(
    fga: Kind2<F, FE, Kind<G, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndexComposition2C1`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition2C1<
  F extends URIS2,
  FI,
  G extends URIS,
  GI,
  FE
> extends FoldableComposition2C1<F, G, FE> {
  readonly reduceWithIndex: <A, B>(
    fga: Kind2<F, FE, Kind<G, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fga: Kind2<F, FE, Kind<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(
    fga: Kind2<F, FE, Kind<G, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndexComposition22`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition22<
  F extends URIS2,
  FI,
  G extends URIS2,
  GI
> extends FoldableComposition22<F, G> {
  readonly reduceWithIndex: <FE, GE, A, B>(
    fga: Kind2<F, FE, Kind2<G, GE, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <FE, GE, A>(
    fga: Kind2<F, FE, Kind2<G, GE, A>>,
    f: (i: [FI, GI], a: A) => M
  ) => M
  readonly reduceRightWithIndex: <FE, GE, A, B>(
    fga: Kind2<F, FE, Kind2<G, GE, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

#### `I` `FoldableWithIndexComposition22C`

```ts
/**
 * @since 2.0.0
 */
export interface FoldableWithIndexComposition22C<
  F extends URIS2,
  FI,
  G extends URIS2,
  GI,
  E
> extends FoldableComposition22C<F, G, E> {
  readonly reduceWithIndex: <FE, A, B>(
    fga: Kind2<F, FE, Kind2<G, E, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <FE, A>(
    fga: Kind2<F, FE, Kind2<G, E, A>>,
    f: (i: [FI, GI], a: A) => M
  ) => M
  readonly reduceRightWithIndex: <FE, A, B>(
    fga: Kind2<F, FE, Kind2<G, E, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */

/**
 * A *thunk*
 *
 * @since 2.0.0
 */
export interface Lazy<A> {
  (): A
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Predicate<A> {
  (a: A): boolean
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Endomorphism<A> {
  (a: A): A
}
```

#### `F` `No Render Found`

```ts
/**
 * @example
 * import { FunctionN } from 'fp-ts/function'
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 2.0.0
 */
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
  (...args: A): B
}
```

#### `I` `Functor`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}
```

#### `I` `Functor1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}
```

#### `I` `Functor2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}
```

#### `I` `Functor2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly map: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}
```

#### `I` `Functor3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => B
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Functor3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Functor3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly map: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => B
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Functor4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor4<F extends URIS4> {
  readonly URI: F
  readonly map: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    f: (a: A) => B
  ) => Kind4<F, S, R, E, B>
}
```

#### `I` `FunctorComposition`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorComposition<F, G> {
  readonly map: <A, B>(
    fa: HKT<F, HKT<G, A>>,
    f: (a: A) => B
  ) => HKT<F, HKT<G, B>>
}
```

#### `I` `FunctorCompositionHKT1`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorCompositionHKT1<F, G extends URIS> {
  readonly map: <A, B>(
    fa: HKT<F, Kind<G, A>>,
    f: (a: A) => B
  ) => HKT<F, Kind<G, B>>
}
```

#### `I` `FunctorCompositionHKT2`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorCompositionHKT2<F, G extends URIS2> {
  readonly map: <E, A, B>(
    fa: HKT<F, Kind2<G, E, A>>,
    f: (a: A) => B
  ) => HKT<F, Kind2<G, E, B>>
}
```

#### `I` `FunctorCompositionHKT2C`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorCompositionHKT2C<F, G extends URIS2, E> {
  readonly map: <A, B>(
    fa: HKT<F, Kind2<G, E, A>>,
    f: (a: A) => B
  ) => HKT<F, Kind2<G, E, B>>
}
```

#### `I` `FunctorComposition11`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorComposition11<F extends URIS, G extends URIS> {
  readonly map: <A, B>(
    fa: Kind<F, Kind<G, A>>,
    f: (a: A) => B
  ) => Kind<F, Kind<G, B>>
}
```

#### `I` `FunctorComposition12`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorComposition12<F extends URIS, G extends URIS2> {
  readonly map: <E, A, B>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (a: A) => B
  ) => Kind<F, Kind2<G, E, B>>
}
```

#### `I` `FunctorComposition12C`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorComposition12C<F extends URIS, G extends URIS2, E> {
  readonly map: <A, B>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (a: A) => B
  ) => Kind<F, Kind2<G, E, B>>
}
```

#### `I` `FunctorComposition21`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorComposition21<F extends URIS2, G extends URIS> {
  readonly map: <E, A, B>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (a: A) => B
  ) => Kind2<F, E, Kind<G, B>>
}
```

#### `I` `FunctorComposition2C1`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorComposition2C1<F extends URIS2, G extends URIS, E> {
  readonly map: <A, B>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (a: A) => B
  ) => Kind2<F, E, Kind<G, B>>
}
```

#### `I` `FunctorComposition22`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorComposition22<F extends URIS2, G extends URIS2> {
  readonly map: <FE, GE, A, B>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    f: (a: A) => B
  ) => Kind2<F, FE, Kind2<G, GE, B>>
}
```

#### `I` `FunctorComposition22C`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorComposition22C<F extends URIS2, G extends URIS2, E> {
  readonly map: <FE, A, B>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    f: (a: A) => B
  ) => Kind2<F, FE, Kind2<G, E, B>>
}
```

#### `I` `FunctorComposition23`

```ts
/**
 * @since 2.2.0
 */
export interface FunctorComposition23<F extends URIS2, G extends URIS3> {
  readonly map: <FE, R, E, A, B>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    f: (a: A) => B
  ) => Kind2<F, FE, Kind3<G, R, E, B>>
}
```

#### `I` `FunctorComposition23C`

```ts
/**
 * @since 2.2.0
 */
export interface FunctorComposition23C<F extends URIS2, G extends URIS3, E> {
  readonly map: <FE, R, A, B>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    f: (a: A) => B
  ) => Kind2<F, FE, Kind3<G, R, E, B>>
}
```

#### `I` `FunctorWithIndex`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FunctorWithIndex<F, I> extends Functor<F> {
  readonly mapWithIndex: <A, B>(
    fa: HKT<F, A>,
    f: (i: I, a: A) => B
  ) => HKT<F, B>
}
```

#### `I` `FunctorWithIndex1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FunctorWithIndex1<F extends URIS, I> extends Functor1<F> {
  readonly mapWithIndex: <A, B>(
    fa: Kind<F, A>,
    f: (i: I, a: A) => B
  ) => Kind<F, B>
}
```

#### `I` `FunctorWithIndex2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FunctorWithIndex2<F extends URIS2, I> extends Functor2<F> {
  readonly mapWithIndex: <E, A, B>(
    fa: Kind2<F, E, A>,
    f: (i: I, a: A) => B
  ) => Kind2<F, E, B>
}
```

#### `I` `FunctorWithIndex2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FunctorWithIndex2C<F extends URIS2, I, E>
  extends Functor2C<F, E> {
  readonly mapWithIndex: <A, B>(
    fa: Kind2<F, E, A>,
    f: (i: I, a: A) => B
  ) => Kind2<F, E, B>
}
```

#### `I` `FunctorWithIndex3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FunctorWithIndex3<F extends URIS3, I> extends Functor3<F> {
  readonly mapWithIndex: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (i: I, a: A) => B
  ) => Kind3<F, R, E, B>
}
```

#### `I` `FunctorWithIndex3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface FunctorWithIndex3C<F extends URIS3, I, E>
  extends Functor3C<F, E> {
  readonly mapWithIndex: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (i: I, a: A) => B
  ) => Kind3<F, R, E, B>
}
```

#### `I` `FunctorWithIndex4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface FunctorWithIndex4<F extends URIS4, I> extends Functor4<F> {
  readonly mapWithIndex: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    f: (i: I, a: A) => B
  ) => Kind4<F, S, R, E, B>
}
```

#### `I` `FunctorWithIndexComposition`

```ts
/* tslint:disable:readonly-array */

/**
 * @since 2.0.0
 */
export interface FunctorWithIndexComposition<F, FI, G, GI>
  extends FunctorComposition<F, G> {
  readonly mapWithIndex: <A, B>(
    fga: HKT<F, HKT<G, A>>,
    f: (i: [FI, GI], a: A) => B
  ) => HKT<F, HKT<G, B>>
}
```

#### `I` `FunctorWithIndexComposition11`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorWithIndexComposition11<
  F extends URIS,
  FI,
  G extends URIS,
  GI
> extends FunctorComposition11<F, G> {
  readonly mapWithIndex: <A, B>(
    fa: Kind<F, Kind<G, A>>,
    f: (i: [FI, GI], a: A) => B
  ) => Kind<F, Kind<G, B>>
}
```

#### `I` `FunctorWithIndexComposition12`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorWithIndexComposition12<
  F extends URIS,
  FI,
  G extends URIS2,
  GI
> extends FunctorComposition12<F, G> {
  readonly mapWithIndex: <E, A, B>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (i: [FI, GI], a: A) => B
  ) => Kind<F, Kind2<G, E, B>>
}
```

#### `I` `FunctorWithIndexComposition12C`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorWithIndexComposition12C<
  F extends URIS,
  FI,
  G extends URIS2,
  GI,
  E
> extends FunctorComposition12C<F, G, E> {
  readonly mapWithIndex: <A, B>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (i: [FI, GI], a: A) => B
  ) => Kind<F, Kind2<G, E, B>>
}
```

#### `I` `FunctorWithIndexComposition21`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorWithIndexComposition21<
  F extends URIS2,
  FI,
  G extends URIS,
  GI
> extends FunctorComposition21<F, G> {
  readonly mapWithIndex: <E, A, B>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (i: [FI, GI], a: A) => B
  ) => Kind2<F, E, Kind<G, B>>
}
```

#### `I` `FunctorWithIndexComposition2C1`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorWithIndexComposition2C1<
  F extends URIS2,
  FI,
  G extends URIS,
  GI,
  E
> extends FunctorComposition2C1<F, G, E> {
  readonly mapWithIndex: <A, B>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (i: [FI, GI], a: A) => B
  ) => Kind2<F, E, Kind<G, B>>
}
```

#### `I` `FunctorWithIndexComposition22`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorWithIndexComposition22<
  F extends URIS2,
  FI,
  G extends URIS2,
  GI
> extends FunctorComposition22<F, G> {
  readonly mapWithIndex: <FE, GE, A, B>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    f: (i: [FI, GI], a: A) => B
  ) => Kind2<F, FE, Kind2<G, GE, B>>
}
```

#### `I` `FunctorWithIndexComposition22C`

```ts
/**
 * @since 2.0.0
 */
export interface FunctorWithIndexComposition22C<
  F extends URIS2,
  FI,
  G extends URIS2,
  GI,
  E
> extends FunctorComposition22C<F, G, E> {
  readonly mapWithIndex: <FE, A, B>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    f: (i: [FI, GI], a: A) => B
  ) => Kind2<F, FE, Kind2<G, E, B>>
}
```

#### `I` `Group`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Group<A> extends Monoid<A> {
  readonly inverse: (a: A) => A
}
```

#### `I` `HeytingAlgebra`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface HeytingAlgebra<A> extends BoundedDistributiveLattice<A> {
  readonly implies: (x: A, y: A) => A
  readonly not: (x: A) => A
}
```

#### `I` `HKT`

```ts
/**
 * Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 *
 * @since 2.0.0
 */

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
```

#### `I` `HKT2`

```ts
/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT2<URI, E, A> extends HKT<URI, A> {
  readonly _E: E
}
```

#### `I` `HKT3`

```ts
/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT3<URI, R, E, A> extends HKT2<URI, E, A> {
  readonly _R: R
}
```

#### `I` `HKT4`

```ts
/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT4<URI, S, R, E, A> extends HKT3<URI, R, E, A> {
  readonly _S: S
}
```

#### `I` `URItoKind`

```ts
//
// inj: type-level dictionaries for HKTs: URI -> concrete type
//

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind<A> {}
```

#### `&` `ReadonlyNonEmptyArray`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.5.0
 */
export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
  readonly 0: A
}
```

#### `` `Forest`

```ts
// tslint:disable:readonly-array

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export type Forest<A> = Array<Tree<A>>
```

#### `I` `Tree`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}
```

#### `I` `URItoKind2`

```ts
/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind2<E, A> {}
```

#### `|` `These`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export type These<E, A> = Either<E, A> | Both<E, A>
```

#### `I` `URItoKind3`

```ts
/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind3<R, E, A> {}
```

#### `I` `URItoKind4`

```ts
/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind4<S, R, E, A> {}
```

#### `|` `URIS`

```ts
//
// unions of URIs
//

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export type URIS = keyof URItoKind<any>
```

#### `|` `URIS2`

```ts
/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export type URIS2 = keyof URItoKind2<any, any>
```

#### `|` `URIS3`

```ts
/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type URIS3 = keyof URItoKind3<any, any, any>
```

#### `` `URIS4`

```ts
/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type URIS4 = keyof URItoKind4<any, any, any, any>
```

#### `` `Identity`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export type Identity<A> = A
```

#### `I` `Invariant`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Invariant<F> {
  readonly URI: F
  readonly imap: <A, B>(
    fa: HKT<F, A>,
    f: (a: A) => B,
    g: (b: B) => A
  ) => HKT<F, B>
}
```

#### `I` `Invariant1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Invariant1<F extends URIS> {
  readonly URI: F
  readonly imap: <A, B>(
    fa: Kind<F, A>,
    f: (a: A) => B,
    g: (b: B) => A
  ) => Kind<F, B>
}
```

#### `I` `Invariant2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Invariant2<F extends URIS2> {
  readonly URI: F
  readonly imap: <E, A, B>(
    fa: Kind2<F, E, A>,
    f: (a: A) => B,
    g: (b: B) => A
  ) => Kind2<F, E, B>
}
```

#### `I` `Invariant2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Invariant2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly imap: <A, B>(
    fa: Kind2<F, E, A>,
    f: (a: A) => B,
    g: (b: B) => A
  ) => Kind2<F, E, B>
}
```

#### `I` `Invariant3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Invariant3<F extends URIS3> {
  readonly URI: F
  readonly imap: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => B,
    g: (b: B) => A
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Invariant3C`

```ts
/**
 * @category type classes
 * @since 2.4.2
 */
export interface Invariant3C<F extends URIS3, E> {
  readonly URI: F
  readonly imap: <R, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => B,
    g: (b: B) => A
  ) => Kind3<F, R, E, B>
}
```

#### `I` `Invariant4`

```ts
/**
 * @category type classes
 * @since 2.4.2
 */
export interface Invariant4<F extends URIS4> {
  readonly URI: F
  readonly imap: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    f: (a: A) => B,
    g: (b: B) => A
  ) => Kind4<F, S, R, E, B>
}
```

#### `F` `No Render Found`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface IO<A> {
  (): A
}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}
```

#### `I` `JoinSemilattice`

```ts
/**
 * A join-semilattice (or upper semilattice) is a semilattice whose operation is called `join`, and which can be thought
 * of as a least upper bound.
 *
 * A `JoinSemilattice` must satisfy the following laws:
 *
 * - Associativity: `a ∨ (b ∨ c) <-> (a ∨ b) ∨ c`
 * - Commutativity: `a ∨ b <-> b ∨ a`
 * - Idempotency:   `a ∨ a <-> a`
 *
 * @since 2.0.0
 */

/**
 * @category type classes
 * @since 2.0.0
 */
export interface JoinSemilattice<A> {
  readonly join: (x: A, y: A) => A
}
```

#### `I` `Lattice`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

#### `I` `Magma`

```ts
/**
 * A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`
 *
 * See [Semigroup](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html) for some instances.
 *
 * @category type classes
 * @since 2.0.0
 */
export interface Magma<A> {
  readonly concat: (x: A, y: A) => A
}
```

#### `I` `MeetSemilattice`

```ts
/**
 * A meet-semilattice (or lower semilattice) is a semilattice whose operation is called `meet`, and which can be thought
 * of as a greatest lower bound.
 *
 * A `MeetSemilattice` must satisfy the following laws:
 *
 * - Associativity: `a ∧ (b ∧ c) <-> (a ∧ b) ∧ c`
 * - Commutativity: `a ∧ b <-> b ∧ a`
 * - Idempotency:   `a ∧ a <-> a`
 *
 * @since 2.0.0
 */

/**
 * @category type classes
 * @since 2.0.0
 */
export interface MeetSemilattice<A> {
  readonly meet: (x: A, y: A) => A
}
```

#### `I` `Monad`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad<F> extends Applicative<F>, Chain<F> {}
```

#### `I` `Monad1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad1<F extends URIS> extends Applicative1<F>, Chain1<F> {}
```

#### `I` `Monad2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad2<M extends URIS2> extends Applicative2<M>, Chain2<M> {}
```

#### `I` `Monad2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad2C<M extends URIS2, L>
  extends Applicative2C<M, L>,
    Chain2C<M, L> {}
```

#### `I` `Monad3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad3<M extends URIS3> extends Applicative3<M>, Chain3<M> {}
```

#### `I` `Monad3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Monad3C<M extends URIS3, E>
  extends Applicative3C<M, E>,
    Chain3C<M, E> {}
```

#### `I` `Monad4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad4<M extends URIS4> extends Applicative4<M>, Chain4<M> {}
```

#### `I` `MonadIO`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO<M> extends Monad<M> {
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}
```

#### `I` `MonadIO1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO1<M extends URIS> extends Monad1<M> {
  readonly fromIO: <A>(fa: IO<A>) => Kind<M, A>
}
```

#### `I` `MonadIO2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO2<M extends URIS2> extends Monad2<M> {
  readonly fromIO: <E, A>(fa: IO<A>) => Kind2<M, E, A>
}
```

#### `I` `MonadIO2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO2C<M extends URIS2, E> extends Monad2C<M, E> {
  readonly fromIO: <A>(fa: IO<A>) => Kind2<M, E, A>
}
```

#### `I` `MonadIO3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadIO3<M extends URIS3> extends Monad3<M> {
  readonly fromIO: <R, E, A>(fa: IO<A>) => Kind3<M, R, E, A>
}
```

#### `I` `MonadIO3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface MonadIO3C<M extends URIS3, E> extends Monad3C<M, E> {
  readonly fromIO: <R, A>(fa: IO<A>) => Kind3<M, R, E, A>
}
```

#### `I` `MonadIO4`

```ts
/**
 * @category type classes
 * @since 2.4.4
 */
export interface MonadIO4<M extends URIS4> extends Monad4<M> {
  readonly fromIO: <S, R, E, A>(fa: IO<A>) => Kind4<M, S, R, E, A>
}
```

#### `I` `MonadTask`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask<M> extends MonadIO<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}
```

#### `I` `MonadTask1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask1<M extends URIS> extends MonadIO1<M> {
  readonly fromTask: <A>(fa: Task<A>) => Kind<M, A>
}
```

#### `I` `MonadTask2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask2<M extends URIS2> extends MonadIO2<M> {
  readonly fromTask: <E, A>(fa: Task<A>) => Kind2<M, E, A>
}
```

#### `I` `MonadTask2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask2C<M extends URIS2, E> extends MonadIO2C<M, E> {
  readonly fromTask: <A>(fa: Task<A>) => Kind2<M, E, A>
}
```

#### `I` `MonadTask3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadTask3<M extends URIS3> extends MonadIO3<M> {
  readonly fromTask: <R, E, A>(fa: Task<A>) => Kind3<M, R, E, A>
}
```

#### `I` `MonadTask3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface MonadTask3C<M extends URIS3, E> extends MonadIO3C<M, E> {
  readonly fromTask: <R, A>(fa: Task<A>) => Kind3<M, R, E, A>
}
```

#### `I` `MonadTask4`

```ts
/**
 * @category type classes
 * @since 2.4.4
 */
export interface MonadTask4<M extends URIS4> extends MonadIO4<M> {
  readonly fromTask: <S, R, E, A>(fa: Task<A>) => Kind4<M, S, R, E, A>
}
```

#### `I` `MonadThrow`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow<M> extends Monad<M> {
  readonly throwError: <E, A>(e: E) => HKT<M, A>
}
```

#### `I` `MonadThrow1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow1<M extends URIS> extends Monad1<M> {
  readonly throwError: <E, A>(e: E) => Kind<M, A>
}
```

#### `I` `MonadThrow2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow2<M extends URIS2> extends Monad2<M> {
  readonly throwError: <E, A>(e: E) => Kind2<M, E, A>
}
```

#### `I` `MonadThrow2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow2C<M extends URIS2, E> extends Monad2C<M, E> {
  readonly throwError: <A>(e: E) => Kind2<M, E, A>
}
```

#### `I` `MonadThrow3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow3<M extends URIS3> extends Monad3<M> {
  readonly throwError: <R, E, A>(e: E) => Kind3<M, R, E, A>
}
```

#### `I` `MonadThrow3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface MonadThrow3C<M extends URIS3, E> extends Monad3C<M, E> {
  readonly throwError: <R, A>(e: E) => Kind3<M, R, E, A>
}
```

#### `I` `MonadThrow4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface MonadThrow4<M extends URIS4> extends Monad4<M> {
  readonly throwError: <S, R, E, A>(e: E) => Kind4<M, S, R, E, A>
}
```

#### `I` `Monoid`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monoid<A> extends S.Semigroup<A> {
  readonly empty: A
}
```

#### `I` `NonEmptyArray`

```ts
/* tslint:disable:readonly-array */

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/* tslint:disable:readonly-keyword */
/**
 * @category model
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  0: A
}
```

#### `I` `Some`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}
```

#### `I` `OptionT`

```ts
// TODO: remove module in v3

/**
 * @category model
 * @since 2.0.0
 */
export interface OptionT<M, A> extends HKT<M, Option<A>> {}
```

#### `I` `OptionM`

```ts
/**
 * @since 2.0.0
 */
export interface OptionM<M> extends ApplicativeCompositionHKT1<M, URI> {
  readonly chain: <A, B>(
    ma: OptionT<M, A>,
    f: (a: A) => OptionT<M, B>
  ) => OptionT<M, B>
  readonly alt: <A>(
    fa: OptionT<M, A>,
    that: Lazy<OptionT<M, A>>
  ) => OptionT<M, A>
  readonly fold: <A, R>(
    ma: OptionT<M, A>,
    onNone: Lazy<HKT<M, R>>,
    onSome: (a: A) => HKT<M, R>
  ) => HKT<M, R>
  readonly getOrElse: <A>(
    ma: OptionT<M, A>,
    onNone: Lazy<HKT<M, A>>
  ) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly none: <A = never>() => OptionT<M, A>
}
```

#### `I` `OptionM1`

```ts
/**
 * @since 2.0.0
 */
export interface OptionM1<M extends URIS>
  extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(
    ma: OptionT1<M, A>,
    f: (a: A) => OptionT1<M, B>
  ) => OptionT1<M, B>
  readonly alt: <A>(
    fa: OptionT1<M, A>,
    that: Lazy<OptionT1<M, A>>
  ) => OptionT1<M, A>
  readonly fold: <A, R>(
    ma: OptionT1<M, A>,
    onNone: Lazy<Kind<M, R>>,
    onSome: (a: A) => Kind<M, R>
  ) => Kind<M, R>
  readonly getOrElse: <A>(
    ma: OptionT1<M, A>,
    onNone: Lazy<Kind<M, A>>
  ) => Kind<M, A>
  readonly fromM: <A>(ma: Kind<M, A>) => OptionT1<M, A>
  readonly none: <A = never>() => OptionT1<M, A>
}
```

#### `I` `OptionM2`

```ts
/**
 * @since 2.0.0
 */
export interface OptionM2<M extends URIS2>
  extends ApplicativeComposition21<M, URI> {
  readonly chain: <E, A, B>(
    ma: OptionT2<M, E, A>,
    f: (a: A) => OptionT2<M, E, B>
  ) => OptionT2<M, E, B>
  readonly alt: <E, A>(
    fa: OptionT2<M, E, A>,
    that: Lazy<OptionT2<M, E, A>>
  ) => OptionT2<M, E, A>
  readonly fold: <E, A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <E, A>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, A>>
  ) => Kind2<M, E, A>
  readonly fromM: <E, A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <E = never, A = never>() => OptionT2<M, E, A>
}
```

#### `I` `OptionM2C`

```ts
/**
 * @since 2.2.0
 */
export interface OptionM2C<M extends URIS2, E>
  extends ApplicativeComposition2C1<M, URI, E> {
  readonly chain: <A, B>(
    ma: OptionT2<M, E, A>,
    f: (a: A) => OptionT2<M, E, B>
  ) => OptionT2<M, E, B>
  readonly alt: <A>(
    fa: OptionT2<M, E, A>,
    that: Lazy<OptionT2<M, E, A>>
  ) => OptionT2<M, E, A>
  readonly fold: <A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <A>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, A>>
  ) => Kind2<M, E, A>
  readonly fromM: <A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <A = never>() => OptionT2<M, E, A>
}
```

#### `I` `Ord`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}
```

#### `I` `PipeableFunctor`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctor<F> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}
```

#### `I` `PipeableFunctor1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctor1<F extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}
```

#### `I` `PipeableFunctor2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctor2<F extends URIS2> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

#### `I` `PipeableFunctor2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctor2C<F extends URIS2, E> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

#### `I` `PipeableFunctor3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctor3<F extends URIS3> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableFunctor3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableFunctor3C<F extends URIS3, E> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableFunctor4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctor4<F extends URIS4> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

#### `I` `PipeableContravariant`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableContravariant<F> {
  readonly contramap: <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
}
```

#### `I` `PipeableContravariant1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableContravariant1<F extends URIS> {
  readonly contramap: <A, B>(f: (b: B) => A) => (fa: Kind<F, A>) => Kind<F, B>
}
```

#### `I` `PipeableContravariant2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableContravariant2<F extends URIS2> {
  readonly contramap: <A, B>(
    f: (b: B) => A
  ) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

#### `I` `PipeableContravariant2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableContravariant2C<F extends URIS2, E> {
  readonly contramap: <A, B>(
    f: (b: B) => A
  ) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

#### `I` `PipeableContravariant3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableContravariant3<F extends URIS3> {
  readonly contramap: <A, B>(
    f: (b: B) => A
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableContravariant3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableContravariant3C<F extends URIS3, E> {
  readonly contramap: <A, B>(
    f: (b: B) => A
  ) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableContravariant4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableContravariant4<F extends URIS4> {
  readonly contramap: <A, B>(
    f: (b: B) => A
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

#### `I` `PipeableFunctorWithIndex`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex<F, I> extends PipeableFunctor<F> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => (fa: HKT<F, A>) => HKT<F, B>
}
```

#### `I` `PipeableFunctorWithIndex1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex1<F extends URIS, I>
  extends PipeableFunctor1<F> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => (fa: Kind<F, A>) => Kind<F, B>
}
```

#### `I` `PipeableFunctorWithIndex2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex2<F extends URIS2, I>
  extends PipeableFunctor2<F> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

#### `I` `PipeableFunctorWithIndex2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex2C<F extends URIS2, I, E>
  extends PipeableFunctor2C<F, E> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

#### `I` `PipeableFunctorWithIndex3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex3<F extends URIS3, I>
  extends PipeableFunctor3<F> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableFunctorWithIndex3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableFunctorWithIndex3C<F extends URIS3, I, E>
  extends PipeableFunctor3C<F, E> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableFunctorWithIndex4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex4<F extends URIS4, I>
  extends PipeableFunctor4<F> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

#### `I` `PipeableApply`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableApply<F> extends PipeableFunctor<F> {
  readonly ap: <A>(fa: HKT<F, A>) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
  readonly apFirst: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, A>
  readonly apSecond: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, B>
}
```

#### `I` `PipeableApply1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableApply1<F extends URIS> extends PipeableFunctor1<F> {
  readonly ap: <A>(
    fa: Kind<F, A>
  ) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
  readonly apFirst: <B>(fb: Kind<F, B>) => <A>(fa: Kind<F, A>) => Kind<F, A>
  readonly apSecond: <B>(fb: Kind<F, B>) => <A>(fa: Kind<F, A>) => Kind<F, B>
}
```

#### `I` `PipeableApply2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableApply2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly ap: <E, A>(
    fa: Kind2<F, E, A>
  ) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
  readonly apFirst: <E, B>(
    fb: Kind2<F, E, B>
  ) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
  readonly apSecond: <E, B>(
    fb: Kind2<F, E, B>
  ) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

#### `I` `PipeableApply2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableApply2C<F extends URIS2, E>
  extends PipeableFunctor2C<F, E> {
  readonly ap: <A>(
    fa: Kind2<F, E, A>
  ) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
  readonly apFirst: <B>(
    fb: Kind2<F, E, B>
  ) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
  readonly apSecond: <B>(
    fb: Kind2<F, E, B>
  ) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

#### `I` `PipeableApply3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableApply3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly ap: <R, E, A>(
    fa: Kind3<F, R, E, A>
  ) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
  readonly apFirst: <R, E, B>(
    fb: Kind3<F, R, E, B>
  ) => <A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly apSecond: <R, E, B>(
    fb: Kind3<F, R, E, B>
  ) => <A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableApply3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableApply3C<F extends URIS3, E>
  extends PipeableFunctor3C<F, E> {
  readonly ap: <R, A>(
    fa: Kind3<F, R, E, A>
  ) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
  readonly apFirst: <R, B>(
    fb: Kind3<F, R, E, B>
  ) => <A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly apSecond: <R, B>(
    fb: Kind3<F, R, E, B>
  ) => <A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableApply4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableApply4<F extends URIS4> extends PipeableFunctor4<F> {
  readonly ap: <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>
  ) => <B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
  readonly apFirst: <S, R, E, B>(
    fb: Kind4<F, S, R, E, B>
  ) => <A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  readonly apSecond: <S, R, E, B>(
    fb: Kind4<F, S, R, E, B>
  ) => <A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

#### `I` `PipeableChain`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableChain<F> extends PipeableApply<F> {
  readonly chain: <A, B>(f: (a: A) => HKT<F, B>) => (ma: HKT<F, A>) => HKT<F, B>
  readonly chainFirst: <A, B>(
    f: (a: A) => HKT<F, B>
  ) => (ma: HKT<F, A>) => HKT<F, A>
  readonly flatten: <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
}
```

#### `I` `PipeableChain1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableChain1<F extends URIS> extends PipeableApply1<F> {
  readonly chain: <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (ma: Kind<F, A>) => Kind<F, B>
  readonly chainFirst: <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (ma: Kind<F, A>) => Kind<F, A>
  readonly flatten: <A>(mma: Kind<F, Kind<F, A>>) => Kind<F, A>
}
```

#### `I` `PipeableChain2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableChain2<F extends URIS2> extends PipeableApply2<F> {
  readonly chain: <E, A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ma: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly chainFirst: <E, A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ma: Kind2<F, E, A>) => Kind2<F, E, A>
  readonly flatten: <E, A>(mma: Kind2<F, E, Kind2<F, E, A>>) => Kind2<F, E, A>
}
```

#### `I` `PipeableChain2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableChain2C<F extends URIS2, E>
  extends PipeableApply2C<F, E> {
  readonly chain: <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ma: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly chainFirst: <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ma: Kind2<F, E, A>) => Kind2<F, E, A>
  readonly flatten: <A>(mma: Kind2<F, E, Kind2<F, E, A>>) => Kind2<F, E, A>
}
```

#### `I` `PipeableChain3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableChain3<F extends URIS3> extends PipeableApply3<F> {
  readonly chain: <R, E, A, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ma: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly chainFirst: <R, E, A, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ma: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly flatten: <R, E, A>(
    mma: Kind3<F, R, E, Kind3<F, R, E, A>>
  ) => Kind3<F, R, E, A>
}
```

#### `I` `PipeableChain3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableChain3C<F extends URIS3, E>
  extends PipeableApply3C<F, E> {
  readonly chain: <R, A, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ma: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly chainFirst: <R, A, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ma: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly flatten: <R, A>(
    mma: Kind3<F, R, E, Kind3<F, R, E, A>>
  ) => Kind3<F, R, E, A>
}
```

#### `I` `PipeableChain4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableChain4<F extends URIS4> extends PipeableApply4<F> {
  readonly chain: <S, R, E, A, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ma: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly chainFirst: <S, R, E, A, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ma: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  readonly flatten: <S, R, E, A>(
    mma: Kind4<F, S, R, E, Kind4<F, S, R, E, A>>
  ) => Kind4<F, S, R, E, A>
}
```

#### `I` `PipeableExtend`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableExtend<F> extends PipeableFunctor<F> {
  readonly extend: <A, B>(
    f: (wa: HKT<F, A>) => B
  ) => (wa: HKT<F, A>) => HKT<F, B>
  readonly duplicate: <A>(wa: HKT<F, A>) => HKT<F, HKT<F, A>>
}
```

#### `I` `PipeableExtend1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableExtend1<F extends URIS> extends PipeableFunctor1<F> {
  readonly extend: <A, B>(
    f: (wa: Kind<F, A>) => B
  ) => (wa: Kind<F, A>) => Kind<F, B>
  readonly duplicate: <A>(wa: Kind<F, A>) => Kind<F, Kind<F, A>>
}
```

#### `I` `PipeableExtend2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableExtend2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly extend: <E, A, B>(
    f: (wa: Kind2<F, E, A>) => B
  ) => (wa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly duplicate: <E, A>(wa: Kind2<F, E, A>) => Kind2<F, E, Kind2<F, E, A>>
}
```

#### `I` `PipeableExtend2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableExtend2C<F extends URIS2, E>
  extends PipeableFunctor2C<F, E> {
  readonly extend: <A, B>(
    f: (wa: Kind2<F, E, A>) => B
  ) => (wa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly duplicate: <A>(wa: Kind2<F, E, A>) => Kind2<F, E, Kind2<F, E, A>>
}
```

#### `I` `PipeableExtend3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableExtend3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly extend: <R, E, A, B>(
    f: (wa: Kind3<F, R, E, A>) => B
  ) => (wa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly duplicate: <R, E, A>(
    wa: Kind3<F, R, E, A>
  ) => Kind3<F, R, E, Kind3<F, R, E, A>>
}
```

#### `I` `PipeableExtend3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableExtend3C<F extends URIS3, E>
  extends PipeableFunctor3C<F, E> {
  readonly extend: <R, A, B>(
    f: (wa: Kind3<F, R, E, A>) => B
  ) => (wa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly duplicate: <R, A>(
    wa: Kind3<F, R, E, A>
  ) => Kind3<F, R, E, Kind3<F, R, E, A>>
}
```

#### `I` `PipeableExtend4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableExtend4<F extends URIS4> extends PipeableFunctor4<F> {
  readonly extend: <S, R, E, A, B>(
    f: (wa: Kind4<F, S, R, E, A>) => B
  ) => (wa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly duplicate: <S, R, E, A>(
    wa: Kind4<F, S, R, E, A>
  ) => Kind4<F, S, R, E, Kind4<F, S, R, E, A>>
}
```

#### `I` `PipeableBifunctor`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableBifunctor<F> {
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => (fa: HKT2<F, E, A>) => HKT2<F, G, B>
  readonly mapLeft: <E, G>(
    f: (e: E) => G
  ) => <A>(fa: HKT2<F, E, A>) => HKT2<F, G, A>
}
```

#### `I` `PipeableBifunctor2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableBifunctor2<F extends URIS2> {
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => (fa: Kind2<F, E, A>) => Kind2<F, G, B>
  readonly mapLeft: <E, G>(
    f: (e: E) => G
  ) => <A>(fa: Kind2<F, E, A>) => Kind2<F, G, A>
}
```

#### `I` `PipeableBifunctor3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableBifunctor3<F extends URIS3> {
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <E, G>(
    f: (e: E) => G
  ) => <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}
```

#### `I` `PipeableBifunctor3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableBifunctor3C<F extends URIS3, E> {
  readonly bimap: <G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <G>(
    f: (e: E) => G
  ) => <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}
```

#### `I` `PipeableBifunctor4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableBifunctor4<F extends URIS4> {
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, B>
  readonly mapLeft: <E, G>(
    f: (e: E) => G
  ) => <S, R, A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, A>
}
```

#### `I` `PipeableFoldable`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldable<F> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(f: (a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRight: <A, B>(
    b: B,
    f: (a: A, b: B) => B
  ) => (fa: HKT<F, A>) => B
}
```

#### `I` `PipeableFoldable1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldable1<F extends URIS> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(f: (a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRight: <A, B>(
    b: B,
    f: (a: A, b: B) => B
  ) => (fa: Kind<F, A>) => B
}
```

#### `I` `PipeableFoldable2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldable2<F extends URIS2> {
  readonly reduce: <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(f: (a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRight: <A, B>(
    b: B,
    f: (a: A, b: B) => B
  ) => <E>(fa: Kind2<F, E, A>) => B
}
```

#### `I` `PipeableFoldable2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldable2C<F extends URIS2, E> {
  readonly reduce: <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) => (fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(f: (a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRight: <A, B>(
    b: B,
    f: (a: A, b: B) => B
  ) => (fa: Kind2<F, E, A>) => B
}
```

#### `I` `PipeableFoldable3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldable3<F extends URIS3> {
  readonly reduce: <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(f: (a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <A, B>(
    b: B,
    f: (a: A, b: B) => B
  ) => <R, E>(fa: Kind3<F, R, E, A>) => B
}
```

#### `I` `PipeableFoldable3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableFoldable3C<F extends URIS3, E> {
  readonly reduce: <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(f: (a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <A, B>(
    b: B,
    f: (a: A, b: B) => B
  ) => <R>(fa: Kind3<F, R, E, A>) => B
}
```

#### `I` `PipeableFoldable4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldable4<F extends URIS4> {
  readonly reduce: <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMap: <M>(
    M: Monoid<M>
  ) => <A>(f: (a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRight: <A, B>(
    b: B,
    f: (a: A, b: B) => B
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}
```

#### `I` `PipeableFoldableWithIndex`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex<F, I> extends PipeableFoldable<F> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => (fa: HKT<F, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => (fa: HKT<F, A>) => B
}
```

#### `I` `PipeableFoldableWithIndex1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex1<F extends URIS, I>
  extends PipeableFoldable1<F> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => (fa: Kind<F, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => (fa: Kind<F, A>) => B
}
```

#### `I` `PipeableFoldableWithIndex2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex2<F extends URIS2, I>
  extends PipeableFoldable2<F> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => <E>(fa: Kind2<F, E, A>) => B
}
```

#### `I` `PipeableFoldableWithIndex2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex2C<F extends URIS2, I, E>
  extends PipeableFoldable2C<F, E> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => (fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => (fa: Kind2<F, E, A>) => B
}
```

#### `I` `PipeableFoldableWithIndex3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex3<F extends URIS3, I>
  extends PipeableFoldable3<F> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => <R, E>(fa: Kind3<F, R, E, A>) => B
}
```

#### `I` `PipeableFoldableWithIndex3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableFoldableWithIndex3C<F extends URIS3, I, E>
  extends PipeableFoldable3C<F, E> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => <R>(fa: Kind3<F, R, E, A>) => B
}
```

#### `I` `PipeableFoldableWithIndex4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex4<F extends URIS4, I>
  extends PipeableFoldable4<F> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (i: I, b: B, a: A) => B
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}
```

#### `I` `PipeableAlt`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableAlt<F> {
  readonly alt: <A>(that: Lazy<HKT<F, A>>) => (fa: HKT<F, A>) => HKT<F, A>
}
```

#### `I` `PipeableAlt1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableAlt1<F extends URIS> {
  readonly alt: <A>(that: Lazy<Kind<F, A>>) => (fa: Kind<F, A>) => Kind<F, A>
}
```

#### `I` `PipeableAlt2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableAlt2<F extends URIS2> {
  readonly alt: <E, A>(
    that: Lazy<Kind2<F, E, A>>
  ) => (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

#### `I` `PipeableAlt2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableAlt2C<F extends URIS2, E> {
  readonly alt: <A>(
    that: Lazy<Kind2<F, E, A>>
  ) => (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

#### `I` `PipeableAlt3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableAlt3<F extends URIS3> {
  readonly alt: <R, E, A>(
    that: Lazy<Kind3<F, R, E, A>>
  ) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

#### `I` `PipeableAlt3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableAlt3C<F extends URIS3, E> {
  readonly alt: <R, A>(
    that: Lazy<Kind3<F, R, E, A>>
  ) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

#### `I` `PipeableAlt4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableAlt4<F extends URIS4> {
  readonly alt: <S, R, E, A>(
    that: Lazy<Kind4<F, S, R, E, A>>
  ) => (fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}
```

#### `I` `PipeableCompactable`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableCompactable<F> {
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  readonly separate: <A, B>(
    fa: HKT<F, Either<A, B>>
  ) => Separated<HKT<F, A>, HKT<F, B>>
}
```

#### `I` `PipeableCompactable1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableCompactable1<F extends URIS> {
  readonly compact: <A>(fa: Kind<F, Option<A>>) => Kind<F, A>
  readonly separate: <A, B>(
    fa: Kind<F, Either<A, B>>
  ) => Separated<Kind<F, A>, Kind<F, B>>
}
```

#### `I` `PipeableCompactable2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableCompactable2<F extends URIS2> {
  readonly compact: <E, A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <E, A, B>(
    fa: Kind2<F, E, Either<A, B>>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}
```

#### `I` `PipeableCompactable2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableCompactable2C<F extends URIS2, E> {
  readonly compact: <A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <A, B>(
    fa: Kind2<F, E, Either<A, B>>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}
```

#### `I` `PipeableCompactable3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableCompactable3<F extends URIS3> {
  readonly compact: <R, E, A>(
    fa: Kind3<F, R, E, Option<A>>
  ) => Kind3<F, R, E, A>
  readonly separate: <R, E, A, B>(
    fa: Kind3<F, R, E, Either<A, B>>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}
```

#### `I` `PipeableCompactable3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableCompactable3C<F extends URIS3, E> {
  readonly compact: <R, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, A, B>(
    fa: Kind3<F, R, E, Either<A, B>>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}
```

#### `I` `PipeableCompactable4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableCompactable4<F extends URIS4> {
  readonly compact: <S, R, E, A>(
    fa: Kind4<F, S, R, E, Option<A>>
  ) => Kind4<F, S, R, E, A>
  readonly separate: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, Either<A, B>>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
}
```

#### `I` `PipeableFilterable`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterable<F> extends PipeableCompactable<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => HKT<F, B>
    <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => HKT<F, A>
  }
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => (fa: HKT<F, A>) => HKT<F, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (
      fa: HKT<F, A>
    ) => Separated<HKT<F, A>, HKT<F, B>>
    <A>(predicate: Predicate<A>): (
      fa: HKT<F, A>
    ) => Separated<HKT<F, A>, HKT<F, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: HKT<F, A>) => Separated<HKT<F, B>, HKT<F, C>>
}
```

#### `I` `PipeableFilterable1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterable1<F extends URIS>
  extends PipeableCompactable1<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (
      fa: Kind<F, A>
    ) => Kind<F, B>
    <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Kind<F, A>
  }
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => (fa: Kind<F, A>) => Kind<F, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (
      fa: Kind<F, A>
    ) => Separated<Kind<F, A>, Kind<F, B>>
    <A>(predicate: Predicate<A>): (
      fa: Kind<F, A>
    ) => Separated<Kind<F, A>, Kind<F, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
}
```

#### `I` `PipeableFilterable2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterable2<F extends URIS2>
  extends PipeableCompactable2<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <E>(
      fa: Kind2<F, E, A>
    ) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
  }
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <E>(
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
    <A>(predicate: Predicate<A>): <E>(
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
}
```

#### `I` `PipeableFilterable2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterable2C<F extends URIS2, E>
  extends PipeableCompactable2C<F, E> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (
      fa: Kind2<F, E, A>
    ) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Kind2<F, E, A>
  }
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
    <A>(predicate: Predicate<A>): (
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
}
```

#### `I` `PipeableFilterable3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterable3<F extends URIS3>
  extends PipeableCompactable3<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, B>
    <A>(predicate: Predicate<A>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, A>
  }
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    <A>(predicate: Predicate<A>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
}
```

#### `I` `PipeableFilterable3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableFilterable3C<F extends URIS3, E>
  extends PipeableCompactable3C<F, E> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, B>
    <A>(predicate: Predicate<A>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, A>
  }
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    <A>(predicate: Predicate<A>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
}
```

#### `I` `PipeableFilterable4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterable4<F extends URIS4>
  extends PipeableCompactable4<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Kind4<F, S, R, E, B>
    <A>(predicate: Predicate<A>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Kind4<F, S, R, E, A>
  }
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
    <A>(predicate: Predicate<A>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
}
```

#### `I` `PipeableFilterableWithIndex`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex<F, I>
  extends PipeableFilterable<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: HKT<F, A>
    ) => HKT<F, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (
      fa: HKT<F, A>
    ) => HKT<F, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => (fa: HKT<F, A>) => HKT<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: HKT<F, A>
    ) => Separated<HKT<F, A>, HKT<F, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (
      fa: HKT<F, A>
    ) => Separated<HKT<F, A>, HKT<F, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: HKT<F, A>) => Separated<HKT<F, B>, HKT<F, C>>
}
```

#### `I` `PipeableFilterableWithIndex1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex1<F extends URIS, I>
  extends PipeableFilterable1<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: Kind<F, A>
    ) => Kind<F, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (
      fa: Kind<F, A>
    ) => Kind<F, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => (fa: Kind<F, A>) => Kind<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: Kind<F, A>
    ) => Separated<Kind<F, A>, Kind<F, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (
      fa: Kind<F, A>
    ) => Separated<Kind<F, A>, Kind<F, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
}
```

#### `I` `PipeableFilterableWithIndex2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex2<F extends URIS2, I>
  extends PipeableFilterable2<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <E>(
      fa: Kind2<F, E, A>
    ) => Kind2<F, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <E>(
      fa: Kind2<F, E, A>
    ) => Kind2<F, E, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <E>(
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <E>(
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
}
```

#### `I` `PipeableFilterableWithIndex2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex2C<F extends URIS2, I, E>
  extends PipeableFilterable2C<F, E> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: Kind2<F, E, A>
    ) => Kind2<F, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (
      fa: Kind2<F, E, A>
    ) => Kind2<F, E, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
}
```

#### `I` `PipeableFilterableWithIndex3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex3<F extends URIS3, I>
  extends PipeableFilterable3<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
}
```

#### `I` `PipeableFilterableWithIndex3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableFilterableWithIndex3C<F extends URIS3, I, E>
  extends PipeableFilterable3C<F, E> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <R>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
}
```

#### `I` `PipeableFilterableWithIndex4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex4<F extends URIS4, I>
  extends PipeableFilterable4<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <
      S,
      R,
      E
    >(
      fa: Kind4<F, S, R, E, A>
    ) => Kind4<F, S, R, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Kind4<F, S, R, E, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <
      S,
      R,
      E
    >(
      fa: Kind4<F, S, R, E, A>
    ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
}
```

#### `I` `PipeableProfunctor`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableProfunctor<F> {
  readonly promap: <E, A, D, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => (fbc: HKT2<F, E, A>) => HKT2<F, D, B>
}
```

#### `I` `PipeableProfunctor2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableProfunctor2<F extends URIS2>
  extends PipeableFunctor2<F> {
  readonly promap: <E, A, D, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => (fbc: Kind2<F, E, A>) => Kind2<F, D, B>
}
```

#### `I` `PipeableProfunctor2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableProfunctor2C<F extends URIS2, E>
  extends PipeableFunctor2C<F, E> {
  readonly promap: <A, D, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => (fbc: Kind2<F, E, A>) => Kind2<F, D, B>
}
```

#### `I` `PipeableProfunctor3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableProfunctor3<F extends URIS3>
  extends PipeableFunctor3<F> {
  readonly promap: <R, E, A, D, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => (fbc: Kind3<F, R, E, A>) => Kind3<F, R, D, B>
}
```

#### `I` `PipeableProfunctor3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableProfunctor3C<F extends URIS3, E>
  extends PipeableFunctor3C<F, E> {
  readonly promap: <R, A, D, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => (fbc: Kind3<F, R, E, A>) => Kind3<F, R, D, B>
}
```

#### `I` `PipeableProfunctor4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableProfunctor4<F extends URIS4>
  extends PipeableFunctor4<F> {
  readonly promap: <S, R, E, A, D, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => (fbc: Kind4<F, S, R, E, A>) => Kind4<F, S, R, D, B>
}
```

#### `I` `PipeableSemigroupoid`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid<F> {
  readonly compose: <E, A>(
    la: HKT2<F, E, A>
  ) => <B>(ab: HKT2<F, A, B>) => HKT2<F, E, B>
}
```

#### `I` `PipeableSemigroupoid2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid2<F extends URIS2> {
  readonly compose: <E, A>(
    la: Kind2<F, E, A>
  ) => <B>(ab: Kind2<F, A, B>) => Kind2<F, E, B>
}
```

#### `I` `PipeableSemigroupoid2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid2C<F extends URIS2, E> {
  readonly compose: <A>(
    la: Kind2<F, E, A>
  ) => <B>(ab: Kind2<F, A, B>) => Kind2<F, E, B>
}
```

#### `I` `PipeableSemigroupoid3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid3<F extends URIS3> {
  readonly compose: <R, E, A>(
    la: Kind3<F, R, E, A>
  ) => <B>(ab: Kind3<F, R, A, B>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableSemigroupoid3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableSemigroupoid3C<F extends URIS3, E> {
  readonly compose: <R, A>(
    la: Kind3<F, R, E, A>
  ) => <B>(ab: Kind3<F, R, A, B>) => Kind3<F, R, E, B>
}
```

#### `I` `PipeableSemigroupoid4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid4<F extends URIS4> {
  readonly compose: <S, R, E, A>(
    la: Kind4<F, S, R, E, A>
  ) => <B>(ab: Kind4<F, S, R, A, B>) => Kind4<F, S, R, E, B>
}
```

#### `I` `PipeableMonadThrow`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow<F> {
  readonly fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => HKT<F, A>
  readonly fromEither: <E, A>(ma: Either<E, A>) => HKT<F, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
      a: A
    ) => HKT<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => HKT<F, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
      ma: HKT<F, A>
    ) => HKT<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (
      ma: HKT<F, A>
    ) => HKT<F, A>
  }
}
```

#### `I` `PipeableMonadThrow1`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow1<F extends URIS> {
  readonly fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Kind<F, A>
  readonly fromEither: <E, A>(ma: Either<E, A>) => Kind<F, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
      a: A
    ) => Kind<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind<F, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
      ma: Kind<F, A>
    ) => Kind<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (
      ma: Kind<F, A>
    ) => Kind<F, A>
  }
}
```

#### `I` `PipeableMonadThrow2`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow2<F extends URIS2> {
  readonly fromOption: <E>(
    onNone: Lazy<E>
  ) => <A>(ma: Option<A>) => Kind2<F, E, A>
  readonly fromEither: <E, A>(ma: Either<E, A>) => Kind2<F, E, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
      a: A
    ) => Kind2<F, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (
      a: A
    ) => Kind2<F, E, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
      ma: Kind2<F, E, A>
    ) => Kind2<F, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (
      ma: Kind2<F, E, A>
    ) => Kind2<F, E, A>
  }
}
```

#### `I` `PipeableMonadThrow2C`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow2C<F extends URIS2, E> {
  readonly fromOption: (onNone: Lazy<E>) => <A>(ma: Option<A>) => Kind2<F, E, A>
  readonly fromEither: <A>(ma: Either<E, A>) => Kind2<F, E, A>
  readonly fromPredicate: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
      a: A
    ) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
  }
  readonly filterOrElse: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
      ma: Kind2<F, E, A>
    ) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (
      ma: Kind2<F, E, A>
    ) => Kind2<F, E, A>
  }
}
```

#### `I` `PipeableMonadThrow3`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow3<F extends URIS3> {
  readonly fromOption: <E>(
    onNone: Lazy<E>
  ) => <R, A>(ma: Option<A>) => Kind3<F, R, E, A>
  readonly fromEither: <R, E, A>(ma: Either<E, A>) => Kind3<F, R, E, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <
      U
    >(
      a: A
    ) => Kind3<F, U, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(
      a: A
    ) => Kind3<F, R, E, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <
      R
    >(
      ma: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(
      ma: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, A>
  }
}
```

#### `I` `PipeableMonadThrow3C`

```ts
/**
 * @since 2.2.0
 */
export interface PipeableMonadThrow3C<F extends URIS3, E> {
  readonly fromOption: (
    onNone: Lazy<E>
  ) => <R, A>(ma: Option<A>) => Kind3<F, R, E, A>
  readonly fromEither: <R, A>(ma: Either<E, A>) => Kind3<F, R, E, A>
  readonly fromPredicate: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(
      a: A
    ) => Kind3<F, U, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(
      a: A
    ) => Kind3<F, R, E, A>
  }
  readonly filterOrElse: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
      ma: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(
      ma: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, A>
  }
}
```

#### `I` `PipeableMonadThrow4`

```ts
/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow4<F extends URIS4> {
  readonly fromOption: <E>(
    onNone: Lazy<E>
  ) => <S, R, A>(ma: Option<A>) => Kind4<F, S, R, E, A>
  readonly fromEither: <S, R, E, A>(ma: Either<E, A>) => Kind4<F, S, R, E, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <
      S,
      R
    >(
      a: A
    ) => Kind4<F, S, R, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
      a: A
    ) => Kind4<F, S, R, E, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <
      S,
      R
    >(
      ma: Kind4<F, S, R, E, A>
    ) => Kind4<F, S, R, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
      ma: Kind4<F, S, R, E, A>
    ) => Kind4<F, S, R, E, A>
  }
}
```

#### `I` `Profunctor`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor<F> {
  readonly URI: F
  readonly map: <E, A, B>(fa: HKT2<F, E, A>, f: (a: A) => B) => HKT<F, B>
  readonly promap: <E, A, D, B>(
    fea: HKT2<F, E, A>,
    f: (d: D) => E,
    g: (a: A) => B
  ) => HKT2<F, D, B>
}
```

#### `I` `Profunctor2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor2<F extends URIS2> extends Functor2<F> {
  readonly promap: <E, A, D, B>(
    fea: Kind2<F, E, A>,
    f: (d: D) => E,
    g: (a: A) => B
  ) => Kind2<F, D, B>
}
```

#### `I` `Profunctor2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly promap: <A, D, B>(
    fea: Kind2<F, E, A>,
    f: (d: D) => E,
    g: (a: A) => B
  ) => Kind2<F, D, B>
}
```

#### `I` `Profunctor3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor3<F extends URIS3> extends Functor3<F> {
  readonly promap: <R, E, A, D, B>(
    fea: Kind3<F, R, E, A>,
    f: (d: D) => E,
    g: (a: A) => B
  ) => Kind3<F, R, D, B>
}
```

#### `I` `Profunctor3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Profunctor3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly promap: <R, A, D, B>(
    fea: Kind3<F, R, E, A>,
    f: (d: D) => E,
    g: (a: A) => B
  ) => Kind3<F, R, D, B>
}
```

#### `I` `Profunctor4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor4<F extends URIS4> extends Functor4<F> {
  readonly promap: <S, R, E, A, D, B>(
    fea: Kind4<F, S, R, E, A>,
    f: (d: D) => E,
    g: (a: A) => B
  ) => Kind4<F, S, R, D, B>
}
```

#### `F` `No Render Found`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Reader<R, A> {
  (r: R): A
}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}
```

#### `F` `No Render Found`

```ts
// TODO: remove module in v3

/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderT<M, R, A> {
  (r: R): HKT<M, A>
}
```

#### `I` `ReaderM`

```ts
/**
 * @since 2.0.0
 */
export interface ReaderM<M> {
  readonly map: <R, A, B>(
    ma: ReaderT<M, R, A>,
    f: (a: A) => B
  ) => ReaderT<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT<M, R, A>
  readonly ap: <R, A, B>(
    mab: ReaderT<M, R, (a: A) => B>,
    ma: ReaderT<M, R, A>
  ) => ReaderT<M, R, B>
  readonly chain: <R, A, B>(
    ma: ReaderT<M, R, A>,
    f: (a: A) => ReaderT<M, R, B>
  ) => ReaderT<M, R, B>
  readonly ask: <R>() => ReaderT<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT<M, R, A>
  readonly local: <R, A, Q>(
    ma: ReaderT<M, R, A>,
    f: (d: Q) => R
  ) => ReaderT<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT<M, R, A>
  readonly fromM: <R, A>(ma: HKT<M, A>) => ReaderT<M, R, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderT1<M extends URIS, R, A> {
  (r: R): Kind<M, A>
}
```

#### `I` `ReaderM1`

```ts
/**
 * @since 2.0.0
 */
export interface ReaderM1<M extends URIS> {
  readonly map: <R, A, B>(
    ma: ReaderT1<M, R, A>,
    f: (a: A) => B
  ) => ReaderT1<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT1<M, R, A>
  readonly ap: <R, A, B>(
    mab: ReaderT1<M, R, (a: A) => B>,
    ma: ReaderT1<M, R, A>
  ) => ReaderT1<M, R, B>
  readonly chain: <R, A, B>(
    ma: ReaderT1<M, R, A>,
    f: (a: A) => ReaderT1<M, R, B>
  ) => ReaderT1<M, R, B>
  readonly ask: <R>() => ReaderT1<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT1<M, R, A>
  readonly local: <R, A, Q>(
    ma: ReaderT1<M, R, A>,
    f: (d: Q) => R
  ) => ReaderT1<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT1<M, R, A>
  readonly fromM: <R, A>(ma: Kind<M, A>) => ReaderT1<M, R, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderT2<M extends URIS2, R, E, A> {
  (r: R): Kind2<M, E, A>
}
```

#### `I` `ReaderM2`

```ts
/**
 * @since 2.0.0
 */
export interface ReaderM2<M extends URIS2> {
  readonly map: <R, E, A, B>(
    ma: ReaderT2<M, R, E, A>,
    f: (a: A) => B
  ) => ReaderT2<M, R, E, B>
  readonly of: <R, E, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, E, A, B>(
    mab: ReaderT2<M, R, E, (a: A) => B>,
    ma: ReaderT2<M, R, E, A>
  ) => ReaderT2<M, R, E, B>
  readonly chain: <R, E, A, B>(
    ma: ReaderT2<M, R, E, A>,
    f: (a: A) => ReaderT2<M, R, E, B>
  ) => ReaderT2<M, R, E, B>
  readonly ask: <R, E>() => ReaderT2<M, R, E, R>
  readonly asks: <R, E, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <R, E, A, Q>(
    ma: ReaderT2<M, R, E, A>,
    f: (d: Q) => R
  ) => ReaderT2<M, Q, E, A>
  readonly fromReader: <R, E, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, E, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}
```

#### `I` `ReaderM2C`

```ts
/**
 * @since 2.2.0
 */
export interface ReaderM2C<M extends URIS2, E> {
  readonly map: <R, A, B>(
    ma: ReaderT2<M, R, E, A>,
    f: (a: A) => B
  ) => ReaderT2<M, R, E, B>
  readonly of: <R, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, A, B>(
    mab: ReaderT2<M, R, E, (a: A) => B>,
    ma: ReaderT2<M, R, E, A>
  ) => ReaderT2<M, R, E, B>
  readonly chain: <R, A, B>(
    ma: ReaderT2<M, R, E, A>,
    f: (a: A) => ReaderT2<M, R, E, B>
  ) => ReaderT2<M, R, E, B>
  readonly ask: <R>() => ReaderT2<M, R, E, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <R, A, Q>(
    ma: ReaderT2<M, R, E, A>,
    f: (d: Q) => R
  ) => ReaderT2<M, Q, E, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface ReaderT3<M extends URIS3, R, U, E, A> {
  (r: R): Kind3<M, U, E, A>
}
```

#### `I` `ReaderM3`

```ts
/**
 * @since 2.0.0
 */
export interface ReaderM3<M extends URIS3> {
  readonly map: <R, U, E, A, B>(
    ma: ReaderT3<M, R, U, E, A>,
    f: (a: A) => B
  ) => ReaderT3<M, R, U, E, B>
  readonly of: <R, U, E, A>(a: A) => ReaderT3<M, R, U, E, A>
  readonly ap: <R, U, E, A, B>(
    mab: ReaderT3<M, R, U, E, (a: A) => B>,
    ma: ReaderT3<M, R, U, E, A>
  ) => ReaderT3<M, R, U, E, B>
  readonly chain: <R, U, E, A, B>(
    ma: ReaderT3<M, R, U, E, A>,
    f: (a: A) => ReaderT3<M, R, U, E, B>
  ) => ReaderT3<M, R, U, E, B>
  readonly ask: <R, U, E>() => ReaderT3<M, R, U, E, R>
  readonly asks: <R, U, E, A>(f: (r: R) => A) => ReaderT3<M, R, U, E, A>
  readonly local: <R, U, E, A, Q>(
    ma: ReaderT3<M, R, U, E, A>,
    f: (d: Q) => R
  ) => ReaderT3<M, Q, U, E, A>
  readonly fromReader: <R, U, E, A>(ma: Reader<R, A>) => ReaderT3<M, R, U, E, A>
  readonly fromM: <R, U, E, A>(ma: Kind3<M, U, E, A>) => ReaderT3<M, R, U, E, A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}
```

#### `I` `Spanned`

```ts
/**
 * @since 2.5.0
 */
export interface Spanned<I, R> {
  readonly init: ReadonlyArray<I>
  readonly rest: ReadonlyArray<R>
}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.3.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
```

#### `I` `Ring`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}
```

#### `I` `Semigroup`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroup<A> extends Magma<A> {}
```

#### `I` `Semigroupoid`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid<F> {
  readonly URI: F
  readonly compose: <A, B, C>(
    bc: HKT2<F, B, C>,
    ab: HKT2<F, A, B>
  ) => HKT2<F, A, C>
}
```

#### `I` `Semigroupoid2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  readonly compose: <A, B, C>(
    ab: Kind2<F, B, C>,
    la: Kind2<F, A, B>
  ) => Kind2<F, A, C>
}
```

#### `I` `Semigroupoid2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid2C<F extends URIS2, A> {
  readonly URI: F
  readonly _E: A
  readonly compose: <B, C>(
    ab: Kind2<F, B, C>,
    la: Kind2<F, A, B>
  ) => Kind2<F, A, C>
}
```

#### `I` `Semigroupoid3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  readonly compose: <R, A, B, C>(
    ab: Kind3<F, R, B, C>,
    la: Kind3<F, R, A, B>
  ) => Kind3<F, R, A, C>
}
```

#### `I` `Semigroupoid3C`

```ts
/**
 * @category type classes
 * @since 2.2.0
 */
export interface Semigroupoid3C<F extends URIS3, A> {
  readonly URI: F
  readonly _E: A
  readonly compose: <R, B, C>(
    ab: Kind3<F, R, B, C>,
    la: Kind3<F, R, A, B>
  ) => Kind3<F, R, A, C>
}
```

#### `I` `Semigroupoid4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid4<F extends URIS4> {
  readonly URI: F
  readonly compose: <S, R, A, B, C>(
    ab: Kind4<F, S, R, B, C>,
    la: Kind4<F, S, R, A, B>
  ) => Kind4<F, S, R, A, C>
}
```

#### `I` `Semiring`

```ts
/**
 * The `Semiring` class is for types that support an addition and multiplication operation.
 *
 * Instances must satisfy the following laws:
 *
 * - Commutative monoid under addition:
 *   - Associativity: `(a + b) + c <-> a + (b + c)`
 *   - Identity: `zero + a = a + zero <-> a`
 *   - Commutative: `a + b <-> b + a`
 * - Monoid under multiplication:
 *   - Associativity: `(a * b) * c <-> a * (b * c)`
 *   - Identity: `one * a <-> a * one <-> a`
 * - Multiplication distributes over addition:
 *   - Left distributivity: `a * (b + c) <-> (a * b) + (a * c)`
 *   - Right distributivity: `(a + b) * c <-> (a * c) + (b * c)`
 * - Annihilation: `zero * a <-> a * zero <-> zero`
 *
 * **Note:** The `number` type is not fully law abiding members of this class hierarchy due to the potential
 * for arithmetic overflows, and the presence of `NaN` and `Infinity` values. The behaviour is
 * unspecified in these cases.
 *
 * @since 2.0.0
 */

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semiring<A> {
  readonly add: (x: A, y: A) => A
  readonly zero: A
  readonly mul: (x: A, y: A) => A
  readonly one: A
}
```

#### `I` `Eq`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

#### `I` `Show`

```ts
/**
 * The `Show` type class represents those types which can be converted into
 * a human-readable `string` representation.
 *
 * While not required, it is recommended that for any expression `x`, the
 * string `show(x)` be executable TypeScript code which evaluates to the same
 * value as the expression `x`.
 *
 * @category type classes
 * @since 2.0.0
 */
export interface Show<A> {
  readonly show: (a: A) => string
}
```

#### `F` `No Render Found`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/* tslint:disable:readonly-array */
/**
 * @category model
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}
```

#### `F` `No Render Found`

```ts
/* tslint:disable:readonly-array */
/**
 * @category model
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}
```

#### `F` `No Render Found`

```ts
// TODO: remove module in v3

/* tslint:disable:readonly-array */
/**
 * @category model
 * @since 2.0.0
 */
export interface StateT<M, S, A> {
  (s: S): HKT<M, [A, S]>
}
```

#### `I` `StateM`

```ts
/* tslint:enable:readonly-array */

/**
 * @since 2.0.0
 */
export interface StateM<M> {
  readonly map: <S, A, B>(
    fa: StateT<M, S, A>,
    f: (a: A) => B
  ) => StateT<M, S, B>
  readonly of: <S, A>(a: A) => StateT<M, S, A>
  readonly ap: <S, A, B>(
    fab: StateT<M, S, (a: A) => B>,
    fa: StateT<M, S, A>
  ) => StateT<M, S, B>
  readonly chain: <S, A, B>(
    fa: StateT<M, S, A>,
    f: (a: A) => StateT<M, S, B>
  ) => StateT<M, S, B>
  readonly get: <S>() => StateT<M, S, S>
  readonly put: <S>(s: S) => StateT<M, S, void>
  readonly modify: <S>(f: (s: S) => S) => StateT<M, S, void>
  readonly gets: <S, A>(f: (s: S) => A) => StateT<M, S, A>
  readonly fromState: <S, A>(fa: State<S, A>) => StateT<M, S, A>
  readonly fromM: <S, A>(ma: HKT<M, A>) => StateT<M, S, A>
  readonly evalState: <S, A>(ma: StateT<M, S, A>, s: S) => HKT<M, A>
  readonly execState: <S, A>(ma: StateT<M, S, A>, s: S) => HKT<M, S>
}
```

#### `F` `No Render Found`

```ts
/* tslint:disable:readonly-array */
/**
 * @category model
 * @since 2.0.0
 */
export interface StateT1<M extends URIS, S, A> {
  (s: S): Kind<M, [A, S]>
}
```

#### `I` `StateM1`

```ts
/* tslint:enable:readonly-array */

/**
 * @since 2.0.0
 */
export interface StateM1<M extends URIS> {
  readonly map: <S, A, B>(
    fa: StateT1<M, S, A>,
    f: (a: A) => B
  ) => StateT1<M, S, B>
  readonly of: <S, A>(a: A) => StateT1<M, S, A>
  readonly ap: <S, A, B>(
    fab: StateT1<M, S, (a: A) => B>,
    fa: StateT1<M, S, A>
  ) => StateT1<M, S, B>
  readonly chain: <S, A, B>(
    fa: StateT1<M, S, A>,
    f: (a: A) => StateT1<M, S, B>
  ) => StateT1<M, S, B>
  readonly get: <S>() => StateT1<M, S, S>
  readonly put: <S>(s: S) => StateT1<M, S, void>
  readonly modify: <S>(f: (s: S) => S) => StateT1<M, S, void>
  readonly gets: <S, A>(f: (s: S) => A) => StateT1<M, S, A>
  readonly fromState: <S, A>(fa: State<S, A>) => StateT1<M, S, A>
  readonly fromM: <S, A>(ma: Kind<M, A>) => StateT1<M, S, A>
  readonly evalState: <S, A>(ma: StateT1<M, S, A>, s: S) => Kind<M, A>
  readonly execState: <S, A>(ma: StateT1<M, S, A>, s: S) => Kind<M, S>
}
```

#### `F` `No Render Found`

```ts
/* tslint:disable:readonly-array */
/**
 * @category model
 * @since 2.0.0
 */
export interface StateT2<M extends URIS2, S, E, A> {
  (s: S): Kind2<M, E, [A, S]>
}
```

#### `I` `StateM2`

```ts
/* tslint:enable:readonly-array */

/**
 * @since 2.0.0
 */
export interface StateM2<M extends URIS2> {
  readonly map: <S, E, A, B>(
    fa: StateT2<M, S, E, A>,
    f: (a: A) => B
  ) => StateT2<M, S, E, B>
  readonly of: <S, E, A>(a: A) => StateT2<M, S, E, A>
  readonly ap: <S, E, A, B>(
    fab: StateT2<M, S, E, (a: A) => B>,
    fa: StateT2<M, S, E, A>
  ) => StateT2<M, S, E, B>
  readonly chain: <S, E, A, B>(
    fa: StateT2<M, S, E, A>,
    f: (a: A) => StateT2<M, S, E, B>
  ) => StateT2<M, S, E, B>
  readonly get: <E, S>() => StateT2<M, S, E, S>
  readonly put: <E, S>(s: S) => StateT2<M, S, E, void>
  readonly modify: <E, S>(f: (s: S) => S) => StateT2<M, S, E, void>
  readonly gets: <S, E, A>(f: (s: S) => A) => StateT2<M, S, E, A>
  readonly fromState: <S, E, A>(fa: State<S, A>) => StateT2<M, S, E, A>
  readonly fromM: <S, E, A>(ma: Kind2<M, E, A>) => StateT2<M, S, E, A>
  readonly evalState: <S, E, A>(ma: StateT2<M, S, E, A>, s: S) => Kind2<M, E, A>
  readonly execState: <S, E, A>(ma: StateT2<M, S, E, A>, s: S) => Kind2<M, E, S>
}
```

#### `I` `StateM2C`

```ts
/**
 * @since 2.5.4
 */
export interface StateM2C<M extends URIS2, E> {
  readonly map: <S, A, B>(
    fa: StateT2<M, S, E, A>,
    f: (a: A) => B
  ) => StateT2<M, S, E, B>
  readonly of: <S, A>(a: A) => StateT2<M, S, E, A>
  readonly ap: <S, A, B>(
    fab: StateT2<M, S, E, (a: A) => B>,
    fa: StateT2<M, S, E, A>
  ) => StateT2<M, S, E, B>
  readonly chain: <S, A, B>(
    fa: StateT2<M, S, E, A>,
    f: (a: A) => StateT2<M, S, E, B>
  ) => StateT2<M, S, E, B>
  readonly get: <S>() => StateT2<M, S, E, S>
  readonly put: <S>(s: S) => StateT2<M, S, E, void>
  readonly modify: <S>(f: (s: S) => S) => StateT2<M, S, E, void>
  readonly gets: <S, A>(f: (s: S) => A) => StateT2<M, S, E, A>
  readonly fromState: <S, A>(fa: State<S, A>) => StateT2<M, S, E, A>
  readonly fromM: <S, A>(ma: Kind2<M, E, A>) => StateT2<M, S, E, A>
  readonly evalState: <S, A>(ma: StateT2<M, S, E, A>, s: S) => Kind2<M, E, A>
  readonly execState: <S, A>(ma: StateT2<M, S, E, A>, s: S) => Kind2<M, E, S>
}
```

#### `F` `No Render Found`

```ts
/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export interface StateT3<M extends URIS3, S, R, E, A> {
  (s: S): Kind3<M, R, E, [A, S]>
}
```

#### `I` `StateM3`

```ts
/* tslint:enable:readonly-array */

/**
 * @since 2.0.0
 */
export interface StateM3<M extends URIS3> {
  readonly map: <S, R, E, A, B>(
    fa: StateT3<M, S, R, E, A>,
    f: (a: A) => B
  ) => StateT3<M, S, R, E, B>
  readonly of: <S, R, E, A>(a: A) => StateT3<M, S, R, E, A>
  readonly ap: <S, R, E, A, B>(
    fab: StateT3<M, S, R, E, (a: A) => B>,
    fa: StateT3<M, S, R, E, A>
  ) => StateT3<M, S, R, E, B>
  readonly chain: <S, R, E, A, B>(
    fa: StateT3<M, S, R, E, A>,
    f: (a: A) => StateT3<M, S, R, E, B>
  ) => StateT3<M, S, R, E, B>
  readonly get: <R, E, S>() => StateT3<M, S, R, E, S>
  readonly put: <R, E, S>(s: S) => StateT3<M, S, R, E, void>
  readonly modify: <R, E, S>(f: (s: S) => S) => StateT3<M, S, R, E, void>
  readonly gets: <S, R, E, A>(f: (s: S) => A) => StateT3<M, S, R, E, A>
  readonly fromState: <S, R, E, A>(fa: State<S, A>) => StateT3<M, S, R, E, A>
  readonly fromM: <S, R, E, A>(ma: Kind3<M, R, E, A>) => StateT3<M, S, R, E, A>
  readonly evalState: <S, R, E, A>(
    ma: StateT3<M, S, R, E, A>,
    s: S
  ) => Kind3<M, R, E, A>
  readonly execState: <S, R, E, A>(
    ma: StateT3<M, S, R, E, A>,
    s: S
  ) => Kind3<M, R, E, S>
}
```

#### `I` `StateM3C`

```ts
/**
 * @since 2.5.4
 */
export interface StateM3C<M extends URIS3, E> {
  readonly map: <S, R, A, B>(
    fa: StateT3<M, S, R, E, A>,
    f: (a: A) => B
  ) => StateT3<M, S, R, E, B>
  readonly of: <S, R, A>(a: A) => StateT3<M, S, R, E, A>
  readonly ap: <S, R, A, B>(
    fab: StateT3<M, S, R, E, (a: A) => B>,
    fa: StateT3<M, S, R, E, A>
  ) => StateT3<M, S, R, E, B>
  readonly chain: <S, R, A, B>(
    fa: StateT3<M, S, R, E, A>,
    f: (a: A) => StateT3<M, S, R, E, B>
  ) => StateT3<M, S, R, E, B>
  readonly get: <R, S>() => StateT3<M, S, R, E, S>
  readonly put: <R, S>(s: S) => StateT3<M, S, R, E, void>
  readonly modify: <R, S>(f: (s: S) => S) => StateT3<M, S, R, E, void>
  readonly gets: <S, R, A>(f: (s: S) => A) => StateT3<M, S, R, E, A>
  readonly fromState: <S, R, A>(fa: State<S, A>) => StateT3<M, S, R, E, A>
  readonly fromM: <S, R, A>(ma: Kind3<M, R, E, A>) => StateT3<M, S, R, E, A>
  readonly evalState: <S, R, A>(
    ma: StateT3<M, S, R, E, A>,
    s: S
  ) => Kind3<M, R, E, A>
  readonly execState: <S, R, A>(
    ma: StateT3<M, S, R, E, A>,
    s: S
  ) => Kind3<M, R, E, S>
}
```

#### `I` `Store`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Store<S, A> {
  readonly peek: (s: S) => A
  readonly pos: S
}
```

#### `I` `Strong`

```ts
/* tslint:disable:readonly-array */

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Strong<F> extends Profunctor<F> {
  readonly first: <A, B, C>(pab: HKT2<F, A, B>) => HKT2<F, [A, C], [B, C]>
  readonly second: <A, B, C>(pab: HKT2<F, B, C>) => HKT2<F, [A, B], [A, C]>
}
```

#### `I` `Strong2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Strong2<F extends URIS2> extends Profunctor2<F> {
  readonly first: <A, B, C>(pab: Kind2<F, A, B>) => Kind2<F, [A, C], [B, C]>
  readonly second: <A, B, C>(pab: Kind2<F, B, C>) => Kind2<F, [A, B], [A, C]>
}
```

#### `I` `Strong3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Strong3<F extends URIS3> extends Profunctor3<F> {
  readonly first: <R, A, B, C>(
    pab: Kind3<F, R, A, B>
  ) => Kind3<F, R, [A, C], [B, C]>
  readonly second: <R, A, B, C>(
    pab: Kind3<F, R, B, C>
  ) => Kind3<F, R, [A, B], [A, C]>
}
```

#### `I` `Strong4`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Strong4<F extends URIS4> extends Profunctor4<F> {
  readonly first: <S, R, A, B, C>(
    pab: Kind4<F, S, R, A, B>
  ) => Kind4<F, S, R, [A, C], [B, C]>
  readonly second: <S, R, A, B, C>(
    pab: Kind4<F, S, R, B, C>
  ) => Kind4<F, S, R, [A, B], [A, C]>
}
```

#### `F` `No Render Found`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Task<A> {
  (): Promise<A>
}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.0.0
 */
export interface TaskEither<E, A> extends Task<Either<E, A>> {}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.4.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}
```

#### `I` `Both`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly left: E
  readonly right: A
}
```

#### `I` `TheseT`

```ts
// TODO: remove module in v3

/**
 * @category model
 * @since 2.4.0
 */
export interface TheseT<M, E, A> extends HKT<M, These<E, A>> {}
```

#### `I` `TheseM`

```ts
/**
 * @since 2.4.0
 */
export interface TheseM<M> {
  readonly map: <E, A, B>(
    fa: TheseT<M, E, A>,
    f: (a: A) => B
  ) => TheseT<M, E, B>
  readonly bimap: <E, A, N, B>(
    fa: TheseT<M, E, A>,
    f: (e: E) => N,
    g: (a: A) => B
  ) => TheseT<M, N, B>
  readonly mapLeft: <E, A, N>(
    fa: TheseT<M, E, A>,
    f: (e: E) => N
  ) => TheseT<M, N, A>
  readonly fold: <E, A, R>(
    fa: TheseT<M, E, A>,
    onLeft: (e: E) => HKT<M, R>,
    onRight: (a: A) => HKT<M, R>,
    onBoth: (e: E, a: A) => HKT<M, R>
  ) => HKT<M, R>
  readonly swap: <E, A>(fa: TheseT<M, E, A>) => TheseT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => TheseT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => TheseT<M, E, A>
  readonly left: <E, A>(e: E) => TheseT<M, E, A>
  readonly right: <E, A>(a: A) => TheseT<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(fa: TheseT<M, E, A>, e: E, a: A) => HKT<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(ma: TheseT<M, E, A>, f: (a: A) => B) => TheseT<M, E, B>
    readonly of: <A>(a: A) => TheseT<M, E, A>
    readonly ap: <A, B>(
      mab: TheseT<M, E, (a: A) => B>,
      ma: TheseT<M, E, A>
    ) => TheseT<M, E, B>
    readonly chain: <A, B>(
      ma: TheseT<M, E, A>,
      f: (a: A) => TheseT<M, E, B>
    ) => TheseT<M, E, B>
  }
}
```

#### `I` `TheseM1`

```ts
/**
 * @since 2.4.0
 */
export interface TheseM1<M extends URIS> {
  readonly map: <E, A, B>(
    fa: TheseT1<M, E, A>,
    f: (a: A) => B
  ) => TheseT1<M, E, B>
  readonly bimap: <E, A, N, B>(
    fa: TheseT1<M, E, A>,
    f: (e: E) => N,
    g: (a: A) => B
  ) => TheseT1<M, N, B>
  readonly mapLeft: <E, A, N>(
    fa: TheseT1<M, E, A>,
    f: (e: E) => N
  ) => TheseT1<M, N, A>
  readonly fold: <E, A, R>(
    fa: TheseT1<M, E, A>,
    onLeft: (e: E) => Kind<M, R>,
    onRight: (a: A) => Kind<M, R>,
    onBoth: (e: E, a: A) => Kind<M, R>
  ) => Kind<M, R>
  readonly swap: <E, A>(fa: TheseT1<M, E, A>) => TheseT1<M, A, E>
  readonly rightM: <E, A>(ma: Kind<M, A>) => TheseT1<M, E, A>
  readonly leftM: <E, A>(me: Kind<M, E>) => TheseT1<M, E, A>
  readonly left: <E, A>(e: E) => TheseT1<M, E, A>
  readonly right: <E, A>(a: A) => TheseT1<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT1<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(fa: TheseT1<M, E, A>, e: E, a: A) => Kind<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(
      ma: TheseT1<M, E, A>,
      f: (a: A) => B
    ) => TheseT1<M, E, B>
    readonly of: <A>(a: A) => TheseT1<M, E, A>
    readonly ap: <A, B>(
      mab: TheseT1<M, E, (a: A) => B>,
      ma: TheseT1<M, E, A>
    ) => TheseT1<M, E, B>
    readonly chain: <A, B>(
      ma: TheseT1<M, E, A>,
      f: (a: A) => TheseT1<M, E, B>
    ) => TheseT1<M, E, B>
  }
}
```

#### `I` `TheseM2`

```ts
/**
 * @since 2.4.0
 */
export interface TheseM2<M extends URIS2> {
  readonly map: <R, E, A, B>(
    fa: TheseT2<M, R, E, A>,
    f: (a: A) => B
  ) => TheseT2<M, R, E, B>
  readonly bimap: <R, E, A, N, B>(
    fa: TheseT2<M, R, E, A>,
    f: (e: E) => N,
    g: (a: A) => B
  ) => TheseT2<M, R, N, B>
  readonly mapLeft: <R, E, A, N>(
    fa: TheseT2<M, R, E, A>,
    f: (e: E) => N
  ) => TheseT2<M, R, N, A>
  readonly fold: <R, E, A, B>(
    fa: TheseT2<M, R, E, A>,
    onLeft: (e: E) => Kind2<M, R, B>,
    onRight: (a: A) => Kind2<M, R, B>,
    onBoth: (e: E, a: A) => Kind2<M, R, B>
  ) => Kind2<M, R, B>
  readonly swap: <R, E, A>(fa: TheseT2<M, R, E, A>) => TheseT2<M, R, A, E>
  readonly rightM: <R, E, A>(ma: Kind2<M, R, A>) => TheseT2<M, R, E, A>
  readonly leftM: <R, E, A>(me: Kind2<M, R, E>) => TheseT2<M, R, E, A>
  readonly left: <R, E, A>(e: E) => TheseT2<M, R, E, A>
  readonly right: <R, E, A>(a: A) => TheseT2<M, R, E, A>
  readonly both: <R, E, A>(e: E, a: A) => TheseT2<M, R, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <R, E, A>(
    fa: TheseT2<M, R, E, A>,
    e: E,
    a: A
  ) => Kind2<M, R, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <R, A, B>(
      ma: TheseT2<M, R, E, A>,
      f: (a: A) => B
    ) => TheseT2<M, R, E, B>
    readonly of: <R, A>(a: A) => TheseT2<M, R, E, A>
    readonly ap: <R, A, B>(
      mab: TheseT2<M, R, E, (a: A) => B>,
      ma: TheseT2<M, R, E, A>
    ) => TheseT2<M, R, E, B>
    readonly chain: <R, A, B>(
      ma: TheseT2<M, R, E, A>,
      f: (a: A) => TheseT2<M, R, E, B>
    ) => TheseT2<M, R, E, B>
  }
}
```

#### `F` `No Render Found`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Traced<P, A> {
  (p: P): A
}
```

#### `I` `Traversable`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
  readonly sequence: Sequence<T>
}
```

#### `I` `Traversable1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Traversable1<T extends URIS>
  extends Functor1<T>,
    Foldable1<T> {
  readonly traverse: Traverse1<T>
  readonly sequence: Sequence1<T>
}
```

#### `I` `Traversable2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Traversable2<T extends URIS2>
  extends Functor2<T>,
    Foldable2<T> {
  readonly traverse: Traverse2<T>
  readonly sequence: Sequence2<T>
}
```

#### `I` `Traversable2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Traversable2C<T extends URIS2, TL>
  extends Functor2C<T, TL>,
    Foldable2C<T, TL> {
  readonly traverse: Traverse2C<T, TL>
  readonly sequence: Sequence2C<T, TL>
}
```

#### `I` `Traversable3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Traversable3<T extends URIS3>
  extends Functor3<T>,
    Foldable3<T> {
  readonly traverse: Traverse3<T>
  readonly sequence: Sequence3<T>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Traverse<T> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: HKT<T, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: HKT<T, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: HKT<T, A>,
    f: (a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, HKT<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Kind<F, B>
  ) => Kind<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(
    ta: HKT<T, A>,
    f: (a: A) => HKT<F, B>
  ) => HKT<F, HKT<T, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Traverse1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: Kind<T, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: Kind<T, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: Kind<T, A>,
    f: (a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: Kind<T, A>,
    f: (a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Kind<T, A>,
    f: (a: A) => Kind<F, B>
  ) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(
    ta: Kind<T, A>,
    f: (a: A) => HKT<F, B>
  ) => HKT<F, Kind<T, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Traverse2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TE, A, R, FE, B>(
    ta: Kind2<T, TE, A>,
    f: (a: A) => Kind3<F, R, FE, B>
  ) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <TE, A, FE, B>(
    ta: Kind2<T, TE, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <TE, A, B>(
    ta: Kind2<T, TE, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <E, A, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => Kind<F, B>
  ) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <E, A, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => HKT<F, B>
  ) => HKT<F, Kind2<T, E, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Traverse2C<T extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => Kind3<F, R, FE, B>
  ) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => Kind<F, B>
  ) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => HKT<F, B>
  ) => HKT<F, Kind2<T, E, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Traverse3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TR, TE, A, FR, FE, B>(
    ta: Kind3<T, TR, TE, A>,
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => Kind3<F, FR, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <TR, A, TE, FE, B>(
    ta: Kind3<T, TR, TE, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <R, TE, A, B>(
    ta: Kind3<T, R, TE, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind3<T, R, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <R, E, A, B>(
    ta: Kind3<T, R, E, A>,
    f: (a: A) => Kind<F, B>
  ) => Kind<F, Kind3<T, R, E, B>>
  <F>(F: Applicative<F>): <R, E, A, B>(
    ta: Kind3<T, R, E, A>,
    f: (a: A) => HKT<F, B>
  ) => HKT<F, Kind3<T, R, E, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Sequence<T> {
  <F extends URIS3>(F: Applicative3<F>): <R, E, A>(
    ta: HKT<T, Kind3<F, R, E, A>>
  ) => Kind3<F, R, E, HKT<T, A>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <R, A>(
    ta: HKT<T, Kind3<F, R, E, A>>
  ) => Kind3<F, R, E, HKT<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <E, A>(
    ta: HKT<T, Kind2<F, E, A>>
  ) => Kind2<F, E, HKT<T, A>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A>(
    ta: HKT<T, Kind2<F, E, A>>
  ) => Kind2<F, E, HKT<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(
    ta: HKT<T, Kind<F, A>>
  ) => Kind<F, HKT<T, A>>
  <F>(F: Applicative<F>): <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Sequence1<T extends URIS> {
  <F extends URIS4>(F: Applicative4<F>): <S, R, E, A>(
    ta: Kind<T, Kind4<F, S, R, E, A>>
  ) => Kind4<F, S, R, E, Kind<T, A>>
  <F extends URIS3>(F: Applicative3<F>): <R, E, A>(
    ta: Kind<T, Kind3<F, R, E, A>>
  ) => Kind3<F, R, E, Kind<T, A>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <R, A>(
    ta: Kind<T, Kind3<F, R, E, A>>
  ) => Kind3<F, R, E, Kind<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <E, A>(
    ta: Kind<T, Kind2<F, E, A>>
  ) => Kind2<F, E, Kind<T, A>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A>(
    ta: Kind<T, Kind2<F, E, A>>
  ) => Kind2<F, E, Kind<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(
    ta: Kind<T, Kind<F, A>>
  ) => Kind<F, Kind<T, A>>
  <F>(F: Applicative<F>): <A>(ta: Kind<T, HKT<F, A>>) => HKT<F, Kind<T, A>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Sequence2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TE, R, FE, A>(
    ta: Kind2<T, TE, Kind3<F, R, FE, A>>
  ) => Kind3<F, R, FE, Kind2<T, TE, A>>
  <F extends URIS2>(F: Applicative2<F>): <TE, FE, A>(
    ta: Kind2<T, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind2<T, TE, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <TE, A>(
    ta: Kind2<T, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind2<T, TE, A>>
  <F extends URIS>(F: Applicative1<F>): <E, A>(
    ta: Kind2<T, E, Kind<F, A>>
  ) => Kind<F, Kind2<T, E, A>>
  <F>(F: Applicative<F>): <E, A>(
    ta: Kind2<T, E, HKT<F, A>>
  ) => HKT<F, Kind2<T, E, A>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Sequence2C<T extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <R, FE, A>(
    ta: Kind2<T, E, Kind3<F, R, FE, A>>
  ) => Kind3<F, R, FE, Kind2<T, E, A>>
  <F extends URIS2>(F: Applicative2<F>): <FE, A>(
    ta: Kind2<T, E, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind2<T, E, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A>(
    ta: Kind2<T, E, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind2<T, E, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(
    ta: Kind2<T, E, Kind<F, A>>
  ) => Kind<F, Kind2<T, E, A>>
  <F>(F: Applicative<F>): <A>(
    ta: Kind2<T, E, HKT<F, A>>
  ) => HKT<F, Kind2<T, E, A>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Sequence3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TR, TE, FR, FE, A>(
    ta: Kind3<T, TR, TE, Kind3<F, FR, FE, A>>
  ) => Kind3<F, FR, FE, Kind3<T, TR, TE, A>>
  <F extends URIS2>(F: Applicative2<F>): <R, TE, FE, A>(
    ta: Kind3<T, R, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind3<T, R, TE, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <R, TE, A>(
    ta: Kind3<T, R, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind3<T, R, TE, A>>
  <F extends URIS>(F: Applicative1<F>): <R, E, A>(
    ta: Kind3<T, R, E, Kind<F, A>>
  ) => Kind<F, Kind3<T, R, E, A>>
  <F>(F: Applicative<F>): <R, E, A>(
    ta: Kind3<T, R, E, HKT<F, A>>
  ) => HKT<F, Kind3<T, R, E, A>>
}
```

#### `I` `TraversableComposition`

```ts
/**
 * @since 2.0.0
 */
export interface TraversableComposition<F, G>
  extends FoldableComposition<F, G>,
    FunctorComposition<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(
    fga: HKT<F, HKT<G, A>>,
    f: (a: A) => HKT<H, B>
  ) => HKT<H, HKT<F, HKT<G, B>>>
  readonly sequence: <H>(
    H: Applicative<H>
  ) => <A>(fga: HKT<F, HKT<G, HKT<H, A>>>) => HKT<H, HKT<F, HKT<G, A>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface TraverseComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <R, E, A, B>(
    fga: Kind<F, Kind<G, A>>,
    f: (a: A) => Kind3<H, R, E, B>
  ) => Kind3<H, R, E, Kind<F, Kind<G, B>>>
  <H extends URIS2>(H: Applicative2<H>): <E, A, B>(
    fga: Kind<F, Kind<G, A>>,
    f: (a: A) => Kind2<H, E, B>
  ) => Kind2<H, E, Kind<F, Kind<G, B>>>
  <H extends URIS2, E>(H: Applicative2C<H, E>): <A, B>(
    fga: Kind<F, Kind<G, A>>,
    f: (a: A) => Kind2<H, E, B>
  ) => Kind2<H, E, Kind<F, Kind<G, B>>>
  <H extends URIS>(H: Applicative1<H>): <A, B>(
    fga: Kind<F, Kind<G, A>>,
    f: (a: A) => Kind<H, B>
  ) => Kind<H, Kind<F, Kind<G, B>>>
  <H>(H: Applicative<H>): <A, B>(
    fga: Kind<F, Kind<G, A>>,
    f: (a: A) => HKT<H, B>
  ) => HKT<H, Kind<F, Kind<G, B>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface SequenceComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <R, E, A>(
    fga: Kind<F, Kind<G, Kind3<H, R, E, A>>>
  ) => Kind3<H, R, E, Kind<F, Kind<G, A>>>
  <H extends URIS2>(H: Applicative2<H>): <E, A>(
    fga: Kind<F, Kind<G, Kind2<H, E, A>>>
  ) => Kind2<H, E, Kind<F, Kind<G, A>>>
  <H extends URIS2, E>(H: Applicative2C<H, E>): <A>(
    fga: Kind<F, Kind<G, Kind2<H, E, A>>>
  ) => Kind2<H, E, Kind<F, Kind<G, A>>>
  <H extends URIS>(H: Applicative1<H>): <A>(
    fga: Kind<F, Kind<G, Kind<H, A>>>
  ) => Kind<H, Kind<F, Kind<G, A>>>
  <H>(H: Applicative<H>): <A>(
    fga: Kind<F, Kind<G, HKT<H, A>>>
  ) => HKT<H, Kind<F, Kind<G, A>>>
}
```

#### `I` `TraversableComposition11`

```ts
/**
 * @since 2.0.0
 */
export interface TraversableComposition11<F extends URIS, G extends URIS>
  extends FoldableComposition11<F, G>,
    FunctorComposition11<F, G> {
  readonly traverse: TraverseComposition11<F, G>
  readonly sequence: SequenceComposition11<F, G>
}
```

#### `F` `No Render Found`

```ts
//
// pipeable `Traverse`
//

/**
 * @since 2.6.3
 */
export interface PipeableTraverse1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => (ta: Kind<T, A>) => Kind3<F, FR, FE, Kind<T, B>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <A, FR, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => (ta: Kind<T, A>) => Kind3<F, FR, FE, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind<T, A>) => Kind2<F, FE, Kind<T, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind<T, A>) => Kind2<F, FE, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, B>
  ) => (ta: Kind<T, A>) => HKT<F, Kind<T, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.3
 */
export interface PipeableTraverse2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, FR, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind<F, Kind2<T, TE, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => HKT<F, Kind2<T, TE, B>>
}
```

#### `I` `TraversableWithIndex`

```ts
/**
 * @since 2.0.0
 */
export interface TraversableWithIndex<T, I>
  extends FunctorWithIndex<T, I>,
    FoldableWithIndex<T, I>,
    Traversable<T> {
  readonly traverseWithIndex: TraverseWithIndex<T, I>
}
```

#### `I` `TraversableWithIndex1`

```ts
/**
 * @since 2.0.0
 */
export interface TraversableWithIndex1<T extends URIS, I>
  extends FunctorWithIndex1<T, I>,
    FoldableWithIndex1<T, I>,
    Traversable1<T> {
  readonly traverseWithIndex: TraverseWithIndex1<T, I>
}
```

#### `I` `TraversableWithIndex2`

```ts
/**
 * @since 2.0.0
 */
export interface TraversableWithIndex2<T extends URIS2, I>
  extends FunctorWithIndex2<T, I>,
    FoldableWithIndex2<T, I>,
    Traversable2<T> {
  readonly traverseWithIndex: TraverseWithIndex2<T, I>
}
```

#### `I` `TraversableWithIndex2C`

```ts
/**
 * @since 2.0.0
 */
export interface TraversableWithIndex2C<T extends URIS2, I, E>
  extends FunctorWithIndex2C<T, I, E>,
    FoldableWithIndex2C<T, I, E>,
    Traversable2C<T, E> {
  readonly traverseWithIndex: TraverseWithIndex2C<T, I, E>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface TraverseWithIndex<T, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, HKT<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Kind<F, B>
  ) => Kind<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => HKT<F, B>
  ) => HKT<F, HKT<T, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface TraverseWithIndex1<T extends URIS, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => Kind<F, B>
  ) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => HKT<F, B>
  ) => HKT<F, Kind<T, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface TraverseWithIndex2<T extends URIS2, I> {
  <F extends URIS3>(F: Applicative3<F>): <TE, A, R, FE, B>(
    ta: Kind2<T, TE, A>,
    f: (i: I, a: A) => Kind3<F, R, FE, B>
  ) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <TE, A, FE, B>(
    ta: Kind2<T, TE, A>,
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <TE, A, B>(
    ta: Kind2<T, TE, A>,
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <E, A, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind<F, B>
  ) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <E, A, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => HKT<F, B>
  ) => HKT<F, Kind2<T, E, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface TraverseWithIndex2C<T extends URIS2, I, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind3<F, R, FE, B>
  ) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends URIS3>(F: Applicative3C<F, E>): <A, R, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2C<F, E>): <A, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind2<T, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind<F, B>
  ) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => HKT<F, B>
  ) => HKT<F, Kind2<T, E, B>>
}
```

#### `F` `No Render Found`

```ts
//
// pipeable `TraverseWithIndex`
//

/**
 * @since 2.6.3
 */
export interface PipeableTraverseWithIndex1<T extends URIS, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (i: I, a: A) => Kind<F, B>
  ) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (i: I, a: A) => HKT<F, B>
  ) => (ta: Kind<T, A>) => HKT<F, Kind<T, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.3
 */
export interface PipeableTraverseWithIndex2<T extends URIS2, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (i: I, a: A) => Kind3<F, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (i: I, a: A) => Kind<F, B>
  ) => <E>(ta: Kind2<T, E, A>) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (i: I, a: A) => HKT<F, B>
  ) => <E>(ta: Kind2<T, E, A>) => HKT<F, Kind2<T, E, B>>
}
```

#### `I` `Unfoldable`

```ts
// tslint:disable:readonly-array

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Unfoldable<F> {
  readonly URI: F
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}
```

#### `I` `Unfoldable1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Unfoldable1<F extends URIS> {
  readonly URI: F
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind<F, A>
}
```

#### `I` `Unfoldable2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Unfoldable2<F extends URIS2> {
  readonly URI: F
  readonly unfold: <E, A, B>(
    b: B,
    f: (b: B) => Option<[A, B]>
  ) => Kind2<F, E, A>
}
```

#### `I` `Unfoldable2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Unfoldable2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind2<F, E, A>
}
```

#### `I` `Unfoldable3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Unfoldable3<F extends URIS3> {
  readonly URI: F
  readonly unfold: <R, E, A, B>(
    b: B,
    f: (b: B) => Option<[A, B]>
  ) => Kind3<F, R, E, A>
}
```

#### `I` `ValidationT`

```ts
// TODO: remove module in v3

/**
 * @since 2.0.0
 */
export interface ValidationT<M, E, A> extends HKT<M, Either<E, A>> {}
```

#### `I` `ValidationM`

```ts
/**
 * @since 2.0.0
 */
export interface ValidationM<M, E>
  extends ApplicativeCompositionHKT2C<M, URI, E> {
  readonly chain: <A, B>(
    ma: ValidationT<M, E, A>,
    f: (a: A) => ValidationT<M, E, B>
  ) => ValidationT<M, E, B>
  readonly alt: <A>(
    fa: ValidationT<M, E, A>,
    that: Lazy<ValidationT<M, E, A>>
  ) => ValidationT<M, E, A>
}
```

#### `I` `ValidationM1`

```ts
/**
 * @since 2.0.0
 */
export interface ValidationM1<M extends URIS, E>
  extends ApplicativeComposition12C<M, URI, E> {
  readonly chain: <A, B>(
    ma: ValidationT1<M, E, A>,
    f: (a: A) => ValidationT1<M, E, B>
  ) => ValidationT1<M, E, B>
  readonly alt: <A>(
    fa: ValidationT1<M, E, A>,
    that: Lazy<ValidationT1<M, E, A>>
  ) => ValidationT1<M, E, A>
}
```

#### `I` `ValidationM2`

```ts
/**
 * @since 2.0.0
 */
export interface ValidationM2<M extends URIS2, E>
  extends ApplicativeComposition22C<M, URI, E> {
  readonly chain: <R, A, B>(
    ma: ValidationT2<M, R, E, A>,
    f: (a: A) => ValidationT2<M, R, E, B>
  ) => ValidationT2<M, R, E, B>
  readonly alt: <R, A>(
    fa: ValidationT2<M, R, E, A>,
    that: Lazy<ValidationT2<M, R, E, A>>
  ) => ValidationT2<M, R, E, A>
}
```

#### `I` `Witherable`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  /**
   * Partition a structure with effects
   */
  readonly wilt: Wilt<T>

  /**
   * Filter a structure  with effects
   */
  readonly wither: Wither<T>
}
```

#### `I` `Witherable1`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Witherable1<T extends URIS>
  extends Traversable1<T>,
    Filterable1<T> {
  readonly wilt: Wilt1<T>
  readonly wither: Wither1<T>
}
```

#### `I` `Witherable2`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Witherable2<T extends URIS2>
  extends Traversable2<T>,
    Filterable2<T> {
  readonly wilt: Wilt2<T>
  readonly wither: Wither2<T>
}
```

#### `I` `Witherable2C`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Witherable2C<T extends URIS2, TL>
  extends Traversable2C<T, TL>,
    Filterable2C<T, TL> {
  readonly wilt: Wilt2C<T, TL>
  readonly wither: Wither2C<T, TL>
}
```

#### `I` `Witherable3`

```ts
/**
 * @category type classes
 * @since 2.0.0
 */
export interface Witherable3<T extends URIS3>
  extends Traversable3<T>,
    Filterable3<T> {
  readonly wilt: Wilt3<T>
  readonly wither: Wither3<T>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wither<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: HKT<W, A>,
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: HKT<W, A>,
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: HKT<W, A>,
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => Kind2<F, E, HKT<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => Kind2<F, E, HKT<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Kind<F, Option<B>>
  ) => Kind<F, HKT<W, B>>
  <F>(F: Applicative<F>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => HKT<F, Option<B>>
  ) => HKT<F, HKT<W, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wither1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: Kind<W, A>,
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: Kind<W, A>,
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: Kind<W, A>,
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => Kind2<F, E, Kind<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: Kind<W, A>,
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => Kind2<F, E, Kind<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Kind<W, A>,
    f: (a: A) => Kind<F, Option<B>>
  ) => Kind<F, Kind<W, B>>
  <F>(F: Applicative<F>): <A, B>(
    ta: Kind<W, A>,
    f: (a: A) => HKT<F, Option<B>>
  ) => HKT<F, Kind<W, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wither2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <WE, A, R, FE, B>(
    ta: Kind2<W, WE, A>,
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => Kind3<F, R, FE, Kind2<W, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <WE, A, FE, B>(
    ta: Kind2<W, WE, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <WE, A, B>(
    ta: Kind2<W, WE, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <E, A, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind<F, Option<B>>
  ) => Kind<F, Kind2<W, E, B>>
  <F>(F: Applicative<F>): <E, A, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => HKT<F, Option<B>>
  ) => HKT<F, Kind2<W, E, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wither2C<W extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => Kind3<F, R, FE, Kind2<W, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind2<W, E, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind2<W, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind<F, Option<B>>
  ) => Kind<F, Kind2<W, E, B>>
  <F>(F: Applicative<F>): <A, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => HKT<F, Option<B>>
  ) => HKT<F, Kind2<W, E, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wither3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <WR, WE, A, FR, FE, B>(
    ta: Kind3<W, WR, WE, A>,
    f: (a: A) => Kind3<F, FR, FE, Option<B>>
  ) => Kind3<F, FR, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <WR, WE, A, FE, B>(
    ta: Kind3<W, WR, WE, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <R, WE, A, B>(
    ta: Kind3<W, R, WE, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind3<W, R, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <R, E, A, B>(
    ta: Kind3<W, R, E, A>,
    f: (a: A) => Kind<F, Option<B>>
  ) => Kind<F, Kind3<W, R, E, B>>
  <F>(F: Applicative<F>): <R, E, A, B>(
    ta: Kind3<W, R, E, A>,
    f: (a: A) => HKT<F, Option<B>>
  ) => HKT<F, Kind3<W, R, E, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wilt<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<HKT<W, B>, HKT<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<HKT<W, B>, HKT<W, C>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wilt1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<Kind<W, B>, Kind<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Kind<W, B>, Kind<W, C>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wilt2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <WE, A, R, FE, B, C>(
    wa: Kind2<W, WE, A>,
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => Kind3<F, R, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <WE, A, FE, B, C>(
    wa: Kind2<W, WE, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <WE, A, B, C>(
    wa: Kind2<W, WE, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <E, A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F>(F: Applicative<F>): <E, A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wilt2C<W extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => Kind3<F, R, FE, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.0.0
 */
export interface Wilt3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <WR, WE, A, FR, FE, B, C>(
    wa: Kind3<W, WR, WE, A>,
    f: (a: A) => Kind3<F, FR, FE, Either<B, C>>
  ) => Kind3<F, FR, FE, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <R, WE, A, FE, B, C>(
    wa: Kind3<W, R, WE, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind3<W, R, WE, B>, Kind3<W, R, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <R, WE, A, B, C>(
    wa: Kind3<W, R, WE, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind3<W, R, WE, B>, Kind3<W, R, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <R, E, A, B, C>(
    wa: Kind3<W, R, E, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<Kind3<W, R, E, B>, Kind3<W, R, E, C>>>
  <F>(F: Applicative<F>): <R, E, A, B, C>(
    wa: Kind3<W, R, E, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Kind3<W, R, E, B>, Kind3<W, R, E, C>>>
}
```

#### `F` `No Render Found`

```ts
//
// pipeable `Wither`
//

/**
 * @since 2.6.5
 */
export interface PipeableWither<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind2<F, E, HKT<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind2<F, E, HKT<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => (ta: HKT<W, A>) => Kind<F, HKT<W, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, Option<B>>
  ) => (ta: HKT<W, A>) => HKT<F, HKT<W, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.5
 */
export interface PipeableWither1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind2<F, E, Kind<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind2<F, E, Kind<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => (ta: Kind<W, A>) => Kind<F, Kind<W, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, Option<B>>
  ) => (ta: Kind<W, A>) => HKT<F, Kind<W, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.5
 */
export interface PipeableWither2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind3<F, R, FE, Kind2<W, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind<F, Kind2<W, WE, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => HKT<F, Kind2<W, WE, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.5
 */
export interface PipeableWither2C<W extends URIS2, WE> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => (ta: Kind2<W, WE, A>) => Kind3<F, R, FE, Kind2<W, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => (ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => (ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => (ta: Kind2<W, WE, A>) => Kind<F, Kind2<W, WE, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, Option<B>>
  ) => (ta: Kind2<W, WE, A>) => HKT<F, Kind2<W, WE, B>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.5
 */
export interface PipeableWither3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, Option<B>>
  ) => <WR, WE>(
    ta: Kind3<W, WR, WE, A>
  ) => Kind3<F, FR, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => Kind2<F, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => Kind2<F, FE, Kind3<W, WR, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => Kind<F, Kind3<W, WR, WE, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => HKT<F, Kind3<W, WR, WE, B>>
}
```

#### `F` `No Render Found`

```ts
//
// pipeable `Wilt`
//

/**
 * @since 2.6.5
 */
export interface PipeableWilt<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind<F, Separated<HKT<W, B>, HKT<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => (wa: HKT<W, A>) => HKT<F, Separated<HKT<W, B>, HKT<W, C>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.5
 */
export interface PipeableWilt1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind<F, Separated<Kind<W, B>, Kind<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => (wa: Kind<W, A>) => HKT<F, Separated<Kind<W, B>, Kind<W, C>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.5
 */
export interface PipeableWilt2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B, C>(
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => <WE>(
    wa: Kind2<W, WE, A>
  ) => Kind3<F, R, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WE>(
    wa: Kind2<W, WE, A>
  ) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WE>(
    wa: Kind2<W, WE, A>
  ) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => <WE>(
    wa: Kind2<W, WE, A>
  ) => Kind<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => <WE>(
    wa: Kind2<W, WE, A>
  ) => HKT<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.5
 */
export interface PipeableWilt2C<W extends URIS2, WE> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B, C>(
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => (
    wa: Kind2<W, WE, A>
  ) => Kind3<F, R, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => (
    wa: Kind2<W, WE, A>
  ) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => (
    wa: Kind2<W, WE, A>
  ) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => (
    wa: Kind2<W, WE, A>
  ) => Kind<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => (
    wa: Kind2<W, WE, A>
  ) => HKT<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.6.5
 */
export interface PipeableWilt3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B, C>(
    f: (a: A) => Kind3<F, FR, FE, Either<B, C>>
  ) => <WR, WE>(
    wa: Kind3<W, WR, WE, A>
  ) => Kind3<F, FR, FE, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WR, WE>(
    wa: Kind3<W, WR, WE, A>
  ) => Kind2<F, FE, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WR, WE>(
    wa: Kind3<W, WR, WE, A>
  ) => Kind2<F, FE, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => <WR, WE>(
    wa: Kind3<W, WR, WE, A>
  ) => Kind<F, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => <WR, WE>(
    wa: Kind3<W, WR, WE, A>
  ) => HKT<F, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
}
```

#### `F` `No Render Found`

```ts
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

// tslint:disable:readonly-array
/**
 * @category model
 * @since 2.0.0
 */
export interface Writer<W, A> {
  (): [A, W]
}
```

#### `F` `No Render Found`

```ts
// TODO: remove module in v3

// tslint:disable:readonly-array

/**
 * @category model
 * @since 2.4.0
 */
export interface WriterT<M, W, A> {
  (): HKT<M, [A, W]>
}
```

#### `I` `WriterM`

```ts
/**
 * @since 2.4.0
 */
export interface WriterM<M> {
  readonly map: <W, A, B>(
    fa: WriterT<M, W, A>,
    f: (a: A) => B
  ) => WriterT<M, W, B>
  readonly evalWriter: <W, A>(fa: WriterT<M, W, A>) => HKT<M, A>
  readonly execWriter: <W, A>(fa: WriterT<M, W, A>) => HKT<M, W>
  readonly tell: <W>(w: W) => WriterT<M, W, void>
  readonly listen: <W, A>(fa: WriterT<M, W, A>) => WriterT<M, W, [A, W]>
  readonly pass: <W, A>(fa: WriterT<M, W, [A, (w: W) => W]>) => WriterT<M, W, A>
  readonly listens: <W, A, B>(
    fa: WriterT<M, W, A>,
    f: (w: W) => B
  ) => WriterT<M, W, [A, B]>
  readonly censor: <W, A>(
    fa: WriterT<M, W, A>,
    f: (w: W) => W
  ) => WriterT<M, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <A, B>(
      ma: WriterT<M, W, A>,
      f: (a: A) => B
    ) => WriterT<M, W, B>
    readonly of: <A>(a: A) => WriterT<M, W, A>
    readonly ap: <A, B>(
      mab: WriterT<M, W, (a: A) => B>,
      ma: WriterT<M, W, A>
    ) => WriterT<M, W, B>
    readonly chain: <A, B>(
      ma: WriterT<M, W, A>,
      f: (a: A) => WriterT<M, W, B>
    ) => WriterT<M, W, B>
  }
}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.4.0
 */
export interface WriterT1<M extends URIS, W, A> {
  (): Kind<M, [A, W]>
}
```

#### `I` `WriterM1`

```ts
/**
 * @since 2.4.0
 */
export interface WriterM1<M extends URIS> {
  readonly map: <W, A, B>(
    fa: WriterT1<M, W, A>,
    f: (a: A) => B
  ) => WriterT1<M, W, B>
  readonly evalWriter: <W, A>(fa: WriterT1<M, W, A>) => Kind<M, A>
  readonly execWriter: <W, A>(fa: WriterT1<M, W, A>) => Kind<M, W>
  readonly tell: <W>(w: W) => WriterT1<M, W, void>
  readonly listen: <W, A>(fa: WriterT1<M, W, A>) => WriterT1<M, W, [A, W]>
  readonly pass: <W, A>(
    fa: WriterT1<M, W, [A, (w: W) => W]>
  ) => WriterT1<M, W, A>
  readonly listens: <W, A, B>(
    fa: WriterT1<M, W, A>,
    f: (w: W) => B
  ) => WriterT1<M, W, [A, B]>
  readonly censor: <W, A>(
    fa: WriterT1<M, W, A>,
    f: (w: W) => W
  ) => WriterT1<M, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <A, B>(
      ma: WriterT1<M, W, A>,
      f: (a: A) => B
    ) => WriterT1<M, W, B>
    readonly of: <A>(a: A) => WriterT1<M, W, A>
    readonly ap: <A, B>(
      mab: WriterT1<M, W, (a: A) => B>,
      ma: WriterT1<M, W, A>
    ) => WriterT1<M, W, B>
    readonly chain: <A, B>(
      ma: WriterT1<M, W, A>,
      f: (a: A) => WriterT1<M, W, B>
    ) => WriterT1<M, W, B>
  }
}
```

#### `F` `No Render Found`

```ts
/**
 * @category model
 * @since 2.4.0
 */
export interface WriterT2<M extends URIS2, E, W, A> {
  (): Kind2<M, E, [A, W]>
}
```

#### `I` `WriterM2`

```ts
/**
 * @since 2.4.0
 */
export interface WriterM2<M extends URIS2> {
  readonly map: <E, W, A, B>(
    fa: WriterT2<M, E, W, A>,
    f: (a: A) => B
  ) => WriterT2<M, E, W, B>
  readonly evalWriter: <E, W, A>(fa: WriterT2<M, E, W, A>) => Kind2<M, E, A>
  readonly execWriter: <E, W, A>(fa: WriterT2<M, E, W, A>) => Kind2<M, E, W>
  readonly tell: <E, W>(w: W) => WriterT2<M, E, W, void>
  readonly listen: <E, W, A>(
    fa: WriterT2<M, E, W, A>
  ) => WriterT2<M, E, W, [A, W]>
  readonly pass: <E, W, A>(
    fa: WriterT2<M, E, W, [A, (w: W) => W]>
  ) => WriterT2<M, E, W, A>
  readonly listens: <E, W, A, B>(
    fa: WriterT2<M, E, W, A>,
    f: (w: W) => B
  ) => WriterT2<M, E, W, [A, B]>
  readonly censor: <E, W, A>(
    fa: WriterT2<M, E, W, A>,
    f: (w: W) => W
  ) => WriterT2<M, E, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <E, A, B>(
      ma: WriterT2<M, E, W, A>,
      f: (a: A) => B
    ) => WriterT2<M, E, W, B>
    readonly of: <E, A>(a: A) => WriterT2<M, E, W, A>
    readonly ap: <E, A, B>(
      mab: WriterT2<M, E, W, (a: A) => B>,
      ma: WriterT2<M, E, W, A>
    ) => WriterT2<M, E, W, B>
    readonly chain: <E, A, B>(
      ma: WriterT2<M, E, W, A>,
      f: (a: A) => WriterT2<M, E, W, B>
    ) => WriterT2<M, E, W, B>
  }
}
```

#### `I` `WriterM2C`

```ts
/**
 * @since 2.4.0
 */
export interface WriterM2C<M extends URIS2, E> {
  readonly map: <W, A, B>(
    fa: WriterT2<M, E, W, A>,
    f: (a: A) => B
  ) => WriterT2<M, E, W, B>
  readonly evalWriter: <W, A>(fa: WriterT2<M, E, W, A>) => Kind2<M, E, A>
  readonly execWriter: <W, A>(fa: WriterT2<M, E, W, A>) => Kind2<M, E, W>
  readonly tell: <W>(w: W) => WriterT2<M, E, W, void>
  readonly listen: <W, A>(fa: WriterT2<M, E, W, A>) => WriterT2<M, E, W, [A, W]>
  readonly pass: <W, A>(
    fa: WriterT2<M, E, W, [A, (w: W) => W]>
  ) => WriterT2<M, E, W, A>
  readonly listens: <W, A, B>(
    fa: WriterT2<M, E, W, A>,
    f: (w: W) => B
  ) => WriterT2<M, E, W, [A, B]>
  readonly censor: <W, A>(
    fa: WriterT2<M, E, W, A>,
    f: (w: W) => W
  ) => WriterT2<M, E, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <A, B>(
      ma: WriterT2<M, E, W, A>,
      f: (a: A) => B
    ) => WriterT2<M, E, W, B>
    readonly of: <A>(a: A) => WriterT2<M, E, W, A>
    readonly ap: <A, B>(
      mab: WriterT2<M, E, W, (a: A) => B>,
      ma: WriterT2<M, E, W, A>
    ) => WriterT2<M, E, W, B>
    readonly chain: <A, B>(
      ma: WriterT2<M, E, W, A>,
      f: (a: A) => WriterT2<M, E, W, B>
    ) => WriterT2<M, E, W, B>
  }
}
```

#### `F` `No Render Found`

```ts
/**
 * @since 2.4.0
 */
export interface WriterT3<M extends URIS3, R, E, W, A> {
  (): Kind3<M, R, E, [A, W]>
}
```

#### `I` `WriterM3`

```ts
/**
 * @since 2.4.0
 */
export interface WriterM3<M extends URIS3> {
  readonly map: <R, E, W, A, B>(
    fa: WriterT3<M, R, E, W, A>,
    f: (a: A) => B
  ) => WriterT3<M, R, E, W, B>
  readonly evalWriter: <R, E, W, A>(
    fa: WriterT3<M, R, E, W, A>
  ) => Kind3<M, R, E, A>
  readonly execWriter: <R, E, W, A>(
    fa: WriterT3<M, R, E, W, A>
  ) => Kind3<M, R, E, W>
  readonly tell: <R, E, W>(w: W) => WriterT3<M, R, E, W, void>
  readonly listen: <R, E, W, A>(
    fa: WriterT3<M, R, E, W, A>
  ) => WriterT3<M, R, E, W, [A, W]>
  readonly pass: <R, E, W, A>(
    fa: WriterT3<M, R, E, W, [A, (w: W) => W]>
  ) => WriterT3<M, R, E, W, A>
  readonly listens: <R, E, W, A, B>(
    fa: WriterT3<M, R, E, W, A>,
    f: (w: W) => B
  ) => WriterT3<M, R, E, W, [A, B]>
  readonly censor: <R, E, W, A>(
    fa: WriterT3<M, R, E, W, A>,
    f: (w: W) => W
  ) => WriterT3<M, R, E, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <R, E, A, B>(
      ma: WriterT3<M, R, E, W, A>,
      f: (a: A) => B
    ) => WriterT3<M, R, E, W, B>
    readonly of: <R, E, A>(a: A) => WriterT3<M, R, E, W, A>
    readonly ap: <R, E, A, B>(
      mab: WriterT3<M, R, E, W, (a: A) => B>,
      ma: WriterT3<M, R, E, W, A>
    ) => WriterT3<M, R, E, W, B>
    readonly chain: <R, E, A, B>(
      ma: WriterT3<M, R, E, W, A>,
      f: (a: A) => WriterT3<M, R, E, W, B>
    ) => WriterT3<M, R, E, W, B>
  }
}
```

