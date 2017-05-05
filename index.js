const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('./config/webpack/webpack.config.js');
const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
	noInfo: true
}));
app.use(webpackHotServerMiddleware(compiler, {
	serverRendererOptions: {
		foo: 'Bar'
	}
}));

app.listen(6080, () => {
	console.log('Server started: http://localhost:6080/');
});
