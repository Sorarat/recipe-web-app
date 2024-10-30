import React from 'react'
import CategoriesCard from './CategoriesCard'
import { useNavigate } from 'react-router-dom';

const Categories = () => {

    const categories = [
        { title: 'Breakfast', image: 'src/img/1.png'},
        { title: 'Lunch', image: 'src/img/2.png'},
        { title: 'Dinner', image: 'src/img/3.png'},
        { title: 'Asian', image: 'src/img/5.png'},
        { title: 'American', image: 'src/img/6.png'},
        { title: 'Mediterranean', image: 'src/img/7.png'},

    ]

    const navigate = useNavigate();

    const goToExplore = () => {
        navigate('/explore');
    }

    const handleCategoryClick = (category) => {
        navigate(`/explore?category=${encodeURIComponent(category)}`);
    }

  return (
    <div className='w-full h-screen mt-[100px] bg-whie flex flex-col md:mr-[100px]  md:ml-[100px] '>

    {/* <div className='mt-[100px] h-[200px] bg-whie flex flex-col md:mr-[100px]  md:ml-[100px] '> */}
        
        {/* Title & Button */}
        <div className='flex justify-between'>
            <div className='mb-10'>
                <h3 className='text-3xl font-semibold bg-[#DEDCFF] p-3 rounded-md'>Categories</h3>
            </div>

            <div className='bg-[#DEDCFF] flex px-4 mb-9 rounded-md hover:bg-[#DEDCFF] bg-opacity-55'>
                <button onClick={goToExplore}>View All</button>
            </div>

        </div>

        {/* Categories Squares */}

        <div className='flex flex-nowrap gap-2 justify-between'>
            {categories.slice(0,6).map((category, index) => (
                <CategoriesCard
                    key={index}
                    categorieTitle={category.title}
                    image={category.image}
                    onClick={() => handleCategoryClick(category.title)}
                />
            ))}

        </div>


    </div>
  )
}

export default Categories