import axios from 'axios';
const BASE_URL=import.meta.env.VITE_APP_BACKEND_URL;
import Cookies from 'js-cookie';


export const postJob=async(payload)=>{
    try {
        const token=Cookies.get('jwt')
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(BASE_URL+'/job/post-job', payload);
        
        return response.data;
    } catch (error) {
        console.error('Error posting job:', error);
    }

}

export const patchJobUpdateById=async(id,updatedFormData)=>{
    try {
        const token=Cookies.get('jwt')
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.patch(BASE_URL+`/job/edit-post/${id}`, updatedFormData);
        
        return response.data;
    } catch (error) {
        console.error('Error posting job:', error);
    }

}

export const getJobUpdateById=async(id)=>{
    try {
        // const token=Cookies.get('jwt')
        // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(BASE_URL+`/job/all-job-details/filter/${id}`,
        );
        
        return response.data;
    } catch (error) {
        console.error('Error posting job:', error);
    }

}

export const getJob=async(filter)=>{
    try {
        const token=Cookies.get('jwt')
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(BASE_URL+`/job/all-job-details?company=${filter?.company}&skills=${filter?.skills}`,
        );
        
        return response.data;
    } catch (error) {
        console.error('Error posting job:', error);
    }

}


// export const postJob=async(payload)=>{
//     try {
//         // axios.defaults.withCredentials = true;
//         const response=await axios.post(BASE_URL+'/job/post-job',
//         payload,
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//               }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error posting job:', error);
//             }

// }