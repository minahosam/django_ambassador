import React, { Component, SyntheticEvent } from 'react'
import axios from 'axios'
import '../login.css'
import { Navigate } from 'react-router-dom';

export default class Register extends Component {
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    confirmPassword = '';
    state = {
        redirect:false
    }
    clickHandler = async(e:SyntheticEvent) => {
        e.preventDefault();
        await axios.post('register/',{
            first_name : this.firstName,
            last_name : this.lastName,
            email : this.email,
            password : this.password,
            password2 : this.confirmPassword
        })
        this.setState({redirect:true});
    }
  render() {
    if(this.state.redirect){
        return <Navigate to='/login'/>
     }
    return (
      <main className="form-signin w-100 m-auto">
      <form onSubmit={this.clickHandler}>
          <h1 className="h3 mb-5 fw-normal">Please register</h1>
          <div className="form-floating">
              <input type="first-name" className="form-control" id="floatingInput" placeholder="first name" onChange={(e)=> this.firstName = e.target.value}/>
              <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
              <input type="last-name" className="form-control" id="floatingInput" placeholder="last name" onChange={(e) => this.lastName=e.target.value}/>
              <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => this.email = e.target.value}/>
              <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => this.password = e.target.value}/>
              <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
              <input type="confirmPassword" className="form-control" id="floatingPassword" placeholder="Confirm Password" onChange={(e) => this.confirmPassword = e.target.value}/>
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
}

