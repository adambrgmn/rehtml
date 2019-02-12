module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
    'jest-dom/extend-expect',
  ],
};
