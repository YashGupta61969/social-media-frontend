import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const submit = (e)=>{
    e.preventDefault()
    fetch('http://localhost:8000/user/signup',{
      method:'POST',
      headers: { 'Content-Type': "application/json" },
      body:JSON.stringify({
        email,
        password
      })
    }).then(res=>res.json()).then(res=>{
      if(res.status === 'error'){
        alert(res.message)
      }else{
        alert(res.message)
        navigate('/login')
      }
    }).catch(err=>console.log(err))
  }

  return (
    <div className='screen'>
      <form className="form" onSubmit={submit}>
      <h1>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input type="text" id='email' onChange={(e)=>setEmail(e.target.value)} value={email} />
        <label htmlFor="password">Password</label>
        <input type="password" id='password' onChange={(e)=>setPassword(e.target.value)} value={password} />
        <button>Sign Up</button>
      </form>
      <p className='link'>Already have an account ? <Link to={'/'}>Log In</Link></p>
    </div>
  )
}

export default SignUp