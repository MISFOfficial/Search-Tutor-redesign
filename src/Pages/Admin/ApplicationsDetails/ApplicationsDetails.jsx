import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import AppliedCard from "../../../Component/AppliedCard/AppliedCard";

const ApplicationsDetails = () => {
  const { jobId } = useParams();
  const [updatingId, setUpdatingId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationsByJob = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/applications"); // flat array

        // Group the applications by jobId
        const groupedApplications = res.data.reduce((acc, app) => {
          const job = app.jobDetails || app.job || {};
          const jobId = job.jobId || "unknown";

          if (!acc[jobId]) {
            acc[jobId] = {
              jobTitle: job.title || "Untitled Job",
              applications: [],
            };
          }

          acc[jobId].applications.push(app);
          return acc;
        }, {});

        // Use the jobId param to find the relevant group
        const group = groupedApplications[jobId];

        if (group) {
          setApplications(group.applications);
          setJobTitle(group.jobTitle);
        } else {
          setApplications([]);
          setJobTitle("Untitled Job");
        }

        setError(null);
      } catch {
        setError("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationsByJob();
  }, [jobId]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await axiosInstance.patch(`/applications/${id}/status`, {
        status: newStatus,
      });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
      setError(null);
    } catch {
      setError("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto my-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Applications for: {jobTitle} <br />
        Job Id: {jobId}
      </h1>

      {applications.length === 0 ? (
        <p>No applications found for this job.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const user = app.userDetails || app.user;
            return (
              <AppliedCard
                key={app._id}
                user={user}
                jobId={jobId}
                app={app}
                handleStatusChange={handleStatusChange}
                updatingId={updatingId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicationsDetails;
