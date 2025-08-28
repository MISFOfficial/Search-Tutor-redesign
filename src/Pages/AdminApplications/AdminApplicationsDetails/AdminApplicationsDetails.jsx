import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import AppliedCard from "../../../Component/AppliedCard/AppliedCard";

const AdminApplicationsDetails = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [jobTitle, setJobTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    // Fetch all applications and filter by jobId
    useEffect(() => {
        const fetchApplicationsByJob = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/applications");

                // Group applications by jobId
                const groupedApplications = res.data.reduce((acc, app) => {
                    const job = app.jobDetails || app.job || {};
                    const jId = job.jobId || "unknown";

                    if (!acc[jId]) {
                        acc[jId] = {
                            jobTitle: job.title || "Untitled Job",
                            applications: [],
                        };
                    }
                    acc[jId].applications.push(app);
                    return acc;
                }, {});

                // Extract group by route jobId
                const group = groupedApplications[jobId];

                if (group) {
                    setApplications(group.applications);
                    setJobTitle(group.jobTitle);
                } else {
                    setApplications([]);
                    setJobTitle("Unknown Job");
                }

                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch applications");
            } finally {
                setLoading(false);
            }
        };

        fetchApplicationsByJob();
    }, [jobId]);

    // Handle status change for an application
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
        } catch (err) {
            console.error(err);
            setError("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    // UI states
    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

    return (
        <div >
            <h1 className="text-2xl font-bold text-indigo-700 mb-6">
                Applications for: {jobTitle} <br />
                Job ID: {jobId}
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

export default AdminApplicationsDetails;
