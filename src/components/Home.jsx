import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import Categories from './Categories';
import RecipeCard from './RecipeCard';
import { APP_ID, APP_KEY } from '../config';
import useAuth from '../hooks/useAuth';
import useFavorites from '../hooks/useFavorites';
import Footer from './Footer';

const Home = () => {

  const [preFetchedRecipes, setPreFetchedRecipes] = useState([]);
  const userId = useAuth();
  const {favorites, handleFavorite, isFavorite} =  useFavorites(userId);

  useEffect(() => {

    // Fetch pre-fetched recipes when the component mounts
    console.log('Component mounted. Fetching prefetched recipes...');
    const preFetchedRecipes = ['Spaghetti Carbonara', 'chocolate cake', 'noodles', 'fish and chips'];
    getMealRecipes(preFetchedRecipes);
  }, []);

  const getMealRecipes = async (recipeList) => {
    try {
      const fetchedRecipes = await Promise.all(
        recipeList.map(async (recipeName) => {
          const response = await fetch (
            `https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          return data.hits[0]; // Take only the first hit
        })
      );
      setPreFetchedRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };


  
  return (
    <div>
      <Hero />
      <Categories />
      
      <div className='pt-20 mb-40 md:mr-[100px]  md:ml-[100px] '>
        <h3 className='text-3xl font-semibold mb-5 mt-20'>You May Like</h3>
        
      {/* Display fetched recipes */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 p-4">
        {preFetchedRecipes.slice(0, 4).map(recipe => (
          <div key={recipe.recipe.label} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>
            <RecipeCard 
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={Math.ceil(recipe.recipe.calories)}
              image={recipe.recipe.image}
              className="w-full h-full"
              recipe={recipe.recipe}
              onFavorite={() => handleFavorite(recipe.recipe)}
              isFavorite={isFavorite(recipe.recipe)} //pass favorite status
            />
          </div>
        ))}
      </div>
      </div>

     
      <Footer/>


    </div>
  );
}

export default Home;
