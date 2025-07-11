"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {
    console.log("Login Data 🔵", data);
    reset();
  };

  return (
    <div className="w-full max-w-[420px] px-5 py-7 md:p-8 bg-gray-50 shadow-lg rounded-2xl">
      <h1 className="text-2xl uppercase font-semibold mb-6 text-center text-gray-800">
        login
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Email"
            type="email"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            aria-label="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
              placeholder="Password"
              type={showPass ? "text" : "password"}
              className="p-3 rounded-lg border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              aria-label="Password"
            />
            <span
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {!showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
          <Link
            href="/forgot-password"
            className="text-sm mt-2 text-right text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="p-3 cursor-pointer bg-blue-500 text-gray-50 font-semibold rounded-lg shadow-md hover:bg-blue-600 transition transform hover:-translate-y-0.5"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500">
        Don't have an account?
        <Link
          href="/register"
          className="text-blue-500 font-semibold ml-1 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
