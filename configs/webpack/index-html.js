const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const paths = require('../paths');


const getTemplatePath = (isProduction) => path.join(
	paths.templates,
	isProduction ? 'prod.ejs' : 'dev.ejs'
);

module.exports = (env, argv) => ({
	plugins: [
		new HtmlWebpackPlugin({
			template: getTemplatePath(env.production),
		}),
	],
});
