import React, { useState, useEffect } from 'react'
import styles from './MainPage.module.css'
import { logoutUser } from '../../apis/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getJob } from '../../apis/job'
import { DEFAULT_SKILLS } from '../../utils/constants'

const MainPage = () => {

    const navigate = useNavigate()
    const [token, setToken] = useState()
    const [details, setDetails] = useState()
    const [isEditable, setIsEditable] = useState(false);
    const [skills, setSkills] = useState([]);
    const [title, setTitle] = useState("");


    const handleAddJob = () => {
        if (!token) {
            return;
        }
        navigate('/job-post')
    }

    const fetchAllJobDetails = async () => {
        try {
            const filterSkills = skills.join(",");
            const response = await getJob({ skills: filterSkills, company: title });
            console.log(response.filterDetails);
            setDetails(response.filterDetails);
        } catch (error) {
            console.error("Error fetching job details:", error);

        }
    }

    const isAllowedToEdit = () => {
        const token = Cookies.get('jwt');
        if (token) {
            setIsEditable(true);
        }
    };

    const handleSkill = (event) => {
        const newArr = skills.filter((skill) => skill === event.target.value);
        if (!newArr.length) {
            setSkills([...skills, event.target.value]);
        }
    };

    const removeSkill = (selectedSkill) => {
        const newArr = skills.filter((skill) => skill !== selectedSkill);
        setSkills([...newArr]);
    };

    const handleLogout = () => {
        // Remove the JWT token from cookies
        Cookies.remove('jwt');
        // Set token state to null
        setToken(null);
    };

    useEffect(() => {
        isAllowedToEdit();
        fetchAllJobDetails();
    }, [title, skills])

    useEffect(() => {
        setToken(Cookies.get('jwt'))
    }, [])

    return (
        <>
            <div className={styles.container}>

                <div className={styles.navbar}>

                    <h2>Jobfinder</h2>
                    <div className={styles.groupBtn}>
                        {token?<><button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                    <p className={styles.logoutBtn}>Hello! Recruiter</p>
                    <img className={styles.profilePic} src="/images/addjobimg.png" alt="" />
                    </>:<>
                        <button className={styles.loginBtn} onClick={() => (navigate('/login'))}>Login</button>
                        <button className={styles.registerBtn} onClick={() => (navigate('/register'))}>Register</button>
                        </>}                    

                    </div>

                </div>
                <div className={styles.wrapper}>

                    <div className={styles.filterCard}>

                        <div className={styles.searchbar}>
                            <input
                                type="text"
                                value={title}
                                name='search'
                                onChange={(event) => setTitle(event.target.value)}
                                className={styles.searchinput}
                                placeholder="Type any job title"
                            />

                            <svg className={styles.searchicon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>

                        <span className={styles.spanClass}>
                            <select onChange={handleSkill} name="skills" id="">
                                <option value="Skills" disabled selected>Skills</option>
                                {DEFAULT_SKILLS.map((skill) => (
                                    <option value={skill} >{skill}</option>))}
                            </select>
                            {skills.map((skill) => {
                                return (
                                    <span className={styles.chip} key={skill}>
                                        {skill}
                                        <span
                                            onClick={() => removeSkill(skill)}
                                            className={styles.sbutton}
                                        >
                                            X
                                        </span>
                                    </span>
                                );
                            })}

                            {
                                token?<>
                                <button className={styles.addJobBtn} onClick={handleAddJob}>+ Add Job</button>
                                </>:<></>
                            }
                            
                            
                        </span>

                    </div>



                    {details ? <>{details.map((detail) => (

                        <>
                            <div className={styles.jobPostCard}>

                                <div className={styles.left}>
                                    <img src={detail ? `${detail?.logoUrl}` : "/svgs/companyLogo.svg"} alt="company logo" style={{ width: '10%', height: '50%', borderRadius: '10%' }} />
                                    <div className={styles.leftc}>
                                        <p style={{ fontWeight: '600' }}>{detail?.jobPosition}</p>
                                        <div style={{ color: '#9C9C9C' }}>
                                            <span className={styles.leftinfo}>
                                                <img src="/svgs/people.svg" alt="" />
                                                <p>11-20</p>
                                            </span>

                                            <span className={styles.leftinfo}>
                                                <img src="/svgs/rupees.svg" alt="" />
                                                <p>{detail?.salary}</p>
                                            </span>

                                            <span className={styles.leftinfo}>
                                                <img src="/svgs/countryFlag.svg" alt="" />
                                                <p>{detail?.location}</p>
                                            </span>
                                        </div>
                                        <div style={{ color: '#ED5353' }}>
                                            <span>{detail?.locationType}</span>
                                            <span>{detail?.jobType}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.right} >
                                    <div>
                                        {detail?.skills.map((skill) => (
                                            <span>{skill}</span>
                                        ))}

                                    </div>
                                    <span style={{ justifyContent: "flex-end", alignItems: "unset" }}>
                                        {token?<>
                                            <button className={styles.editJobBtn} onClick={() => {
                                            navigate("/job-post", {
                                                state: {
                                                    id: detail._id,
                                                    jobDetails: detail,
                                                    edit: true,
                                                },
                                            });
                                        }}>Edit Job</button>
                                        </>:<>
                                        </>}
                                        
                                        <button className={styles.viewJobBtn}
                                        onClick={() => navigate(`/job-details/${detail?._id}`)}>View details</button>
                                    </span>
                                </div>

                            </div>
                        </>
                    ))}
                    </>
                        : <>
                            <h1>No Jobs</h1>
                        </>}
                </div>
            </div>
        </>
    )
}

export default MainPage