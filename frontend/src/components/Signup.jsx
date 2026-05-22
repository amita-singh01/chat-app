import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';


const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "An error occurred");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-8 rounded-2xl shadow-2xl bg-gray-900/60 backdrop-blur-xl border border-white/20'>
        <h1 className='text-4xl font-extrabold text-center text-white drop-shadow-lg mb-4'>Create Account</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200 font-semibold'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input h-10 bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              type="text"
              placeholder='Enter your full name' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200 font-semibold'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input h-10 bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              type="text"
              placeholder='Choose a username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200 font-semibold'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input h-10 bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              type="password"
              placeholder='Enter your password' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200 font-semibold'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input h-10 bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              type="password"
              placeholder='Confirm your password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p className='text-gray-200 font-medium'>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox checkbox-primary mx-2 border-white/40" />
            </div>
            <div className='flex items-center ml-4'>
              <p className='text-gray-200 font-medium'>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox checkbox-primary mx-2 border-white/40" />
            </div>
          </div>
          <p className='text-center my-4 text-gray-300'>Already have an account? <Link to="/login" className='text-blue-400 hover:text-blue-300 font-bold hover:underline'>Login</Link></p>
          <div>
            <button type='submit' disabled={isLoading} className='btn btn-block bg-white hover:bg-gray-200 text-blue-900 font-extrabold border-none transition-all shadow-lg shadow-white/20'>
              {isLoading ? <span className="loading loading-spinner"></span> : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup