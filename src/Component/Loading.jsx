import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 z-50">
      {/* Spinning circle with smooth animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="h-20 w-20 border-4 border-t-[#3776a9] border-b-[#1c3f7a] border-l-transparent border-r-transparent rounded-full mb-4"
      ></motion.div>

      {/* Main Loading Text */}
      <h2 className="text-[#3d6bbc] font-extrabold text-xl animate-pulse">
        Loading E-Tuition-BD Data...
      </h2>

      {/* Sub Text */}
      <p className="text-[#2e3a8c] text-sm mt-2">
        Sit back and relax, we are fetching your data
      </p>

      {/* Optional subtle dots animation */}
      <div className="flex space-x-2 mt-4">
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
          className="h-2 w-2 bg-[#3776a9] rounded-full"
        />
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          className="h-2 w-2 bg-[#3776a9] rounded-full"
        />
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          className="h-2 w-2 bg-[#3776a9] rounded-full"
        />
      </div>
    </div>
  );
};

export default Loading;
