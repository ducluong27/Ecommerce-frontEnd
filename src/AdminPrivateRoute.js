import {Navigate, useNavigate, Outlet,Route, Routes} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MasterLayout } from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Swal from 'sweetalert2';


const AdminPrivateRoute = () => {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false)

  // useEffect(async() => {
  //   await axios.get('api/checkingAuthenticated').then( res=> {
  //     console.log(res.status);
  //     // console.log(authenticated);
  //     if(res.status===200){
  //       setAuthenticated(true)
  //     }
  //     setAuthenticated(false)
  //     // else {
  //     //   setAuthenticated(false)
  //     // }
  //   })
  
  //   return () => {
  //     setAuthenticated(false)
  //   }
  // }, [])
  
  // let authenticated=false;
  const  getStatus=async() => {
    await  axios.get('api/checkingAuthenticated').then( res=> {
      // console.log(res.status);
      // console.log(authenticated);
      if(res.status===200){
        return true;
      }
      else{
        console.log(res.status);
        return false;
      }
    })
  }

  axios.interceptors.response.use(undefined, function  axiosRetryInterceptor  (err){
    
    if(err.response.status===401){
      Swal.fire(
        'Forbidden!',
        err.data.message,
        'warning'
      );
      navigate('/')
    }
    return Promise.reject(err);
  });
  axios.interceptors.response.use((response)=>{
    return response;
  },(error)=>{
    if(error.response.status===403){
      navigate('/')
      Swal.fire(
        'Forbidden!',
        error.response.data.message,
        'warning'
      )
      
    }
    else if(error.response.status===404){
      
      Swal.fire(
        'Forbidden!',
        'URL/page not found',
        'warning'
      )
      navigate('/404');
      
    }
    return Promise.reject(error);
  });
  // if(loading ){
  //   return  <h3>Loading...</h3>
  // }


  // const  AdminPrivateRoute=(props) =>{

  //   const a=getStatus()
  
  //   return a?<Outlet/>: <Navigate to="/login"/>
  // }

  // console.log(getStatus())
  return (
    getStatus() ?   <Outlet/> : <></>
  )
}
export default AdminPrivateRoute


