import axios from 'axios';
import React, { useEffect, useState } from 'react';

const backendurl = "http://localhost:8080";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const ownerid = JSON.parse(sessionStorage.getItem("token")).uid;
  //console.log(ownerid);
  useEffect(() => {
    axios.post(backendurl+"/task/my-tasks","ownerid="+ownerid)
      .then(response => {setTasks(response.data.data);
      console.log(response);
    });
  }, []);

  const listItems = tasks.map(task =>
    <li key={task.tid}>
      <p>
             {"Task Name: "+task.tname}<br/>
            {"Status: "+task.lateststatus}<br/>
            {/* {"Owner: "+task.ownerid}<br/> */}
             {"Start: "+task.starttime}<br/>
             {"Due: "+task.due}<br/>
             {"Information: "+task.taskinfo}<br/>
      </p>
    </li>
  );

  return(
    <article>
      <h1>My Tasks</h1>
      <ul>{listItems}</ul>
    </article>
  );
}