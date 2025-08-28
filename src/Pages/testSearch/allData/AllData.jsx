import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

const AllData = () => {
    const { searchTerm } = useOutletContext()
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




    const fetchApplications = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/applications");
            setApplications(res.data);
            setError(null);
        } catch {
            setError("Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);


    const groupedApplications = applications.reduce((acc, app) => {
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

    // Apply search filter
    const filteredGroups = Object.entries(groupedApplications).filter(
        ([jobId, group]) => {
            const lowerSearch = searchTerm.toLowerCase();
            return (
                jobId.toLowerCase().includes(lowerSearch) ||
                group.jobTitle.toLowerCase().includes(lowerSearch)
            );
        }
    );

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;


    return (
        <div className="">
            {/* Applications display */}
            {filteredGroups.length === 0 ? (
                <p>No matching applications found.</p>
            ) : (
                filteredGroups.map(([jobId, group]) => (
                    <div
                        key={jobId}
                        className="mb-8 border border-gray-300 p-4 rounded-md shadow">
                        {/* <h2 className="text-xl font-bold text-indigo-700 mb-4">
              {group.jobTitle}{" "}
              <span className="text-sm text-gray-600">
                ({group.applications.length})
              </span>
            </h2> */}
                        <Link to={`/admin/applications/${jobId}`}>
                            <h2 className="text-xl font-bold text-indigo-700 mb-4">
                                {group.jobTitle}{" "}
                                <span className="text-sm text-gray-600">
                                    ({group.applications.length})
                                </span>
                            </h2>
                        </Link>

                        {/* <div className="space-y-4">
              {group.applications.map((app) => {
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
            </div> */}
                    </div>
                ))
            )}
        </div>
    );
};

export default AllData;