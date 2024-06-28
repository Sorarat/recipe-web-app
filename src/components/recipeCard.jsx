import React from "react";

const RecipeCard = ({ title, calories, image, className }) => {
  return (
    <div className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${className}`}>
      <img className="object-cover w-20 h-20" src={image} alt={`Recipe: ${title}`} />
      <div className="p-4">
        <div>
          <p className="text-xl font-semibold">{title}</p>
        </div>
        <div>
          <p className="text-base text-gray-600">{calories}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
