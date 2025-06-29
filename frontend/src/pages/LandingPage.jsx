import React, { useState, useEffect } from 'react'

import tempo from '../assets/tempo.png'
import { APP_FEATURES } from "../utils/data"
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModal , setOpenAuthModal] = useState(false);
  const [currentPage , setCurrentPage] = useState("login");

  const handleCTA = () => {};

  return (
    <>

      {/* Hero */}
      <div className="w-full min-h-full bg-[#fffcef] pb-36">
      <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0 " />
      
      <div className="container mx-auto px-4 pt-6 pb-[280px] relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
         <div className="text-xl text-black font-bold">
          Interview Prep
         </div>
          <button className="bg-linear-to-r front-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer" onClick={() => setOpenAuthModal(true)}>
          Login/Sign
          </button>
        </header>

        {/* Hero Content */}
        <div className=" flex flex-col md:flex-row items-center">
          <div className="full md:w-1/2 pr-4 mb-8 md:mb-0">
            <div className="flex items-center justify-left mb-2">
              <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full hover:bg-black hover:text-white">
                AI Powered
              </div>
            </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interview with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_200% animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
           </div>

           <div className="w:full md:w-1/2">
            <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, dolor dignissimos quos adipisci quo atque modi exercitationem dicta eos nam ullam! Possimus blanditiis incidunt similique distinctio neque doloremque voluptatem aperiam?
            </p>

            <button
            className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
            onClick={handleCTA}
            >
              Get Started
            </button>
           </div> 
        </div>
      </div>      
      </div>  
      <div className="bg-amber-100">
      {/* Image */}
      <div className="w-full min-h-full relative z-10 bg-amber-100">
        <div>
          <section className="flex items-center justify-center -mt-76">
            <img src = {tempo} alt="image"
            className="w-[80vw] rounded-lg"
            />
          </section>
        </div> 
      </div>

      {/* Features */}
      <div className="w-full min-h-full bg-amber-100 mt-10">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-2xl font-medium text-center mb-12">
              Features
            </h2>

            <div className="flex flex-col items-center gap-8">
              {/*First 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                  key={feature.id}
                  className="bg-[#fffcef] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                  <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  </div>
              
              ))}
              </div>
            </div>

            {/*Remaining cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                 key={feature.id}
                  className="bg-[#fffcef] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                 <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                 <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      </div>

      
           

    </>        
  );
};


export default LandingPage