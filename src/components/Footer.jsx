import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

    const scrollUpInHomePage = () => {
        // navigate to home page 
        navigate("/");
        // scroll to top of the page
        window.scrollTo(0,0);
    }

    return (
        <div className='w-full bg-[#1B0558] py-8 px-4 mt-10 md:px-12 lg:px-24'>
            
            <div className='flex flex-col md:flex-row items-center md:justify-between'>

                {/* Brand Name Button */}
                <button 
                    className='text-gray-300 hover:text-gray-50 text-2xl mb-4 md:mb-0'
                    onClick={scrollUpInHomePage}
                >
                    RECIPELOOKUP 
                </button>

                {/* Navigation Links */}
                <div className='flex flex-col md:flex-row text-center text-md gap-4 md:gap-8'>
                    <button className='text-gray-400 hover:text-gray-50'>
                        <Link to='/'>Home</Link>
                    </button>

                    <button className='text-gray-400 hover:text-gray-50'>
                        <Link to='/search'>Search</Link>
                    </button>

                    <button className='text-gray-400 hover:text-gray-50'>
                        <Link to='/explore'>Explore</Link>
                    </button>
                </div>
            </div>

            {/* Divider */}
            <hr className='border-gray-500 my-4' />

            {/* Copyright Section */}
            <div className='text-gray-400 text-center text-sm'>
                &copy; 2024 RecipeLookUp. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;
