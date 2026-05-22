import React, { useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full border border-white/20 shadow-md">
                    <img alt="Tailwind CSS chat bubble component" src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs text-gray-400 font-medium">12:45</time>
            </div>
            <div className={`chat-bubble shadow-md ${message?.senderId !== authUser?._id ? 'bg-white/10 text-white border border-white/20' : 'bg-blue-600 text-white shadow-blue-600/30'} `}>{message?.message}</div>
        </div>
    )
}

export default Message