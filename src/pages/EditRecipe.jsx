import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import API from "../api/axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import recipeSchema from "../validation/recipeSchema";
import { getRecipe, updateRecipe } from "../api/recipeApi";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recipeSchema),
  });

  const fetchRecipe = async () => {
    try {
      const { data } = await getRecipe(id);

      reset({
        recipeName: data.data.recipeName,
        description: data.data.description,
        cookingTime: data.data.cookingTime,
        isVeg: data.data.isVeg,
        ingredients: data.data.ingredients.join(", "),
        instructions: data.data.instructions.join(", "),
      });

      setPreview(`${import.meta.env.VITE_API_URL}/images/${data.data.imgUrl}`);
    } catch (error) {
      console.log(error);
      alert("Unable to load recipe");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (form) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("recipeName", form.recipeName);
      formData.append("description", form.description);
      formData.append("cookingTime", form.cookingTime);
      formData.append("isVeg", form.isVeg);

      formData.append(
        "ingredients",
        JSON.stringify(
          form.ingredients
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      formData.append(
        "instructions",
        JSON.stringify(
          form.instructions
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      if (image) {
        formData.append("image", image);
      }

      await updateRecipe(id, formData);
      alert("Recipe updated successfully");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      console.log(error.response?.status);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-green-600">
          Edit Recipe
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">Recipe Name</label>

            <input
              {...register("recipeName")}
              className="w-full rounded-lg border p-3"
            />

            <p className="text-red-500 text-sm">{errors.recipeName?.message}</p>
          </div>

          <div>
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              rows={4}
              {...register("description")}
              className="w-full rounded-lg border p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block font-medium">Cooking Time</label>

            <input
              type="number"
              {...register("cookingTime")}
              className="w-full rounded-lg border p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.cookingTime?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block font-medium">Ingredients</label>

            <textarea
              rows={4}
              {...register("ingredients")}
              className="w-full rounded-lg border p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.ingredients?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block font-medium">Instructions</label>

            <textarea
              rows={4}
              {...register("instructions")}
              className="w-full rounded-lg border p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.instructions?.message}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" {...register("isVeg")} className="h-5 w-5" />

            <label>Vegetarian</label>
          </div>

          <div>
            <label className="mb-2 block font-medium">Change Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Recipe"
              className="h-64 w-full rounded-lg object-cover"
            />
          )}

          <button
            disabled={saving}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white cursor-pointer hover:bg-green-700 disabled:bg-gray-400"
          >
            {saving ? "Updating..." : "Update Recipe"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditRecipe;
