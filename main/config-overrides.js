const path = require("path")
const {
    override,
    overrideDevServer,
    addBabelPlugin,
    addDecoratorsLegacy,
    addWebpackAlias,
    watchAll
} = require("customize-cra");
const productionStatus = process.env.NODE_ENV === 'production';
/**
 * devServer 自定义配置
 * @param {*} config 
 * @returns 
 */
const addDevServerConfig = () => (config) => {
    // 正式环境去掉打包生产map文件
    if (productionStatus) config.devtool = false;
    return config;
}
/**
 * webpack 自定义配置
 * @param {*} config 
 * @returns 
 */
const addWebpackConfig = () => (config) => {
    return config;
}

module.exports = {
    webpack: override(
        addBabelPlugin(
            [
                'import',
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                },
                'ant',
            ],
        ),
        addDecoratorsLegacy(),
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
