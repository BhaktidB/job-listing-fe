import React, { useState,useEffect } from 'react'
import styles from './AddJob.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { postJob,patchJobUpdateById } from '../../apis/job'
import {DEFAULT_SKILLS} from '../../utils/constants'

const AddJob = () => {
    const navigate =useNavigate();

    const {state}=useLocation();
    const [stateData] = useState(state?.jobDetails);
    const [newSkills, setNewSkills] = useState([]);

    console.log(state)

    const [formData,setFormData]=useState({
        companyName:'' || stateData?.companyName,
        logoUrl:''|| stateData?.logoUrl,
        jobPosition:'' || stateData?.jobPosition,
        salary:'' || stateData?.salary,
        jobType:'' || stateData?.jobType,
        locationType:'' || stateData?.locationType,
        location:'' || stateData?.location,
        jobDescription:'' || stateData?.jobDescription,
        about:'' || stateData?.about,
        skills:[] || stateData?.skills,
        information:'' || stateData?.information
    })

    const addSkills = (event) => {
        const skill = event.target.value;
        console.log(skill)
        const actualSkills = formData.skills;
        console.log(actualSkills)

        const filteredSkills = actualSkills.filter(
            (element) => element == skill
        );
        console.log(filteredSkills)


        if (!filteredSkills.length) {
            const updatedSkills = [...formData.skills, skill];
            setFormData({ ...formData, skills: updatedSkills });
        }
        console.log(formData.skills)
    };

    const removeSkill = (skillToRemove) => {
        const filteredSkills = formData.skills.filter(
            (element) => element !== skillToRemove
        );
        setFormData({ ...formData, skills: filteredSkills });
    };
    

    const handleFormChange=(event)=>{
        const {name,value}=event.target;
        setFormData((oldVal)=>{
            return {
                ...oldVal,
                [name]:value
            }
        })
    }

    const fetchDetails=async()=>{
        const response = await postJob(formData);
        console.log(response.id)
        navigate('/')
        
     }
 

    const handleSubmit=async()=>{
        event.preventDefault(); 
        if (
            !formData.companyName ||
            !formData.logoUrl ||
            !formData.jobPosition ||
            !formData.salary ||
            !formData.jobType ||
            !formData.locationType ||
            !formData.location ||
            !formData.jobDescription ||
            !formData.about ||
            !formData.skills ||
            !formData.information
        ) {
            alert("Please fill in all fields.");

            return;
        }

        if (state?.edit) {
            patchJobUpdateById(state?.id, formData);
            navigate(`/job-details/${state.id}`);
            return;
        }

        await fetchDetails();
        console.log('success')
       
    }

    const handleCancel=()=>{
        navigate('/')
    }

  
    useEffect(() => {
        console.log(formData);
        console.log(stateData);
    }, [formData]);


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.jobDetails}>
                    <h1>Add job description</h1>
                    <form className={styles.jobForm} action="">
                        <div className={styles.formGroup}>
                        <label>Company Name</label>
                        <input type="text" name='companyName' value={formData.companyName} onChange={handleFormChange} placeholder='Enter your company name here'/>
                        </div>

                        <div className={styles.formGroup}>
                        <label>Add logo URL</label>
                        <input type="text" name='logoUrl' value={formData.logoUrl} onChange={handleFormChange} placeholder='Enter the link'/>
                        </div>

                        <div className={styles.formGroup}>
                        <label>Job position</label>
                        <input type="text" name='jobPosition' value={formData.jobPosition} onChange={handleFormChange} placeholder='Enter job position'/>
                        </div>

                        <div className={styles.formGroup}>
                        <label>Monthly salary</label>
                        <input type="text" name='salary' value={formData.salary} onChange={handleFormChange} placeholder='Enter Amount in rupees'/>
                        </div>

                        <div className={styles.formGroup}>
                        <label>Job Type</label>
                        <select name="jobType" value={formData.jobType} onChange={handleFormChange} id="">
                            <option value="" disabled selected >Select</option>
                            <option value="Full-time" >Full-time</option>
                            <option value="Part-time">Part-time</option>
                        </select>
                        </div>

                        <div className={styles.formGroup}>
                        <label>Remote/office</label>
                        <select name="locationType" value={formData.locationType} onChange={handleFormChange} id="">
                            <option value="" disabled selected >Select</option>
                            <option value="Remote" >Remote</option>
                            <option value="Office" >Office</option>
                        </select>
                        </div>

                        <div className={styles.formGroup}>
                        <label>Location</label>
                        <input type="text" name='location' value={formData.location} onChange={handleFormChange} placeholder='Enter Location'/>
                        </div>

                        <div className={styles.formGroup}>
                        <label>Job Description</label>
                        <input type="text" name='jobDescription' value={formData.jobDescription} onChange={handleFormChange} placeholder='Type the job description'/>
                        </div>

                        <div className={styles.formGroup}>
                        <label>About Company</label>
                        <input type="text" name='about' value={formData.about} onChange={handleFormChange} placeholder='Type about your company'/>
                        </div>

                        <div className={styles.formGroup}><label>Skills Required</label>
                        <select name="skills" value={formData.skills} onChange={addSkills} id="">
                            <option value="" disabled selected>Enter the must have skills</option>
                            {DEFAULT_SKILLS.map((skill)=>(
                            <option value={skill} >{skill}</option>))}
                        </select></div>
                        <div className={styles.selected}>
                        {formData?.skills?.map((element, index) => (
    <span key={index} style={{
        background:'#FFEEEE',
        borderRadius:'5%',
        display: 'flex',
    }}>
        <p>{element}&nbsp;</p>
        <button 
            style={{background:'#FF6B6B',color:'white',border:'none',padding:'4% 10%'}}
            onClick={() => removeSkill(element)}> 
            X
        </button>
    </span>
))}

                        </div>
                        
                        <div className={styles.formGroup}>
                        <label>Information</label>
                        <input type="text" name='information' value={formData.information} onChange={handleFormChange} placeholder='Enter the additional information'/>
                        </div>
                        
                        <div className={styles.groupBtn}>
                        <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
                        <button className={styles.addBtn} onClick={handleSubmit}>{state?.edit ? "Edit Job" : "+ Add Job "}</button>
                        </div>          
                    </form>
                </div>
                <div className={styles.jobImg}>
                    <img src="/images/addjobimg.png" alt="" />
                    <h2 className={styles.jobh}>Recruiter add job details here</h2>
                </div>
            </div>

        </>
    )
}

export default AddJob

// {
//     "companyName": "google",
//     "logoUrl": "xyz",
//     "jobPosition": "xyz",
//     "salary": "xyz",
//     "jobType": "xyz",
//     "locationType": "xyz",
//     "location": "xyz",
//     "jobDescription": "xyz",
//     "about": "xyz",
//     "skills": ["html", "css", "Node.js"],
//     "information": "xyz"
// }