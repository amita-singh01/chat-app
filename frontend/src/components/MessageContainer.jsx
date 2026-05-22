import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='flex flex-col flex-1'>
                        <div className='flex gap-4 items-center bg-black/40 text-white px-6 py-4 border-b border-white/10'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full border border-white/20'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p className='font-bold text-lg'>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='flex-1 flex flex-col justify-center items-center text-center p-8'>
                        <h1 className='text-5xl text-white font-extrabold drop-shadow-lg mb-4'>Welcome, {authUser?.fullName}! 👋</h1>
                        <p className='text-xl text-gray-300 font-medium'>Select a chat from the sidebar to start messaging.</p>
                    </div>
                )
            }
        </>

    )
}

export default MessageContainer