const config = {
  preset: 'ts-jest',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/__tests__/**/*',
    '!**/*.d.ts',
    '!**/*.stories.tsx',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-styled-components',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['__tests__/testUtils/'],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest'],
    '^.+\\.(svg)$': 'jest-transformer-svg',
  },
};

module.exports = config;
