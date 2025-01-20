import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import { BASE_URL, defaulPhotoUrl } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState('')
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [about, setAbout] = useState('');
    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState([]);
    const [photoUrl, setPhotoUrl] = useState('');

    const [ageError, setAgeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    // let birthday = undefined;


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
        setAgeError('')

    }

    const checkPassword = () => {
        if (password !== confirmPassword) {
            setPasswordError("Password does not match");
        } else {
            setPasswordError("");
        }
    }

    // const checkValidUrl = () => {
    //     if(photoUrl === '') return;
    //     try{
    //         const url = new URL(photoUrl)
    //         setUrlError('')
    //     }
    //     catch(err) {
    //         setUrlError('Invalid Photo Url')
    //     }
    // }

    const handleCreateBtnClick = async () => {
        if (password !== confirmPassword) return;
        try {
            const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password, gender: gender === '' ? undefined : gender, photoUrl, about, skills, age, birthday}, { withCredentials: true })
            setError('');
            console.log(res)
            dispatch(addUser(res.data.user));
            navigate("/")
        } catch (err) {
            console.log(err)
            setError(err?.response?.data);

        }

    }

    useEffect(calculateAge, [birthday])
    useEffect(checkPassword, [password, confirmPassword])
    // useEffect(checkValidUrl, [photoUrl])

    return (
        <div className='flex flex-col items-center justify-center mb-20'>
            <h1 className='my-10 font-bold text-2xl text-gray-300 '>Create account</h1>
            <div className='flex w-full justify-center'>
                <div className='w-1/3 p-5 flex flex-wrap'>
                    <label className="form-control w-1/2 p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300">First Name <span className='text-red-400 '>*</span></span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="text" className="input input-bordered w-full bg-base-300" value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                        <div className="label">
                            {/* <span className="label-text-alt">Bottom Left label</span> */}
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    <label className="form-control w-1/2 p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300" >Last Name</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="text" className="input input-bordered w-full bg-base-300" value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                        <div className="label">
                            {/* <span className="label-text-alt">Bottom Left label</span> */}
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    <label className="form-control w-full p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300">Email ID <span className='text-red-400 '>*</span></span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="text" className="input input-bordered w-full bg-base-300" value={emailId}
                            onChange={(e) => setEmailId(e.target.value)} />
                        <div className="label">
                            {/* <span className="label-text-alt">Bottom Left label</span> */}
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    <label className="form-control w-1/2 p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300">Password <span className='text-red-400 '>*</span></span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="password" className="input input-bordered w-full bg-base-300" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <div className="label">
                            {/* <span className="label-text-alt">Bottom Left label</span> */}
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    <label className="form-control w-1/2 p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300">Confirm password <span className='text-red-400 '>*</span></span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="password" className="input input-bordered w-full bg-base-300" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div className="px-1">
                            {passwordError !== '' && <span className="label-text-alt text-red-400">{passwordError}</span>}
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    <label className="form-control w-full p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300">Birthday </span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="date" className="input input-bordered w-full bg-base-300" value={birthday} onChange={(e)=>{
                            setBirthday(e.target.value) 
                        }}/>
                        <div className="px-1">
                            {ageError !== '' && <span className="label-text-alt text-red-400">{ageError}</span>}
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    
                    <label className="form-control w-full p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300">Gender</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <div>
                            <span className={`badge border-gray-700 mx-1 mb-1 w-36 min-w-36 py-4 bg-base-300 
                                ${gender === 'male' ? 'border-red-400' : 'hover:border-gray-300'}`}
                                onClick={() => setGender('male')}>Male</span>
                            <span className={`badge border-gray-700 mx-1 w-36 min-w-36 py-4 bg-base-300 
                                ${gender === 'female' ? 'border-red-400' : 'hover:border-gray-300'}`}
                                onClick={() => setGender('female')}>Female</span>
                            <span className={`badge border-gray-700 mx-1 w-36 min-w-36 py-4 bg-base-300 
                                ${gender === 'others' ? 'border-red-400' : 'hover:border-gray-300'}`} onClick={() => setGender('others')}>Others</span>
                        </div>
                        <div className="label">
                            {/* <span className="label-text-alt">Bottom Left label</span> */}
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    <label className="form-control w-full p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300">Photo Url</span>
                        </div>
                        <input type="text" className="input input-bordered w-full bg-base-300" value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)} />
                        {/* {urlError!=='' && <div className="px-1 ">
                            <span className="label-text-alt text-red-400"> {urlError} </span>
                        </div>} */}
                    </label>
                    <label className="form-control w-full p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300">About</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24 bg-base-300" value={about}
                            onChange={(e) => setAbout(e.target.value)} ></textarea>
                    </label>
                    <label className="form-control w-full p-1">
                        <div className="label">
                            <span className="label-text font-bold text-gray-300">Skills</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 pr-0 bg-base-300">
                            <input value={skill} onChange={(e) => setSkill(e.target.value)} type="text" className="grow" />
                            <button className="btn btn-ghost rounded-none text-2xl rounded-e-md" onClick={handleAddSkill}>+</button>
                        </label>
                        <div className='flex flex-wrap mt-2'>
                            {skills?.map((skill, index) =>
                            (<div key={index} className="badge gap-2 m-1 py-4 bg-base-300">
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
                    </label>
                    {error !== '' && <div className="px-1 w-full">
                        <span className="label-text-alt text-red-400"> {error} </span>
                    </div>}
                    <button className='btn m-auto btn-primary my-5'
                        onClick={() => { handleCreateBtnClick() }}>Create Account</button>
                    <Link to="/login" className="text-sm underline italic mt-2 w-full justify-center flex">Already a user? Login here</Link>
                </div>
                <div className='w-1/3 ml-10'>
                    <UserCard user={{ firstName, lastName, gender, photoUrl, age, skills, about }} /></div>
            </div>
        </div>
    )
}

export default Register
