const paths = require('../paths');
const getBabelLoadOptions = require('./babel-loader-options');


module.exports = (env, argv) => ({
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				include: [paths.source],
				use: {
					loader: 'babel-loader',
					options: getBabelLoadOptions(env, argv),
				},
			},
		],
	},
});
