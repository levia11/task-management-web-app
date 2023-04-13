import axios from 'axios';
import React, { useEffect, useState } from 'react';

const backendurl = "http://localhost:8080";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(backendurl+"/task/all-tasks")
      .then(response => {setTasks(response.data.data);
      //console.log(response);
    });
  }, []);

  const listItems = tasks.map(task =>
    <li key={task.tid}>
      <p>
             {"Task Name: "+task.tname}<br/>
            {"Status: "+task.lateststatus}<br/>
            {"Owner: "+task.ownerid}<br/>
             {"Start: "+task.starttime}<br/>
             {"Due: "+task.due}<br/>
             {"Information: "+task.taskinfo}<br/>
      </p>
    </li>
  );

  return(
    <article>
      <h1>All Tasks</h1>
      <ul>{listItems}</ul>
    </article>
  );
}