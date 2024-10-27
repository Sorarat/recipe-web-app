import { useEffect, useState} from 'react';
import { getFavoriteRecipes } from '../firestoreService';
import RecipeCard from './RecipeCard';
import useFavorites from '../hooks/useFavorites';

const SavedRecipes = ( {userId} ) => {

  const [savedRecipes, setSavedRecipes] = useState([]);

  const {handleFavorite, isFavorite } = useFavorites(userId);

  useEffect(() => {
    console.log('Fetching favorites for userId:', userId); // Debug log

    if (userId) {
      getFavoriteRecipes(userId)
        .then((results) => {
          console.log('Fetched recipes:', results); // Log the full results
          setSavedRecipes(results);
        })
        .catch((error) => console.error('Error fetching favorites recipes: ', error));
    }

  }, [userId]); // only call getFavoriteRecipes when userId changes


  return (
    <div className='pt-20 mb-40 md:mr-[100px]  md:ml-[100px] '>

      {/* <h3 className='text-3xl p-20 ml-10 font-semibold'>Saved Recipes</h3> */}
      <div className='bg-[#DEDCFF] p-3 rounded-md w-[260px] mt-16'>
        <h3 className='text-3xl font-semibold'>Saved Recipes</h3>
      </div>

      {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'> */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 p-4">
        {savedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            calories={recipe.calories}
            image = {recipe.image}
            className="w-full h-full"
            recipe={recipe}
            onFavorite={() => handleFavorite(recipe)}
            isFavorite={isFavorite(recipe)} //pass favorite status
          />
        ))}
    
      </div>

    </div>
  )
}

export default SavedRecipes
