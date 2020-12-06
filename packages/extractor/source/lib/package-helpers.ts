import decompress = require('decompress')
import * as fs from 'fs-jetpack'
import got from 'got'
import * as path from 'path'
import { PackageJson } from 'type-fest'

export function readPackageJson(dir: string): null | PackageJson {
  return fs.read(path.join(dir, 'package.json'), 'json') ?? null
}

export function stripExtension(somePath: string): string {
  const { dir, name } = path.parse(somePath)
  return path.join(dir, name)
}

export function absolutify(rootDir: string, somePath: string): string {
  if (!path.isAbsolute(rootDir)) {
    throw new Error(`Cannot absolutify becuase the given rootDir is itself not absolute: ${rootDir}`)
  }
  if (path.isAbsolute(somePath)) {
    return somePath
  }
  return path.join(rootDir, somePath)
}

export function assertPathExists(somePath: string, customMessage?: string) {
  if (!fs.exists(somePath)) {
    const message = customMessage ?? `The given path does not exist: ${somePath}`
    throw new Error(message)
  }
}

export function assertDirExists(somePath: string, customMessage?: string) {
  const result = fs.exists(somePath)
  if (result !== 'dir') {
    const message =
      customMessage ??
      (result === false
        ? `The given path does not exist: ${somePath}`
        : `The given path is not a directory: ${somePath}`)
    throw new Error(message)
  }
}

export function assertFileExists(somePath: string, customMessage?: string) {
  const result = fs.exists(somePath)
  if (result !== 'file') {
    const message =
      customMessage ??
      (result === false
        ? `The given path does not exist: ${somePath}`
        : `The given path is not a file: ${somePath}`)
    throw new Error(message)
  }
}

export function assertPathAbsolute(somePath: string, customMessage?: string) {
  if (!path.isAbsolute(somePath)) {
    const message = customMessage ?? `The given path is not absolute: ${somePath}`
    throw new Error(message)
  }
}

export function downloadPackageTarball(tarballUrl: string, toFilePath: string): Promise<void> {
  const writer = fs.createWriteStream(toFilePath)
  got.get(tarballUrl, { responseType: 'json', isStream: true }).pipe(writer)

  return new Promise<void>((resolve, reject) => {
    writer.on('finish', () => resolve())
    writer.on('error', reject)
  })
}

export async function getPackageVersionTarballUrl(
  packageName: string,
  packageVersion?: string
): Promise<string> {
  const { body } = await got.get<any>(`https://registry.npmjs.org/${packageName}`, { responseType: 'json' })

  if (typeof body !== 'object' || body === null) {
    throw new Error('Returned body was not an object')
  }

  let tarballUrl: string

  if (packageVersion) {
    console.log({packageVersion});
    if(!body.versions){
      throw new Error(
        `Package \`${packageName}\` has no versions`
      )
    }
    const versionData = body.versions[packageVersion]
    if (!versionData) {
      throw new Error(
`Package "${packageName}" has not such version "${packageVersion}". 
Available Versions: 
  ${Object.keys(body?.versions)?.join('\n  ')}
`)
    }
    const versionTarballUrl = versionData.dist.tarball
    tarballUrl = versionTarballUrl
  } else {
    const latestVersion = body['dist-tags'].latest
    const latestVersionData = body.versions[latestVersion]
    const latestVersionTarballUrl = latestVersionData.dist.tarball
    tarballUrl = latestVersionTarballUrl
  }

  return tarballUrl
}

export async function downloadPackage({
  name,
  version,
  downloadDir,
}: {
  version?: string
  name: string
  downloadDir: string
}): Promise<void> {
  const tarballDownloadDir = `${downloadDir}-tarball`
  const tarballDecompressDir = `${downloadDir}-tarball-decompressed`
  const tarballUrl = await getPackageVersionTarballUrl(name, version)
  await downloadPackageTarball(tarballUrl, tarballDownloadDir)
  await decompress(tarballDownloadDir, tarballDecompressDir)
  console.log({tarballDecompressDir});
  const folders = fs.inspectTree(tarballDecompressDir)?.children.reduce((acc,item) => {
    if(item.type === 'dir') acc.push(item.name)
    return acc
  }, [] as string [])
  console.log({folders});
  folders && fs.move(path.join(tarballDecompressDir, folders[0]), downloadDir, { overwrite: true })
}

export function getPackageMain(packageJson: PackageJson) {
  return packageJson.main ? JsFilePathToTsDeclarationFilePath(packageJson.main) : './index.d.ts'
}
export function getPackageTypesEntry(packageJson: PackageJson) {
  return packageJson.types ? packageJson.types : packageJson.typings ? packageJson.typings : './index.d.ts' 
}

export function getEntryPoint(projectDir: string, mainEntry: string, typesEntry: string){
  if(mainEntry && fs.exists(path.join(projectDir, mainEntry))) return path.join(projectDir, mainEntry)
  if(typesEntry && fs.exists(path.join(projectDir, typesEntry))) return path.join(projectDir, typesEntry)
  throw new Error('No Entry Point Found')
}
export function JsFilePathToTsDeclarationFilePath(jsFilePath: string) {
  const { dir, name, ext } = path.parse(jsFilePath)

  if (ext) {
    return path.join(dir, `${name}.d.ts`)
  }

  /**
   * jsfilePath appears to be pointing at a directory
   * with in node means to look for an index.js file within.
   */

  return path.join(jsFilePath, `index.d.ts`)
}

/**
 * Turn the file path into a module path. The difference from a file path
 * is that:
 *
 * - Does not have a file extension
 * - Is always in posix format
 * - If file is an index.* then dropped in favour of Node inference
 *
 * If the file path is already actually a module path then this is effectively a no-op.
 */
export function pathToModulePath(filePath: string) {
  const parsed = path.posix.parse(filePath)

  /**
   * If an index.* module then drop it as Node will infer it
   */
  if (parsed.name === 'index') {
    return parsed.dir
  }

  return path.posix.join(parsed.dir, parsed.name)
}
