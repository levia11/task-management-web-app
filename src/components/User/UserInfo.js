import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Logout from '../Login/Logout';
import { Typography,Button,Descriptions } from 'antd';

const { Title } = Typography;
const backendurl = "http://localhost:8080";

export default function UserInfo() {
  const [uname,setUname] = useState([]);
  const [contact,setContact] =useState([]);
  const [tid,setTid] = useState([]);
  const [uid,setUid] = useState([]);

  const ownerid = JSON.parse(sessionStorage.getItem("token")).uid;
  //console.log(ownerid);
  useEffect(() => {
    axios.post(backendurl+"/user/user-info","uid="+ownerid)
      .then(response => {
        console.log(response.data);
    setUname(response.data.uname);
    setContact(response.data.contact);
    setTid(response.data.tid);
    setUid(response.data.uid)
      console.log(response);
    });
  }, []);

  const info = 
//   <p>
//   {"Name: "+uname}<br/>
//  {"Contact: "+contact}<br/>
//   {"Team: "+tid}<br/>
// </p>;
<p>
<Descriptions layout='vertical' bordered>
  <Descriptions.Item label="User ID">{uid}</Descriptions.Item>
  <Descriptions.Item label="Username">{uname}</Descriptions.Item>
  <Descriptions.Item label="Email">{contact}</Descriptions.Item>
  <Descriptions.Item label="Team">{tid}</Descriptions.Item>
</Descriptions>
</p>;


  return(
    <>
      <Title level={2}>User Info</Title>
      {info}
      <div>
            <Button onClick={Logout}>Logout</Button>
      </div>
      </>

  );
}