import React, { Dispatch } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../models/User'
import axios from "axios";
import { connect } from 'react-redux';
import { setUser } from '../redux/action/setUserAction';

const Nav = (props:{user:User | null}) => {
  const logout = async () => {
    await axios.post('logout/')
  }
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/profile">Company name</a>
        <div className="navbar-nav">
        <div className="nav-item text-nowrap">
            <Link className="p-2 text-white text-decoration-none" to={'/profile'}>{props.user?.first_name} {props.user?.last_name}</Link>
            <Link to={'/login'} className="p-2 text-white text-decoration-none" onClick={logout}>Sign out</Link>
        </div>
        </div>
    </header>

  )
}

const mapStateToProps = (state:{user:User}) => ({
  user : state.user
})


const mapDispatchToProps = (dispatch:Dispatch<any>) => ({
  setUser:(user:User) => dispatch(setUser(user))
})


export default connect(mapStateToProps,mapDispatchToProps)(Nav)
