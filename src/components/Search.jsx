import React from 'react'

const Search = () => {
  return (
    <div className='mt-[100px] h-[200px] bg-pink-200 flex flex-col items-center md:mr-[100px]  md:ml-[100px] md:rounded-lg'>
      
        <div className='mb-[20px] mt-[60px] ml-[-160px]'>
            <h3 className='text-3xl font-semibold'>Find Recipes You Love</h3>
        </div>
      
        <div className='flex justify-center items-center'>
            <input className='w-[350px] h-[40px] border-2 border-gray-400 mr-[30px] rounded-lg px-3 justify-center md:mr-[80px]' 
                type='text'
                placeholder='Search recipes here...'>
            </input>
            <div className='flex items-center bg-gray-700 px-4 py-2 rounded-lg text-white hover:bg-gray-900'>
                <button>
                    Search
                </button>
            </div>
        </div>
    </div>
  )
}

export default Search