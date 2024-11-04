import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { FaUser } from "react-icons/fa";
import { GiPlainCircle } from "react-icons/gi";
import { GoBookmarkFill } from 'react-icons/go';
import { MdLogout } from "react-icons/md";
import { fetchProfilePicUrl } from '../firestoreService';
import Logo from  "../assets/logo-test.png";

const Navbar = () => {

    // sign out
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const auth = getAuth();
    const [nav, setNav] = useState(false);

    
    // listen for changes in auth state (whether the user is logged in or logged out)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true); // user is signed in
                console.log("User is logged in");
            }
            else {
                setIsLoggedIn(false); // user is signed out
                console.log("User is not logged in");
            }
        });
        return () => unsubscribe(); // Clean up the listener when the component is unmounted

    }, []);

    const handleClick = () => {
        setNav(!nav);
        console.log('nav state: ', !nav);
    }

    // nav = false - the hamburger menu is closed, show the bars icon
    // nav = true - the fatimes icon is shown

    return (

    <header className='fixed w-full h-[60px] top-0 text-gray-00 bg-gray-50 '>
        
        <div className='flex justify-between items-center h-full px-5 py-4'>
            <div className='ml-9 mt-9'>
                    <img src={Logo} alt="logo" style={{height: '145px', width: '150px'}} />
                </div>
            <nav>
            
                {/* Main menu */}
                {/* if it's on small screen, the main menu won't show */}
                <div className='hidden md:flex font-medium '>
                    <ul className='hidden md:flex '>
                        <li className='mr-[15px] px-7 py-2 text-[#0A142F] hover:bg-[#DEDCFF] rounded-md'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='mr-[15px] px-7 py-2 text-[#0A142F] hover:bg-[#DEDCFF] rounded-md'>
                            <Link to="/search">Search</Link>
                        </li>
                        <li className='mr-[15px] px-7 py-2 text-[#0A142F] hover:bg-[#DEDCFF] rounded-md'>
                            <Link to="/explore">Explore</Link>
                        </li>
                    </ul>

                    
                    {/* Display either Log In or profile icon dropdown based on login status */}
                    
                    {isLoggedIn ? (
                        <ProfileDropDown setIsLoggedIn={setIsLoggedIn} navigate={navigate}/>
                        ) : (

                            <Link to="/login">
                            <button className='mr-[30px] bg-[#433BFF] text-gray-300 rounded-md h-10 w-20 hover:text-gray-50 '>
                                Log in
                            </button>
                        </Link>
                           
                        )
    
                    }

                </div>
                

                {/* hamburger */}
                <div onClick={handleClick} className='md:hidden z-10 cursor-pointer fixed '>
                    {!nav ? <FaBars className='text-gray-800'/> : <FaTimes className='text-gray-200'/>} 
                </div>

                 

                {/* mobile menu */}
                <ul className={
                    !nav 
                        ? 'hidden'
                        : 'absolute top-0 left-0 w-full h-screen bg-[#0A142F] flex flex-col justify-center items-center z-50'}>
                    <li className='py-6 text-3xl text-gray-50'>
                        <Link to="/" onClick={handleClick}>Home</Link>
                    </li>
                    <li className='py-6 text-3xl text-gray-50'>
                        <Link to="/search" onClick={handleClick}>Search</Link>
                    </li>
                    <li className='py-6 text-3xl text-gray-50'>
                        <Link to="/explore" onClick={handleClick}>Explore</Link>
                    </li>
                    {!isLoggedIn ? (
                        <li className='py-6 text-3xl text-gray-50'>
                            <Link to="/login" onClick={handleClick}>Log in </Link>
                        </li>
                    ) : (
                        <li className='py-6 text-3xl text-gray-50'>
                        <button onClick={() => { handleLogout(); handleClick(); }}>Log out</button>
                      </li>
                    )}
                </ul>

            </nav>

        </div>

        {/* horizontal line */}
        <div className='w-full h-[1px] bg-gray-200'>
        </div>
    
        

        

    </header>
    

  )
}


const ProfileDropDown =  ( { setIsLoggedIn, navigate,}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }



    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
                setIsLoggedIn(false);
                navigate("/");
                console.log("Signed out successfully")
            }).catch((error) => {
                console.log("Error signing out: ", error);
            });
    }

    // get display name of user
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;
    const [profilePicUrl, setProfilePicUrl ] = useState('');

    // fetch user's profile picture URL on component mount
    useEffect (() => {

        const getProfilePic = async () => {

            if (userId) {
                const url = await fetchProfilePicUrl(userId);
                console.log('Fetching profile picture for userId:', userId);
                console.log('Profile picture URL:', profilePicUrl);

                setProfilePicUrl(url);
            }

        };

        getProfilePic();

    }, [userId]);

    return (

        <div>

            {/*/ profile icon */}
        
            <div 
                onClick={toggleDropDown}
                className=" mr-[30px] relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">

                {profilePicUrl ? (
                    <img src={profilePicUrl} alt="Profile" className="absolute w-28 h-28 object-cover rounded-full" />
                ) : (

                    <svg className="absolute w-20 h-20 text-gray-400 ml-4 mt-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>

                )}

            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    
                    <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <span className='flex items-center'>
                            <GiPlainCircle className='mr-5' size={40}/>
                            {profilePicUrl ? (
                                <img src={profilePicUrl} alt="Profile" className="absolute w-10 h-10 object-cover rounded-full" />
                            ) : (

                                <GiPlainCircle className='mr-5' size={40}/>

                            )}
                            {user.displayName || 'User'}
                        </span>
                       
                        <hr/>
                    </button>

                    <Link to="/edit-profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <span className='flex items-center' >
                            <FaUser className='mr-5 ml-2' size={20}/>
                            Edit Profile
                        </span>
                    </Link>

                    <Link to="/saved-recipes"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <span className='flex items-center'>
                            <GoBookmarkFill className='mr-5 ml-2' size={20}/>
                            Saved Recipes
                        </span>
                       
                    </Link>
                    <button 
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout} 
                    >
                        <span className='flex items-center'>
                            <MdLogout className='mr-5 ml-2' size={20} />
                            Logout
                        </span>
                        
                    </button>
                    
                </div>

            )}

    
                
            
         

        </div>
    )

};
export default Navbar;