import React, {useState} from 'react';
import {APP_ID, APP_KEY} from '../config';
import RecipeCard from './RecipeCard';

const Search = () => {

    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearch = async () => {

        if (query) {
            try {
            const response = await fetch (
                `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.json();
            setSearchResults(data.hits);
        
            }
            catch (error) {
            console.error('Error fetching search results:', error);
            }
        }
      };


  return (
    <div className='mt-[100px] h-[200px] bg-pink-100 flex flex-col items-center md:mr-[100px]  md:ml-[100px] md:rounded-lg'>
      
        <div className='mb-[20px] mt-[60px] ml-[-160px]'>
            <h3 className='text-3xl font-semibold'>Find Recipes You Love</h3>
        </div>
      
        <div className='flex justify-center items-center'>
            <input className='w-[350px] h-[40px] border-2 border-gray-400 mr-[30px] rounded-lg px-3 justify-center md:mr-[80px]' 
                type='text'
                placeholder='Search recipes here...'
                value = {query}
                onChange={(e) => setQuery(e.target.value)}
            
            />

            <div className='flex items-center bg-gray-700 px-4 py-2 rounded-lg text-white hover:bg-gray-900'>
                <button onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>

        {/* Display searched recipes */}
        <div className='flex flex-wrap lg:flex-nowrap gap-4 pt-20'>
            {searchResults.slice(0, 5).map((result, index) => (
                <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>
                    <RecipeCard
                        title={result.recipe.label}
                        calories={Math.ceil(result.recipe.calories)}
                        image={result.recipe.image}
                        className="w-full h-full"
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Search