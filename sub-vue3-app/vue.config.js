const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name;

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'build',
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      // jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
  devServer: {
    port: 3003,
    open: false,
    //开启跨域
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
})
