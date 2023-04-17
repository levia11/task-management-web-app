
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Typography, Card, Button, Progress } from 'antd';

const { Title } = Typography;
const backendurl = "http://localhost:8080";


export default function UpdateTask() {

  const Delete = async (taskid) => {
    console.log(taskid);
    axios.post(backendurl + "/task/delete-task", "tid=" + taskid).then((response) => {
      window.location.reload();
    })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e, task) => {
    e.preventDefault();
    const tid = task.tid;
    const tname = task.tname;
    const starttime = task.starttime;
    const due = task.due;
    const ownerid = task.ownerid;
    const lateststatus = Number(e.target.lateststatus.value);
    const taskinfo = task.taskinfo;
    await axios.post(backendurl + "/task/update-task", {
      tid,
      tname,
      starttime,
      due,
      ownerid,
      lateststatus,
      taskinfo,
    }).then((response) => {
      window.location.reload();
    })
      .catch((error) => {
        console.log(error);
      });

  }

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const ownerid = JSON.parse(sessionStorage.getItem("token")).uid;
    //console.log(ownerid);
    axios.post(backendurl + "/task/my-tasks", "ownerid=" + ownerid)
      .then(response => {
        setTasks(response.data.data);
        console.log(response);
      });
  }, []);


  const listItems = tasks.map(task =>
    <Card title={task.tname}>
      {(task.lateststatus == 0) && <Progress percent={0} />}
      {(task.lateststatus == 1) && <Progress percent={50} />}
      {(task.lateststatus == 2) && <Progress percent={50} status="exception" />}
      {(task.lateststatus == 3) && <Progress percent={100} />}

      <form onSubmit={e => handleSubmit(e, task)}>
        <p><span style={{ fontWeight: "bold" }}>Status: </span>
          {(task.lateststatus == 0) && "Created"}
          {(task.lateststatus == 1) && "On Progress"}
          {(task.lateststatus == 2) && "On Hold"}
          {(task.lateststatus == 3) && "Completed"}
        </p>
        <p><span style={{ fontWeight: "bold" }}>Start: </span>{task.starttime}</p>
        <p><span style={{ fontWeight: "bold" }}>Due: </span>{task.due}</p>
        <p><span style={{ fontWeight: "bold" }}>Information: </span>{task.taskinfo}</p>
        <p>
          <span style={{ fontWeight: "bold" }}>New Status: </span>
          <label>
            <input type="radio"
              name="lateststatus" value="1"
              required />
            On Progress
          </label>
          <label>
            <input
              type="radio"
              name="lateststatus"
              value="2"

            />
            On Hold
          </label>
          <label>
            <input type="radio" name="lateststatus" value="3"

            />
            Completed
          </label>
        </p>
        <Button type="primary" htmlType="submit">
          Update Status
        </Button>
      </form>
      <br />
      <div>
        <Button onClick={e => Delete(task.tid)} danger>Delete</Button>
      </div>
    </Card>
  );

  return (
    <div>
      <Title level={2}>Update Tasks</Title>
      {listItems}
    </div>
  );
}