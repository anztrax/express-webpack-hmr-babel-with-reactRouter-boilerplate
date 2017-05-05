const path = require('path');
const merge = require('webpack-merge');
const parts = require('../../libs/parts');

const PATHS = {
  dist : path.join(__dirname, '../../dist'),
  serverRenderer : path.join(__dirname,'../../render/serverRenderer.js'),
  appPath : path.join(__dirname,'../../app'),
  moduleList : [
    {
      from : path.join(__dirname, '../../node_modules/monaco-editor/min/vs'),
      to : path.join(__dirname, '../../dist/show/vs')
    }
  ]
};

const serverConfig = merge(
  {
    name: 'server',
    target: 'node',
    entry: PATHS.serverRenderer,
    output: {
      path: PATHS.dist,
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    resolve : {
      extensions : ['.js','.jsx']
    },
  },
  parts.loadJSX([
    PATHS.appPath,
    PATHS.serverRenderer
  ]),
  parts.copyModule(PATHS.moduleList)
);

module.exports = serverConfig;