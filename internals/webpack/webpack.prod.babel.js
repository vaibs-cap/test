// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //eslint-disable-line
const CompressionPlugin = require('brotli-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const bundleAnalyzerEnabled = process.env.ANALYZE === 'true';

bundleAnalyzer = [];

// enable when build steps analysis is required to see which steps n plugins take more time
const smp = new SpeedMeasurePlugin({
  disable: !bundleAnalyzerEnabled,
  // disable: false,
  outputFormat: "human", // detailed logs
  granularLoaderData: false,
});

if(bundleAnalyzerEnabled){
  bundleAnalyzer.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../analysis/report.html',
      defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: '../analysis/stats.json',
      statsOptions: {
        source: false,
      },
      logLevel: 'info',
    })
  )
}

module.exports = smp.wrap(require('./webpack.base.babel')({
  mode: 'production',
  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'app/app.js')],
  devtool: 'source-map',
  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  stats: {
    warnings: false,
    children: false,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015', // Syntax to compile to (see options below for possible values)
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        capLibrary: {
          test: /[\\/]node_modules[\\/](@capillarytech)[\\/]/,
          name: 'capLibrary',
          chunks: 'all',
        },
        commons: {
          test: /[\\/]node_modules[\\/](?!@capillarytech)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        main: {
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    ...bundleAnalyzer,

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      favicon: 'app/favicon.ico',
    }),

    // new CompressionPlugin({
    //   asset: '[path].br[query]',
    //   test: /\.(js|css|html)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
  ],

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)), //eslint-disable-line
  },
}));
