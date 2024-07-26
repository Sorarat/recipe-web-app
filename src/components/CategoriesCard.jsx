import React from 'react'

const CategoriesCard = ({categorieTitle, image}) => {
  return (

    <div className='flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-100 w-[145px] h-[185px]'>
        
        {/* image */}

        <div className='relative'>
            <img className='object-cover w-full h-[120px]' src={image} alt={`Categories: ${categorieTitle}`} />
        </div>

        {/* text */}

        <div className='p-4'>
            <h3 className='text-md font-medium flex justify-center'>
                {categorieTitle}
            </h3>
        </div>

    </div>
  )
}

export default CategoriesCard