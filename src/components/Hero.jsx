import React from 'react'

const Hero = () => {
  return (
    <div className='mt-[80px] h-[500px] bg-light-blue flex flex-row items-center justify-evenly px-10 md:mr-[100px]  md:ml-[100px] md:rounded-lg'>

        {/* left side */}
        <div className='flex flex-col items-cente' >
            <h3 className='text-3xl'>Title</h3>
            <div>
                <p>Ingredients</p>
                <p>Nutrients Info</p>
            </div> 
        </div>

        {/* right side: pics */}
        <div className='w-1/3 h-full bg-gray-400 flex items-center justify-center'>
            <div className='w-[400px] h-[300px] border border-gray-600'></div>
        </div>

    </div>

    
  )
}

export default Hero