import React, {useState, useEffect} from 'react';
import {APP_ID, APP_KEY} from '../config';

const Hero = () => {

  const [featuredRecipes, setFeaturedRecipe] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedRecipe = async () => {
      const dishes = ['Cookies', 'Salad', 'Seafood Pizza'];

      try {
        const fetchedRecipes = await Promise.all(
          dishes.map(async (dish) => {
            const response = await fetch(
              `https://api.edamam.com/search?q=${dish}&app_id=${APP_ID}&app_key=${APP_KEY}`
            );
            const data = await response.json();
            return data.hits[0].recipe; // take the first recipe for each dish
          })
        );

        setFeaturedRecipe(fetchedRecipes);
        setIsLoading(false);
       
      }

      catch(error) {
        console.error('Error fetching featured recipe:', error);
      }
    };

    fetchFeaturedRecipe();

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecipeIndex(prevIndex => (prevIndex + 1) % featuredRecipes.length);
    }, 5000);

    return () => clearInterval(interval); //clear interval on component unmount
  }, [featuredRecipes]);



  if (isLoading) {
    return (
      <div className='mt-[80px] h-[500px] bg-light-blue flex items-center justify-center md:mr-[100px]  md:ml-[100px] md:rounded-lg'>
        <div className='text-2xl'>Loading...</div>
      </div>
    );
  }

  if (featuredRecipes.length === 0) {
    return (
      <div className='mt-[80px] h-[500px] bg-light-blue flex items-center justify-center'>
        <div className='text-3xl'>No recipes found</div>
      </div>
    );
  }

  const currentRecipe = featuredRecipes[currentRecipeIndex];

  return (
    <div className='mt-[80px] h-[500px] bg-light-blue flex flex-row items-center justify-evenly shadow-md pl-40 md:mr-[100px]  md:ml-[100px] md:rounded-lg'>

        {/* left side */}
        <div className='flex flex-col items-centers'  style={{ width: '50%' }} >
            <h3 className='text-5xl font-semibold'>{currentRecipe.label}</h3>
            <br />
            <div>
                <p className='text-xl'>Calories: {Math.ceil(currentRecipe.calories)}</p>
            </div> 

            <div className='mt-20'>
              <button className='bg-black p-3 rounded-md text-white'>View Recipes</button>
            </div>
        </div>

        {/* right side: pics */}
        <div className='h-full bg-gray-400 flex items-center justify-end rounded-r-md' style={{ width: '50%' }}>
            <img 
              className='h-full object-cover w-full rounded-r-md'
              src={currentRecipe.image}
              alt={`Recipe: ${currentRecipe.label}`}
            />
        </div>
        
       

    </div>

    
  )
}

export default Hero