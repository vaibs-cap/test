const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const antThemeVars = require('../ant-theme-vars');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[md5:contenthash:hex:20].css',
  disable: true,
});
// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode, plugins = [] }) => {
  // `mode` has a value of 'development' or 'production'
  // You can change the configuration based on that.
  // 'production' is used when building the static version of storybook.

  config.resolve.modules.push(
    path.resolve(__dirname, './node_modules')
  );

  config.node = {
    fs: 'empty',
  };

  config.plugins.push(extractSass);

  config.plugins.concat([
    new webpack.ProvidePlugin({
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]);

  config.module = {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules\/(?!@capillarytech)/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules\/(?!@capillarytech)/,
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader', 'sass-loader?sourceMap'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
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
  };


  config.resolve = {
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
  };

  // Return the modified config
  return config;
};
