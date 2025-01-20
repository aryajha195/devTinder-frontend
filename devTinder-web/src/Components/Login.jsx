import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userData = useSelector(store => store.user);
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
      setError('')

    } catch (err) {
      console.error(err);
      setError(err.response.data)
    }
  }

  useEffect(()=>{if(userData) navigate("/")})
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
          {error !== '' && (<div className="px-1 w-full">
                        <span className="label-text-alt text-red-400"> {error} </span>
                    </div>)}
          <div className="card-actions items-center flex flex-col my-4">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            <Link to="/register" className="text-sm underline italic mt-2">New to devTinder? Register here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
