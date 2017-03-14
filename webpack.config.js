/* eslint-disable no-use-before-define */
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event || '';
const config = {
  paths: {
    dist: joinWithRoot('dist'),
    entry: joinWithRoot('src'),
  },
  filename: pkg.name,
  library: capFirst(pkg.name),
};

process.env.BABEL_ENV = TARGET;

module.exports = {
  entry: config.paths.entry,
  output: {
    filename: `${config.filename}.js`,
    path: config.paths.dist,
    library: config.library,
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
  },
  module: {
    rules: [{ test: /\.jsx?$/, loader: 'babel-loader' }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};


// Helper functions
function joinWithRoot(...args) {
  return path.join(__dirname, ...args);
}

function capFirst(str) {
  const splitted = str.split('');
  splitted[0].toUpperCase();
  return splitted.join('');
}
