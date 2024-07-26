import React from "react";

const RecipeCard = ({ title, calories, image, className }) => {
  return (
    <div className={`flex flex-col rounded-lg shadow-lg overflow-hidden bg-pink-100 ${className}`}>
      
      {/* image section */}
      <div className="relative">
        <img className="object-cover w-full h-32" src={image} alt={`Recipe: ${title}`} />
      </div>

      {/* text section */}

      <div className="p-2">
        <div>
          <p className="text-lg font-medium">{title}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{calories}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
