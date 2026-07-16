import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

const Navbar = () => {
  let navigate = useNavigate();
  let [username, setUsername] = useState("")

  useEffect( () => {
    let token = localStorage.getItem("token")

    if(token) {
      try {
        let decoded = jwtDecode(token)
        setUsername(decoded.username)
      } catch (err) {
        console.error("invalid token", err);
        
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-green-600 shadow-md">
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row">
    {/* Logo */}
    <Link
      to="/dashboard"
      className="text-center text-2xl font-bold text-white"
    >
      🍽 Recipe Manager
    </Link>

    {/* Navigation */}
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
      <Link
        to="/dashboard"
        className="text-white transition hover:text-green-200"
      >
        Home
      </Link>

      <Link
        to="/recipes/add"
        className="text-white transition hover:text-green-200"
      >
        Add Recipe
      </Link>

      <span className="rounded-full bg-green-700 px-3 py-1 text-sm font-medium text-white">
        👤 {username || "User"}
      </span>

      <button
        onClick={logout}
        className="rounded-lg bg-red-500 px-4 py-2 cursor-pointer text-white transition hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
