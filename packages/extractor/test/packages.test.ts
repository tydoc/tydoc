
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
  "sponsorsme"
]
describe("tests extraction of packages", () => {
  for (const pkg of packages) {
    test(pkg, async () => {
      const response = await axios.get('https://registry.npmjs.org/'+pkg)
      const data = response.data
      const latestVersion = data["dist-tags"]["latest"]
      const latestData = data["versions"][latestVersion]
      const tarUrl = latestData["dist"]["tarball"]
      const tarPath = await downloadTarball(tarUrl)
      const outputDir = tempy.directory()
      await extract(tarPath, outputDir)
      expect.assertions(1)
      const tsProject = new tsm.Project()
      const projectDir = path.join(outputDir, 'package')
      console.log({projectDir});
      try {
        const docs = TyDoc.fromProject({
          readSettingsFromJSON: false,
          prjDir: projectDir,
          project: tsProject,
          haltOnDiagnostics: false,
        })
        expect(docs).toMatchSnapshot()
      } finally {

      }
      
    })
  }
})

async function extract(path: string, outputDir: string){
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
