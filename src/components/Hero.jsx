// import React, {useState, useEffect} from 'react';
// import {APP_ID, APP_KEY} from '../config';
// import {Link} from 'react-router-dom';

// const Hero = () => {

//   const [featuredRecipes, setFeaturedRecipe] = useState([]);
//   const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     const fetchFeaturedRecipe = async () => {
//       const dishes = ['Spaghetti', 'Salad', 'Seafood Pizza'];

//       try {
//         const fetchedRecipes = await Promise.all(
//           dishes.map(async (dish) => {
//             const response = await fetch(
//               `https://api.edamam.com/search?q=${dish}&app_id=${APP_ID}&app_key=${APP_KEY}`
//             );
//             const data = await response.json();
//             return data.hits[0].recipe; // take the first recipe for each dish
//           })
//         );

//         setFeaturedRecipe(fetchedRecipes);
//         setIsLoading(false);
       
//       }

//       catch(error) {
//         console.error('Error fetching featured recipe:', error);
//       }
//     };

//     fetchFeaturedRecipe();

//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentRecipeIndex(prevIndex => (prevIndex + 1) % featuredRecipes.length);
//     }, 5000);

//     return () => clearInterval(interval); //clear interval on component unmount
//   }, [featuredRecipes]);



//   if (isLoading) {
//     return (
//       <div className='mt-[80px] h-[500px] bg-[#0A142F] flex items-center justify-center md:mr-12  md:ml-12 md:rounded-lg'>
//         <div className='text-2xl text-gray-100'>Loading...</div>
//       </div>
//     );
//   }

//   if (featuredRecipes.length === 0) {
//     return (
//       <div className='mt-[80px] h-[500px] bg-[#0A142F] flex items-center justify-center'>
//         <div className='text-3xl text-gray-100'>No recipes found</div>
//       </div>
//     );
//   }

//   const currentRecipe = featuredRecipes[currentRecipeIndex];

//   return (
//     <div className='w-full h-screen mt-[80px] bg-[#DEDCFF] bg-opacity-75 flex items-center justify-center shadow-md md:mr-12  md:ml-12 md:rounded-lg'>


//     {/* <div className='mt-[80px] h-[500px] bg-[#DEDCFF] bg-opacity-75 flex flex-row items-center justify-evenly shadow-md pl-40  md:mr-[100px]  md:ml-[100px] md:rounded-lg'> */}

//         {/* left side */}
//         <div className='flex flex-col items-centers pr-5 mr-10'  style={{ width: '35%' }} >
//             <h3 className='text-gray-900 text-5xl font-semibold'>{currentRecipe.label}</h3>
//             <br />
//             <div>
//                 <p className='text-gray-900 text-xl'>Calories: {Math.ceil(currentRecipe.calories)}</p>
//             </div> 

            
//             <div className='mt-20'>
//               {/* Pass the recipe data to the ViewRecipe page */}
//               <Link to="/view-recipes" state={{ recipe: currentRecipe }}>
//                   <button className='bg-gray-100 p-3 rounded-md text-gray-900 text-md font-medium hover:bg-gray-300 hover:text-gray-900 transition duration-300 ease-in-out'>
//                     View Recipes
//                   </button>
//               </Link>

//             </div>
//         </div>

//         {/* right side: pics */}
//         <div className='h-full bg-gray-400 flex items-center justify-end rounded-r-md' style={{ width: '65%' }}>
//             <img 
//               className='h-full object-cover w-full rounded-r-md'
//               src={currentRecipe.image}
//               alt={`Recipe: ${currentRecipe.label}`}
//             />
//         </div>
        
       

//     </div>

    
//   )
// }

// export default Hero

// gpt
import React, { useState, useEffect } from 'react';
import { APP_ID, APP_KEY } from '../config';
import { Link } from 'react-router-dom';

const Hero = () => {

  const [featuredRecipes, setFeaturedRecipe] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedRecipe = async () => {
      const dishes = ['Spaghetti', 'Salad', 'Seafood Pizza'];

      try {
        const fetchedRecipes = await Promise.all(
          dishes.map(async (dish) => {
            const response = await fetch(
              `https://api.edamam.com/search?q=${dish}&app_id=${APP_ID}&app_key=${APP_KEY}`
            );
            const data = await response.json();
            return data.hits[0].recipe;
          })
        );

        setFeaturedRecipe(fetchedRecipes);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching featured recipe:', error);
      }
    };

    fetchFeaturedRecipe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % featuredRecipes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredRecipes]);

  if (isLoading) {
    return (
      <div className='mt-[80px] h-[500px] bg-[#0A142F] flex items-center justify-center md:mx-12 md:rounded-lg'>
        <div className='text-2xl text-gray-100'>Loading...</div>
      </div>
    );
  }

  if (featuredRecipes.length === 0) {
    return (
      <div className='mt-[80px] h-[500px] bg-[#0A142F] flex items-center justify-center'>
        <div className='text-3xl text-gray-100'>No recipes found</div>
      </div>
    );
  }

  const currentRecipe = featuredRecipes[currentRecipeIndex];

  return (
    <div className='w-full h-[500px] mt-[80px] bg-[#DEDCFF] bg-opacity-75 flex flex-col md:flex-row items-center justify-center shadow-md md:ml-12 md:mr-16 md:rounded-lg overflow-hidden'>

      {/* Left side content */}
      <div className='flex flex-col items-center md:items-start px-6 py-6 md:p-12 text-center md:text-left md:w-2/5'>
        <h3 className='text-gray-900 text-3xl md:text-5xl font-semibold'>{currentRecipe.label}</h3>
        <p className='text-gray-900 text-lg md:text-xl mt-4'>Calories: {Math.ceil(currentRecipe.calories)}</p>

        <Link to="/view-recipes" state={{ recipe: currentRecipe }}>
          <button className='bg-gray-100 p-3 rounded-md text-gray-900 text-md font-medium hover:bg-gray-300 hover:text-gray-900 transition duration-300 ease-in-out mt-8'>
            View Recipes
          </button>
        </Link>
      </div>

      {/* Right side: image */}
      <div className='h-72 md:h-full w-full md:w-3/5 flex items-center justify-center bg-gray-400'>
        <img 
          className='h-full w-full object-cover rounded-b-md md:rounded-r-md md:rounded-bl-none'
          src={currentRecipe.image}
          alt={`Recipe: ${currentRecipe.label}`}
        />
      </div>

    </div>
  );
};

export default Hero;
