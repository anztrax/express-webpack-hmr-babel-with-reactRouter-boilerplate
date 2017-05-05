const path = require('path');
const merge = require('webpack-merge');
const parts = require('../../libs/parts');

const PATHS = {
  dist : path.join(__dirname, '../../dist'),
  clientRenderer : path.join(__dirname,'../../render/clientRenderer.js'),
  appPath : path.join(__dirname,'../../app'),
  moduleList : [
    {
      from : path.join(__dirname, 'node_modules/monaco-editor/min/vs'),
      to : path.join(__dirname, 'dist/show/vs')
    }
  ]
};

const clientConfig = merge(
  {
    name: 'client',
    target: 'web',
    entry: PATHS.clientRenderer,
    output: {
      path: PATHS.dist,
      filename: 'client.js'
    },
    devtool: 'source-map',
    resolve : {
      extensions : ['.js','.jsx']
    },
  },
  parts.loadJSX([
    PATHS.clientRenderer,
    PATHS.appPath
  ]),
  parts.copyModule(PATHS.moduleList)
);

module.exports = clientConfig;