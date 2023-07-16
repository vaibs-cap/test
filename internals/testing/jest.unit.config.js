module.exports = {
  rootDir: '../../',
  roots: ['<rootDir>/app/src'],
  verbose: true,
  moduleFileExtensions: ['js'],
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/internals/testing/jest.setup.js'],
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: [
    '<rootDir>/.storybook/',
    '.integration.(test|spec).(js|jsx|ts|tsx)', //files ending with integration.test.js will be skipped
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/reports/coverage',
  collectCoverageFrom: [
    '**/app/src/**/*.js',
    // '**/app/components/**/*.js',
    // '!**/app/**/i18n.js',
    // '!**/app/**/initialState.js',
    // '!**/app/**/constants.js',
    // '!**/app/**/Loadable.js',
    // '!**/app/**/index.js',
    // '!**/app/**/tests/data.js',
    // '!**/app/**/mocks/*.js',
    // '!**/app/**/*.schema.js',
    // '!**/app/**/*.config.js',
    // '!**/app/**/*.style.js',
    // '!**/app/**/style.js',
    // '!**/app/**/actions.js',
    // '!**/app/**/*.stories.js',
    // '!**/app/**/messages.js',
    // '!**/app/**/*.snap',
    // '!**/app/**/config/*.js',
  ],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/app/components/$1',
    '^utils(.*)$': '<rootDir>/app/utils/$1',
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/internals/testing/assetsTransformer.js", "\\.(css|less|scss)$": "<rootDir>/internals/testing/assetsTransformer.js",
  },
  coverageReporters: [
    'lcov',
    'json',
    'text',
    'text-summary'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: [
    "node_modules/(?!(@capillarytech" + ")/)",
  ],
  coveragePathIgnorePatterns: [
    '.tests.integration.',
    'mockdata',
    'mockData'
  ],
};
