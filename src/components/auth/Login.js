import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../store/slice/userSlice'
import './login.css'

function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()

    fetch('http://localhost:8000/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': "application/json" }
    // }).then(res => res.json()).then(res =>dispatch(login(res)) ).catch(err => console.error(err))
    }).then(res => res.json()).then(res =>{
      if(res.status === 'error'){
        alert(res.message)
      }else{
        dispatch(login(res))
      }
    } ).catch(err => console.error(err))
  }

  return (
    <div className='screen'>
      <form onSubmit={submit} className="form">
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
      <p className='link'>Dont have an account ? <Link to={'/signup'}>Sign Up</Link></p>
    </div>
  )
}

export default Login