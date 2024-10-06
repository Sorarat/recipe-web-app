import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {
  return (
    <div>
      <div className='flex justify-center m-10'>
        <h3 className='text-3xl font-semibold text-gray-800'>Log In</h3>
      </div>

     
      <div className='flex flex-col items-center bg-gray-100 p-10 mx-20 rounded-mds'>

        {/* Email Field */}
        <div className='mb-4'>
          <label htmlFor='email' className='font-medium text-gray-700 block'>Email</label>
          <input 
            type="email" 
            placeholder='Enter your email' 
            className='bg-white border border-gray-300 rounded-md shadow-sm p-2 '/> 
        </div>

        {/* Password Field */}
        <div className='mb-4'>
          <label htmlFor='password' className='font-medium text-gray-700 block'>Password</label>
            <input 
              type="password" 
              placeholder='Enter your password' 
              className='bg-white border border-gray-300 rounded-md shadow-sm p-2'/> 
        </div>

        {/* Login Button */}
        <div>
          <button type='submit' className='bg-[#0A142F] text-gray-100 p-2 rounded-md w-[195px]'>Login</button>
            
        </div>

      </div>
    </div>
   
  )
}

export default Login