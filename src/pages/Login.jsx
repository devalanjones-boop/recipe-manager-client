import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import loginSchema from "../validation/loginSchema";
import { login } from "../services/authservice";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  let [loginError, setloginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);

      const token = res?.token || res?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      setloginError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />

            <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.password?.message}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>

          {loginError && (
            <p className="mb-4 rounded bg-red-100 p-3 text-red-600">
              {loginError}
            </p>
          )}
          
          {/* Register link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
