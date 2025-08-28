import React from "react";
import { useNavigate } from "react-router-dom";

const AppliedCard = ({ user, jobId, app, handleStatusChange, updatingId }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="mb-3 sm:mb-0">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600 font-semibold">
            {user?.name || "Unknown Name"}
          </p>
          {user.isVerified && !user.isRedVerified && (
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/15050/15050690.png"
                alt="verified"
                className="w-5 h-5 object-cover"
              />
            </div>
          )}
          {user.isRedVerified && !user.isVerified && (
            <div>
              <img
                src="https://img.icons8.com/?size=30&id=99285&format=png"
                srcSet="https://img.icons8.com/?size=30&id=99285&format=png 1x,https://img.icons8.com/?size=60&id=99285 format=png 2x"
                alt="Red Verified Badge"
                className="w-7 h-7 object-cover"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(19%) sepia(89%) saturate(6975%) hue-rotate(1deg) brightness(95%) contrast(122%)",
                }}
              />
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600">{user?.email || "No Email"}</p>
        <p className="text-sm text-gray-600">{user?.phone || "No Phone"}</p>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">Job ID: {jobId}</p>
          <p className="text-sm text-gray-500">
            Applied: {new Date(app.appliedAt).toLocaleDateString()}
          </p>
        </div>
        <button
          className="btn my-2"
          onClick={() => navigate(`/tutor/${user.uid}`)}>
          see tutor info
        </button>
      </div>

      <div>
        <label htmlFor={`status-${app._id}`} className="block mb-1 font-medium">
          Status:
        </label>
        <select
          id={`status-${app._id}`}
          value={app.status}
          onChange={(e) => handleStatusChange(app._id, e.target.value)}
          disabled={updatingId === app._id}
          className={`border rounded px-3 py-1 transition-colors duration-300
                          ${
                            app.status === "pending"
                              ? "border-yellow-500 bg-yellow-100 text-yellow-800"
                              : app.status === "reviewed"
                              ? "border-blue-500 bg-blue-100 text-blue-800"
                              : app.status === "selected"
                              ? "border-green-500 bg-green-100 text-green-800"
                              : app.status === "rejected"
                              ? "border-red-500 bg-red-100 text-red-800"
                              : "border-gray-300"
                          }
                        `}
          aria-label={`Update status for application ${app._id}`}>
          <option value="pending">Pending</option>
          <option value="reviewed">Shortlisted</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default AppliedCard;
