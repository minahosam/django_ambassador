import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from './../models/User';

const Header = (props:any) => {
    const [title,setTile] = useState('welcome')
    const [description,setDescription] = useState('share link to earn money')
    useEffect(() => {
        if (props.user?.id) {
            setTile(props.user.revenue)
            setDescription('you have earned this far')        
        }else{
            setTile('welcome')
            setDescription('share link to earned money')
        }
    }, [props.user])
    let buttons 
    if (!props.user?.id) {
        buttons = (
            <p>
                <Link to={'/login'} className="btn btn-primary my-2">Login</Link>
                <Link to={'/register'} className="btn btn-secondary my-2">Sign up</Link>
            </p>
        )
    }
  return (
    <section className="py-5 text-center container">
        <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">{title}</h1>
                <p className="lead text-muted">{description}</p>
                {buttons}
            </div>
        </div>
    </section>
)
}

const mapUserToProps = (state:{user:User}) => ({
    user: state.user
})

export default connect(mapUserToProps)(Header)
