const prodBrowsers = [
	'last 2 versions',
	'ie 11',
	'ff 16',
	'safari 6',
]
const devBrowsers = [ 'last 1 Chrome major version' ]


module.exports = (isProduction) => (isProduction ? prodBrowsers : devBrowsers)
