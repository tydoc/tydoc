describe('options', () => {
  describe('flatTermsSection', () => {
    it('when enabled terms are nested under a heading', () => {
      expect(
        ctx.markdown(
          { flatTermsSection: true },
          `
            export function foo() {}
          `
        )
      ).toMatchInlineSnapshot(`
        "### \`foo\`

        <!-- prettier-ignore -->
        \`\`\`ts
        () => void
        \`\`\`

        ### Exported Types


        ### Type Index


        "
      `)
    })

    it('when disabled terms are not nested under a heading', () => {
      expect(
        ctx.markdown(
          { flatTermsSection: false },
          `
            export function foo() {}
          `
        )
      ).toMatchInlineSnapshot(`
        "### Exported Terms

        #### \`foo\`

        <!-- prettier-ignore -->
        \`\`\`ts
        () => void
        \`\`\`

        ### Exported Types


        ### Type Index


        "
      `)
    })
  })
})

it('renders markdown', () => {
  expect(
    ctx.markdown(
      { flatTermsSection: true },
      `
        import { D } from './b'

        /**
         * Toto
         */
        export function foo(a:string, b:number) {}
        export function bar() {}
        export const toto = () => {}
        export const fofo = function fofo2() {}
        export interface A {
          /**
           * About a...
           */
          a: string,
          b: number
          c: C
          d: D
        }
        interface C {
          d: number,
          e: string
        }
      `,
      `
        export interface D {
          a: string
          b: string
        }
    `
    )
  ).toMatchInlineSnapshot(`
"### \`foo\`

<!-- prettier-ignore -->
\`\`\`ts
(a: string, b: number) => void
\`\`\`

### \`bar\`

<!-- prettier-ignore -->
\`\`\`ts
() => void
\`\`\`

### \`toto\`

<!-- prettier-ignore -->
\`\`\`ts
() => void
\`\`\`

### \`fofo\`

<!-- prettier-ignore -->
\`\`\`ts
() => void
\`\`\`

### Exported Types

#### \`A\`

\`\`\`ts
interface A {
  /**
   * About a...
   */
  a: string;
  b: number;
  c: C;
  d: D;
}
\`\`\`

### Type Index

#### \`C\`

\`\`\`ts
interface C {
  d: number;
  e: string;
}
\`\`\`

#### \`D\`

\`\`\`ts
interface D {
  a: string;
  b: string;
}
\`\`\`

"
`)
})
