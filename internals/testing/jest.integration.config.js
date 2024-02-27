module.exports = {
  rootDir: '../../',
<<<<<<< Updated upstream
  roots: ['<rootDir>/app/components'],
=======
  roots: ['<rootDir>/app/components/pages/NewBookRequest'],
>>>>>>> Stashed changes
  verbose: true,
  moduleFileExtensions: ['js'],
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/__mocks__/registerContext.js'],
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/jest.setup.js',
    '<rootDir>/__mocks__/integration/setupSVG.js',
  ],
  moduleDirectories: ['node_modules', 'app'],
  testPathIgnorePatterns: ['<rootDir>/.storybook/'],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/reports/coverage/integration',
  collectCoverageFrom: [
<<<<<<< Updated upstream
    '**/app/components/**',
=======
    '**/app/components/pages/NewBookRequest/**',
>>>>>>> Stashed changes
    // '**/app/components/**/*.js',
    // '!**/app/**/i18n.js',
    // '!**/app/**/initialState.js',
    // '!**/app/**/constants.js',
    // '!**/app/**/Loadable.js',
    // '!**/app/**/index.js',
    '!**/app/src/**/tests/*.js',
    // '!**/app/**/mocks/*.js',
    // '!**/app/**/*.schema.js',
    // '!**/app/**/*.config.js',
    // '!**/app/**/*.style.js',
    // '!**/app/**/style.js',
    // '!**/app/**/*.stories.js',
    // '!**/app/**/messages.js',
    // '!**/app/**/*.snap',
    // '!**/app/**/config/*.js',
  ],
  coveragePathIgnorePatterns: [
    '.tests.integration.',
    '.mockdata.',
    '.mockData.',
  ],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/app/components/$1',
    '^utils(.*)$': '<rootDir>/app/utils/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|csv)$':
      '<rootDir>/internals/testing/assetsTransformer.js',
    '\\.(css|less|scss)$': '<rootDir>/internals/testing/assetsTransformer.js',
  },
  coverageReporters: ['lcov', 'json', 'text', 'text-summary'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: [ 'node_modules/(?!(@capillarytech' + '|lodash-es' + ')/)',],
  testRegex: ['.integration.test.js'], //file consists of .integration.test.js,
};
