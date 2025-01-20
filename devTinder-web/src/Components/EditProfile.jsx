import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
    const [gender, setGender] = useState(user?.gender);
    const [about, setAbout] = useState(user?.about);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [age, setAge] = useState(user?.age);
    const [birthday, setBirthday] = useState(user?.birthday)
    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState(user?.skills);
    const [showNotification, setShowNotification] = useState(false)
    const [error, setError] = useState('');
    const [ageError, setAgeError] = useState('');
    const dispatch = useDispatch();

    const updateUser = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                age, gender, about, photoUrl, skills
            }, { withCredentials: true });
            setError('')
            dispatch(addUser(res?.data?.data));
            setShowNotification(true);
            setTimeout(() => { setShowNotification(false) }, 3000);
        } catch (err) {
            setError(err.response.data)
            console.log("Error: ", err);
        }
    }

    const handleAddSkill = () => {
        try {
            if (skill.trim() !== "") {
                setSkills(prevItems => [...prevItems, skill]);
                setSkill('')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const calculateAge = () => {
        
        const today = new Date();
        const dob = (new Date(birthday));
       
        if (today < dob) {
            setAge('')
            setAgeError('Date should not be in future')
            return
        }

        let yearsTillNow = today.getFullYear() - dob.getFullYear();
        if (yearsTillNow < 18) {
            setAge('')
            setAgeError('Minimum age limit: 18');
            return
        }
        else if (yearsTillNow > 100) {
            setAge('')
            setAgeError('Maximum age limit: 100');
            return
        }
        setAge(yearsTillNow)
        console.log(age)
        setAgeError('')

    }

    useEffect(calculateAge, [birthday])

    return (
        <div className="flex flex-col justify-center">
            {showNotification && <div className="toast toast-top toast-center z-10">
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
                            <input value={user.emailId} type="text" className="input input-bordered w-full max-w-xs" disabled />
                        </label>

                        <label className="form-control w-full p-1">
                            <div className="label">
                                <span className="label-text ">Birthday </span>
                                {/* <span className="label-text-alt">Top Right label</span> */}
                            </div>
                            <input type="date" className="input input-bordered w-full 0" value={birthday} onChange={(e) => {
                                setBirthday(e.target.value)
                                // console.log(e.target.value)
                            }} />
                            <div className="px-1">
                                {ageError !== '' && <span className="label-text-alt text-red-400">{ageError}</span>}
                                {/* <span className="label-text-alt">Bottom Right label</span> */}
                            </div>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <select defaultValue={gender} onChange={(e) => setGender(e.target.value)} className="select select-bordered">
                                <option disabled>--Select--</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='others'>Others</option>
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
                                <span className="label-text">Photo Url</span>
                            </div>
                            <input value={photoUrl} onChange={(e) => { setPhotoUrl(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
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
                                <button className="btn btn-circle btn-xs btn-ghost" onClick={() => {
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
                        {error !== '' && <div className="px-1 w-full">
                            <span className="label-text-alt text-red-400"> {error} </span>
                        </div>}
                        <div className="card-actions justify-center my-4">
                            <button className="btn btn-primary" onClick={updateUser} >Save Details</button>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName: user.firstName, lastName: user.lastName, gender, photoUrl, age, skills, about, birthday }} />
            </div>
        </div>
    )
}

export default EditProfile
