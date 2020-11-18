const path = require('path');
const configureAPI = require('./server/config.js');

module.exports = {
  devServer: {
    before: configureAPI
  },
  //本番用ビルドファイルの出力先
  outputDir: './client/dist',
  configureWebpack: (config) => {
    config.entry =  {
      app: path.resolve(__dirname, './client/src/main.js'),
    };
    config.resolve.alias = {
      '@': path.resolve(__dirname, './client/src/'),
    };
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap( args => {
        args[0].template = path.resolve(__dirname, './client/public/index.html');
        return args;
      })
  }
}