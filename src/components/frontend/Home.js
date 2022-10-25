import React from 'react'
import Navbar from '../../layouts/frontend/Navbar'

const Home = (props) => {
  const {setTokenAuth} = props;
  return (
    <div>
      <Navbar setTokenAuth={setTokenAuth}/>
      Home
    </div>
  )
}

export default Home