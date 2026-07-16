import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import API from "../api/axios";
import Navbar from "../components/Navbar";
import recipeSchema from "../validation/recipeSchema";
import { createRecipes } from "../api/recipeApi";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      isVeg: false,
    },
  });

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (form) => {
    console.log(form);

    // if (!image) {
    //   alert("Please select an image");
    //   return;
    // }

    try {
      setLoading(true);

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

      formData.append("image", image);

      await createRecipes(formData);

      alert("Recipe added successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message || "Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-green-600">
          Add Recipe
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Recipe Name */}
          <div>
            <label className="mb-2 block font-medium">Recipe Name</label>

            <input
              {...register("recipeName")}
              className="w-full rounded-lg border p-3"
            />

            <p className="text-sm text-red-500">{errors.recipeName?.message}</p>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              rows="4"
              {...register("description")}
              className="w-full rounded-lg border p-3"
            />

            <p className="text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>

          {/* Cooking Time */}
          <div>
            <label className="mb-2 block font-medium">
              Cooking Time (Minutes)
            </label>

            <input
              type="number"
              {...register("cookingTime")}
              className="w-full rounded-lg border p-3"
            />

            <p className="text-sm text-red-500">
              {errors.cookingTime?.message}
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <label className="mb-2 block font-medium">Ingredients</label>

            <textarea
              rows="4"
              placeholder="Rice, Salt, Onion, Tomato"
              {...register("ingredients")}
              className="w-full rounded-lg border p-3"
            />

            <small className="text-gray-500">
              Separate each ingredient with commas.
            </small>

            <p className="text-sm text-red-500">
              {errors.ingredients?.message}
            </p>
          </div>

          {/* Instructions */}
          <div>
            <label className="mb-2 block font-medium">Instructions</label>

            <textarea
              rows="4"
              placeholder="Wash rice,Boil water,Cook rice"
              {...register("instructions")}
              className="w-full rounded-lg border p-3"
            />

            <small className="text-gray-500">
              Separate each step with commas.
            </small>

            <p className="text-sm text-red-500">
              {errors.instructions?.message}
            </p>
          </div>

          {/* Veg */}
          <div className="flex items-center gap-3">
            <input type="checkbox" {...register("isVeg")} className="h-5 w-5" />

            <label>Vegetarian Recipe</label>
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block font-medium">Recipe Image</label>

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
              alt="Preview"
              className="h-64 w-full rounded-lg object-cover"
            />
          )}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold cursor-pointer text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Adding Recipe..." : "Add Recipe"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
