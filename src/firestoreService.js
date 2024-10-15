import { getFirestore, doc, addDoc, getDocs, collection} from "firebase/firestore";

const db = getFirestore();

export const saveFavoriteRecipe = async (userId, recipe) => {
    try {
        const recipeRef = collection(db, "users", userId, "favorites");
        
        await addDoc(recipeRef, {
            title: recipe.label, 
            calories: Math.ceil(recipe.calories),
            image: recipe.image,
            uri: recipe.uri
        });

        console.log("Recipe saved!");
    }

    catch  (error) {
        console.error("Error saving recipes: ", error);

    }
}

export const getFavoriteRecipes = async (userId) => {
    const favoriteRef = doc(db, "users", userId, "favorites");
    const querySnapshot = await getDocs(favoriteRef);
    const recipes = [];

    querySnapshot.forEach((doc) => {
        recipes.push(doc.data());
    });

    if (recipes.length > 0) {
        return recipes;
    }
    else {
        console.log("No favorites found!");
        return [];
    }
   
};