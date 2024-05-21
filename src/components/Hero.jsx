import React from 'react'

const Hero = () => {
  return (
    <div className='w-full mt-[80px] h-[500px] bg-gray-200 flex flex-row items-center justify-between px-10'>

        {/* left side */}
        <div className='flex flex-col'>
            <h3 className='text-3xl'>Title</h3>
            
        </div>
        
        <div>
            <p>Ingredients</p>
            <p>Nutrients Info</p>
        </div> 

        {/* right side: pics */}
        <div className='w-1/3 h-full bg-gray-400 flex items-center justify-center'>
            <div className='w-40 h-40 border border-gray-600'></div>
        </div>

    </div>

    
  )
}

export default Hero