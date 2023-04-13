import React, { useState }  from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Tasks from '../Task/Tasks';
import Login from '../Login/Login';
import NewTask from '../Task/NewTask';
import MyTasks from '../Task/MyTask';
import UpdateTask from '../Task/UpdateTask';
import UserInfo from '../User/UserInfo';

function App() {
  const [token, setToken] = useState();
  const t = sessionStorage.getItem('token');
  if(t == null) {
    return <Login setToken={setToken} />
  }
  if(t.length===0|t=="null") {
    return <Login setToken={setToken} />
  }
  return (
    <div className="wrapper">
      <h1>Task Management</h1>
      <BrowserRouter>
          <nav id="navi">
          <NavLink to="/">My Tasks</NavLink>
          <NavLink to="/all-tasks">All Tasks</NavLink>
          <NavLink to="/new-task">New Task</NavLink>
          <NavLink to="/update-task">Update Task</NavLink>
          <NavLink to="/user-info">user info</NavLink>
          </nav>
          
          <Routes>
          <Route path="/" exact element={<MyTasks/>} />
            <Route path="/all-tasks" exact element={<Tasks/>} />
            <Route path="/new-task" exact element={<NewTask/>} />
            <Route path="/update-task" exact element={<UpdateTask/>} />
            <Route path="/user-info" exact element={<UserInfo/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
