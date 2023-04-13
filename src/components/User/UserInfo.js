import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Logout from '../Login/Logout';

const backendurl = "http://localhost:8080";

export default function UserInfo() {
  const [uname,setUname] = useState([]);
  const [contact,setContact] =useState([]);
  const [tid,setTid] = useState([]);

  const ownerid = JSON.parse(sessionStorage.getItem("token")).uid;
  //console.log(ownerid);
  useEffect(() => {
    axios.post(backendurl+"/user/user-info","uid="+ownerid)
      .then(response => {
        console.log(response.data);
    setUname(response.data.uname);
    setContact(response.data.contact);
    setTid(response.data.tid);
      console.log(response);
    });
  }, []);

  const info = <p>
  {"Name: "+uname}<br/>
 {"Contact: "+contact}<br/>
  {"Team: "+tid}<br/>
</p>;

  return(
    <article>
      <h1>User Info</h1>
      {info}
      <div>
            <button onClick={Logout}>Logout</button>
        </div>
    </article>
  );
}