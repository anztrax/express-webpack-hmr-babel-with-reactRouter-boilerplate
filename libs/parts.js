const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

exports.loadJSX = function(include){
  return{
    module : {
      loaders : [
        {
          test : /\.(js|jsx)$/,
          // Enable caching for extra performance
          loaders : ['babel-loader?cacheDirectory'],
          include : include
        }
      ]
    }
  }
}

exports.enableReactPerformanceTools = function(){
  return {
    module : {
      loaders : [
        {
          test : require.resolve('react'),
          loader : 'expose-loader?React'
        }
      ]
    }
  }
};


exports.minify = function(){
  return {
    plugins : [
      new webpack.optimize.UglifyJsPlugin({
        compress : {
          warnings : false
        }
      })
    ]
  }
};

exports.setFreeVariable = function(key, value){
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins : [
      new webpack.DefinePlugin(env)
    ]
  }
};

exports.extractBundle = function(options){
  const entry = {};
  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry : entry,
    plugins : [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names : [options.name, 'manifest'],

        //options.name modules only
        minChunks : Infinity
      })
    ]
  };
};

exports.clean = function(path){
  return {
    plugins: [
      new CleanWebpackPlugin([path],{
        root : process.cwd()
      })
    ]
  }
};

exports.extractCSS = function(paths){
  return {
    module : {
      loaders : [
        // Extract CSS during build
        {
          test : /\.css$/,
          loader : ExtractTextPlugin.extract('style','css'),
          include : paths
        }
      ]
    },
    plugins : [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  }
};

exports.copyModule = function(moduleList){

  return {
    plugins : [
      new CopyWebpackPlugin(moduleList)
    ]
  }
};