import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import { getRecipes, deleteRecipe } from "../api/recipeApi";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const { data } = await getRecipes();

        setRecipes(data.data);
        setFilteredRecipes(data.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredRecipes(filtered);
  }, [search, recipes]);

const handleDelete = async (id) => {
  if (!window.confirm("Delete this recipe?")) return;

  try {
    await deleteRecipe(id);

    const res = await getRecipes();
    setRecipes(res.data.data);           
    setFilteredRecipes(res.data.data);  
  } catch (error) {
    console.log(error);
  }
};
  console.log(filteredRecipes);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 py-8">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold">All Recipes</h1>

          <Link
            to="/recipes/add"
            className="rounded-lg bg-green-600 px-5 py-3 text-center text-white hover:bg-green-700"
          >
            + Add Recipe
          </Link>
        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full rounded-lg border p-3 focus:border-green-500 focus:outline-none"
        />

        {/* Empty */}

        {filteredRecipes.length === 0 ? (
          <div className="rounded-lg bg-gray-100 py-16 text-center">
            <h2 className="text-2xl font-semibold">No Recipes Found</h2>

            <p className="mt-2 text-gray-500">Try another search keyword.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onDelete={deleteRecipe}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeList;
