# Rentablo

### Prerequisites

Required [Node.js](https://nodejs.org) v12+. Convenient way to manage node.js versions is [NVM](https://github.com/creationix/nvm)

## Getting Started
Let's start by installing root dependencies
```sh
$ npm install
```

## Serving
Start [webpack-dev-server](https://github.com/webpack/webpack-dev-server) with proxy to renatblo sandbox
```sh
$ npm run dev
```

## Building
Create a production build
```sh
$ npm run build
```

## Testing
Runs a test suits with a [jest](https://jestjs.io/)
To run all tests. Useful to test by CI/CD
```sh
$ npm run test
```
To run tests in watch mode. Useful to test while develop
```sh
$ npm run test:watch
```
