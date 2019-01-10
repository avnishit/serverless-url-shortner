'use strict';

/* @flow */

const webpackMerge = require('webpack-merge');
const webpackDefault = require('../webpack.default.config');

module.exports = webpackMerge(webpackDefault);
