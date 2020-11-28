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
      expect.assertions(1)
      const tsProject = new tsm.Project()
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