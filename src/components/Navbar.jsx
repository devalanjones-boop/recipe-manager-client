import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (err) {
        console.error("invalid token", err);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
<nav className="sticky top-0 z-50 bg-green-600 shadow-md md:static md:shadow-none">      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-white"
          >
            🍽 Recipe Manager
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-white md:hidden"
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 md:flex">
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
              className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="mt-4 flex flex-col items-center gap-4 rounded-lg bg-green-700 p-4 md:hidden">
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-green-200"
            >
              Home
            </Link>

            <Link
              to="/recipes/add"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-green-200"
            >
              Add Recipe
            </Link>

            <span className="rounded-full bg-green-800 px-3 py-1 text-sm font-medium text-white">
              👤 {username || "User"}
            </span>

            <button
              onClick={logout}
              className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;