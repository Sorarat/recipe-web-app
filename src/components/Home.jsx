import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Search from './Search';
import Categories from './Categories';
import RecipeCard from './recipeCard';

const Home = () => {
  const APP_ID = "066e72ed";
  const APP_KEY = "970feea0d921451d76c4d528f18fb4b9";

  const [preFetchedRecipes, setPreFetchedRecipes] = useState([]);

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
      <Navbar />
      <Hero />
      <Search />
      <Categories />

      {/* Display fetched recipes */}
      <div className="flex flex-wrap justify-start">
        {preFetchedRecipes.slice(0, 4).map(recipe => (
          <RecipeCard 
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-2"
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
