import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";
import ConnectionRequestCard from "./ConnectionRequestCard";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);
    const getRequests = async () => {
        if(requests) return;
        try {
            const res = await axios.get(BASE_URL + "/user/requests", { withCredentials: true });
            dispatch(addRequests(res.data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getRequests();
    }, [])

    if(!requests || !requests?.length) return <div className='flex justify-center mt-5 text-lg'> No Requests Found</div>
    return (
        <div className='text-center'>
            <h1 className='my-3  text-3xl'>Requests</h1>
            <div className='flex items-center flex-col mb-20'>
                {requests.map(req => (
                    <ConnectionRequestCard key={req._id} id={req._id} friend={req.fromUserId} showButtons={true}/>
                ))}
            </div>
        </div>
    )
    
}

export default Requests;