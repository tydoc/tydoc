import * as fs from "fs";
import * as path from "path";
import * as TyDoc from "../src"
const PACKAGES_DIR = path.join(__dirname, "__packages__");

describe("tests extraction of packages", () => {
  const packages = fs.readdirSync(PACKAGES_DIR);
  for (const packageDirName of packages) {
    const projectDir = path.join(PACKAGES_DIR, packageDirName)
    test(packageDirName, async () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(projectDir,"package.json"), { encoding: "utf8" }))
      const {main, module, typings } = pkg
      const mainEntry = path.join(projectDir,'./lib/index.ts')
      const docs = TyDoc.fromProject({
        entrypoints: [mainEntry],
        readSettingsFromJSON: false,
        
        prjDir: projectDir,
        haltOnDiagnostics: false,
      })
  
      expect(docs).toMatchSnapshot()
    })
  }
})