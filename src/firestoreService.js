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
    console.log('Fetching favorites for userId:', userId); // Debug log
    const favoriteRef = collection(db, "users", userId, "favorites");

    try {
        
        const querySnapshot = await getDocs(favoriteRef);
        console.log('Favorites Snapshot:', querySnapshot); // Log the snapshot
        console.log('Number of documents in favorites:', querySnapshot.size);

        const recipes = [];

        querySnapshot.forEach((doc) => {
            console.log('Document Id:', doc.id, 'Data:', doc.data());
            recipes.push({id: doc.id, ...doc.data()});
        });

        if (recipes.length > 0) {
            return recipes;
        }
        else {
            console.log("No favorites found!");
            return [];
        }

    }

    catch (error) {
        console.error('Error fetching favorite recipes: ', error);
        throw error;
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