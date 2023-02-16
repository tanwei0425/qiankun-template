import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'; // 底层是基于single-spa
// ----- Step2 注册子应用
registerMicroApps(
    [
        {
            name: 'subReactApp',
            entry: '//localhost:3001',
            container: '#container',
            activeRule: '/sub-react-app',
            loader: (loading) => {
                console.log(loading, 'loading');
            },
            props: {
                name: 'subReactApp',
                test: 'testtesttest'
            }
        },
        {
            name: 'subReactApp2',
            entry: '//localhost:3002',
            container: '#container',
            activeRule: '/sub-react-app2',
        },
        {
            name: 'subVue3App',
            entry: '//localhost:3003',
            container: '#container',
            activeRule: '/sub-vue3-app',
        },
    ],
    {
        beforeLoad: () => {
            console.log('加载前')
        },
        beforeMount: () => {
            console.log('挂在前')
        },
        afterMount: () => {
            console.log('挂载后')
        },
        beforeUnmount: () => {
            console.log('销毁前')
        },
        afterUnmount: () => {
            console.log('销毁后')
        },
    }
)


// 设置主应用启动后默认进入的微应用。
setDefaultMountApp('/sub-react-app2');
// ----- Step3 启动应用
start();


