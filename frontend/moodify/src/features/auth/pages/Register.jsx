import React, { useState } from 'react'
import FormGroup from '../component/FormGroup'
import '../style/register.scss'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const {loader, handleRegister} = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    await handleRegister({username, email, password});
    navigate('/login');
  }

  return (
    <main className='register-page'>
    <h1>Moodify</h1>
    <div className='form-container'>
    <form onSubmit={submitHandler}>
      <FormGroup
      value={username} onChange={(e)=>{setUsername(e.target.value)}}
       label="Username" placeholder="Enter Username"/>
      <FormGroup
      value={email} onChange={(e)=>{setEmail(e.target.value)}}
       label="Email" placeholder="Enter your Email"/>
      <FormGroup
      value={password} onChange={(e)=>{setPassword(e.target.value)}}
       label="Password" placeholder="Enter password"/>
      <button className='button' type='submit'>Register</button>
      </form>
      <div className='link-container'>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      </div>
    </main>
  )
}

export default Register
