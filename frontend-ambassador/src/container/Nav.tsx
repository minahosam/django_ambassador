import React, { useState } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from './../models/User';
import axios from 'axios'

const Nav = (props:{user:User}) => {
  const [redirect, setRedirect] = useState(false)
  const logout = async () => {
    await axios.post('logout/')
    setRedirect(true)
  }
  if (redirect) {
    return <Navigate to='/login'/>
  }
  let menu
  if (props.user?.id) {
    menu = (
      <div className="text-end">
        <Link type="button" className="btn btn-outline-light me-2" to={'/stats'}>Stats</Link>
        <Link type="button" className="btn btn-outline-light me-2" to={'/rankings'}>Ranking</Link>
        <Link type="button" className="btn btn-outline-light me-2" to={'/profile'}>{props.user.first_name} {props.user.last_name}</Link>
        <button onClick={logout} type="button" className="btn btn-warning">Logout</button>
      </div>
    )

  }else{
    menu = (
      <div className="text-end">
        <Link to={'/login'} type="button" className="btn btn-outline-light me-2">Login</Link>
        <Link to={'/register'} type="button" className="btn btn-warning">Sign-up</Link>
      </div>
    )
    }
  // let navData
  // if (navData) {
  //   <NavLink className='nav-link px-2 text-white' to={''}/>
  // }
  // navData = ("className = 'nav-link px-2 text-white'")
  return (
    <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink to={'/'} style={({isActive}) => {return {color:isActive ? "skyblue" : "" }}} className='nav-link px-2 '>Frontend</NavLink>
            {/* <NavLink to={'/'} className={(navData) => navData.isActive ? "active" : "" }>Frontend</NavLink> */}
            {/* <NavLink to={'/'} activeClass="active" className="nav-link px-2"></NavLink> */}
          </li>
          <li>
            <NavLink to={'/backend'} style={({isActive}) => {return {color:isActive ? "skyblue" : "" }}} className='nav-link px-2 '>Backend</NavLink>
            {/* <NavLink to={'/backend'} className={(navData) => navData.isActive ? "active" : "" }>Backend</NavLink> */}
          </li>
        </ul>


          {menu}
      </div>
    </div>
  </header>

    )
}

const mapUserToProps = (state:{user:User}) => ({
  user:state.user
})

export default connect(mapUserToProps)(Nav)
