import React, { useState } from 'react'
import styles from './Login.module.css'
import { loginUser } from '../../apis/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';



const Login = () => {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({email:'',password:''})

    const handleFormChange=(event)=>{
        const {name,value}=event.target;
        console.log(formData)
        setFormData((oldVal)=>{
            return {
                ...oldVal,
                [name]:value
            }
        })
    }
    
    const handleSubmit=async()=>{
        event.preventDefault(); 
         await fetchDetails();
    }

    const fetchDetails=async()=>{
       const response= await loginUser(formData.email,formData.password)
       console.log(response)
       const token = response.token;
        Cookies.set('jwt', token, { secure: true });
       if(response?.name){
        navigate('/')
       }
    }


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                <h2>Already have an account?</h2>
                <p>Your personal job finder is here</p>
                <form className={styles.regform} action="">
                    <div className={styles.flexInput}>
                <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleFormChange} />
                <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleFormChange} />
                    </div>
                <button className={styles.signinBtn} onClick={handleSubmit}>Sign in</button>
                </form>
                <p style={{float: "left"}}>Don't have an account?
                <span><a href=""> Sign Up</a></span></p>
                
            </div>
            <div className={styles.regimg}>
                <img src="/images/register.png" alt="register image" />
                <h2>Your Personal Job Finder</h2>
            </div>
            </div>
        </>
    )
}

export default Login