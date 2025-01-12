import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("anushka@dev.com");
  const [password, setPassword] = useState("Anushka@123");
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/")

    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email Id</span>
            </div>
            <input value={emailId} onChange={(e)=>setEmailId(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}type="password" className="input input-bordered w-full max-w-xs" />
          </label>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
