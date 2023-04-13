
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const backendurl = "http://localhost:8080";


export default function UpdateTask() {
    
  const Delete = async(taskid)=>{
    console.log(taskid);
    axios.post(backendurl+"/task/delete-task", "tid="+taskid).then((response) => {
    //this.forceUpdate();
  })
  .catch((error) => {
    console.log(error);
  });
  };

  const handleSubmit = async (e,task) => {
    e.preventDefault();
    const tid = task.tid;
    const tname = task.tname;
    const starttime = task.starttime;
    const due = task.due;
    const ownerid = task.ownerid;
    const lateststatus = Number(e.target.lateststatus.value);
    const taskinfo = task.taskinfo;
    await axios.post(backendurl+"/task/update-task", {
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
    axios.post(backendurl+"/task/my-tasks","ownerid="+ownerid)
      .then(response => {setTasks(response.data.data);
      console.log(response);
    });
  }, []);


  const listItems = tasks.map(task =>
    <li key={task.tid}>
      <form onSubmit={e=>handleSubmit(e,task)}>
      <p>
             {"Task Name: "+task.tname}<br/>
            {"Status: "+task.lateststatus}<br/>
            {/* {"Owner: "+task.ownerid}<br/> */}
             {"Start: "+task.starttime}<br/>
             {"Due: "+task.due}<br/>
             {"Information: "+task.taskinfo}<br/>
      </p>
        <p>
        New Status:
        <label>
          <input type="radio" 
          name="lateststatus" value="1"
          />
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
      <button type="submit">Update Status</button>
      </form>
      <div>
            <button onClick={e=>Delete(task.tid)}>Delete</button>
        </div>
    </li>
  );

  return(
    <article>
      <h1>Update Tasks</h1>
      <ul>{listItems}</ul>
    </article>
  );
}