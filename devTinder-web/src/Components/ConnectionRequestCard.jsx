import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeRequest } from '../utils/requestsSlice'

const ConnectionRequestCard = ({ id, friend, showButtons }) => {
    const dispatch = useDispatch();

    const handleRequestsAction = async(status) => {
        try {
            const res = await axios.patch(BASE_URL+"/requests/review/"+status+"/"+id,
                {}, { withCredentials: true }
            )

            dispatch(removeRequest(id))

        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div className='flex bg-base-300 p-5 w-2/3 rounded-3xl my-1 '>
            <div className='w-24 flex items-center min-w-24'>
                <img src={friend.photoUrl} alt="user" className='rounded-full h-24 w-24' />
            </div>
            <div className='mx-4 p-2 text-justify flex justify-between w-full'>
                <div>
                    <h2 className='text-2xl font-bold my-1'>{friend.firstName + " " + friend.lastName}</h2>
                    <div className='my-1'>{friend?.age}{friend?.age && friend?.gender && <span>, </span>}{friend?.gender?.charAt(0).toUpperCase() + friend?.gender?.slice(1)}</div>
                    <p className='text-wrap my-1'>{friend?.about}</p>
                    {friend?.skills?.length > 0 &&
                        <p className='flex flex-wrap my-1'> Skills: {friend?.skills?.join(", ")}</p>
                    }
                </div>
                {showButtons && 
                <div className='flex items-center'>
                    <button className="btn btn-success mx-2 w-24 min-w-24 " onClick={()=>{ handleRequestsAction('accepted')}}>Accept</button>
                    <button className="btn btn-error mx-2 w-24 min-w-24 " onClick={()=>{ handleRequestsAction('rejected')}}>Reject</button>
                </div>}
            </div>

        </div>
    )
}

export default ConnectionRequestCard
