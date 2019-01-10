'use strict';

/* @flow */

const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack');
const babelConfig = require('../babel.config');

/**
 * XXX: Removes the babel-plugin-root-import.
 * We are using an alias in the webpack, but
 * jest needs the root babel config.
 */
babelConfig.plugins.pop();

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  target: 'node',
  devtool: 'source-map',
  optimization: {
    /**
     * If we minimise our code we lose the ability to get exact line numbers
     * in cloudwatch.
     */
    minimize: false,
  },
  entry: slsw.lib.entries,
  plugins: [
    new webpack.DefinePlugin({
      /**
       * We define the stage name here as an environment variable so that
       * everything run without serverless has access to the variables defined
       * in the respective serverless.js files.
       * E.g. the database connector inside lambda functions will have the
       * correct database-table-name.
       */
      'process.env.STAGE_NAME': JSON.stringify(slsw.lib.options.stage),
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // We import the babel presets here since the babel-loader gets confused
          // if files are outside the $pwd
          // @see https://github.com/babel/babel-loader/issues/293
          // @see https://github.com/babel/babel-loader/issues/552
          options: {
            ...babelConfig,
          },
        },
      },
    ],
  },
};
