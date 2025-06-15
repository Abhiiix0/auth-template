"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {
    console.log("Registration Data 🟣", data);
    reset();
  };

  return (
    <div className="w-full max-w-[420px] px-5 py-7 md:p-8 bg-gray-50 shadow-lg rounded-2xl">
      <h1 className="text-2xl uppercase font-semibold mb-6 text-center text-gray-800">
        registration
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col">
          <input
            {...register("name", { required: "Full name is required" })}
            placeholder="Full Name"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            aria-label="Full Name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>
        {/* Email */}
        <div className="flex flex-col">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email validation pattern
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
        <div>
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
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="p-3 cursor-pointer bg-blue-500 text-gray-50 font-semibold rounded-lg shadow-md hover:bg-blue-600 transition transform hover:-translate-y-0.5"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500">
        Already have an account?
        <Link
          href="/login"
          className="text-blue-500 font-semibold ml-1 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
