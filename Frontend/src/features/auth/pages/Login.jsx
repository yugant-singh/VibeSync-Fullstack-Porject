import React from 'react'
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../hooks/useAuth'
import Loader from '../../../shared/components/loader/Loader';
const Login = () => {
    const [username, setUsername] = useState("");
    //   const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const {loading,user,loginHandler} = useAuth()
      const navigate = useNavigate()

      async function submitHandler(e){
        e.preventDefault()
await loginHandler()
navigate("/")

      }

      if(loading){
        return <Loader/>
      }
  return (
    <main className="main">
    
          <div className="container">
    
           
            <div className="heading">
              <h1>VibeSync</h1>
              <p>Welcome Back</p>
            </div>
    
            <form onSubmit={submitHandler}>
    
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
    
              {/* <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              /> */}
    
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
    
              <button desable={loading}>
               {loading?"Logging in...":"Login"}
              </button>
    
            </form>
            <p>Don't have an account ? <Link to="/register" >Register</Link></p>
    
          </div>
    
        </main>
  )
}

export default Login