import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'

import { MasterLayout } from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Swal from 'sweetalert2';
import AdminPrivateRoute from './AdminPrivateRoute';


axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept']='application/json'
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token')
  config.headers['Authorization'] = token ? `Bearer ${token}` : ''
  return config;
})

const getTokenStorage = () => {
  const response = localStorage.getItem('auth_token');
  return response ? response : undefined ;
}

function App() {
  const [tokenAuth, setTokenAuth] = useState(getTokenStorage());

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/> */}
        <Route path="/login"
          element = {tokenAuth ? <Navigate to="/" />: <Login />}
        />
        <Route path="/403"
          element = {<h1>403</h1>}
        />
        <Route path="/404"
          element = {<h1>404</h1>}
        />
        <Route path="/register"
          element = {localStorage.getItem('auth_token')? <Navigate to="/" />: <Register />}
        />
        <Route path="/admin/*" element={<MasterLayout />} />
        <Route path="/" element={<Home setTokenAuth={setTokenAuth}/>} />
        {/* <Route
        path="/admin/*"
        element={authenticated ? <Navigate to="/admin/*" replace/>:<Login/> }
        /> 
        <Route
        path="/admin"
        element={authenticated ? <Navigate to="/admin/dashboard" replace/>:<Login/> }
        /> */}
        {/* <Route path="/admin/*" element={<MasterLayout />}/> */}
        <Route element={<AdminPrivateRoute/>}>
            <Route
              element={localStorage.getItem('auth_token')?<Navigate to="/admin/dashboard"/> :<Login />}
              path="/admin"
            />
          <Route path="/admin/*" element={<MasterLayout />}/>
        </Route>

        {/* <Route element={<UserPrivateRoute/>}>
            <Route
              element={<Navigate to="/403"/> }
              path="/admin"
            /> */}
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
