import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/


const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const onLogin = (e) => {
    
    e.preventDefault(); // prevents the default form submission behavior. necessary to stop the page from refreshing
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // signed in
      const user = userCredential.user;
      navigate("/")
      console.log(user);
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })

  }


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
            onClick={onLogin}
            >Login</button>
            
        </div>

        {/*/ No account, sign up*/}
        <div className='flex mt-10'>
          <div className='mr-5'>
            <p>No account?</p>
          </div>

          <div>
            <Link to="/signup">
              <p className='text-gray-9s00 font-medium cursor-pointer'><u>Sign up</u></p>
            </Link>
          </div>
        </div>

      </div>
    </div>
   
  )
}

export default Login