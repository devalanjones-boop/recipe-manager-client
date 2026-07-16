import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { deleteRecipe, getRecipes } from "../api/recipeApi";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const res = await getRecipes();

      setRecipes(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchRecipes();
    } else {
      setRecipes([]);
    }
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;

    try {
      await deleteRecipe(id);

      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;

  return (
   <>
  <Navbar />

  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
    {recipes.length === 0 ? (
      <div className="col-span-full flex flex-col items-center justify-center py-20">
        <p className="mb-4 text-center text-gray-500">
          No recipes found
        </p>

        <Link
          to="/recipes/add"
          className="rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700"
        >
          Add Your First Recipe
        </Link>
      </div>
    ) : (
      recipes
        .filter(Boolean)
        .map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
          />
        ))
    )}
  </div>
</>
  );
};

export default Dashboard;
