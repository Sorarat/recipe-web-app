import React, { useState } from 'react'
import {FaBars, FaTimes} from 'react-icons/fa';

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const handleClick = () => {
        setNav(!nav);
        console.log('nav state: ', !nav);
    }

    // nav = false - the hamburger menu is closed, show the bars icon
    // nav = true - the fatimes icon is shown

    return (

    <header className='w-full h-[80px] top-0 text-gray-600 '>
        
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
                <div onClick={handleClick} className='md:hidden z-10 cursor-pointer'>
                    {/* {!nav ? <FaBars size={30}/> : <FaTimes size={30}/>} */}
                    <FaBars/>
                </div>

                {/* mobile menu */}
                <ul className={!nav ? 'hidden': 'absolute top-0 left-0 w-full h-screen bg-gray-200 flex flex-col justify-center items-center'}>
                    <li className='py-6 text-3xl'>Home</li>
                    <li className='py-6 text-3xl'>Explore</li>
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