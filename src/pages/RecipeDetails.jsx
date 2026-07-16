import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import API from "../api/axios";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { getRecipe } from "../api/recipeApi";

const API_URL = import.meta.env.VITE_API_URL;

const RecipeDetails = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchRecipe = async () => {
    try {
      const { data } = await getRecipe(id);
      
      setRecipe(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) return <Loader />;

  if (!recipe) {
    return (
      <>
        <Navbar />

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold">Recipe Not Found</h2>

          <Link
            to="/dashboard"
            className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            Back
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Image */}

          <img
             src={
          recipe.imgUrl
            ? `${API_URL}/images/${recipe.imgUrl}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL3-VV39NH7Ks1Xqz2JT5GdG_x2BR6MImc5gq_CTv9Ag&s=10"
        }
            className="h-400px w-full object-cover"
          />

          <div className="space-y-8 p-8">
            {/* Title */}

            <div>
              <h1 className="text-4xl font-bold">{recipe.recipeName}</h1>

              <p className="mt-3 text-gray-600">{recipe.description}</p>
            </div>

            {/* Info */}

            <div className="flex flex-wrap gap-4">
              <div className="rounded-full bg-green-100 px-5 py-2 font-medium text-green-700">
                ⏱ {recipe.cookingTime} Minutes
              </div>

              <div
                className={`rounded-full px-5 py-2 font-medium ${
                  recipe.isVeg
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {recipe.isVeg ? "🥗 Vegetarian" : "🍗 Non Vegetarian"}
              </div>
            </div>

            {/* Ingredients */}

            <div>
              <h2 className="mb-4 text-2xl font-bold">Ingredients</h2>

              <ul className="list-inside list-disc space-y-2">
                {recipe.ingredients?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}

            <div>
              <h2 className="mb-4 text-2xl font-bold">Instructions</h2>

              <ol className="list-inside list-decimal space-y-3">
                {recipe.instructions?.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Buttons */}

            <div className="flex gap-4">
            

              <Link
                to="/dashboard"
                className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
