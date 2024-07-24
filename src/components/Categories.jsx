import React from 'react'

const Categories = () => {
  return (
    <div className='mt-[100px] h-[200px] bg-whie flex flex-col md:mr-[100px]  md:ml-[100px] '>

        {/* Title & Button */}
        <div className='flex justify-between'>
            <div className='mb-6'>
                <h3 className='text-3xl font-semibold'>Categories</h3>
            </div>

            <div className='bg-pink-100 flex px-4 mb-2 rounded-md hover:bg-pink-400'>
                <button>View All</button>
            </div>

        </div>

        {/* Categories Squares */}

        <div className='h-[150px] flex gap-x-0.5 justify-start md:justify-between'>
            <div className='h-[175px] w-[145px] border-black bg-gray-100 rounded-md'>

            </div>

            <div className='h-[175px] w-[145px] border-black bg-gray-100 rounded-md'>

            </div>

            <div className='h-[175px] w-[145px] border-black bg-gray-100 rounded-md'>

            </div>

            <div className='h-[175px] w-[145px] border-black bg-gray-100 rounded-md'>

            </div>

            <div className='h-[175px] w-[145px] border-black bg-gray-100 rounded-md'>

            </div>

            <div className='h-[175px] w-[145px] border-black bg-gray-100 rounded-md'>

            </div>


        </div>

       

    </div>
  )
}

export default Categories