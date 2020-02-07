export * from './lib'
export { cFunction } from './lib-2'

interface App {
  server: () => any
  inputObjectType: () => any
}

function createApp(): App {
  return {
    a: 'b',
    c: 'd'
  } as any
}

/**
 * yeaaaah
 */
export const a = createApp()
