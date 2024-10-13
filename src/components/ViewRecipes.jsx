import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ViewRecipes = () => {
    const location = useLocation();
    // useLocation() retrieve the recipe object that was passed via the state when navigating to the ViewRecipes component.
    // the recipe object contains all the data including ingredientLines, label, image etc.

    const {recipe} = location.state || {}; 

    // log the recipe object to check if instructions field exists
    useEffect(() => {
        console.log(recipe);

    }, [recipe]);

    return (
        <div className="mt-[80px] p-6 bg-blue-50 md:ml-[100px] md:mr-[100px]">
            <img className='w-full h-64 object-cover mt-4 rounded' src={recipe.image} alt={recipe.label} />
            <h1 className="text-3xl mt-10 font-bold">{recipe.label}</h1>

            {/* Display Ingredients*/}

            <div className="bg-pink-50 p-2 mt-4">
                <h2 className="text-2xl font-semibold">Ingredients</h2>
                <ol className="list-decimal mt-9 ml-5 text-lg">
                    {recipe.ingredientLines && recipe.ingredientLines.map((ingredient, index) => (
                        <li key={index} className="mt-1">{ingredient}</li>
                    ))}
                </ol>
            </div>

            {/* Display Instructions*/}
            <div className="bg-pink-50 p-2 mt-4">
                <h2 className="text-2xl font-semibold">Instructions</h2>
                <p className="mt-9 ml-5 text-lg">
                {recipe.url 
                        ? (<a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View full instructions here</a>)
                        : "Instructions not available."
                    }
                </p>
            </div>



        </div>
    )
}

export default ViewRecipes;