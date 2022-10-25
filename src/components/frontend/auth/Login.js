import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const navigate = useNavigate()  

    const [login,setLogin] = useState({
        email:'',
        password:'',
        errorLogin: [],
    })
    const loginSubmit = (e) => {
        e.preventDefault();
        const data ={
            email: login.email,
            password: login.password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', data).then(res=>{
                if(res.data.status===200){
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_name',res.data.username);
                    Swal.fire(
                        'Success!',
                        'Logged in successfully',
                        'success'
                    )
                    if(res.data.role=='admin'){
                        navigate('/admin/dashboard')
                    }
                    else{
                        navigate('/')
                    }
                    
                }
                else if(res.data.status===401){
                    
                }
                else{
                    setLogin({...login,errorLogin: res.data.validation_errors})
                }
            })
        });
        
    }

  return (
    <div>
        <Navbar/>
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Login</h4>
                        </div>    
                        <div className="card-body">
                            <form onSubmit={loginSubmit} >
                                <div className="form-group mb-3">
                                    <label>Email ID</label>
                                    <input type="text" name="email"className="form-control" onChange={(e)=>setLogin({...login,email:e.target.value})} />
                                    {
                                        login.errorLogin.email?<span className=" alert-warning" >{login.errorLogin.email}</span>:<></>
                                        
                                    }
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input type="text" name="password"className="form-control" 
                                    onChange={(e)=>setLogin({...login,password:e.target.value})} />
                                    {
                                        login.errorLogin.password?<span className=" alert-warning" >{login.errorLogin.password}</span>:<></>
                                        
                                    }
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login