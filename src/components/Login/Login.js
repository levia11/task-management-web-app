import React,{useState} from 'react';
import './Login.css';
import axios from 'axios';

const backendurl = "http://localhost:8080";

export default function Login({ setToken }) {
  const [contact, setContact] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(backendurl+"/user/login", {
      contact,
      password,
    }).then((response) => {

      const token=JSON.stringify(response.data.data);
    
      sessionStorage.setItem("token", token);
      setToken(token);
    })
    .catch((error) => {
      console.log(error);
    });
    
  }
  return(
    <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
        <label>
            <p>Email</p>
            <input required="true" type="email" onChange={e => setContact(e.target.value)}/>
        </label>
        <label>
            <p>Password</p>
            <input required="true" type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
            <button type="submit">Login</button>
        </div>
        </form>
    </div>
  )
}

