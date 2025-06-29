"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const password = watch("newPass");

  const onSubmit = (data) => {
    console.log("New password 🔹", data);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-[420px] px-5 py-7 md:p-8 bg-gray-50 shadow-lg rounded-2xl">
        <h1 className="text-2xl uppercase font-semibold mb-6 text-center text-gray-800">
          Set New Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Password */}
          <div>
            <div className="relative">
              <input
                {...register("newPass", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
                placeholder="New password"
                type={showPass ? "text" : "password"}
                aria-label="New password"
                className="p-3 rounded-lg border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                onClick={() => setShowPass((prev) => !prev)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {!showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            {errors.newPass && (
              <span className="text-red-500 text-sm mt-1">
                {errors.newPass.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                {...register("confirmPass", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm password"
                type={showConfirmPass ? "text" : "password"}
                aria-label="Confirm password"
                className="p-3 rounded-lg border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                onClick={() => setShowConfirmPass((prev) => !prev)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {!showConfirmPass ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </span>
            </div>
            {errors.confirmPass && (
              <span className="text-red-500 text-sm mt-1">
                {errors.confirmPass.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="p-3 cursor-pointer bg-blue-500 text-gray-50 font-semibold rounded-lg shadow-md hover:bg-blue-600 transition transform hover:-translate-y-0.5"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          <Link
            href="/login"
            className="text-blue-500 font-semibold ml-1 hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
