import React, { useState } from 'react'
import '../style/login.scss'
import '../../shared/styles/button.scss'
import FormGroup from '../component/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate()

  const {loader, handleLogin} = useAuth()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


  async function submitHandler(e) {
    e.preventDefault();
    await handleLogin({email, password})
    navigate('/')
  }


  return (
    <main className='login-page'>
    <h1>Moodify</h1>
    <div className='form-container'>
      <form onSubmit={submitHandler}>
        <FormGroup
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
         label="Email" placeholder="Enter your registered Email"/>
        <FormGroup 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        label="Password" placeholder="Enter your Password"/>
        <button className='button' type='submit'>Login</button>
      </form>
      <div className='link-container'>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
    </main>
  )
}

export default Login
