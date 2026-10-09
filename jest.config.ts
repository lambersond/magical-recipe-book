import nextJest from 'next/jest.js'
import type { Config } from 'jest'

// Match the `dev` script so date rendering doesn't depend on the machine's
// timezone. Set before Jest spawns its workers so they inherit it.
process.env.TZ = 'UTC'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    'src/app/api/auth/(.*)',
    'src/clients/*',
    'auth-providers.ts',
    'auth.ts',
    'index.ts',
    'mocks/',
    'types.ts',
    'types/',
    'utils/test-utils-node.ts',
    'utils/test-utils.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'json-summary', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    // Its package exports only an `import` condition, which Jest's CommonJS
    // resolver skips; transpilePackages in next.config handles the ESM.
    '^@lambersond/3d-dice-core$':
      '<rootDir>/node_modules/@lambersond/3d-dice-core/dist/index.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
