import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";

const AdminNoteCard = ({ user }) => {
  const [note, setNote] = useState(user?.adminNote || "");
  const [tempNote, setTempNote] = useState(user?.adminNote || "");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!user?.adminNote);

  const handleSaveNote = async () => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/users/${user?._id}/note`, {
        adminNote: tempNote,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Note saved successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      setNote(tempNote);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to save note!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setTempNote(note);
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl bg-blue-50 border border-blue-200 shadow p-4">
      <h3 className="text-lg font-semibold text-blue-800 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 
               9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
          Tutor Note
        </span>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-600 hover:underline">
            Edit
          </button>
        )}
      </h3>

      {isEditing ? (
        <>
          <textarea
            value={tempNote}
            onChange={(e) => setTempNote(e.target.value)}
            placeholder="Write tutor note here..."
            className="w-full mt-2 p-2 border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-200"
            rows={3}></textarea>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleSaveNote}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Saving..." : "Save Note"}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={loading}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="mt-2 p-2 bg-white border border-blue-200 rounded-lg text-sm min-h-[80px] whitespace-pre-wrap">
          {note || "No note added yet."}
        </p>
      )}
    </div>
  );
};

export default AdminNoteCard;
