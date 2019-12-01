const paths = require('../paths');


const includePath = [paths.source];

module.exports = (env, argv) => ({
	module: {
		rules: [{
			test: /\.(gif|ico|jpe?g|png)$/,
			include: includePath,
			exclude: /node_modules/,
			use: [ {
				loader: 'file-loader',
				query: {
					name: '[path][name].[ext]?[hash:4]',
				},
			}],
		}, {
			test: /\.svg$/,
			include: includePath,
			exclude: /node_modules/,
			use: [{
				loader: 'svg-url-loader',
				query: {
					limit: 1024,
					noquotes: true,
					name: '[path][sha512:hash:base64:7].[ext]',
				},
			}, {
				loader: 'image-webpack-loader',
				query: {
					bypassOnDebug: false,
				},
			}],
		}],
	},
});
