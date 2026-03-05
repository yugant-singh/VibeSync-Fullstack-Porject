import React, { useState } from "react";
import "../style/form.scss"
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../hooks/useAuth'

import Loader from "../../../shared/components/loader/Loader";
const Register = () => {
  const {loading,handleRegister} = useAuth()


  const [name, setName] = useState("")
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
 
async function handleSubmit(e){
e.preventDefault()

await handleRegister({username,email,password,name})
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
          <p>Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit} >
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button   >
          Register
          </button>

        </form>
        <p>Already have an account ? <Link to="/login" >Login</Link></p>

      </div>

    </main>
  );
};

export default Register;