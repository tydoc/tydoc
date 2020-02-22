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

it('term exports whose type is in the typeindex are linked to that typeindex entry', () => {
  expect(
    ctx.markdown(
      { flatTermsSection: true },
      `
        export let a: A = {}
        interface A {}
      `
    )
  ).toMatchInlineSnapshot(`
"### \`a\`

Of type [\`A\`](#i-a)

### Exported Types

### Type Index

#### \`I\` \`A\`

\`\`\`ts
interface A {}
\`\`\`
"
`)
})

it('module doc if present above terms', () => {
  expect(
    ctx.markdown(
      { flatTermsSection: true },
      `
        /**
         * About this module...
         */

        /**
         *  About a...
         */
        export let a = 1
      `
    )
  ).toMatchInlineSnapshot(`
"About this module...

### \`a\`

\`\`\`ts
\`\`\`

### Exported Types

### Type Index
"
`)
})
