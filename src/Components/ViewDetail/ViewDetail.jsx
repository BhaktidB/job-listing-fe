import React, { useState,useEffect } from 'react'
import styles from './ViewDetail.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getJobUpdateById } from '../../apis/job'
import Cookies from 'js-cookie';


const ViewDetail = () => {

    const navigate=useNavigate()
    let {id}=useParams()

    const [jwtToken,setToken]=useState()
    const [jobDetails, setJobDetails] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    const fetchJobDetailsById = async () => {
        if (!id) return;
        const response = await getJobUpdateById(id);
        console.log(response)
        setJobDetails(response);

    };

    const isAllowedToEdit = () => {
        const token = Cookies.get('jwt');
        if (token) {
            setIsEditable(true);
        }
    };

    const handleLogout = () => {
        // Remove the JWT token from cookies
        Cookies.remove('jwt');
        // Set token state to null
        setToken(null);
    };

    useEffect(()=>{
        setToken(Cookies.get('jwt'))
       },[])

    useEffect(() => {
        isAllowedToEdit();
        fetchJobDetailsById();
    }, []);

    return (
        <>
         {jobDetails ? (
            <div className={styles.container}>

                <div className={styles.navbar}>

                    <h2>Jobfinder</h2>
                    <div className={styles.groupBtn}>
                        {jwtToken?<>
                        <button className={styles.logoutBtn}
                        onClick={handleLogout}>Logout</button>
                        <p className={styles.logoutBtn}>Hello! Recruiter</p>
                        <img className={styles.profilePic} src="/images/addjobimg.png" alt="" />
                        </>:<>
                        <button className={styles.loginBtn} onClick={()=>navigate('/login')}>Login</button>
                        <button className={styles.registerBtn} onClick={()=>navigate('/register')}>Register</button>
                        </>}
                                                
                    </div>

                </div>
                <div className={styles.wrapper}>
                    <div className={styles.heading}>
                        <p>{jobDetails?.jobPosition}</p>
                    </div>

                    <div className={styles.description}>
                        <p className={styles.grayText}><span>1w ago </span>. 6 Months 
                            <img src={jobDetails?.logoUrl} alt="" style={{width: '4%',borderRadius: '10%',margin:'0% 1%'}}/>
                            <span> {jobDetails?.companyName}</span></p>
                        <div className={styles.h1Editbtn}>
                            <h1>{jobDetails?.jobPosition}</h1>
                            {jwtToken?<>
                                <button className={styles.editBtn} 
                            onClick={() => {
                                navigate("/job-post", {
                                    state: {
                                        id: jobDetails._id,
                                        jobDetails: jobDetails,
                                        edit: true,
                                    },
                                });
                            }}
                            >Edit job</button>
                            </>:<></>}
                            
                        </div>


                        <p className={styles.redText}><span>{jobDetails?.location}</span> | <span>India</span></p>

                        <div className={styles.stipendInfo}>
                            <span className={styles.grayText}><img src="" alt="" />Stipend
                                <p className={styles.paraText}>Rs {jobDetails?.salary}/month</p></span>

                            <span className={styles.grayText}><img src="" alt="" />Duration
                                <p className={styles.paraText}>6 Months</p></span>

                        </div>

                        <p className={styles.subheading}>About company</p>

                        <p className={styles.paraText}>{jobDetails?.about}</p>

                        <p className={styles.subheading}>About the  job/internship</p>

                        <p className={styles.paraText}>{jobDetails?.jobDescription}</p>

                        <p className={styles.subheading}>Skills required</p>
                        <p className={styles.skills}>
                        {jobDetails?.skills.map((skill)=>(
                            <span>{skill}</span>
                        ))}
                        </p>

                        <p className={styles.subheading}>Additional Information</p>

                        <p className={styles.paraText}>{jobDetails?.information}</p>
                    </div>
                </div>
            </div>
             ) : (
                <>
                <h1>Oh No! Something went wrong.</h1>
                </>
            )}
        </>
    )
}

export default ViewDetail