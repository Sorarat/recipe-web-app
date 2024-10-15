import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import Categories from './Categories';
import RecipeCard from './RecipeCard';
import { APP_ID, APP_KEY } from '../config';
import { saveFavoriteRecipe } from '../firestoreService';
import { getAuth } from 'firebase/auth';

const Home = () => {

  const [preFetchedRecipes, setPreFetchedRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {

    // fetch userId from firebase auth
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log("User ID:", user.uid); // Log userId to confirm it's correct
      setUserId(user.uid);
    }
    else {
      console.log('User is not logged in');
    }

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

  // function to handle saving a favorite recipe
  const handleFavorite = (recipe) => {
    
    if (userId) {
      setFavorites((prevFavorites) => [...prevFavorites, recipe]);

      console.log(userId)
      // call firestore function to save favorite
      saveFavoriteRecipe(userId, recipe)
        .then(() => console.log('Favorite recipe saved!'))
        .catch((error) => console.error('Error saving favorite: ', error));
    
    }

    else {
      console.error('User not logged in, cannot save favorite');
    }
  };

  
  return (
    <div>
      <Hero />
      <Categories />
      
      <div className='pt-20 mb-6 md:mr-[100px]  md:ml-[100px]'>
        <h3 className='text-3xl font-semibold'>You May Like</h3>
        
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
            />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Home;
