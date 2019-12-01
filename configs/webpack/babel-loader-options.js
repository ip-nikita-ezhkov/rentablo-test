const getBrowsers = require('../browserList');

module.exports = (env, argv) => ({
	babelrc: false,
	sourceMaps: true,
	presets: [
		[
			'@babel/preset-env',
			{
				modules: env.test ? undefined : false,
				targets: {
					browsers: getBrowsers(env.production),
				},
			},
		],
		[
			'@babel/preset-react',
			{
				development: !env.production,
			},
		],
		[
			'@babel/preset-typescript',
			{
				isTSX: true,
				allExtensions: true,
			},
		],
	],
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: {
					version: 3,
					proposals: true,
				},
			},
		],
		'@babel/plugin-proposal-object-rest-spread',
	],
});


