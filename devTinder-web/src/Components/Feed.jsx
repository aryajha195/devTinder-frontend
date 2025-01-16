import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';

const Feed = () => {
  const feed = useSelector(store => store.feed)
  const [currentInd, setCurrentInd] = useState(0);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed?limit=10", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {

    }
  }

  useEffect(() => { getFeed() }, []);
  return (
    feed && <div className='flex justify-center m-10'>
      <UserCard user={feed[5]} />
    </div>
  )
}

export default Feed
