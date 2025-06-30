import React from 'react'
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { motion } from 'framer-motion';


const Login = ({setCurrentPage}) => {
  const [email, setEmail] =useState("");
  const [password, setPassword] =useState("");
  const [error, setError] =useState(null);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 8 || !password) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("")

    //Login API Call
    try{

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }


  };




  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="w-[85vw] md:w-[33vw] p-6 flex flex-col justify-center bg-[#faedcd] rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-[#0d3b66]">Welcome Back</h3>
      <p className="text-xs text-[#0d3b66]/70 mt-1 mb-6">Please enter your details to log in</p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input value={email} placeholder="John@gmail.com" onChange={({ target }) => setEmail(target.value)} type="email" label="Email Address" />
        <Input value={password} placeholder="min 8 characters" onChange={({ target }) => setPassword(target.value)} type="password" label="Password" />

        {error && <p className="text-[#f95738] text-xs pb-2.5">{error}</p>}

        <button type="submit" className="bg-[#0d3b66] text-white rounded px-5 py-2 text-sm font-semibold hover:bg-[#f4d35e] hover:text-[#0d3b66] transition">LOGIN</button>

        <p className="text-[13px] text-[#0d3b66] mt-3">
          Don't have an account?{' '}
          <button className="font-medium text-[#f95738] underline cursor-pointer" onClick={() => setCurrentPage("signup")}>Sign Up</button>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;