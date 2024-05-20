import React, { useState } from 'react'
import {FaBars, FaTimes} from 'react-icons/fa';

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav)

    return (

    <div className='fixed w-full h-[80px] flex justify-between items-center px-5 bg-pink-300 text-gray-800 '>
        <div>
            <p>Logo</p>
        </div>
        
        {/* menu */}
        {/* if it's on small screen, the main menu won't show */}
        <div className='hidden md:flex font-semibold bg-green-300'>
            <ul className='hidden md:flex '>
                <li>Home</li>
                <li className='mr-20'>Explore</li>
            </ul>
        </div>

        {/* hamburger */}

        <div onClick={handleClick} className='md:hidden z-10'>
            {!nav ? <FaBars/> : <FaTimes/>}
        </div>

        {/* mobile menu */}

        <ul className={!nav ? 'hidden': 'absolute top-0 left-o w-full h-screen bg-white flex flex-col justify-center items-center'}>
            <li>Home</li>
            <li>Explore</li>
        </ul>



    
    </div>


  )
}

export default Navbar;