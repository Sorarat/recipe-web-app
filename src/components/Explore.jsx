import React from 'react'

const Explore = () => {
  return (
    <div className='mt-20 md:mr-[100px]  md:ml-[100px]'>

        <div>
          <h1 className='text-3xl font-semibold'>
            Explore Recipes
          </h1>
        </div>

        {/* Container */}

        <div className='flex mt-10 h-[800px]'>

          {/* Left Column */}
          <div className='flex flex-col w-1/3  bg-blue-300 p-10'>

            {/* categories */}

            <div className='bg-white p-5 border border-black rounded-lg '>

              <div className='mb-10'>
                <h3 className='text-xl font-medium mb-3'>Meal Type</h3>
                <ul>
                  <li className='border border-black rounded-md mb-2 p-2'>
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Breakfast
                  </li>
                  <li className='border border-black rounded-md mb-2 p-2'>
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Lunch
                  </li>
                  <li className='border border-black rounded-md mb-2 p-2'>
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Dinner
                  </li>
                  
                </ul>
              </div>

              <div className='mb-10'>
                <h3 className='text-xl font-medium mb-3'>Dish Type</h3>
                <ul>
                  <li className='border border-black rounded-md mb-2 p-2'>
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Starter
                  </li>
                  <li className='border border-black rounded-md mb-2 p-2'>
                    <span className='text-pink-500 mr-2 ml-24 '>•</span>
                    Main Course
                  </li>
                  <li className='border border-black rounded-md mb-2 p-2'>
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Dessert
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-medium mb-3'>Cuisine Type</h3>
                <ul>
                  <li className='border border-black rounded-md mb-2 p-2'>
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    American
                  </li>

                  <li className='border border-black rounded-md mb-2 p-2'>
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Asian
                  </li>

                  <li className='border border-black rounded-md mb-2 p-2'>
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Mediterranean
                  </li>

                </ul>
              </div>



            </div>

          </div>

          {/* Right Column */}  
          <div className='flex flex-col w-2/3 bg-pink-200 p-4'>

          </div>
          


        </div>

    </div>
  )
}

export default Explore