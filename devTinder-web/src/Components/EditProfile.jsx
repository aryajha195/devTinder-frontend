import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState(user.skills);
    const [showNotification, setShowNotification] = useState(false)
    const dispatch = useDispatch();

    const updateUser = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                age, gender, about, photoUrl, skills
            }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setShowNotification(true);
            setTimeout(() => { setShowNotification(false) }, 3000);
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    const handleAddSkill = () => {
        try {
            if(skill.trim()!=="") {
                setSkills(prevItems => [...prevItems, skill]);
                setSkill('')
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="flex flex-col justify-center">
            {showNotification && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>}
            <div className='flex justify-center'>
                <div className="card bg-base-300 w-96 shadow-xl mx-10 mb-10">
                    <div className="card-body">
                        <h2 className="card-title justify-center">{user.firstName} {user.lastName}</h2>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email ID</span>
                            </div>
                            <input value={user.emailId} type="text" className="input input-bordered w-full max-w-xs" disabled/>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Age</span>
                            </div>
                            <input value={age} onChange={(e) => setAge(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <select defaultValue={gender} onChange={(e) => setGender(e.target.value)} className="select select-bordered">
                                <option disabled>--Select--</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">About</span>
                            </div>
                            <textarea value={about} onChange={(e) => {
                                setAbout(e.target.value)
                                console.log(e.target.value)
                            }} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Profile Photo Url</span>
                            </div>
                            <input value={photoUrl} onChange={(e) => {setPhotoUrl(e.target.value)}} type="text" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Skills</span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2 pr-0">
                                <input value={skill} onChange={e => setSkill(e.target.value)} type="text" className="grow" />
                                <button className="btn btn-ghost rounded-none text-2xl rounded-e-md" onClick={handleAddSkill}>+</button>
                            </label>
                        </label>
                        <div className='flex flex-wrap'>
                        {skills?.map((skill, index) =>
                        (<div key={index} className="badge gap-2 m-1 py-4">
                            <button className="btn btn-circle btn-xs btn-ghost" onClick={()=> {
                                setSkills(skills.filter(item => item !== skill))
                            }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {skill}
                        </div>
                        ))}
                        </div>
                        <div className="card-actions justify-center my-4">
                            <button className="btn btn-primary" onClick={updateUser} >Save Details</button>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName: user.firstName, lastName: user.lastName, age, gender, photoUrl, skills, about }} />
            </div>
        </div>
    )
}

export default EditProfile
