const process = require('process')

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./test/setup.ts'],
  watchPlugins: [
    'jest-watch-suspend',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    [
      'jest-watch-toggle-config',
      {
        setting: 'verbose',
      },
    ],
    [
      'jest-watch-toggle-config',
      {
        setting: 'bail',
      },
    ],
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'test/tsconfig.json',
      diagnostics: Boolean(process.env.CI),
    },
  },
  watchPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/oclif.manifest.json'],
}
