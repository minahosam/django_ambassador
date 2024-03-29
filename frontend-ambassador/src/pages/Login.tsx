import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const loginHandler = async (e:SyntheticEvent) => {
    e.preventDefault();
    await axios.post('login/',{email,password})
    setRedirect(true)
  }
  if (redirect) {
    return <Navigate to='/'/>
  }
  return (
    <main className="form-signin w-100 m-auto">
        <form onSubmit={loginHandler}>
            {/* {getCookie('csrftoken')} */}
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" className="form-control" id='floatingInput' placeholder="name@example.com" onChange={e=>setEmail(e.target.value)} required/>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>

            {/* <div className="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"> Remember me</input>
            </label>
            </div> */}
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
        </form>
    </main>
  )
}
