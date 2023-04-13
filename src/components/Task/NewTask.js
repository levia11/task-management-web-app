import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
        await axios.post(backendurl+"/task/new-task", {
            ownerid,
          starttime,
          due,
          taskinfo,
          tname
        }).then((response) => {
          if(response.data.code==0) {setSuccess(1);}
          else {setSuccess(2);}
        })
        .catch((error) => {
          console.log(error);
        });
        
      }
      return(
        <div className="login-wrapper">
            <h1>Create a New Task</h1>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Task Name</p>
                <input type="text" onChange={e => setTname(e.target.value)}/>
            </label>
            <label>
                <p>Start Time</p>
                <input type="datetime-local" onChange={e => setStartTime(e.target.value)}/>
            </label>
            <label>
                <p>Due Time</p>
                <input type="datetime-local" onChange={e => setDue(e.target.value)}/>
            </label>
            <label>
                <p>Task Info</p>
                <input type="text" onChange={e => setTaskInfo(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
            <div>
            {(success==1) && 'Success!'}
            {(success==2) && 'Task name exists!'}
            </div>
        </div>
      )


}