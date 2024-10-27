import { getFirestore, doc, addDoc, getDocs, collection, deleteDoc} from "firebase/firestore";

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

export const removeFavoriteRecipe = async (userId, recipe) => {

    try {
        const favoriteRef = collection(db, "users", userId, "favorites");
        const recipeQuery = query(favoriteRef, where("uri", "===" , recipe.uri));
        const querySnapshot = await getDocs(recipeQuery);

        querySnapshot.forEach(async(doc) => {
            await deleteDoc(doc.ref);
        });

        console.log('Recipe removed from favorites');
    }

    catch (error) {
        console.error("Error removing recipe: ", error);

    }
}