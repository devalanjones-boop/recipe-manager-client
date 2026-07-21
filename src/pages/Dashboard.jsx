import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { deleteRecipe, getRecipes } from "../api/recipeApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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

const handleDelete = (id) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p className="mb-3 font-medium">
          Are you sure you want to delete this recipe?
        </p>

        <div className="flex gap-2">
          <button
            onClick={async () => {
              closeToast();

              try {
                setDeletingId(id);

                await deleteRecipe(id);

                setRecipes((prev) =>
                  prev.filter((recipe) => recipe._id !== id)
                );

                toast.success("Recipe deleted successfully!");
              } catch (error) {
                toast.error(
                  error.response?.data?.message || "Failed to delete recipe"
                );
              } finally {
                setDeletingId(null);
              }
            }}
            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          >
            Delete
          </button>

          <button
            onClick={closeToast}
            className="rounded bg-gray-300 px-3 py-1 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    }
  );
};

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <p className="mb-4 text-center text-gray-500">No recipes found</p>

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
                deletingId={deletingId}
              />
            ))
        )}
      </div>
    </>
  );
};

export default Dashboard;
