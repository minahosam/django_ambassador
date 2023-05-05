import axios from 'axios'
import React, { Dispatch, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { User } from '../models/User'
import Menu from './Menu'
import Nav from './Nav'
import { setUser } from './../redux/action/setUserAction';


const Layout = (props:any) => {
    const[redirect,setRedirect] = useState(false)
    // const [user,setUser] = useState<User | null>(null)
    useEffect(() =>{
        (
            async () => {
                try {
                    const {data} = await axios.get('users')
                    // console.log(data)
                    // setUser(data)
                    props.setUser(data)
                } catch (error) {
                    console.log(error)
                    setRedirect(true)
                }
            }
        )()
    },[])
    if (redirect) {
        return <Navigate to='/login' />
    }
  return (
    <div>
        {/* 
        before using redux
        <Nav user={user}/> */}
        {/* after using redux */}
        <Nav  />
        <div className="container-fluid">
            <div className="row">
                <Menu />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {props.children}
                </main>
            </div>
        </div>
    </div>
  )
}

// first one means that we are getting events from another component and we want to handle them in this function
const mapStateToProps = (state:{user:User}) => ({
    user : state.user
})

// second one will send the event to the another component
const mapDispatchToProps = (dispatch:Dispatch<any>) => ({
    setUser:(user:User) => dispatch(setUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(Layout)