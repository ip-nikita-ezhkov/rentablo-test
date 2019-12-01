const webpack = require('webpack');
const paths = require('../paths');


const getPlugins = (isProduction) => ([
	!isProduction && new webpack.HotModuleReplacementPlugin(),
].filter(Boolean));

module.exports = (env, argv) => ({
	devtool: env.production ? 'source-map' : 'cheap-module-source-map',
	devServer: {
		contentBase: paths.build,
		proxy: {
			'/api/' : {
				target : 'https://sandbox.rentablo.de/',
				secure : true,
				changeOrigin : true,
			},
		},
	},
	plugins: getPlugins(env.production),
});
