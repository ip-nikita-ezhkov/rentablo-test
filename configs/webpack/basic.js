const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-plugin');
const paths = require('../paths');


module.exports = (env, argv) => ({
	entry: [path.join(paths.source, 'index.tsx')],
	mode: env.production ? 'production' : 'development',
	output: {
		filename: env.production ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
		path: paths.build,
		publicPath: '/',
	},
	resolve: {
		modules: [paths.source, 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		new FriendlyErrorsPlugin(),
	],
});
