import "./public-path.js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 *  挂载和卸载需要保持root是同一个对象，不然浏览器会报警告信息
 */
let root = undefined;
/**
 * 获取root对象
 * @param {*} container 
 * @returns 
 */
function getRoot(container) {
  if (root) {
    return root;
  }
  const containerDom = container ? container.querySelector('#sub-react2') : document.querySelector('#sub-react2')
  root = ReactDOM.createRoot(containerDom)
  return root;
}

/**
 * 渲染节点
 * @param {*} props 
 */
function render(props) {
  const { container } = props;
  getRoot(container).render(
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/sub-react-app2' : '/'}>
      <App />
    </BrowserRouter>
  )
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('[react18] react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log('[react18] props from main framework', props);
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  const { container } = props;
  getRoot(container).unmount();
  /** 这个地方切记要重置为未定义 */
  root = undefined
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}


reportWebVitals()