import { Button, TextField } from '@mui/material'
import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react'
import Layout from '../containers/Layout'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { User } from '../models/User';
import { setUser } from '../redux/action/setUserAction';
import { connect } from 'react-redux';

const Profile = (props:any) => {
    const [firstName,setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        // (
        //     async () => {
        //         const {data} = await axios.get('users/')
        //         setFirstName(data.first_name)
        //         setLastName(data.last_name)
        //         setEmail(data.email)
        //     }
        // )()
        setFirstName(props.user.first_name)
        setLastName(props.user.last_name)
        setEmail(props.user.email)
    }, [props])
    const detailUpdate = async (e: SyntheticEvent)=>{
        e.preventDefault()
        const {data} = await axios.put('update/',{first_name:firstName,last_name:lastName,email})
        // setRedirect(true)
        props.setUser(data)
    }
    const passwordUpdated = async(e: SyntheticEvent)=>{
        e.preventDefault()
    }
    if (redirect){
        return <Navigate to='/' />
    }
  return (
    <Layout>
        <form onSubmit={detailUpdate}>
            <div className='mb-3'>
                <TextField label='first_name' value={firstName || ''} onChange={e=> setFirstName(e.target.value)} />
            </div>
            <div className='mb-3'>
                <TextField label='last_name' value={lastName || ''} onChange={e=>setLastName(e.target.value)} />
            </div>
            <div className='mb-3'>
                <TextField label='email' value={email || ''} onChange={e=>setEmail(e.target.value)} />
            </div>
            <Button variant='contained' color='primary' type='submit'>submit</Button>
        </form>
        <form onSubmit={passwordUpdated}>
            <div className='mb-3'>
                <TextField label='password' value={password} onChange={e=>setPassword(e.target.value)} type='password' />
            </div>
            <div className='mb-3'>
                <TextField label='confirmpassword' value={ConfirmPassword} onChange={e=>setConfirmPassword(e.target.value)} type='password' />
            </div>
            <Button variant='contained' color='primary' type='submit'>submit</Button>
        </form>
    </Layout>
  )
}

const mapStateToProps = (state:{user:User}) => ({
    user : state.user
  })
  
  
  const mapDispatchToProps = (dispatch:Dispatch<any>) => ({
    setUser:(user:User) => dispatch(setUser(user))
  })

export default connect(mapStateToProps,mapDispatchToProps)(Profile) 