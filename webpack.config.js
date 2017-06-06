const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app
  },
  resolve:{
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      include: PATHS.app
    },{
      test: /\.jsx?$/,
      loaders: ['babel-loader?cacheDirectory'],
      include: PATHS.app
    }]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,
      devtool: 'eval-source-map',
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      public: 'lean-pro-react-zgunz.c9users.io',
      host: process.env.IP,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true
      })
    ]
  });
  
}
if (TARGET === 'build') {
  module.exports = merge(common, {});
}