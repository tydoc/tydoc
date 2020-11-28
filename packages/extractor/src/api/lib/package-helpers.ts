import * as fs from 'fs-jetpack'
import * as path from 'path'
import { PackageJson, TsConfigJson } from 'type-fest'

export function readPackageJson(dir: string): null | PackageJson {
  return fs.read(path.join(dir, 'package.json'), 'json') ?? null
}

export function readTsconfigJson(dir: string): null | TsConfigJson {
  return fs.read(path.join(dir, 'tsconfig.json'), 'json') ?? null
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
    const message = customMessage ?? `The given path is not absolute: ${somePath}`
    throw new Error(`The given path does not exist: ${somePath}`)
  }
}

export function assertPathAbsolute(somePath: string, customMessage?: string) {
  if (!path.isAbsolute(somePath)) {
    const message = customMessage ?? `The given path is not absolute: ${somePath}`
    throw new Error(message)
  }
}
