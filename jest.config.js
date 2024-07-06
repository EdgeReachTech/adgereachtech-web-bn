module.exports = {
    transform: {
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    detectOpenHandles: true,
    testEnvironment: 'node',
    testMatch: ['**/*.test.js', '**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: false,
    collectCoverageFrom: [
      'src/**/*.{ts,tsx,js,jsx}',
      '!src/**/*.d.ts',
    ],
    coverageReporters: ['text', 'lcov'],
    verbose: true,
  };
  