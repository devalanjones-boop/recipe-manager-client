import { Link } from "react-router-dom";

const RecipeCard = ({ recipe = {}, onDelete }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Image */}
      <img
        src={
          recipe.imgUrl ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL3-VV39NH7Ks1Xqz2JT5GdG_x2BR6MImc5gq_CTv9Ag&s=10"
        }
        alt={recipe.recipeName || "Recipe"}
        className="h-56 w-full object-contain"
      />

      <div className="space-y-3 p-5">
        {/* Title */}
        <h2 className="text-2xl font-bold">
          {recipe.recipeName || "Untitled Recipe"}
        </h2>

        {/* Description */}
        <p className="text-gray-600">
          {recipe.description || "No description available"}
        </p>

        {/* Cooking time */}
        <p className="font-medium">⏱ {recipe.cookingTime || 0} mins</p>

        {/* Veg / Non-veg */}
        <p
          className={`font-semibold ${recipe.isVeg ? "text-green-600" : "text-red-600"}`}
        >
          {recipe.isVeg ? "🥗 Vegetarian" : "🍗 Non-Vegetarian"}
        </p>

        {/* Buttons */}
        <div className="flex justify-between pt-2">
          <Link to={`/recipes/${recipe._id || ""}`}>
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              View
            </button>
          </Link>

          <Link to={`/recipes/edit/${recipe._id || ""}`}>
            <button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
              Edit
            </button>
          </Link>

          <button
            onClick={() => onDelete?.(recipe._id)}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
