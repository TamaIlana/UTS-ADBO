module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Memastikan Jest mencari file di folder tests yang Anda miliki
  testMatch: ['**/tests/**/*.test.ts'],
};