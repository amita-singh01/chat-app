import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-gray-200'} flex gap-2 hover:text-white items-center hover:bg-white/10 rounded-xl p-3 cursor-pointer transition-all duration-200`}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full border border-white/20'>
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p className='font-bold'>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider divider-neutral my-1 py-0 h-1 before:bg-white/10 after:bg-white/10'></div>
        </>
    )
}

export default OtherUser