import React from "react";

const UploadingPreview = ({ label }) => {
  return (
    <div className="md:ms-8 flex items-center justify-center h-44 w-[13.5rem] bg-[#f0f0f0] rounded-md shadow">
      <p className="text-indigo-500 font-semibold animate-pulse">
        Uploading {label}...
      </p>
    </div>
  );
};

export default UploadingPreview;
