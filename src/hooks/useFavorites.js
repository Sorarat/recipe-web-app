import { useState } from 'react';
import { saveFavoriteRecipe } from '../firestoreService';

const useFavorites = (userId) => {

    const [favorites, setFavorites] = useState([]);

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

    return { favorites, handleFavorite};
};

export default useFavorites;