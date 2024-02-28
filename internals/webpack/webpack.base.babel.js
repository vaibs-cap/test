/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');//rollback to this if style breaks
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BugsnagPlugin = require('webpack-bugsnag-plugins');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const pathConfig = require('../../app/config/path');
const antThemeVars = require('../../ant-theme-vars');

// @todo modify these when bootstrapping a new Application and remove this comment
const bugsnagApiKey = 'e4e14820a689507c77b5c5e2b10236fa';
const bugsnagAppVersion = `library_management_app__${new Date().getTime()}`;

//rollback to this if any style breaks
// const extractSass = new ExtractTextPlugin({
//   filename: '[name].[md5:contenthash:hex:20].css',
//   disable: true,
// });
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css',
});
module.exports = options => ({
  mode: options.mode,
  node: {
    fs: 'empty',
  },
  entry: options.entry,
  stats: options.stats,
  output: Object.assign(
    {
      // Compile into js/dist.js
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: pathConfig.prefixPath,
    },
    options.output,
  ), // Merge with env dependent settings
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx', // Remove this if you're not using JSX
          target: 'es2015', // Syntax to compile to (see options below for possible values)
        },
        exclude: /node_modules\/(?!@capillarytech)|cap-react-ui-library|cap-style-guide|cap-ui-library/
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        use: [
          {
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader',
            options: options.babelQuery,
          },
        ],
        include: /cap-react-ui-library|cap-style-guide|cap-ui-library/,
        exclude: /cap-react-ui-library\/node_modules|cap-style-guide\/node_modules|cap-ui-library\/node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules\/(?!@capillarytech)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: antThemeVars,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        // // Do not transform vendor's CSS with CSS-modules
        // // The point is that they remain in global scope.
        // // Since we require these CSS files in our JS or CSS files,
        // // they will be a part of our compilation either way.
        // // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.csv$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
    // extractSass,
    miniCssExtractPlugin,

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      BUGSNAG_APP_VERSION: JSON.stringify(bugsnagAppVersion),
      BUGSNAG_API_KEY: JSON.stringify(bugsnagApiKey),
    }),
    new webpack.NamedModulesPlugin(),
    options.mode === 'production'
      ? new BugsnagPlugin.BugsnagSourceMapUploaderPlugin({
          apiKey: bugsnagApiKey,
          appVersion: bugsnagAppVersion,
        })
      : new ProgressBarPlugin({
          format: `  build [:bar] ${chalk.green.bold(
            ':percent',
          )} (:elapsed seconds)`,
          clear: false,
          complete: chalk.bgGreen(' '),
          incomplete: chalk.bgWhite(' '),
        }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    alias: {
      moment$: 'moment/moment.js',
      react: path.resolve('node_modules/react'),
      'react-dom': path.resolve('node_modules/react-dom'),
      antd: path.resolve('node_modules/antd'),
      'react-helmet': path.resolve('node_modules/react-helmet'),
      'react-intl': path.resolve('node_modules/react-intl'),
      'react-redux': path.resolve('node_modules/react-redux'),
      'redux-saga': path.resolve('node_modules/redux-saga'),
      'styled-components': path.resolve('node_modules/styled-components'),
      'react-router': path.resolve('node_modules/react-router'),
      '@capillarytech/cap-ui-library': path.resolve(
        'node_modules/@capillarytech/cap-ui-library',
      ),
    },
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  optimization: options.optimization,
});
