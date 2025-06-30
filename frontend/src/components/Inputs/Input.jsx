import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type = "text" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-[#0d3b66] font-medium">{label}</label>}

      <div className="relative flex items-center">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full bg-transparent border border-[#f4d35e] rounded p-2 text-[#0d3b66] focus:outline-[#f95738] placeholder:text-[#0d3b66]/60"
          value={value}
          onChange={onChange}
        />

        {isPassword && (
          <div className="absolute right-3 cursor-pointer text-[#f95738]">
            {showPassword ? (
              <FaRegEye size={18} onClick={() => setShowPassword(false)} />
            ) : (
              <FaRegEyeSlash size={18} onClick={() => setShowPassword(true)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;