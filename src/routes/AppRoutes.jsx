import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import RecipeList from "../pages/RecipeList";
import AddRecipe from "../pages/AddRecipe";
import EditRecipe from "../pages/EditRecipe";
import RecipeDetails from "../pages/RecipeDetails";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../components/ProtectectedRoute";


const AppRoutes = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/recipes"
          element={
            <ProtectedRoute>
              <RecipeList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes/add"
          element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes/:id"
          element={
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes/edit/:id"
          element={
            <ProtectedRoute>
              <EditRecipe />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
