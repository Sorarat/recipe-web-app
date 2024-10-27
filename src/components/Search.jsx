import React, {useState, useEffect} from 'react';
import {APP_ID, APP_KEY} from '../config';
import RecipeCard from './RecipeCard';
import useAuth from '../hooks/useAuth';
import useFavorites from '../hooks/useFavorites';
import Footer from './Footer';


const Search = () => {

    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const userId = useAuth();
    const { favorites, handleFavorite, isFavorite } = useFavorites(userId);

        
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
    
    <>
    <div className='flex flex-col min-h-screen'> {/* flexbox container with full-screen height */}

        {/* Main content*/}

        <div className='flex-1 flex flex-col items-center'>

            {/* pink box only around the main section content*/}
            <div className='mt-[100px] h-[220px] bg-pink-100 flex flex-col items-center md:mr-[100px]  md:ml-[100px] md:rounded-lg'>

                {/* <div className='mb-[20px] mt-[60px] ml-[-160px]'> */}
                <div className='mb-10 mt-14 ml-7'>
                    <h3 className='text-3xl font-semibold'>Find Recipes You Love</h3>
                </div>
            
                <div className='flex justify-center items-center'>
                    <input className='w-[350px] h-[40px] border-2 border-gray-400 ml-14 rounded-lg px-3 justify-center ' 
                        type='text'
                        placeholder='Search recipes here...'
                        value = {query}
                        onChange={(e) => setQuery(e.target.value)}
                    
                    />

                    <div className='flex items-center bg-[#4B0CF7] px-4 py-2 ml-4 mr-5 rounded-lg text-white hover:bg-opacity-75'>
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
                                key={result.recipe.label}
                                title={result.recipe.label}
                                calories={Math.ceil(result.recipe.calories)}
                                image={result.recipe.image}
                                className="w-full h-full"
                                recipe={result.recipe}
                                onFavorite={() => handleFavorite(result.recipe)}
                                isFavorite={isFavorite(result.recipe)} //pass favorite status
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>

    <Footer/>


    </>

  )
}

export default Search