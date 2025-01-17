import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeedUser } from '../utils/feedSlice'

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const handleAction = async (status) => {
        try {
            const res = await axios.post(BASE_URL + "/requests/send/" + status + "/" + user._id, {}, { withCredentials: true });
            console.log(res)
            dispatch(removeFeedUser(user._id));
        } catch (err) {
            console.log(err);
        }


    }

    return (
        <div className="card bg-base-300 w-96 max-h-fit shadow-xl mx-10 mb-10">
            <figure>
                <img className='max-w-full max-h-80 rounded-md my-1'
                    src={user.photoUrl}
                    alt="User Profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
                <div>
                    <span>{user?.age}</span>
                    {user?.age && user?.gender && <span>, </span>}
                    <span>{user?.gender.charAt(0).toUpperCase() + user?.gender.slice(1)}</span>
                </div>
                <p>{user?.about}</p>
                {user?.skills?.length ?
                    <span>Skills: {user?.skills?.join(", ")}</span> : null}
                <div className="card-actions justify-center my-5">
                    <button className="btn bg-blue-600 hover:bg-blue-500 mx-2 text-white w-32" onClick={()=>{handleAction('ignored')}}>Ignore</button>
                    <button className="btn bg-pink-600 hover:bg-pink-500 mx-2 text-white w-32" onClick={()=>{handleAction('interested')}}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
