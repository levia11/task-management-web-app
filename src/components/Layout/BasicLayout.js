import { LaptopOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React from 'react';
import Tasks from '../Task/Tasks';
import { useState } from 'react';
import NewTask from '../Task/NewTask';
import UpdateTask from '../Task/UpdateTask';
import MyTasks from '../Task/MyTask';
import UserInfo from '../User/UserInfo';
import "./BasicLayout.css"

const { Header, Content, Sider,Footer } = Layout;
const items2 = [
    {
        key:"my-tasks",label:"My Tasks",icon: React.createElement(ScheduleOutlined),
    },
    {
        key:"tasks",label:"Tasks",icon: React.createElement(LaptopOutlined),
        children:[{
            key:"all-tasks",label:"All Tasks"
        },
        {
            key:"new-task",label:"New Task"
        },
        {
            key:"update-task",label:"Update Task"
        },
    ]
    },
    {
        key:"userinfo",label:"User Info",icon: React.createElement(UserOutlined),
    }
]


const BasicLayout = () => {
 const [comp,setComp] = useState([<MyTasks/>]);
 function change(SelectedKeys){

    switch(SelectedKeys.key) {
        case "all-tasks":setComp(<Tasks/>); break;
        case "my-tasks":setComp(<MyTasks/>); break;
        case "new-task":setComp(<NewTask/>); break;
        case "update-task":setComp(<UpdateTask/>); break;
        case "userinfo":setComp(<UserInfo/>);break;
    }
};
    const uname =JSON.parse(sessionStorage.getItem("token")).uname;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <div>Task Management</div>
        <div style={{textAlign:"right"}}>{"Welcome "+uname+"! "}</div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['my-tasks']}
            defaultOpenKeys={['tasks']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
            onClick={change}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {comp}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Enterprise App Development</Footer>
    </Layout>
  );
};
export default BasicLayout;