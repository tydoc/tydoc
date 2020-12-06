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
      tsconfig: './tsconfig.json',
      diagnostics: Boolean(process.env.CI),
    },
  },
  watchPathIgnorePatterns: ['<rootDir>/dist/'],
}
