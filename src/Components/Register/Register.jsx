import React, { useState } from 'react'
import styles from './Register.module.css'
import { registerUser } from '../../apis/auth'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({name:'',email:'',password:''})

  const fetchDetails=async()=>{
    const response= await registerUser(formData.name,formData.email,formData.password)
    if(response?.name){
     navigate('/login')
    }
 }

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

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <h1>Create an account</h1>
          <p>Your personal job finder is here</p>
          <form className={styles.regform} action="">
          <input type="text" placeholder='Name' name='name' value={formData.name} onChange={handleFormChange} />
          <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleFormChange}/>
          <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleFormChange}/>
          <span>
          <input type="checkbox" className={styles.checkbox}/>
          <label style={{color:"#525252",marginLeft: "1%"}}>By creating an account, I agree to our terms of use and privacy policy</label>
          </span>
          <button className={styles.signinBtn} onClick={handleSubmit}>Create Account</button>
          <p style={{float: "left"}}>Already have an account?  <span><a href="">Sign In</a></span></p>
          </form>
        </div>
        <div className={styles.regimg}>
          <img src="/images/register.png" alt="register image" />
          <h1 className={styles.regh}>Your Personal Job Finder</h1>
        </div>
      </div>
    </>
  )
}

export default Register