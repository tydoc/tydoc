import * as decompress from 'decompress'
import * as fs from 'fs-jetpack'
import got from 'got'
import * as path from 'path'
import * as tsm from 'ts-morph'
import * as TyDoc from '../src'

test('can get EDD from "sponsorsme" package', async () => {
  const edd = await foo('sponsorsme')
  expect(edd).toMatchSnapshot()
})

test('can get EDD from "execa" package', async () => {
  const edd = await foo('execa')
  expect(edd).toMatchSnapshot()
})

async function foo(pkg: string) {
  const tmp = fs.tmpDir()
  await downloadFromNPM(pkg, tmp.cwd())
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

function replaceInObjectValues<T>(obj: T, searchTerm: string, replacementTerm: string): T {
  return JSON.parse(replaceAll(JSON.stringify(obj), searchTerm, replacementTerm))
}

function replaceAll(content: string, searchTerm: string, repalcement: string) {
  let contentWithReplacements = content
  while (contentWithReplacements.includes(searchTerm)) {
    contentWithReplacements = contentWithReplacements.replace(searchTerm, repalcement)
  }
  return contentWithReplacements
}

async function downloadFromNPM(packageName: string, dir: string): Promise<void> {
  const tarUrl = await getTarUrl(packageName)
  const tarPath = await downloadTarball(tarUrl)
  await extract(tarPath, dir)
}

async function getTarUrl(packageName: string) {
  let tarUrl: string
  try {
    const { body } = await got.get('https://registry.npmjs.org/' + packageName, { responseType: 'json' })
    // @ts-ignore
    const latestVersion = body['dist-tags']['latest']
    // @ts-ignore
    const latestData = body['versions'][latestVersion]
    tarUrl = latestData['dist']['tarball']
  } catch (err) {
    throw new Error(`Failed to fetch tarball url for ${packageName}`)
  }
  return tarUrl
}
async function extract(path: string, dir: string): Promise<string> {
  return new Promise((resolve, reject) => {
    decompress(path, dir)
      .then((files: any) => {
        resolve(dir)
      })
      .catch(reject)
  })
}

async function downloadTarball(url: string): Promise<string> {
  const tmp = fs.tmpDir()
  const filePath = path.join(tmp.cwd(), url)
  tmp.file(filePath)

  const writer = fs.createWriteStream(filePath)
  got.get(url, { responseType: 'json', isStream: true }).pipe(writer)

  return new Promise<string>((resolve, reject) => {
    writer.on('finish', () => resolve(filePath))
    writer.on('error', reject)
  })
}
