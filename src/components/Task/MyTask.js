import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Typography, Card,Progress,Tag } from 'antd';
import moment from "moment";

const { Title } = Typography;
const backendurl = "http://localhost:8080";


export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const ownerid = JSON.parse(sessionStorage.getItem("token")).uid;
  useEffect(() => {
    axios.post(backendurl + "/task/my-tasks", "ownerid=" + ownerid)
      .then(response => {
        setTasks(response.data.data);
        // console.log(Date.parse(response.data.data[2].due));
        // console.log(moment().format('x'));
        // console.log(Date.parse(response.data.data[2].due)-moment().format('x'));
      });
  }, []);

  const listItems = tasks.map(task =>
    <Card title={task.tname}>
      {(task.lateststatus==0)&&<Progress percent={0}/>}
        {(task.lateststatus==1)&&<Progress percent={50}/>}
        {(task.lateststatus==2)&&<Progress percent={50} status="exception"/>}
        {(task.lateststatus==3)&&<Progress percent={100}/>}
      <p><span style={{ fontWeight: "bold" }}>Status: </span>
      {(task.lateststatus==0)&&"Created"}
      {(task.lateststatus==1)&&"On Progress"}
      {(task.lateststatus==2)&&"On Hold"}
      {(task.lateststatus==3)&&"Completed"}
      </p>
      <p><span style={{ fontWeight: "bold" }}>Start: </span>{task.starttime}</p>
      <p><span style={{ fontWeight: "bold" }}>Due: </span>
      {((Date.parse(task.due)-moment().format('x')<=604800000)&&(task.lateststatus!=3))&&<Tag color="red">!</Tag>}
      {task.due}</p>
      <p><span style={{ fontWeight: "bold" }}>Information: </span>{task.taskinfo}</p>
      
    </Card>
  );

  return (
    <div>
      <Title level={2}>My Tasks</Title>
      {listItems}
    </div>
  );
}