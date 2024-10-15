import React, {useState, useEffect} from 'react'
import RecipeCard from './RecipeCard';
import { APP_ID, APP_KEY } from '../config';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFavorites from '../hooks/useFavorites';

const Explore = () => {

  // state to keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState('Main course ')

  // state to hold the fetched recipes
  const [recipes, setRecipes] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const categoryFromUrl = query.get('category');

  const userId = useAuth();
  const { favorites, handleFavorite } = useFavorites(userId);



  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  },  [categoryFromUrl]);

  // fetch recipes when the selected category changes
  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://api.edamam.com/search?q=${selectedCategory}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
      }

      catch(error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);


  return (
    <div className='mt-20 md:mr-[100px]  md:ml-[100px]'>

        <div>
          <h1 className='text-3xl font-semibold ml-10'>
            Explore Recipes
          </h1>
        </div>

        {/* Container */}

        <div className='flex mt-10 h-[800px]'>

          {/* Left Column */}
          <div className='flex flex-col w-1/3  bg-white p-10'>

            {/* categories */}

            <div className='bg-[#4B0CF7] p-5 border border-black rounded-lg '>

              <div className='mb-10'>
                <h3 className='text-xl font-normal mb-3 text-gray-100'>Meal Type</h3>
                <ul>
                  <li 
                  className={`border border-black rounded-md mb-2 p-1 cursor-pointer ${selectedCategory === 'Breakfast' ? 'bg-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedCategory('Breakfast')}
                  >
                    <span className='text-pink-500 mr-2 ml-24 font-extrabold text-2xl'>•</span>
                    Breakfast
                  </li>
                  <li
                  className={`border border-black rounded-md mb-2 p-1 cursor-pointer ${selectedCategory === 'Lunch' ? 'bg-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedCategory('Lunch')}
                  >
                    <span className='text-pink-500 mr-2 ml-24 font-extrabold text-2xl'>•</span>
                    Lunch
                  </li>
                  <li
                  className={`border border-black rounded-md mb-2 p-1 cursor-pointer ${selectedCategory === 'Dinner' ? 'bg-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedCategory('Dinner')}
                  >
                    <span className='text-pink-500 mr-2 ml-24 font-extrabold text-2xl'>•</span>
                    Dinner
                  </li>
                  
                </ul>
              </div>

              <div className='mb-10'>
                <h3 className='text-xl font-normal mb-3 text-gray-100'>Dish Type</h3>
                <ul>
                  <li
                    className={`border border-black rounded-md mb-2 p-1 cursor-pointer ${selectedCategory === 'Starter' ? 'bg-white' : 'bg-gray-100'}`}
                    onClick={() => setSelectedCategory('Starter')}
                    >
                    <span className='text-pink-500 mr-2 ml-24 font-extrabold text-2xl'>•</span>
                    Starter
                  </li>
                  <li
                  className={`border border-black rounded-md mb-2 p-1 cursor-pointer ${selectedCategory === 'Main course' ? 'bg-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedCategory('Main course')}
                  >
                    <span className='text-pink-500 mr-2 ml-24 font-extrabold text-2xl '>•</span>
                    Main Course
                  </li>
                  <li
                  className={`border border-black rounded-md mb-2 p-1 cursor-pointer ${selectedCategory === 'Dessert' ? 'bg-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedCategory('Dessert')}
                  >
                    <span className='text-pink-500 mr-2 ml-24 font-extrabold text-2xl'>•</span>
                    Dessert
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-normal mb-3 text-gray-100'>Cuisine Type</h3>
                <ul>
                <li
                  className={`border border-black rounded-md mb-2 p-1 cursor-pointer ${selectedCategory === 'American' ? 'bg-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedCategory('American')}
                  >
                    <span className='text-pink-500 mr-2 ml-24 font-extrabold text-2xl'>•</span>
                    American
                  </li>

                  <li
                  className={`border border-black rounded-md mb-2 p-1 cursor-pointer ${selectedCategory === 'Asian' ? 'bg-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedCategory('Asian')}
                  >
                    <span className='text-pink-500 mr-2 ml-24 font-extrabold text-2xl'>•</span>
                    Asian
                  </li>

                  <li
                  className={`border border-black rounded-md mb-2 p-1 cursor-pointer ${selectedCategory === 'Mediterranean' ? 'bg-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedCategory('Mediterranean')}
                  >
                    <span className='text-pink-500 mr-2 ml-24 font-extrabold text-2xl'>•</span>
                    Mediterranean
                  </li>

                </ul>
              </div>



            </div>

          </div>

          {/* Right Column */}  
          <div className='flex flex-col w-2/3 bg-white p-4'>

          <br />
          
            {/* Displaying the recipes */}
            
            {recipes.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {recipes.slice(0,9).map((recipe, index) => (
                    <RecipeCard
                      key={index}
                      title={recipe.recipe.label}
                      image={recipe.recipe.image}
                      calories={Math.ceil(recipe.recipe.calories)}
                      className="w-full h-full"
                      recipe={recipe.recipe}
                      onFavorite={() => handleFavorite(recipe.recipe)}
                    />
                ))}

              </div>
            ): (
              <p className='flex justify-center'> Loading recipes.... </p>
            )}

          </div>
          


        </div>

    </div>
  );
};

export default Explore