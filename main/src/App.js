/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-14 17:27:51
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-07 14:31:32
 * @FilePath: /open-platform/src/App.tsx
 */
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd'
const items = [
  {
    label: 'sub-react-app子应用',
    key: '/sub-react-app',
    icon: <MailOutlined />,
  },
  {
    label: 'sub-react-app2子应用',
    key: '/sub-react-app2',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'sub-vue3-app子应用',
    key: '/sub-vue3-app',
    icon: <SettingOutlined />,
  },
];
const App = () => {
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key)
  };

  return <>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    <div id="container"></div>
  </>;
};
export default App;
