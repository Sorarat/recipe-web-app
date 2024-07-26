import React from 'react'
import CategoriesCard from './CategoriesCard'

const Categories = () => {

    const categories = [
        { title: 'Breakfast', image: 'src/img/1.png'},
        { title: 'Lunch', image: 'src/img/2.png'},
        { title: 'Dinner', image: 'src/img/3.png'},
        { title: 'Asian', image: 'src/img/5.png'},
        { title: 'American', image: 'src/img/6.png'},
        { title: 'Mediterranean', image: 'src/img/7.png'},

    ]


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

        <div className='flex flex-nowrap gap-2 justify-between'>
            {categories.slice(0,6).map((category, index) => (
                <CategoriesCard
                    key={index}
                    categorieTitle={category.title}
                    image={category.image}
                />
            ))}

        </div>


    </div>
  )
}

export default Categories