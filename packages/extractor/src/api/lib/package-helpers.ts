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
    const versionData = body.versions[packageVersion]
    if (!versionData) {
      throw new Error(
        `Package "${packageName}" has not such version "${packageVersion}". Versions it has are: ${body.versions.join(
          ', '
        )}`
      )
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

export async function downloadPackage(packageName: string, dir: string): Promise<void> {
  const tarballDownloadDir = `${dir}-tarball`
  const tarballUrl = await getPackageVersionTarballUrl(packageName)
  await downloadPackageTarball(tarballUrl, tarballDownloadDir)
  await decompress(tarballDownloadDir, dir)
}
