"use client";

import React, { useRef, useState } from "react";

const OTPVerificationForm = () => {
  const inputLength = 6;
  const [otp, setOtp] = useState(new Array(inputLength).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < inputLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, inputLength);
    const digits = paste.replace(/\D/g, "").split("");
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      if (i < inputLength) newOtp[i] = digit;
    });

    setOtp(newOtp);
    setError("");

    const nextIndex =
      digits.length >= inputLength ? inputLength - 1 : digits.length;
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");

    if (otp.includes("")) {
      setError("Please fill all the OTP fields.");
      return;
    }

    console.log("OTP Submitted:", otpValue);
    // Continue to verify OTP with backend
  };

  return (
    <div className="w-full max-w-[420px] px-5 py-7 md:p-8 bg-gray-50 shadow-lg rounded-2xl">
      <h1 className="text-2xl uppercase font-semibold mb-6 text-center text-gray-800">
        Verify OTP
      </h1>

      <div className="flex justify-center gap-3 mb-3" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`w-12 h-12 text-center text-xl border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 ${
              error ? "focus:ring-red-400" : "focus:ring-blue-500"
            } transition`}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition transform hover:-translate-y-0.5"
      >
        Verify
      </button>

      <p className="mt-6 text-center text-gray-500 text-sm">
        Didn't receive the code?
        <button className="text-blue-500 font-semibold ml-1 hover:underline">
          Resend
        </button>
      </p>
    </div>
  );
};

export default OTPVerificationForm;
