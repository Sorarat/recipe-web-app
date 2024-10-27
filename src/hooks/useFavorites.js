import { useEffect, useState } from 'react';
import { saveFavoriteRecipe, removeFavoriteRecipe, getFavoriteRecipes } from '../firestoreService';

const useFavorites = (userId) => {

    const [favorites, setFavorites] = useState([]);

    // useEffect(() => {
    //   const fetchFavorites = async () => {

    //     if (userId) {
    //       const fetchedFavorites = await getFavoriteRecipes(userId);
    //       setFavorites(fetchFavorites);
    //     }
    //   };
    //   fetchFavorites();
    // }, [userId]);

    useEffect(() => {
      // fetch favorites from firestore when component mounts or page refreshes
     
        if (userId) {
          getFavoriteRecipes(userId)
            .then((fetchedFavorites) => {
              setFavorites(fetchedFavorites); // set favorites from firestore
            })
            .catch((error) => console.error('Error fetching favorites: ', error));
        }
      
     
    }, [userId]);

    // function to handle saving or removing a avorite recipe
    const handleFavorite = (recipe) => {
      // if user is logged in
      if (userId) {
        
        // check if recipe is already in the avorite array
        const isFavorite = favorites.some(fav => fav.label === recipe.label);

        if (isFavorite) {

          // remove from favorites
          setFavorites(prevFavorites => prevFavorites.filter(fav => fav.label !== recipe.label));
          removeFavoriteRecipe(userId, recipe)
            .then(() => console.log('favorite recipe removed'))
            .catch((error) => console.error('Error removing favorite: ', error));
        }

        else {

          // add to favorites
          setFavorites(prevFavorites => [...prevFavorites, recipe]);
          saveFavoriteRecipe(userId, recipe)
          .then(() => console.log('favorite recipe saved'))
          .catch((error) => console.error('Error saving favorite: ', error));

        }
      
      }

    else {
      console.error('User not logged in, cannot save favorite');
    }
    };

    // function to check if a recipe is a favorite
    const isFavorite = (recipe) => {
      return favorites.some(fav => fav.label === recipe.label); // return boolean
    }

    return { favorites, handleFavorite, isFavorite};
};

export default useFavorites;


// // useFavorites.js
// import { useState, useEffect } from 'react';
// import { saveFavoriteRecipe, removeFavoriteRecipe, getFavoriteRecipes } from '../firestoreService';

// const useFavorites = (userId) => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (userId) {
//         const fetchedFavorites = await getFavoriteRecipes(userId);
//         setFavorites(fetchedFavorites);
//       }
//     };
//     fetchFavorites();
//   }, [userId]);

//   const handleFavorite = async (recipe) => {
//     const isFavorite = favorites.some((fav) => fav.uri === recipe.uri);
    
//     if (isFavorite) {
//       // Remove from favorites
//       setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.uri !== recipe.uri));
//       await removeFavoriteRecipe(userId, recipe);
//     } else {
//       // Add to favorites
//       setFavorites((prevFavorites) => [...prevFavorites, recipe]);
//       await saveFavoriteRecipe(userId, recipe);
//     }
//   };

//   const isFavorite = (recipe) => favorites.some((fav) => fav.uri === recipe.uri);

//   return { favorites, handleFavorite, isFavorite };
// };

// export default useFavorites;
