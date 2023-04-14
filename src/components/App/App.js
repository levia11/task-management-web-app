import React, { useState }  from 'react';
import Login from '../Login/Login';
import BasicLayout from '../Layout/BasicLayout';

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
    <BasicLayout/>
  );
}

export default App;
