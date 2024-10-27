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
        <div className='bg-[#1B0558] h-[180px]'>

            <div className='flex'>

                <button 
                    className='text-gray-300 hover:text-gray-50 text-2xl ml-48 mt-16 mr-40'
                    onClick={scrollUpInHomePage}>
                    RECIPELOOKUP 
                </button>

                <div className='text-md mt-16 flex gap-40'>
                    <button className='text-gray-400 hover:text-gray-50'>
                        <Link to='/'>
                            Home
                        </Link>
                    </button>

                    <button className='text-gray-400 hover:text-gray-50'>
                        <Link to='/search'>
                            Search
                        </Link>
                    </button>

                    <button className='text-gray-400 hover:text-gray-50'>
                        <Link to='/explore'>
                            Explore
                        </Link>
                    </button>
                </div>
            </div>

            <hr className='ml-48 mr-48 mt-5'/>

            <div className='text-gray-100 text-sm flex flex-row-reverse mr-48 mt-5'>
                &copy; 2024 RecipeLookUp. All rights reserved.
            </div>
            
        </div>
    )
    }

export default Footer