"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Reset password 🔹", data);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-[420px] px-5 py-7 md:p-8 bg-gray-50 shadow-lg rounded-2xl">
        <h1 className="text-2xl uppercase font-semibold mb-6 text-center text-gray-800">
          Reset Password
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
              placeholder="Enter your email"
              type="email"
              aria-label="Email"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="p-3 cursor-pointer bg-blue-500 text-gray-50 font-semibold rounded-lg shadow-md hover:bg-blue-600 transition transform hover:-translate-y-0.5"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Remember password?
          <Link
            href="/login"
            className="text-blue-500 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
