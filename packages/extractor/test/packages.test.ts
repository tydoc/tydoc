
/**
 * @jest-environment node
 */
import * as fs from "fs";
import * as path from "path";
import * as TyDoc from "../src"
import * as tsm from 'ts-morph'
import axios from 'axios';
import * as tempy from 'tempy';
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
      console.log({projectDir});
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
    const response = await axios.get('https://registry.npmjs.org/'+packageName)
    const data = response.data
    const latestVersion = data["dist-tags"]["latest"]
    const latestData = data["versions"][latestVersion]
    tarUrl = latestData["dist"]["tarball"]
  } catch (err) {
    throw new Error(`Failed to fetch tarball url for ${packageName}`)
  }
  return tarUrl
}
async function extract(path: string): Promise<string>{
  const outputDir = tempy.directory()
  return new Promise<string>((resolve, reject) => {
    decompress(path, outputDir).then((files: any) => {
      console.log('done!');
      resolve(outputDir)
    }).catch(reject)
  })
}

async function downloadTarball (url: string): Promise<string> {  
  const path = tempy.file()
  const writer = fs.createWriteStream(path)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise<string>((resolve, reject) => {
    writer.on('finish', () => resolve(path))
    writer.on('error', reject)
  })
}
