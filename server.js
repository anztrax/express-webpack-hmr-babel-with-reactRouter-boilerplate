import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import config from './config/webpack/webpack.config.js';
import serverConfig from './config/server';
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

app.listen(serverConfig.PORT, () => {
  console.log(`Server started: http://localhost:${serverConfig.PORT}/`);
});
