module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/client'],
  globalSetup: './tests/setup.js',
  globalTeardown: './tests/teardown.js',
  testEnvironment: './tests/mongo-environment.js'
};
