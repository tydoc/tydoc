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

        \`\`\`ts
        typeof import(\\"/a\\").foo;
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

        \`\`\`ts
        typeof import(\\"/a\\").foo;
        \`\`\`

        ### Exported Types

        ### Type Index
        "
      `)
    })
  })
})
