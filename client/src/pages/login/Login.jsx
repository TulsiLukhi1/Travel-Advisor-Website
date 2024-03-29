import React, { useState,useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import "./login.css"
import { useNavigate } from 'react-router-dom'

 const Login = () => {
  const [credentials ,setCredentials] = useState({
    username:undefined,
    password:undefined
  })

  const navigate = useNavigate();

  const {loading,error,dispatch} = useContext(AuthContext)

  const handleChange = (e)=>{
    setCredentials((prev) =>({
      ...prev,
      [e.target.id]:e.target.value

    }))
  }

  const handleClick = async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try{
      const result = await axios.post("/auth/login",credentials)
      dispatch({type:"LOGIN_SUCCESS",payload:result.data})
      navigate("/")
    }catch(e){
      dispatch({type:"LOGIN_ERROR",payload:e.responce.data})
    }
  }

  return (
    <div className='login'>
      <div className="lContainer">
        <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
        <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
        <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login;
