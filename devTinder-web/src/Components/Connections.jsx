import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import ConnectionRequestCard from './ConnectionRequestCard'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);
    const getConnections = async() => {
        if(connections) return;
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res.data));
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(()=>{getConnections()}, []);

    if(!connections || !connections?.length) return <div className='flex justify-center mt-5 text-lg'> No Connections Found</div>
    return (
        <div className='text-center'>
            <h1 className='my-3  text-3xl'>Connections</h1>
            <div className='flex items-center flex-col mb-20'>
                {connections.map(friend => (
                    <ConnectionRequestCard key={friend._id} friend={friend} showButtons={false}/>
                ))}
            </div>
        </div>
    )
}

export default Connections
