import React, { Dispatch, useEffect, useState } from 'react'
import Header from './Header'
import Nav from './Nav'
import axios from 'axios'
import { connect } from 'react-redux'
import { User } from './../models/User';
import { userReducer } from './../redux/reducer/userReducer';
import { SetUserAction } from '../redux/action/userAction'
import { useLocation } from 'react-router-dom'

const Layout = (props:any) => {
    const location = useLocation()
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('users/')
                props.SetUserAction(data)
            }
        )()
    }, [])
    let header
    if (location.pathname === '/' || location.pathname === '/backend') {
        header = <Header/>        
    }
return (
<div>
    <Nav />

    <main>

        {header}
        <div className="album py-5 bg-light">
            <div className="container">
                {props.children}
            </div>
        </div>

    </main>
</div>
)
}

const mapStateToProps = (state:{user:User}) => ({
    user:state.user
})

const mapDispatchToProps = (dispatch:Dispatch<any>) => ({
    SetUserAction: (user:User) => dispatch(SetUserAction(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(Layout)