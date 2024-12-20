import React, {useState} from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";


const RecipeCard = ({ title, calories, image, className, onFavorite, recipe, isFavorite}) => {

  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className={`flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-50 ${className} hover:bg-gray-200`}>
      
      {/* image section */}
      <div className="relative">
        <Link to="/view-recipes" state={{ recipe: recipe}}>
          <img className="object-cover w-full h-32" src={image} alt={`Recipe: ${title}`} />
        </Link>

      {/* heart icon */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking the heart icon
            onFavorite();
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute top-2 right-2 text-gray-100  hover:text-white-100 transition duration-200"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} // Accessibility 
          >
            {isFavorite || isHovered ? (
              <AiFillHeart className="h-8 w-8"/>
            ) : (
              <AiOutlineHeart className="h-8 w-8 stroke-[1.5]"/>
            )
            }
            
        </button>
      </div>
      {/* text section */}
      <div className="p-2">
        <Link to="/view-recipes" state={{ recipe: recipe }}> 
        <div>
          <p className="text-lg font-medium">{title}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{calories}</p>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
