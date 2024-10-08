import React, {useState} from 'react';
import { auth } from '../firebase';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { createUserWithEmailAndPassword} from 'firebase/auth';
 
const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()
  
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              navigate("/login")
              
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorMessage);
              console.log(errorCode, errorMessage);
              
          });
  
  
      }

    return (
        <div>
        <div className='flex justify-center m-10'>
            <h3 className='text-3xl font-semibold text-gray-800'>Get Started Now</h3>
        </div>

        
        <div className='flex flex-col items-center bg-gray-100 p-10 mx-20 rounded-mds'>


            {/* Email Field */}
            <div className='mb-4'>
            <label htmlFor='email' className='font-medium text-gray-700 block'>Email</label>
            <input 
                type="email" required
                placeholder='Enter your email' 
                onChange={(e) => setEmail(e.target.value)}
                className='bg-white border border-gray-300 rounded-md shadow-sm p-2 '/> 
            </div>

            {/* Password Field */}
            <div className='mb-4'>
            <label htmlFor='password' className='font-medium text-gray-700 block'>Password</label>
                <input 
                type="password" required
                placeholder='Enter your password' 
                onChange={(e) => setPassword(e.target.value)}
                className='bg-white border border-gray-300 rounded-md shadow-sm p-2'/> 
            </div>

            {/* Login Button */}
            <div>
                <button 
                    className='bg-[#0A142F] text-gray-100 p-2 rounded-md w-[195px] hover:bg-[#1B2A56] hover:text-white transition duration-300 ease-in-out'
                    onClick={onSubmit}
                    >
                    Sign up
                </button>
            </div>

            {/* Error Message Display */}
            {errorMessage && (
                <div className='mt-4 p-2 bg-red-500 text-white rounded'>
                    <p>{errorMessage}</p>
                </div>
            )}


            {/*/ Already have an account, login*/}
            <div className='flex mt-10'>
            <div className='mr-5'>
                <p>Already have an account?</p>
            </div>

            <div>
                <Link to="/login">
                <p className='text-gray-9s00 font-medium cursor-pointer'><u>Login</u></p>
                </Link>
            </div>
            </div>

        </div>
        </div>
    
  )
}

export default Signup