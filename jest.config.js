module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/client'],
  globalSetup: './__jest__/setup.js',
  globalTeardown: './__jest__/teardown.js',
  testEnvironment: './__jest__/mongo-environment.js'
};
