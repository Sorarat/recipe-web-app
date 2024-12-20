import React, { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate} from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
 
const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()
  
        try {
            
            // create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;

            // update the user's profile with their display name
            await updateProfile(user, {
                displayName: name,
            });

            console.log(user);
            navigate("/");
        }

        catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
            console.log(errorCode, errorMessage);
        }
        
    };

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <div className='flex justify-center m-10'>
                <h3 className='text-3xl font-semibold text-gray-800'>Get Started Now</h3>
            </div>

            
            <div className='flex flex-col items-center bg-gray-100 p-10 mx-20 rounded-md'>



                {/* Name Field */}
                <div className='mb-4'>
                    <label htmlFor="name" className='font-medium text-gray-700 block'>Name</label>
                    <input 
                        type="text" required
                        placeholder='Enter your name'
                        onChange={(e) => setName(e.target.value)}
                        className='bg-white border border-gray-300 rounded-md shadow-sm p-2 '/> 

                </div>
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
                        className='bg-[#1B0558] text-gray-100 p-2 rounded-md w-[195px] hover:bg-[#1B0558] bg-opacity-90 hover:text-white transition duration-300 ease-in-out'
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