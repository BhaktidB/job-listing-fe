import axios from 'axios';
const BASE_URL=import.meta.env.VITE_APP_BACKEND_URL;

export const loginUser=async(email,password)=>{
    try {
        // axios.defaults.withCredentials = true;
        const response=await axios.post(BASE_URL+'/auth/login',
        {email:email,password:password},
        {
            headers: {
                'Content-Type': 'application/json'
              }
        });
        return response.data;
    } catch (error) {
        console.log('something went wrong')
    }

}

export const registerUser=async(name,email,password)=>{
    try {
        const response=await axios.post(BASE_URL+'/auth/register',
        {name:name,email:email,password:password});
        return response.data;
    } catch (error) {
        console.log('something went wrong')
    }

}

export const logoutUser=async()=>{
    try {
        const response=await axios.get(BASE_URL+'/auth/logout');
        return response.data;
    } catch (error) {
        console.log('something went wrong')
    }

}