const process = require('process')

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./test/__setup__.ts'],
  watchPlugins: ['jest-watch-suspend', 'jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      diagnostics: Boolean(process.env.CI),
    },
  },
  // NOTE we're not using path mapping here
  // moduleNameMapper: {
  // '^@tydoc/(.*)$': '<rootDir>/source/$1',
  // '^@tydoc/extractor': '<rootDir>/../extractor/source',
  // },
  watchPathIgnorePatterns: ['<rootDir>/dist/'],
}
