import React from "react";

const ImagePreview = ({ src, label }) => {
  return (
    <div className="md:ms-8">
      <div className="relative h-44 overflow-hidden rounded-sm bg-[#ddd] p-3 shadow-md">
        <img
          alt={label}
          width="220"
          height="100"
          className="mx-auto max-h-[9.5rem] object-cover"
          src={src}
        />
        <p className="absolute bottom-3 left-3 w-[calc(100%-24px)] bg-[#9b9b9ba6] p-2 text-center text-xs font-bold text-white">
          {label}
        </p>
      </div>
    </div>
  );
};

export default ImagePreview;
