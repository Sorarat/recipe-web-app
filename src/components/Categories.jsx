// import React from 'react'
// import CategoriesCard from './CategoriesCard'
// import { useNavigate } from 'react-router-dom';

// // Import images
// import breakfastImage from '../assets/1.png';
// import lunchImage from '../assets/2.png';
// import dinnerImage from '../assets/3.png';
// import asianImage from '../assets/5.png';
// import americanImage from '../assets/6.png';
// import mediterraneanImage from '../assets/7.png';



// const Categories = () => {

//     const categories = [
//         { title: 'Breakfast', image: breakfastImage},
//         { title: 'Lunch', image: lunchImage},
//         { title: 'Dinner', image: dinnerImage},
//         { title: 'Asian', image: asianImage},
//         { title: 'American', image: americanImage},
//         { title: 'Mediterranean', image: mediterraneanImage},

//     ]

//     const navigate = useNavigate();

//     const goToExplore = () => {
//         navigate('/explore');
//     }

//     const handleCategoryClick = (category) => {
//         navigate(`/explore?category=${encodeURIComponent(category)}`);
//     }

//   return (
//     <div className='w-full h-screen mt-[100px] bg-whie flex flex-col md:mr-[100px]  md:ml-[100px] '>

//     {/* <div className='mt-[100px] h-[200px] bg-whie flex flex-col md:mr-[100px]  md:ml-[100px] '> */}
        
//         {/* Title & Button */}
//         <div className='flex justify-between'>
//             <div className='mb-10'>
//                 <h3 className='text-3xl font-semibold bg-[#DEDCFF] p-3 rounded-md'>Categories</h3>
//             </div>

//             <div className='bg-[#DEDCFF] flex px-4 mb-9 rounded-md hover:bg-[#DEDCFF] bg-opacity-55'>
//                 <button onClick={goToExplore}>View All</button>
//             </div>

//         </div>

//         {/* Categories Squares */}

//         <div className='flex flex-nowrap gap-2 justify-between'>
//             {categories.slice(0,6).map((category, index) => (
//                 <CategoriesCard
//                     key={index}
//                     categorieTitle={category.title}
//                     image={category.image}
//                     onClick={() => handleCategoryClick(category.title)}
//                 />
//             ))}

//         </div>


//     </div>
//   )
// }

// export default Categories


// import React from 'react';
// import CategoriesCard from './CategoriesCard';
// import { useNavigate } from 'react-router-dom';

// // Import images
// import breakfastImage from '../assets/1.png';
// import lunchImage from '../assets/2.png';
// import dinnerImage from '../assets/3.png';
// import asianImage from '../assets/5.png';
// import americanImage from '../assets/6.png';
// import mediterraneanImage from '../assets/7.png';

// const Categories = () => {
//   const categories = [
//     { title: 'Breakfast', image: breakfastImage },
//     { title: 'Lunch', image: lunchImage },
//     { title: 'Dinner', image: dinnerImage },
//     { title: 'Asian', image: asianImage },
//     { title: 'American', image: americanImage },
//     { title: 'Mediterranean', image: mediterraneanImage },
//   ];

//   const navigate = useNavigate();

//   const goToExplore = () => {
//     navigate('/explore');
//   };

//   const handleCategoryClick = (category) => {
//     navigate(`/explore?category=${encodeURIComponent(category)}`);
//   };

//   return (
//     <div className='w-full min-h-screen mt-10 md:mt-[100px] flex flex-col items-center md:mx-24'>

//       {/* Title & Button */}
//       <div className='w-full max-w-screen-lg flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 px-4 md:px-0'>
//         <h3 className='text-2xl md:text-3xl font-semibold bg-[#DEDCFF] p-3 rounded-md'>Categories</h3>
//         <button
//           onClick={goToExplore}
//           className='bg-[#DEDCFF] px-4 py-2 rounded-md text-gray-800 font-medium hover:bg-[#c7c5f8] transition-colors mt-4 md:mt-0'
//         >
//           View All
//         </button>
//       </div>

//       {/* Categories Grid */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 w-full max-w-screen-lg px-4 md:px-0'>
//         {categories.map((category, index) => (
//           <CategoriesCard
//             key={index}
//             categorieTitle={category.title}
//             image={category.image}
//             onClick={() => handleCategoryClick(category.title)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;


import React from 'react';
import CategoriesCard from './CategoriesCard';
import { useNavigate } from 'react-router-dom';

// Import images
import breakfastImage from '../assets/1.png';
import lunchImage from '../assets/2.png';
import dinnerImage from '../assets/3.png';
import asianImage from '../assets/5.png';
import americanImage from '../assets/6.png';
import mediterraneanImage from '../assets/7.png';

const Categories = () => {
  const categories = [
    { title: 'Breakfast', image: breakfastImage },
    { title: 'Lunch', image: lunchImage },
    { title: 'Dinner', image: dinnerImage },
    { title: 'Asian', image: asianImage },
    { title: 'American', image: americanImage },
    { title: 'Mediterranean', image: mediterraneanImage },
  ];

  const navigate = useNavigate();

  const goToExplore = () => {
    navigate('/explore');
  };

  const handleCategoryClick = (category) => {
    navigate(`/explore?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className='w-full  mt-10 md:mt-[100px] flex flex-col items-center md:mx-24'>

      {/* Title */}
      <div className='w-full max-w-screen-lg flex justify-center mb-4 px-4 md:px-0 md:justify-start'>
        <h3 className='text-2xl md:text-3xl font-semibold bg-[#DEDCFF] p-3 rounded-md'>Categories</h3>
      </div>

      {/* Categories Grid */}
      
      <div className= 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 w-full max-w-screen-lg px-4 md:px-0 justify-items-center'>  
        {categories.map((category, index) => (
          <CategoriesCard
            key={index}
            categorieTitle={category.title}
            image={category.image}
            onClick={() => handleCategoryClick(category.title)}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className='w-full max-w-screen-lg flex justify-end mt-10 md:mt-10 px-4 md:px-0'>
        <button
          onClick={goToExplore}
          className='bg-[#DEDCFF] px-4 py-2 rounded-md text-gray-800 font-medium hover:bg-[#c7c5f8] transition-colors mt-4 md:mt-0'
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default Categories;

