const { argv } = require('yargs');

const argvOptions = () => {
  const argvOptionObject = {};
  try {
    const { options } = argv;
    const optionList = options ? options.split(',') : [];
    optionList.forEach(item => {
      const [key, value] = item.split(':');
      argvOptionObject[key] = value;
    });
  } catch (err) {
    console.error(err);
  }
  return argvOptionObject;
};

const defaultThreshold = {
  performance: 10,
  'best-practices': 80,
};

const options = {
  chromeFlags: ['--headless'],
  onlyCategories: Object.keys(defaultThreshold),
  emulatedFormFactor: "desktop",
  ...argvOptions(),
};

const configuration = null;

module.exports = {
  defaultThreshold,
  options,
  configuration,
};
