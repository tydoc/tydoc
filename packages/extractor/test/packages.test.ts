
/**
 * @jest-environment node
 */
import * as fs from "fs-jetpack";
import * as path from "path";
import * as TyDoc from "../src"
import * as tsm from 'ts-morph'
import got from 'got';
import * as decompress from 'decompress';

const packages = [
  "sponsorsme",
  "execa"
]
describe("tests extraction of packages", () => {
  for (const pkg of packages) {
    test(pkg, async () => {
      expect.assertions(1)
      const outputDir = await downloadFromNPM(pkg)
      const tsProject = new tsm.Project()
      const projectDir = path.join(outputDir, 'package')
      try {
        const docs = TyDoc.fromPublished({
          prjDir: projectDir,
          project: tsProject,
          haltOnDiagnostics: false,
        })
        expect(docs).toMatchSnapshot()
      } catch(err){
        throw err
      }
    })
  }
})
async function downloadFromNPM(packageName: string): Promise<string>{
  const tarUrl = await  getTarUrl(packageName)
  const tarPath = await downloadTarball(tarUrl)
  const outputDir = await extract(tarPath)
  return outputDir
}
async function getTarUrl(packageName: string){
  let tarUrl: string;
  try {
    const  {body} = await got.get('https://registry.npmjs.org/'+packageName, {responseType: 'json'})
    // @ts-ignore
    const latestVersion = body["dist-tags"]["latest"]
    // @ts-ignore
    const latestData = body["versions"][latestVersion]
    tarUrl = latestData["dist"]["tarball"]
  } catch (err) {
    throw new Error(`Failed to fetch tarball url for ${packageName}`)
  }
  return tarUrl
}
async function extract(path: string): Promise<string>{
  const tmp = fs.tmpDir();
  return new Promise<string>((resolve, reject) => {
    decompress(path, tmp.cwd()).then((files: any) => {
      resolve(tmp.cwd())
    }).catch(reject)
  })
}

async function downloadTarball (url: string): Promise<string> {  
  const tmp = fs.tmpDir()
  const filePath = path.join(tmp.cwd(), url)
  tmp.file(filePath)
  console.log(filePath);

  const writer = fs.createWriteStream(filePath)
  got.get(url, {responseType: 'json', isStream: true}).pipe(writer)

  return new Promise<string>((resolve, reject) => {
    writer.on('finish', () => resolve(filePath))
    writer.on('error', reject)
  })
}
