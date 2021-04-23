const lighthouse = require('lighthouse');
const fs = require('fs');
const chromeLauncher = require('chrome-launcher');
const { argv } = require('yargs');
const { defaultThreshold, options, configuration } = require('./config');

const launchChromeAndRunLighthouse = async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: options.chromeFlags });
  const { url, sid } = argv;
  const args = [
    url,
    {
      extraHeaders: {
        Cookie: `JSESSIONID=${sid}`
      },
      ...options,
      output: 'html',
      port: chrome.port
    },
    configuration,
  ];
  const results = await lighthouse(...args);
  const { report } = results;
  await chrome.kill();
  const path = url.substring(url.lastIndexOf('/') + 1);
  const reportDirectory = './internals/lighthouse/reports';
  const reportPath = `${reportDirectory}/report-${path}.html`;
  if (!fs.existsSync(reportDirectory)) {
    fs.mkdirSync(reportDirectory);
  }
  fs.createWriteStream(reportPath);
  fs.writeFileSync(reportPath, report, err => {
    if (err) {
      console.error(err);
    }
    console.log(`Report generated under -- ${reportPath}`);
  });
  return results.lhr;
};

const processResults = results => {
  const { categories } = results;
  const categoryStatus = {};
  let status = true;

  try {
    Object.keys(categories).forEach(item => {
      const categoryScore = categories[item].score * 100;
      const threshold = typeof argv[item] !== 'undefined' ? argv[item] : defaultThreshold[item];
      const itemStatus = threshold <= categoryScore;
      status = status && itemStatus;
      categoryStatus[item] = itemStatus;

      console.log(`${item} --> score: ${categoryScore} | threshold: ${threshold}`);
    });
  } catch (err) {
    console.error(err);
    status = false;
  }
  return process.exit(Number(!status));
};

launchChromeAndRunLighthouse().then(processResults);