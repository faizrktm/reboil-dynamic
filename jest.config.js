module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': require.resolve('./test/style-mock.js'), // mock styling import
  },
  moduleDirectories: ['node_modules', 'test', __dirname],
};
