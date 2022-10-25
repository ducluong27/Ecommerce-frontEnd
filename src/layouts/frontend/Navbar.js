import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

const Navbar = (props) => {
    const {setTokenAuth} = props;
    
    console.log('hoat');
    const navigate = useNavigate();

    const logoutSubmit = (e) =>{
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if(res.data.status === 200){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                setTokenAuth(null);
                Swal.fire(
                    'Success!',
                    'Logged out successfully',
                    'success'
                    )
                    navigate('/')
                }
            })
        } 

    let authButtons ='';
    if(!localStorage.getItem('auth_token')){
        authButtons = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        )
    }
    else {
        authButtons = (
            <button className="btn btn-warning" onClick={logoutSubmit}>Logout</button>
        )

    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
        <div className="container-fluid">
            <Link className="navbar-brand" to="#">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Collection</Link>
                </li>
                {authButtons}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li> */}
            </ul>
            </div>
        </div>
        </nav>
  )
}

export default Navbar