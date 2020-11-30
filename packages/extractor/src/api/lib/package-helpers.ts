import * as fs from 'fs-jetpack'
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
