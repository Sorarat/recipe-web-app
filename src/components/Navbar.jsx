import React, { useState } from 'react'
import {FaBars, FaTimes} from 'react-icons/fa';

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav)

    return (

    <header className='fixed w-full h-[80px] top-0 z-[20] text-gray-800 '>
        
        <div className='flex justify-between items-center h-full px-5 py-4'>
            <div className='ml-9'>
                    <p>Logo</p>
                </div>
            <nav>
                
                {/* Main menu */}
                {/* if it's on small screen, the main menu won't show */}
                <div className='hidden md:flex font-semibold '>
                    <ul className='hidden md:flex '>
                        <li>Home</li>
                        <li className='mr-20'>Explore</li>
                    </ul>
                </div>

                {/* hamburger */}

                <div onClick={handleClick} className='md:hidden z-10'>
                    {!nav ? <FaBars/> : <FaTimes/>}
                </div>

            </nav>

        </div>

        {/* horizontal line */}
        <div className='w-full h-[2px] bg-gray-300'>
        </div>
    
        {/* mobile menu */}
        <ul className={!nav ? 'hidden': 'absolute top-0 left-o w-full h-screen bg-white flex flex-col justify-center items-center'}>
            <li>Home</li>
            <li>Explore</li>
        </ul>

        

    </header>
    

  )
}

export default Navbar;