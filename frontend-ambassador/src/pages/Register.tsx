import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../login.css'


export const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const clickHandler = async (e:SyntheticEvent) => {
        e.preventDefault();
        await axios.post('register/',{
            first_name : firstName,
            last_name : lastName,
            email : email,
            password : password,
            password2:confirmPassword
        })
        setRedirect(true)
    }
    if (redirect) {
        return <Navigate to='/login' />
    }
  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={clickHandler}>
          <h1 className="h3 mb-5 fw-normal">Please register</h1>
          <div className="form-floating">
              <input type="first-name" className="form-control" placeholder="first name" onChange={ e =>setFirstName(e.target.value)}/>
              <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
              <input type="last-name" className="form-control" placeholder="last name" onChange={ e => setLastName(e.target.value)}/>
              <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
              <input type="email" className="form-control" placeholder="name@example.com" onChange={ e => setEmail(e.target.value)}/>
              <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
              <input type="password" className="form-control" placeholder="Password" onChange={ e => setPassword(e.target.value)}/>
              <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
              <input type="confirmPassword" className="form-control" placeholder="Confirm Password" onChange={ e => setConfirmPassword(e.target.value)}/>
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
