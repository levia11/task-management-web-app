import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Typography,Card,Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;
const backendurl = "http://localhost:8080";

export default function Users() {
    const [users, setUsers] = useState([]);
    const tid = JSON.parse(sessionStorage.getItem("token")).tid;
    useEffect(() => {
      axios.post(backendurl + "/user/all-users", "tid=" + tid)
        .then(response => {
          setUsers(response.data.data);
        });
    }, []);
  
    const listItems = users.map(user =>
      <Card title=" ">
        <Avatar shape="square" icon={<UserOutlined />} />
        <p><span style={{ fontWeight: "bold" }}>User ID: </span>{user.uid}</p>
        <p><span style={{ fontWeight: "bold" }}>User name: </span>{user.uname}</p>
        <p><span style={{ fontWeight: "bold" }}>Email: </span>{user.contact}</p>
        
      </Card>
    );
  
    return (
      <div>
        <Title level={2}>Group Members</Title>
        {listItems}
      </div>
    );
  }