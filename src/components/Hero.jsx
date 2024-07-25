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
    <div className='mt-[80px] h-[500px] bg-light-blue flex flex-row items-center justify-evenly px-10 md:mr-[100px]  md:ml-[100px] md:rounded-lg'>

        {/* left side */}
        <div className='flex flex-col items-cente' >
            <h3 className='text-3xl'>{currentRecipe.label}</h3>
            <div>
                <p>Calories: {Math.ceil(currentRecipe.calories)}</p>
                {/* <p>Ingredients</p>
                <ul>
                  {currentRecipe.ingredientLines && currentRecipe.ingredientLines.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul> */}
            </div> 
        </div>

        {/* right side: pics */}
        <div className='w-1/3 h-full bg-gray-400 flex items-center justify-center'>
            <img 
              className='w-[400px] h-[300px] object-cover'
              src={currentRecipe.image}
              alt={`Recipe: ${currentRecipe.label}`}
            />
        </div>

    </div>

    
  )
}

export default Hero