import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {

    // sign out
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

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

    // listen for changes in auth state (whether the user is logged in or logged out)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true); // user is signed in
            }
            else {
                setIsLoggedIn(false); // user is signed out
            }
        });
        return () => unsubscribe(); // Clean up the listener when the component is unmounted

    }, []);





    const [nav, setNav] = useState(false);

    const handleClick = () => {
        setNav(!nav);
        console.log('nav state: ', !nav);
    }

    // nav = false - the hamburger menu is closed, show the bars icon
    // nav = true - the fatimes icon is shown

    return (

    <header className='w-full h-[80px] top-0 text-gray-100 bg-[#0A142F] '>
        
        <div className='flex justify-between items-center h-full px-5 py-4'>
            <div className='ml-9'>
                    <img src="src/img/dark-logo.png" alt="logo" style={{height: '70px', width: '150px'}} />
                </div>
            <nav>
                
                {/* Main menu */}
                {/* if it's on small screen, the main menu won't show */}
                <div className='hidden md:flex font-medium '>
                    <ul className='hidden md:flex '>
                        <li className='mr-[15px] px-7 py-2 hover:border-b-4 border-white'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='mr-[15px] px-7 py-2 hover:border-b-4 border-white'>
                            <Link to="/search">Search</Link>
                        </li>
                        <li className='mr-[15px] px-7 py-2 hover:border-b-4 border-white'>
                            <Link to="/explore">Explore</Link>
                        </li>
                    </ul>

                    
                    {/* Display either Log In or Log out button based on login status */}
                    
                    {!isLoggedIn ? (
                        <Link to="/login">
                            <button className='mr-[30px] bg-white  hover:bg-gray-200 text-[#0A142F] rounded h-10 w-20'>
                                Log in
                            </button>
                        </Link>
                        ) : (
                            <button 
                                className='mr-[30px] bg-white  hover:bg-gray-200 text-[#0A142F] rounded h-10 w-20'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )
    
                    }

                </div>
                

                {/* hamburger */}
                <div onClick={handleClick} className='md:hidden z-10 cursor-pointer'>
                    {!nav ? <FaBars size={30}/> : <FaTimes size={30}/>}
                    {/* <FaBars/> */}
                </div>

                {/* mobile menu */}
                <ul className={!nav ? 'hidden': 'absolute top-0 left-0 w-full h-screen bg-[#0A142F] flex flex-col justify-center items-center'}>
                    <li className='py-6 text-3xl'>
                        <Link to="/" onClick={handleClick}>Home</Link>
                    </li>
                    <li className='py-6 text-3xl'>
                        <Link to="/search" onClick={handleClick}>Search</Link>
                    </li>
                    <li className='py-6 text-3xl'>
                        <Link to="/search" onClick={handleClick}>Explore</Link>
                    </li>
                    {!isLoggedIn ? (
                        <li className='py-6 text-3xl'>
                            <Link to="/login" onClick={handleClick}>Log in </Link>
                        </li>
                    ) : (
                        <li className='py-6 text-3xl'>
                        <button onClick={() => { handleLogout(); handleClick(); }}>Log out</button>
                      </li>
                    )}
                </ul>

            </nav>

        </div>

        {/* horizontal line */}
        <div className='w-full h-[2px] bg-gray-300'>
        </div>
    
        

        

    </header>
    

  )
}

export default Navbar;