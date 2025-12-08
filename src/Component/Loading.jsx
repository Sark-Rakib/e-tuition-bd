import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-purple-100 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#CAEB66] mb-4"></div>
      <h2 className="text-[#CAEB66] font-bold text-lg">
        Loading ZipShift Inventory Data...
      </h2>
      <p className="text-[#CAEB66] text-sm mt-2">Please wait a moment</p>
    </div>
  );
};

export default Loading;
