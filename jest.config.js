module.exports = {
  testMatch: [
    '<rootDir>/test/unit/**/*.spec.ts'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'vue',
    'json',
    'yml'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(yml)$': 'jest-yaml-transform'
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue'
  ],
  coverageDirectory: '<rootDir>/tmp/coverage'
}
