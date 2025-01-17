import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeFeed } from '../utils/feedSlice';
import { removeConnections } from '../utils/connectionsSlice';
import { removeRequests } from '../utils/requestsSlice';

const Navbar = () => {
  const user = useSelector(selector => selector.user);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(BASE_URL + "/logout",
        {}, { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeRequests());
      naviagte("/login");
    } catch (err) {
      console.error(err);
    }

  }
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold font-serif">👩‍💻devTinder</Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end mx-5">
            <div className='flex items-center'>
              <div className='p-2 mx-2'> Welcome {user.firstName}</div>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user"
                    src={user.photoUrl} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile">
                  Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <Link to="/connections" >Connections</Link>
              </li>
              <li>
                <Link to="/requests" >Requests</Link>
              </li>
              <li><a onClick={() => document.getElementById('my_modal_2').showModal()}>Logout</a></li>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Are you sure, you want to Logout?</h3>
                  <div className='my-5 flex'>
                    <button className="btn btn-success btn-outline mr-5 w-20" onClick={handleLogout}>Yes</button>
                    <form method="dialog">
                      <button className="btn btn-error btn-outline w-20">No</button>
                    </form>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
