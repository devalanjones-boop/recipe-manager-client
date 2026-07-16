import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validation/registerSchema";
import { register as registerUser } from "../services/authService";
import { useState } from "react";

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

    alert("Registration successful");
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
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-green-600">
          Create Account
        </h1>

        {serverError && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label className="mb-1 block font-medium">
              Username
            </label>

            <input
              {...register("username")}
              className="w-full rounded border p-3 focus:border-green-500 focus:outline-none"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Email
            </label>

            <input
              {...register("email")}
              className="w-full rounded border p-3 focus:border-green-500 focus:outline-none"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Password
            </label>

            <input
              type="password"
              {...register("password")}
              className="w-full rounded border p-3 focus:border-green-500 focus:outline-none"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full rounded border p-3 focus:border-green-500 focus:outline-none"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            disabled={loading}
            className="w-full rounded bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center">
          Already have an account?
          <Link
            to="/"
            className="ml-2 font-semibold text-green-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;