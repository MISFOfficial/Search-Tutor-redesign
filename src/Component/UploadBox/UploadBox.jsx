import { CloudUpload } from "lucide-react";

const UploadBox = ({ id, label, onChange }) => {
  return (
    <>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      <label htmlFor={id}>
        <div className="relative h-44 w-full min-w-[13.5rem] md:w-[13.75rem] cursor-pointer rounded-md bg-[#f2f5fc] p-3 shadow-md">
          <div className="flex h-full flex-col items-center justify-center border-2 border-dotted border-indigo-500 text-indigo-500">
            <CloudUpload size={60} />
            <p>{label}</p>
          </div>
        </div>
      </label>
    </>
  );
};

export default UploadBox;
