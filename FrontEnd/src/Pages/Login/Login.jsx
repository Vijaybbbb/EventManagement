import React, { useEffect } from 'react';
import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {axiosRequest} from '../../../Utils/axiosRequest.js';
import { useDispatch, useSelector } from 'react-redux';
import { storeUser } from '../../Redux/loginSlice.js';
import { ToastContainer, toast } from 'react-toastify';



const Login = ({setIsAuthenticated,isAuthenticated}) => {

    //const userDetails = useSelector(state => state.userDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [successMessage,setSuccessMessage]  = useState()
    const [errorMessage,setErrorMessage] = useState()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    let getValue = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })

    }
    // useEffect(()=>{
    //     console.log(isAuthenticated);
    //     if(isAuthenticated){
    //         navigate('/')
    //     }
    // })

    //handle signup function
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission
        axiosRequest.post('/user/login',userData,{withCredentials:true}).then((response) => {
            console.log(response);
            setSuccessMessage(response.data.message)
            dispatch(storeUser(response.data._id))
            toast.success("Login successfull!");
            setTimeout(()=>{
                navigate('/')
            },2000)

           //setIsAuthenticated(true)
            //localStorage.setItem('isAuthenticated',true);
        }).catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <div className='loginPage'>
             <ToastContainer />
        <main className="mainLogin">
            <div className="containerLogin">
                <section className="wrapperLogin">
                    <div className="headingLogin">
                        <h1 className="text text-large">Log in</h1>
                        <p className="text text-normal">New user? <span><a href="#" className="text text-links" onClick={()=>{navigate('/signup')}}>Create an account</a></span></p>
                    </div>
                    <form name="signin" className="formLogin" onSubmit={handleLogin}>
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden>Email Address</label>
                            <input type="email" required name="email" id="email" className="input-field" placeholder="Email Address"  onChange={getValue}/>
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Password</label>
                            <input type="password" required name="password" id="password" className="input-field" placeholder="Password"   onChange={getValue}/>
                        </div>
                        <div className="input-control">
                            <a href="#" className="text text-links" onClick={()=>{navigate('/enterEmail')}}>Forgot Password</a>
                            <button type="submit" name="submit" id="input-submit"> Log in</button>
                        </div>
                    </form>
                    {successMessage &&
                    <div className='loginMessage2'>
                        <span style={{ marginLeft: '10px' }}>{successMessage}</span>
                    </div>
                    }
                    {errorMessage &&
                    <div className='loginMessage'>
                        <span style={{ marginLeft: '10px' }}>{errorMessage}</span>
                    </div>
                    }
                </section>
            </div>
        </main>
        </div>
    );
};

export default Login;
