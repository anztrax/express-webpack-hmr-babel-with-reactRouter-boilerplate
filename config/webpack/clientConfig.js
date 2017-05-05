const path = require('path');
const merge = require('webpack-merge');
const parts = require('../../libs/parts');

const dist = path.join(__dirname, '../../dist');
const PATHS = {
  clientApp : path.join(__dirname,'../../client.js'),
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
    entry: PATHS.clientApp,
    output: {
      path: dist,
      filename: 'client.js'
    },
    devtool: 'source-map',
    resolve : {
      extensions : ['.js','.jsx']
    },
  },
  parts.loadJSX([
    PATHS.clientApp,
    PATHS.appPath
  ]),
  parts.copyModule(PATHS.moduleList),
  parts.setupCSS(PATHS.style),
  parts.enableReactPerformanceTools()
);

module.exports = clientConfig;