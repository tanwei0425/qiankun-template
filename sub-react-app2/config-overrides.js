const { name } = require('./package.json');
const path = require("path")
const { override, overrideDevServer, addWebpackAlias, watchAll } = require("customize-cra");

/**
 * devServer 自定义配置
 * @param {*} config 
 * @returns 
 */
const addDevServerConfig = () => (config) => {
    config.headers = config.headers || {}
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.historyApiFallback = true;
    config.hot = false;
    // CRA 实现指定了 env.PORT || 3000 端口，customize-cra 无法修改port 无能为力,open同上
    // config.port = 3001;
    // config.open = false;
    config.liveReload = false;
    return config;
}
/**
 * webpack 自定义配置
 * @param {*} config 
 * @returns 
 */
const addWebpackConfig = () => (config) => {
    //暴露webpack的配置 config ,evn
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    // jsonpFunction 在 webpack 4 中，多个 webpack 运行时可能会在同一个 HTML 页面上发生冲突，因为它们使用同一个全局变量进行代码块加载。为了解决这个问题，需要为 output.jsonpFunction 配置提供一个自定义的名称。
    // Webpack 5 确实会从 package.json name 中自动推断出一个唯一的构建名称，并将其作为 output.uniqueName 的默认值。
    // 这个值用于使所有潜在的冲突的全局变量成为唯一。
    // config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    return config;
}

module.exports = {
    webpack: override(
        addWebpackAlias({ //路径别名
            '@': path.resolve(__dirname, 'src'),
        }),
        addWebpackConfig(),
    ),
    devServer: overrideDevServer(
        addDevServerConfig(),
        // 一旦启用，CRA就会监听项目的所有文件，包括node_modules文件夹里的。
        // 使用它只要在运行时使用yarn start --watch-all命令就可以
        watchAll(),
    ),
};
