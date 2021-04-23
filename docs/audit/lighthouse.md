
# Generating Lighthouse reports

Run `npm run lighthouse -- --url=<URL_TO_TEST> --sid=<JSESSIONID>`

## URL_TO_TEST
The url to be tested

## JSESSIONID
For authenticated pages, JSESSION_ID is required to get a user logged in

# Accessing reports

## Report file

A html report can be accessed at: `<root>/cap-loyalty-ui/webapp/internals/lighthouse/reports/*.html`

## Report log

Once the npm commands executes successfully, the respective score is logged on to the CLI

# Custom config

## Thresholds

The threshold for the respective parameters can be passed as a cli arguments like: `--performance=10`

## Extra Config

Other config and options can be passed similary as cli arguments. Please refer [here](https://www.npmjs.com/package/lighthouse) for the respective configs
