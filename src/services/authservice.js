import api from "../api/axios";

/**
 * Register user
 */
export const register = async (userData) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

/**
 * Login user
 */
export const login = async (data) => {
  const res = await api.post("/user/login", data);

  const token = res.data?.token;

  if (token) {
    localStorage.setItem("token", token);
  }

  return res.data;
};
/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("token");
};

/**
 * Get current token
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};