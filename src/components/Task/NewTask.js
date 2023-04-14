import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Typography, Alert, Button,Input } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;
const backendurl = "http://localhost:8080";

export default function NewTask() {

  const [starttime, setStartTime] = useState();
  const [due, setDue] = useState();
  const [taskinfo, setTaskInfo] = useState();
  const [tname, setTname] = useState();
  const [success, setSuccess] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const ownerid = JSON.parse(sessionStorage.getItem("token")).uid;
    await axios.post(backendurl + "/task/new-task", {
      ownerid,
      starttime,
      due,
      taskinfo,
      tname
    }).then((response) => {
      if (response.data.code == 0) { setSuccess(1); }
      else { setSuccess(2); }
    })
      .catch((error) => {
        console.log(error);
      });

  }
  return (
    <div>
      <Title level={2}>Create a New Task</Title>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            <p style={{fontWeight:"bold"}}>Task Name</p>
            <Input onChange={e => setTname(e.target.value)} required />
          </label>
          <label>
            <p style={{fontWeight:"bold"}}>Start Time</p>
            <input type="datetime-local" onChange={e => setStartTime(e.target.value)} required />
          </label>
          <label>
            <p style={{fontWeight:"bold"}}>Due Time</p>
            <input type="datetime-local" onChange={e => setDue(e.target.value)} required />
          </label>
          <label>
            <p style={{fontWeight:"bold"}}>Task Info</p>
            {/* <input type="text" onChange={e => setTaskInfo(e.target.value)} /> */}
            <TextArea onChange={e => setTaskInfo(e.target.value)} />
          </label>
        </p>
        <div>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </form>
      <div>
        {(success == 1) && <Alert message="Success! " type="success" style={{ margin: '15px' }} />}
        {(success == 2) && <Alert message="Task name exists! " type="error" style={{ margin: '15px' }} />}
      </div>
    </div>
  )


}