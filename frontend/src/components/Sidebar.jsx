import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    }
    return (
        <div className='border-r border-white/10 p-4 flex flex-col bg-black/20 w-80'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input h-10 w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg' type="text"
                    placeholder='Search users...'
                />
                <button type='submit' className='btn h-10 min-h-10 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg shadow-lg shadow-blue-600/30'>
                    <BiSearchAlt2 className='w-5 h-5 outline-none' />
                </button>
            </form>
            <div className="divider divider-neutral px-3 my-2 before:bg-white/10 after:bg-white/10"></div>
            <OtherUsers />
            <div className='mt-auto pt-4'>
                <button onClick={logoutHandler} className='btn btn-block h-12 text-lg bg-white hover:bg-gray-200 text-blue-900 font-extrabold border-none transition-all shadow-xl shadow-white/20'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar