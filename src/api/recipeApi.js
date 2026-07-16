import api from "./axios";

export let getRecipes = () => api.get("/recipes");

export let createRecipes = (data) =>
  api.post("/recipes", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export let getRecipe = (id) => api.get(`/recipes/${id}`);

export let updateRecipe = (id, data) => api.put(`/recipes/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

export let deleteRecipe = (id) => api.delete(`/recipes/${id}`);
