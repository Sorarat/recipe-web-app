import React, {useState, useEffect} from 'react'
import RecipeCard from './RecipeCard';
import { APP_ID, APP_KEY } from '../config';
import { useLocation } from 'react-router-dom';

const Explore = () => {

  // state to keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState('Main course ')

  // state to hold the fetched recipes
  const [recipes, setRecipes] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const categoryFromUrl = query.get('category');

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
          <h1 className='text-3xl font-semibold'>
            Explore Recipes
          </h1>
        </div>

        {/* Container */}

        <div className='flex mt-10 h-[800px]'>

          {/* Left Column */}
          <div className='flex flex-col w-1/3  bg-blue-300 p-10'>

            {/* categories */}

            <div className='bg-white p-5 border border-black rounded-lg '>

              <div className='mb-10'>
                <h3 className='text-xl font-medium mb-3'>Meal Type</h3>
                <ul>
                  <li 
                  className={`border border-black rounded-md mb-2 p-2 cursor-pointer ${selectedCategory === 'Breakfast' ? 'bg-yellow-100' : ''}`}
                  onClick={() => setSelectedCategory('Breakfast')}
                  >
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Breakfast
                  </li>
                  <li
                  className={`border border-black rounded-md mb-2 p-2 cursor-pointer ${selectedCategory === 'Lunch' ? 'bg-yellow-100' : ''}`}
                  onClick={() => setSelectedCategory('Lunch')}
                  >
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Lunch
                  </li>
                  <li
                  className={`border border-black rounded-md mb-2 p-2 cursor-pointer ${selectedCategory === 'Dinner' ? 'bg-yellow-100' : ''}`}
                  onClick={() => setSelectedCategory('Dinner')}
                  >
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Dinner
                  </li>
                  
                </ul>
              </div>

              <div className='mb-10'>
                <h3 className='text-xl font-medium mb-3'>Dish Type</h3>
                <ul>
                  <li
                    className={`border border-black rounded-md mb-2 p-2 cursor-pointer ${selectedCategory === 'Starter' ? 'bg-yellow-100' : ''}`}
                    onClick={() => setSelectedCategory('Starter')}
                    >
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Starter
                  </li>
                  <li
                  className={`border border-black rounded-md mb-2 p-2 cursor-pointer ${selectedCategory === 'Main course' ? 'bg-yellow-100' : ''}`}
                  onClick={() => setSelectedCategory('Main course')}
                  >
                    <span className='text-pink-500 mr-2 ml-24 '>•</span>
                    Main Course
                  </li>
                  <li
                  className={`border border-black rounded-md mb-2 p-2 cursor-pointer ${selectedCategory === 'Dessert' ? 'bg-yellow-100' : ''}`}
                  onClick={() => setSelectedCategory('Dessert')}
                  >
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Dessert
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-medium mb-3'>Cuisine Type</h3>
                <ul>
                <li
                  className={`border border-black rounded-md mb-2 p-2 cursor-pointer ${selectedCategory === 'American' ? 'bg-yellow-100' : ''}`}
                  onClick={() => setSelectedCategory('American')}
                  >
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    American
                  </li>

                  <li
                  className={`border border-black rounded-md mb-2 p-2 cursor-pointer ${selectedCategory === 'Asian' ? 'bg-yellow-100' : ''}`}
                  onClick={() => setSelectedCategory('Asian')}
                  >
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Asian
                  </li>

                  <li
                  className={`border border-black rounded-md mb-2 p-2 cursor-pointer ${selectedCategory === 'Mediterranean' ? 'bg-yellow-100' : ''}`}
                  onClick={() => setSelectedCategory('Mediterranean')}
                  >
                    <span className='text-pink-500 mr-2 ml-24'>•</span>
                    Mediterranean
                  </li>

                </ul>
              </div>



            </div>

          </div>

          {/* Right Column */}  
          <div className='flex flex-col w-2/3 bg-pink-200 p-4'>

          <br />
          
            {/* Displaying the recipes */}
            
            {recipes.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {recipes.slice(0,9).map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    title={recipe.recipe.label}
                    image={recipe.recipe.image}
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