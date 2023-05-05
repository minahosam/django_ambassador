import { Button, TextField } from '@mui/material'
import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../container/Layout'
import { User } from './../models/User';
import axios from 'axios';
import { SetUserAction } from './../redux/action/userAction';
import { Navigate } from 'react-router-dom';

const Profile = (props:any) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
//   const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    setFirstName(props.user.first_name)
    setLastName(props.user.last_name)
    setEmail(props.user.email)
  }, [props.user])

  const detailUpdate = async (e:SyntheticEvent) => {
    e.preventDefault()
    const {data} = await axios.put('update/',{
        first_name : firstName,
        last_name : lastName,
        email
    })
    props.SetUserAction(data)
    // setRedirect(true)
  }

  const passwordUpdated = () => {}

//   if (redirect) {
//     return <Navigate to='/' />
//   }

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
            <Button className='mb-3' variant='contained' color='primary' type='submit'>submit</Button>
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

const mapUserToProps =(state:{user:User}) => ({
    user : state.user
})

const mapUserToDispatch = (dispatch:Dispatch<any>) => ({
    SetUserAction : (user:User) => dispatch(SetUserAction(user))
});

export default connect(mapUserToProps,mapUserToDispatch)(Profile)