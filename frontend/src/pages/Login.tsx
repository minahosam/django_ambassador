import React, { SyntheticEvent, useState } from 'react'
import '../login.css'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Login = () => {
    // const getCookie = (name : any) => {
    //     let cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         const cookies = document.cookie.split(';');
    //         for (let i = 0; i < cookies.length; i++) {
    //             const cookie = cookies[i].trim();
    //             // Does this cookie string begin with the name we want?
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [redirect,setRedirect] = useState(false)
    if (email) {
        email.toLowerCase()
    }
    const loginHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('login/',{
            email:email,
            password:password
        },{withCredentials:true});
        // console.log(email,password)
        setRedirect(true)
    }
    if (redirect) {
        return <Navigate to='/'/>
    }
// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [redirect, setRedirect] = useState(false);

//     const loginHandler = async (e: SyntheticEvent) => {
//         e.preventDefault();

//         await axios.post('login/', {
//             email,
//             password
//         },{withCredentials:true});

//         setRedirect(true);
//     }

//     // if (redirect) {
//     //     return <Redirect to={'/'}/>;
//     // }
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

export default Login
