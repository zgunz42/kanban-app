const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const NpmInstall = require("npm-install-webpack-plugin");

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};
process.env.BABEL_ENV = TARGET;

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
    loaders: [
      {
        // Jika regex test cocok makan loader akan digunakan
        test: /\.css$/,
        loaders: ['style', 'css'],
        // Dimana file yang kana kita ikutkan unutk di test
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app 
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Memperkecil output pada cmd windows
      stats: 'errors-only',

      //jika menggunakan pada c9.io
      host: process.env.IP,
      port: process.env.PORT,
      // agar bisa membuka lewat domain name
      public: 'lean-pro-react-zgunz.c9users.io'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // otomatis menginstall module pada file tanpa perlu lewat cli
      new NpmInstallPlugin({
        save: true  // --saved
      })
    ]
  });
  
}
if (TARGET === 'build') {
  module.exports = merge(common, {});
}