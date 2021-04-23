
# Testing the size

## Built code analysis

Run `npm run size`
- This will refer the `.size-limit.json` file for file paths and their respective size
- If the run does not meet the standards then this command will fail
- The report can be accessed by running `npm run size -- --why` at `http://localhost:8888/`

## Dev code analysis

This is done whenever we start the dev server by - `npm run start`
- The report can be accessed at `http://localhost:8006/`
