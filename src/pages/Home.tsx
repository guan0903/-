import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie'
import { Button, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Avatar, Image } from 'antd';
import React, { useState ,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {RootState} from "../utils/index"
import Hoc_login from '../utils/Hoc_login';
import {mainRouter} from "../router/Router_config"
import {NavLink,Outlet} from "react-router-dom"

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [itemsArr,setItemsArr] = useState([])
  const userinfo = useSelector((state:RootState)=>state.userInfo)
  
  useEffect(()=>{
      let data:any  = []
      mainRouter.filter(item=>item.meta === true).map((item,index)=>{
          data.push(getItem(<NavLink to={item.path}>{item.title}</NavLink>,index,<PieChartOutlined />))
      })
      setItemsArr(data)
  },[])

  const items: MenuItem[] = [
      getItem('Option 1', '1', <PieChartOutlined />),
      getItem('Option 2', '2', <DesktopOutlined />),
      getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
      ]),
      getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
      getItem('Files', '9', <FileOutlined />),
    ];
  
  function getItem(
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[],
    ): MenuItem {
      return {
        key,
        icon,
        children,
        label,
      } as MenuItem;
    }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={['0']} mode="inline" items={itemsArr} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 ,display:"flex",justifyContent:"space-between"}} >
          {/* 头像 */}
          <div></div>
          <div style={{width:"300px",display:"flex"}}>
              <Avatar className='avvtar' src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
              <p>用户名：{userinfo.username}</p>
              <Button onClick={()=>{
                  Cookies.remove("token")
                  window.location.reload()
              }}>退出登录</Button>
          </div>
         
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360,width:"100%",height:"100%"}}>
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Hoc_login(App);