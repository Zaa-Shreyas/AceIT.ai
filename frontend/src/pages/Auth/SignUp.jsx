import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { motion } from 'framer-motion';


const SignUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Full name is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 8 || !password) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");

    //login API call

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
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
      className="w-[85vw] md:w-[33vw] p-7 pl-4 flex flex-col justify-center bg-[#faedcd] rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-[#0d3b66]">Create an Account</h3>
      <p className="text-xs text-[#0d3b66]/70 mt-1 mb-6">Join us today by entering your details below</p>

      <form onSubmit={handleSignUp} className="pr-10">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 gap-2">
          <Input value={fullName} onChange={({ target }) => setFullName(target.value)} label="Full Name" placeholder="John" type="text" />
          <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="John@gmail" type="email" />
          <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="*********" type="password" />
        </div>

        {error && <p className="text-[#f95738] text-xs pb-2.5">{error}</p>}

        <button type="submit" className="bg-[#0d3b66] text-white rounded px-5 py-2 text-sm font-semibold hover:bg-[#f4d35e] hover:text-[#0d3b66] transition mt-3">Sign Up</button>

        <p className="text-[13px] text-[#0d3b66] mt-3">Already have an account?{' '}
          <button className="font-medium text-[#f95738] underline cursor-pointer" onClick={() => setCurrentPage("login")}>Log In</button>
        </p>
      </form>
    </motion.div>
  );
};

export default SignUp;