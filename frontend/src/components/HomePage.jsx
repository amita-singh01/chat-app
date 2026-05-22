import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const { authUser } = useSelector(store => store.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!authUser) {
            navigate("/login");
        }
    }, []);
    return (
        <div className='flex sm:h-[450px] md:h-[650px] md:w-[900px] rounded-2xl overflow-hidden bg-gray-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl'>
            <Sidebar />
            <MessageContainer />
        </div>
    )
}

export default HomePage