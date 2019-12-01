const merge = require('webpack-merge')

const getBasic = require('./basic')
const getIndexHtml = require('./index-html')
const getTypescript = require('./typescript')
const getDevtool = require('./devtool')
const getStyles = require('./styles')
const getGraphics = require('./graphics')


module.exports = (env = {}, argv = {}) => merge([
	getBasic(env, argv),
	getIndexHtml(env, argv),
	getTypescript(env, argv),
	getDevtool(env, argv),
	getStyles(env, argv),
	getGraphics(env, argv),
])
