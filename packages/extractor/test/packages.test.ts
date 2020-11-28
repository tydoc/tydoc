import * as fs from "fs";
import * as path from "path";
import * as TyDoc from "../src"
import * as tsm from 'ts-morph'

const PACKAGES_DIR = path.join(__dirname, "__packages__");

describe("tests extraction of packages", () => {
  const packages = fs.readdirSync(PACKAGES_DIR);
  for (const packageDirName of packages) {
    const projectDir = path.join(PACKAGES_DIR, packageDirName)
    test(packageDirName, async () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(projectDir,"package.json"), { encoding: "utf8" }))
      const {main, module, typings } = pkg
      const mainEntry = path.join(projectDir,'./dist/index.ts')
      const tsProject = new tsm.Project({
        
      })
      const docs = TyDoc.fromProject({
        entrypoints: [mainEntry],
        readSettingsFromJSON: false,
        packageMainEntrypoint: path.join(path.dirname(main),'index.d.ts'),
        prjDir: projectDir,
        project: tsProject,
        haltOnDiagnostics: false,
      })
  
      expect(docs).toMatchSnapshot()
    })
  }
})