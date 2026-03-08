import React, { use } from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'

import Loader from '../../../shared/components/loader/Loader';
const Login = () => {
  const { loading, handleLogin } = useAuth()
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const err = await handleLogin({ username, password })
    if (err) {
      setError(err)
      return
    }
    navigate("/")

  }




  if (loading) {
    return <Loader />
  }
  return (
    <main className="main">

      <div className="container">


        <div className="heading">
          <h1>VibeSync</h1>
          <p>Welcome Back</p>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/*     
             <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />  */}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

{error && <p className="error-msg">{error}</p>}
          <button desabled={loading} >

            {loading ? "Loging..." : "Login"}
          </button>

        </form>
        <p>Don't have an account ? <Link to="/register" >Register</Link></p>

      </div>

    </main>
  )
}

export default Login