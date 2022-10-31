# Cap React Starter Kit

## Features 🎉

* Faster builds.
* React fast refresh - that preserves local state when app is updated.
* Atomic Folder Structure
* Redux + Redux-Saga for state management
* Styled Components
* Dynamic reducer/saga injection
* Javascript and styles linting
* Component scaffolding
* App audit using lighthouse, size-limit and sonar
* Storybook integrated with react-live playground
* Jest testing framework with react testing library for unit and integration tests

## Topics to refer

* [Audit](docs/audit/README.md)
* [CSS](docs/css/README.md)
* [JS](docs/js/README.md)
* [Maintenance](docs/maintenance/README.md)
* [Testing](docs/testing/README.md)
* [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/)

## Installation

Dependencies should be installed using the npm
command line tools.

Install dependencies using `npm`.

```sh
npm install
```

## Scripts

* **install** - install the dependencies
* **clean install** - remove dependencies and reinstall the dependencies
* **start** - serve in development environment
* **build** - Make production build
* **build:analyze** - Make production build along with bundle analyzer. This is meant to run locally.
* **lint** - Run javascript linting and style linting. (Also used as a precommit hook)
* **test** - Run all unit and integration jest test suites
* **test:unit** - Run all unit jest test suites
* **test:integration** - Run all integration jest test suites
* **lighthouse** - Does a lighthouse audit for the webpage
* **size** - Does a size audit for the app
* **sonar** - Does a sonar audit for the app
* **storybook** - Run storybook server (port 9001)
* **generate** - Used for scaffolding components. (Refer scaffolding section)

