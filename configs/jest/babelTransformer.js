const babelJest = require('babel-jest');
const getBabelLoadOptions = require('../webpack/babel-loader-options');

const env = { test: true };
module.exports = babelJest.createTransformer(
	getBabelLoadOptions(env, {})
);
