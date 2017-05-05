const path = require('path');
const merge = require('webpack-merge');
const parts = require('../../libs/parts');

const dist = path.join(__dirname, '../../dist');
const PATHS = {
  serverApp : path.join(__dirname,'../../server.js'),
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
    entry: PATHS.serverApp,
    output: {
      path: dist,
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    resolve : {
      extensions : ['.js','.jsx']
    },
  },
  parts.loadJSX(PATHS.clientApp),
  parts.copyModule(PATHS.moduleList),
  parts.setupCSS(PATHS.style),
  parts.enableReactPerformanceTools()
);

module.exports = serverConfig;