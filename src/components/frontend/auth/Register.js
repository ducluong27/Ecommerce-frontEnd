import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../../../layouts/frontend/Navbar'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate()
    
    const [register, setRegister] = useState({
        name: '',
        email:'',
        password:'',
        errorList:[]
    })
    const registerSubmit = (e)=>{
        e.preventDefault()
        const data={
            name:register.name,
            email:register.email,
            password:register.password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`,data).then(res=>{
                if(res.data.status===200) {
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_name',res.data.username);
                    Swal.fire(
                        'Success!',
                        'Your file has been registered.',
                        'success'
                    )
                    navigate('/')
                }
                else {
                    setRegister({...register,errorList:res.data.validation_errors})
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
                            <h4>Register</h4>
                        </div>    
                        <div className="card-body">
                            <form onSubmit={registerSubmit}>
                                <div className="form-group mb-3">
                                    <label>Full Name</label>
                                    <input type="text" name="name" className="form-control"  onChange={(e)=>setRegister({...register,name:e.target.value})}/> 
                                    <span>{register.errorList.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email ID</label>
                                    <input type="text" name="email"className="form-control" onChange={(e)=>setRegister({...register,email:e.target.value})} />
                                    <span>{register.errorList.email}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input type="password" name="password"className="form-control" onChange={(e)=>setRegister({...register,password:e.target.value})} />
                                    <span>{register.errorList.password}</span>
                                </div>
                                {/* <div className="form-group mb-3">
                                    <label>Confirm Password</label>
                                    <input type="password" name="password"className="form-control" onChange={(e)=>setRegister({...register,confirmPassword:e.target.value})} />
                                </div>
                                {
                                    register.password != register.confirmPassword ? <span>Password and confirmPassword are differrent</span>:<></>
                                } */}
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Register</button>
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

export default Register