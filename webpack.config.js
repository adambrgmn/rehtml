/* eslint-disable no-use-before-define */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
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

const common = {
  devtool: 'source-map',
  entry: config.paths.entry,
  output: {
    path: config.paths.dist,
    library: config.library,
    libraryTarget: 'umd',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
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
  plugins: [],
};

if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'eval',
    output: { filename: `${config.filename}.js` },
  });
}

if (TARGET === 'build:min') {
  module.exports = merge(common, {
    devtool: 'source-map',
    output: { filename: `${config.filename}.min.js` },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        comments: false,
      }),
    ],
  });
}

if (TARGET === '') {
  module.exports = {};
}


// Helper functions
function joinWithRoot(...args) {
  return path.join(__dirname, ...args);
}

function capFirst(str) {
  const splitted = str.split('').map((c, i) => (i === 0 ? c.toUpperCase() : c));
  return splitted.join('');
}
