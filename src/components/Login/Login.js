import React, { useState,useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { Typography, Button, Form, Alert,Input } from 'antd';

const { Title } = Typography;
const backendurl = "http://localhost:8080";

export default function Login({ setToken }) {
  const [showMsg, setShowmsg] = useState();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState();
  function onClose(){
    setShowmsg();
  }
  const handleSubmit = async e => {
    //e.preventDefault();
    await axios.post(backendurl + "/user/login", {
      contact,
      password,
    }).then((response) => {

      const token = JSON.stringify(response.data.data);

      sessionStorage.setItem("token", token);
      setToken(token);
      if (response.data.code == 401) {
        setShowmsg(true);
      }
    })
      .catch((error) => {
        console.log(error);
      });

  }
  return (
    <div className="login-wrapper">
      <Title>Task Management System</Title>
      {showMsg&&<Alert message="Wrong email or password! " type="error" closable
      onClose={onClose} style={{margin:'15px'}}/>}
      <Form onFinish={handleSubmit}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}>
        <Form.Item
      label="Email"
      name="contatc"
      rules={[{ required: true, message: 'Please input your username!' }]}
      onChange={e => setContact(e.target.value)}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
      onChange={e => setPassword(e.target.value)}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
      </Form>
    </div>
  )
}

