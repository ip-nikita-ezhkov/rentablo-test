const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const getBrowsers = require('../browserList');
const paths = require('../paths');


const getLocalIdentName = (isProduction) =>
	(isProduction ? '[hash:base64:8]' : '[path][name]__[local]--[hash:base64:5]');

// loaders getters
const getCssLoaders = (env, argv, withModules) => ([
	env.production ? MiniCssExtractPlugin.loader : 'style-loader',
	{
		loader: 'css-loader',
		options: {
			url: false,
			import: false,
			modules: withModules
				?  {
					localIdentName: getLocalIdentName(env.production),
				}
				: false
			,
			sourceMap: true,
			// 1 => postcss-loader
			importLoaders: 1,
			localsConvention: 'dashesOnly',
		},
	},
	{
		loader: 'postcss-loader',
		options: {
			sourceMap: true,
			plugins: (loader) => [
				autoprefixer({ overrideBrowserslist: getBrowsers(env.production) }),
				cssnano(),
			],
		},
	},
]);

module.exports = (env, argv) => ({
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.css$/,
						resourceQuery: /^\?raw$/,
						include: [/node_modules/, paths.source],
						use: getCssLoaders(env, argv, false),
					},
					{
						test: /\.css$/,
						include: [/node_modules/, paths.source],
						use: getCssLoaders(env, argv, true),
					},
				],
			},
		],
	},
	plugins: [
		env.production && new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css',
		}),
	].filter(Boolean),
});
