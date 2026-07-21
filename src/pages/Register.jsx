import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validation/registerSchema";
import { register as registerUser } from "../services/authservice";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

const onSubmit = async (data) => {
  try {
    setLoading(true);
    setServerError("");

    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };


    await registerUser(payload);

    toast.success("Registration successful");
    navigate("/");
  } catch (err) {

    setServerError(
      err.response?.data?.message || "Registration failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-6 sm:px-6">
    <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg sm:p-8">
      <h1 className="mb-5 text-center text-2xl font-bold text-green-600 sm:mb-6 sm:text-3xl">
        Create Account
      </h1>

      {serverError && (
        <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        {/* Username */}
        <div>
          <label className="mb-1 block text-sm font-medium sm:text-base">
            Username
          </label>

          <input
            {...register("username")}
            className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-green-500 sm:p-3 sm:text-base"
          />

          <p className="mt-1 text-xs text-red-500 sm:text-sm">
            {errors.username?.message}
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium sm:text-base">
            Email
          </label>

          <input
            type="email"
            {...register("email")}
            className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-green-500 sm:p-3 sm:text-base"
          />

          <p className="mt-1 text-xs text-red-500 sm:text-sm">
            {errors.email?.message}
          </p>
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium sm:text-base">
            Password
          </label>

          <input
            type="password"
            {...register("password")}
            className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-green-500 sm:p-3 sm:text-base"
          />

          <p className="mt-1 text-xs text-red-500 sm:text-sm">
            {errors.password?.message}
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-1 block text-sm font-medium sm:text-base">
            Confirm Password
          </label>

          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-green-500 sm:p-3 sm:text-base"
          />

          <p className="mt-1 text-xs text-red-500 sm:text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full rounded bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:py-3 sm:text-base"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-600 sm:mt-6">
        Already have an account?
        <Link
          to="/"
          className="ml-2 font-semibold text-green-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);
};

export default Register;
