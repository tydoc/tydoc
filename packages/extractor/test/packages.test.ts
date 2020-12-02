import * as fs from 'fs-jetpack'
import * as path from 'path'
import * as tsm from 'ts-morph'
import * as TyDoc from '../src'
import { downloadPackage } from '../src/api/lib/package-helpers'
import { replaceInObjectValues } from './__utils'

test('can get EDD from "sponsorsme" package', async () => {
  const edd = await foo('sponsorsme')
  expect(edd).toMatchSnapshot()
})

test('can get EDD from "execa" package', async () => {
  const edd = await foo('execa')
  expect(edd).toMatchSnapshot()
})

async function foo(packageName: string) {
  const tmp = fs.tmpDir()
  await downloadPackage(packageName, tmp.cwd())
  const tsProject = new tsm.Project()
  const projectDir = path.join(tmp.cwd(), 'package')
  const edd = TyDoc.fromPublished({
    prjDir: projectDir,
    project: tsProject,
    haltOnDiagnostics: false,
  })
  const eddWithStaticPaths = replaceInObjectValues(edd, tmp.cwd(), '/__root__')
  return eddWithStaticPaths
}
